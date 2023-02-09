[bing-chat](../readme.md) / [Exports](../modules.md) / BingChat

# Class: BingChat

## Table of contents

### Constructors

- [constructor](BingChat.md#constructor)

### Methods

- [createConversation](BingChat.md#createconversation)
- [sendMessage](BingChat.md#sendmessage)

## Constructors

### constructor

• **new BingChat**(`opts`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `Object` | - |
| `opts.cookie` | `string` | - |
| `opts.debug?` | `boolean` | **`Default Value`** `false` * |

#### Defined in

bing-chat.ts:15

## Methods

### createConversation

▸ **createConversation**(): `Promise`<[`ConversationResult`](../interfaces/ConversationResult.md)\>

#### Returns

`Promise`<[`ConversationResult`](../interfaces/ConversationResult.md)\>

#### Defined in

bing-chat.ts:260

___

### sendMessage

▸ **sendMessage**(`text`, `opts?`): `Promise`<[`ChatMessage`](../interfaces/ChatMessage.md)\>

Sends a message to Bing Chat, waits for the response to resolve, and returns
the response.

If you want to receive a stream of partial responses, use `opts.onProgress`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `opts` | [`SendMessageOptions`](../modules.md#sendmessageoptions) |

#### Returns

`Promise`<[`ChatMessage`](../interfaces/ChatMessage.md)\>

The response from Bing Chat

#### Defined in

bing-chat.ts:43
