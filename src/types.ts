export type Author = 'user' | 'bot'

export type SendMessageOptions = {
  conversationId?: string
  clientId?: string
  conversationSignature?: string
  invocationId?: string
  locale?: string
  market?: string
  region?: string
  location?: {
    lat: number | string
    lng: number | string
    re?: string
  }

  onProgress?: (partialResponse: ChatMessage) => void
}

export interface ChatMessage {
  id: string
  text: string
  author: Author

  conversationId: string
  clientId: string
  conversationSignature: string
  conversationExpiryTime?: string
  invocationId?: string

  detail?: ChatMessageFull | ChatMessagePartial
}

export interface ConversationResult {
  conversationId: string
  clientId: string
  conversationSignature: string
  result: APIResult
}

export interface APIResult {
  value: string
  message: null
}

export interface ChatUpdate {
  type: 1
  target: string
  arguments: ChatUpdateArgument[]
}

export interface ChatUpdateArgument {
  messages: ChatMessagePartial[]
  requestId: string
  result: null
}

export interface ChatMessagePartial {
  text: string
  author: Author
  createdAt: string
  timestamp: string
  messageId: string
  offense: string
  adaptiveCards: AdaptiveCard[]
  sourceAttributions: any[]
  feedback: ChatMessageFeedback
  contentOrigin: string
  privacy?: null
  messageType?: string
}

export interface AdaptiveCard {
  type: string
  version: string
  body: AdaptiveCardBody[]
}

export interface AdaptiveCardBody {
  type: string
  text: string
  wrap: boolean
}

export interface ChatMessageFeedback {
  tag: null
  updatedOn: null
  type: string
}

export interface ChatUpdateCompleteResponse {
  type: 2
  invocationId: string
  item: ChatResponseItem
}

export interface ChatResponseItem {
  messages: ChatMessageFull[]
  firstNewMessageIndex: number
  suggestedResponses: null
  conversationId: string
  requestId: string
  conversationExpiryTime: string
  telemetry: Telemetry
  result: ChatRequestResult
}

export interface ChatMessageFull {
  text: string
  author: Author
  from?: ChatMessageFrom
  createdAt: string
  timestamp: string
  locale?: string
  market?: string
  region?: string
  location?: string
  locationHints?: LocationHint[]
  messageId: string
  requestId: string
  offense: string
  feedback: ChatMessageFeedback
  contentOrigin: string
  privacy?: null
  inputMethod?: string
  adaptiveCards?: AdaptiveCard[]
  sourceAttributions?: any[]
  suggestedResponses?: SuggestedResponse[]
  messageType?: string
}

export interface ChatMessageFrom {
  id: string
  name: null
}

export interface LocationHint {
  country: string
  countryConfidence: number
  state: string
  city: string
  cityConfidence: number
  zipCode: string
  timeZoneOffset: number
  dma: number
  sourceType: number
  center: Coords
  regionType: number
}

export interface Coords {
  latitude: number
  longitude: number
  height: null
}

export interface SuggestedResponse {
  text: string
  messageId: string
  messageType: string
  contentOrigin: string
  author?: Author
  createdAt?: string
  timestamp?: string
  offense?: string
  feedback?: ChatMessageFeedback
  privacy?: null
}

export interface ChatRequestResult {
  value: string
  serviceVersion: string
}

export interface Telemetry {
  metrics?: null
  startTime: string
}

export interface ChatRequest {
  arguments: ChatRequestArgument[]
  invocationId: string
  target: string
  type: number
}

export interface ChatRequestArgument {
  source: string
  optionsSets: string[]
  allowedMessageTypes: string[]
  sliceIds: any[]
  traceId: string
  isStartOfSession: boolean
  message: ChatRequestMessage
  conversationSignature: string
  participant: Participant
  conversationId: string
  previousMessages: PreviousMessage[]
}

export interface ChatRequestMessage {
  locale: string
  market: string
  region?: string
  location?: string
  locationHints?: LocationHintChatRequestMessage[]
  timestamp: string
  author: Author
  inputMethod: string
  text: string
  messageType: string
}

export interface LocationHintChatRequestMessage {
  country: string
  state: string
  city: string
  zipcode: string
  timezoneoffset: number
  dma: number
  countryConfidence: number
  cityConfidence: number
  Center: Center
  RegionType: number
  SourceType: number
}

export interface Center {
  Latitude: number
  Longitude: number
}

export interface Participant {
  id: string
}

export interface PreviousMessage {
  text: string
  author: Author
  adaptiveCards: any[]
  suggestedResponses: SuggestedResponse[]
  messageId: string
  messageType: string
}
