[bing-chat](readme.md) / Exports

# bing-chat

## Table of contents

### Classes

- [BingChat](classes/BingChat.md)

### Interfaces

- [APIResult](interfaces/APIResult.md)
- [AdaptiveCard](interfaces/AdaptiveCard.md)
- [AdaptiveCardBody](interfaces/AdaptiveCardBody.md)
- [Center](interfaces/Center.md)
- [ChatMessage](interfaces/ChatMessage.md)
- [ChatMessageFeedback](interfaces/ChatMessageFeedback.md)
- [ChatMessageFrom](interfaces/ChatMessageFrom.md)
- [ChatMessageFull](interfaces/ChatMessageFull.md)
- [ChatMessagePartial](interfaces/ChatMessagePartial.md)
- [ChatRequest](interfaces/ChatRequest.md)
- [ChatRequestArgument](interfaces/ChatRequestArgument.md)
- [ChatRequestMessage](interfaces/ChatRequestMessage.md)
- [ChatRequestResult](interfaces/ChatRequestResult.md)
- [ChatResponseItem](interfaces/ChatResponseItem.md)
- [ChatUpdate](interfaces/ChatUpdate.md)
- [ChatUpdateArgument](interfaces/ChatUpdateArgument.md)
- [ChatUpdateCompleteResponse](interfaces/ChatUpdateCompleteResponse.md)
- [ConversationResult](interfaces/ConversationResult.md)
- [Coords](interfaces/Coords.md)
- [LocationHint](interfaces/LocationHint.md)
- [LocationHintChatRequestMessage](interfaces/LocationHintChatRequestMessage.md)
- [Participant](interfaces/Participant.md)
- [PreviousMessage](interfaces/PreviousMessage.md)
- [SuggestedResponse](interfaces/SuggestedResponse.md)
- [Telemetry](interfaces/Telemetry.md)

### Type Aliases

- [Author](modules.md#author)
- [SendMessageOptions](modules.md#sendmessageoptions)

## Type Aliases

### Author

Ƭ **Author**: ``"user"`` \| ``"bot"``

#### Defined in

types.ts:1

___

### SendMessageOptions

Ƭ **SendMessageOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clientId?` | `string` |
| `conversationId?` | `string` |
| `conversationSignature?` | `string` |
| `invocationId?` | `string` |
| `locale?` | `string` |
| `location?` | { `lat`: `number` \| `string` ; `lng`: `number` \| `string` ; `re?`: `string`  } |
| `location.lat` | `number` \| `string` |
| `location.lng` | `number` \| `string` |
| `location.re?` | `string` |
| `market?` | `string` |
| `onProgress?` | (`partialResponse`: [`ChatMessage`](interfaces/ChatMessage.md)) => `void` |
| `region?` | `string` |

#### Defined in

types.ts:3
