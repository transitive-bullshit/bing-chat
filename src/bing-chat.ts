import crypto from 'node:crypto'

import WebSocket from 'ws'

import * as types from './types'
import { fetch } from './fetch'

const terminalChar = ''

export class BingChat {
  protected _cookie: string
  protected _debug: boolean

  constructor(opts: {
    cookie: string

    /** @defaultValue `false` **/
    debug?: boolean
  }) {
    const { cookie, debug = false } = opts

    this._cookie = cookie
    this._debug = !!debug

    if (!this._cookie) {
      throw new Error('Bing cookie is required')
    }
  }

  /**
   * Sends a message to Bing Chat, waits for the response to resolve, and returns
   * the response.
   *
   * If you want to receive a stream of partial responses, use `opts.onProgress`.
   *
   * @param message - The prompt message to send
   * @param opts.conversationId - Optional ID of a conversation to continue (defaults to a random UUID)
   * @param opts.onProgress - Optional callback which will be invoked every time the partial response is updated
   *
   * @returns The response from Bing Chat
   */
  async sendMessage(
    text: string,
    opts: types.SendMessageOptions = {}
  ): Promise<types.ChatMessage> {
    const {
      invocationId = '1',
      onProgress,
      locale = 'en-US',
      market = 'en-US',
      region = 'US',
      location,
      messageType = 'Chat',
      variant = 'Balanced'
    } = opts

    let { conversationId, clientId, conversationSignature } = opts
    const isStartOfSession = !(
      conversationId &&
      clientId &&
      conversationSignature
    )

    if (isStartOfSession) {
      const conversation = await this.createConversation()
      conversationId = conversation.conversationId
      clientId = conversation.clientId
      conversationSignature = conversation.conversationSignature
    }

    const result: types.ChatMessage = {
      author: 'bot',
      id: crypto.randomUUID(),
      conversationId,
      clientId,
      conversationSignature,
      invocationId: `${parseInt(invocationId, 10) + 1}`,
      text: ''
    }

    const responseP = new Promise<types.ChatMessage>(
      async (resolve, reject) => {
        const chatWebsocketUrl = 'wss://sydney.bing.com/sydney/ChatHub'
        const ws = new WebSocket(chatWebsocketUrl, {
          perMessageDeflate: false,
          headers: {
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            pragma: 'no-cache'
          }
        })

        let isFulfilled = false

        function cleanup() {
          ws.close()
          ws.removeAllListeners()
        }

        ws.on('error', (error) => {
          console.warn('WebSocket error:', error)
          cleanup()
          if (!isFulfilled) {
            isFulfilled = true
            reject(new Error(`WebSocket error: ${error.toString()}`))
          }
        })
        ws.on('close', () => {
          // TODO
        })

        ws.on('open', () => {
          ws.send(`{"protocol":"json","version":1}${terminalChar}`)
        })
        let stage = 0

        ws.on('message', (data) => {
          const objects = data.toString().split(terminalChar)

          const messages = objects
            .map((object) => {
              try {
                return JSON.parse(object)
              } catch (error) {
                return object
              }
            })
            .filter(Boolean)

          if (!messages.length) {
            return
          }

          if (stage === 0) {
            ws.send(`{"type":6}${terminalChar}`)

            const traceId = crypto.randomBytes(16).toString('hex')

            // example location: 'lat:47.639557;long:-122.128159;re=1000m;'
            const locationStr = location
              ? `lat:${location.lat};long:${location.lng};re=${
                  location.re || '1000m'
                };`
              : undefined

            // Sets the correct options for the variant of the model
            const optionsSets = [
              'nlu_direct_response_filter',
              'deepleo',
              'enable_debug_commands',
              'disable_emoji_spoken_text',
              'responsible_ai_policy_235',
              'enablemm'
            ]
            if (variant == 'Balanced') {
              optionsSets.push('galileo')
            } else {
              optionsSets.push('clgalileo')
              if (variant == 'Creative') {
                optionsSets.push('h3imaginative')
              } else if (variant == 'Precise') {
                optionsSets.push('h3precise')
              }
            }
            const params = {
              arguments: [
                {
                  source: 'cib',
                  optionsSets,
                  allowedMessageTypes: [
                    'Chat',
                    'InternalSearchQuery',
                    'InternalSearchResult',
                    'InternalLoaderMessage',
                    'RenderCardRequest',
                    'AdsQuery',
                    'SemanticSerp'
                  ],
                  sliceIds: [],
                  traceId,
                  isStartOfSession,
                  message: {
                    locale,
                    market,
                    region,
                    location: locationStr,
                    author: 'user',
                    inputMethod: 'Keyboard',
                    messageType,
                    text
                  },
                  conversationSignature,
                  participant: { id: clientId },
                  conversationId
                }
              ],
              invocationId,
              target: 'chat',
              type: 4
            }

            if (this._debug) {
              console.log(chatWebsocketUrl, JSON.stringify(params, null, 2))
            }

            ws.send(`${JSON.stringify(params)}${terminalChar}`)

            ++stage
            return
          }

          for (const message of messages) {
            // console.log(JSON.stringify(message, null, 2))

            if (message.type === 1) {
              const update = message as types.ChatUpdate
              const msg = update.arguments[0].messages?.[0]

              if (!msg) continue

              // console.log('RESPONSE0', JSON.stringify(update, null, 2))

              if (!msg.messageType) {
                result.author = msg.author
                result.text = msg.text
                result.detail = msg

                onProgress?.(result)
              }
            } else if (message.type === 2) {
              const response = message as types.ChatUpdateCompleteResponse
              if (this._debug) {
                console.log('RESPONSE', JSON.stringify(response, null, 2))
              }
              const validMessages = response.item.messages?.filter(
                (m) => !m.messageType
              )
              const lastMessage = validMessages?.[validMessages?.length - 1]

              if (lastMessage) {
                result.conversationId = response.item.conversationId
                result.conversationExpiryTime =
                  response.item.conversationExpiryTime

                result.author = lastMessage.author
                result.text = lastMessage.text
                result.detail = lastMessage

                if (!isFulfilled) {
                  isFulfilled = true
                  resolve(result)
                }
              }
            } else if (message.type === 3) {
              if (!isFulfilled) {
                isFulfilled = true
                resolve(result)
              }

              cleanup()
              return
            } else {
              // TODO: handle other message types
              // these may be for displaying "adaptive cards"
              // console.warn('unexpected message type', message.type, message)
            }
          }
        })
      }
    )

    return responseP
  }

  async createConversation(): Promise<types.ConversationResult> {
    const requestId = crypto.randomUUID()

    const cookie = this._cookie.includes(';')
      ? this._cookie
      : `_U=${this._cookie}`

    return fetch('https://www.bing.com/turing/conversation/create', {
      headers: {
        accept: 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-ch-ua':
          '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
        'sec-ch-ua-arch': '"x86"',
        'sec-ch-ua-bitness': '"64"',
        'sec-ch-ua-full-version': '"109.0.1518.78"',
        'sec-ch-ua-full-version-list':
          '"Not_A Brand";v="99.0.0.0", "Microsoft Edge";v="109.0.1518.78", "Chromium";v="109.0.5414.120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '',
        'sec-ch-ua-platform': '"macOS"',
        'sec-ch-ua-platform-version': '"12.6.0"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-edge-shopping-flag': '1',
        'x-ms-client-request-id': requestId,
        'x-ms-useragent':
          'azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/MacIntel',
        cookie
      },
      referrer: 'https://www.bing.com/search',
      referrerPolicy: 'origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(
          `unexpected HTTP error createConversation ${res.status}: ${res.statusText}`
        )
      }
    })
  }
}
