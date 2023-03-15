# Bing Chat API <!-- omit in toc -->

> Node.js client for the unofficial Bing Chat API. It's like ChatGPT on steroids 🔥

[![NPM](https://img.shields.io/npm/v/bing-chat.svg)](https://www.npmjs.com/package/bing-chat) [![Build Status](https://github.com/transitive-bullshit/bing-chat/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/bing-chat/actions/workflows/test.yml) [![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/transitive-bullshit/bing-chat/blob/main/license) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

- [Intro](#intro)
- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Projects](#projects)
- [Compatibility](#compatibility)
- [Credit](#credit)
- [Related](#related)
- [License](#license)

## Intro

This package is a Node.js wrapper around Bing Chat by Microsoft. TS batteries included. ✨

> **Warning**
> This package is a reverse-engineered hack. I do not expect it to continue working long-term, and it is not meant for use in production. I'm building this in public, and you can follow the progress on Twitter [@transitive_bs](https://twitter.com/transitive_bs).

## Demo

<p align="center">
  <img alt="Example conversation" src="/media/demo.gif">
  <i>(30s conversation demo)</i>
</p>

## Install

```bash
npm install bing-chat
```

Make sure you're using `node >= 18` so `fetch` is available.

## Usage

**You need access to Bing Chat OR a valid cookie from someone who has access**.

The cookie you need from Bing is the `_U` cookie (or just all of the cookies concatenated together; both will work).

```ts
import { BingChat } from 'bing-chat'

async function example() {
  const api = new BingChat({
    cookie: process.env.BING_COOKIE
  })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}
```

You can follow-up messages to continue the conversation. See `demos/demo-conversation.ts` for an example.

Note that Bing Chat conversations expire after about 20 minutes, so they're not meant to be long-term objects.

You can add streaming via the `onProgress` handler:

```ts
const res = await api.sendMessage('Write a 500 word essay on frogs.', {
  // print the partial response as the AI is "typing"
  onProgress: (partialResponse) => console.log(partialResponse.text)
})

// print the full text at the end
console.log(res.text)
```

See `demos/demo-on-progress.ts` for a full example of streaming support.

You can also add the the parameter `variant` to the `sendMessage` function to change the variant of the AI. The default is `Balanced`, but you can also use `Precise` or `Creative`.

```ts
const res = await api.sendMessage('Write a 500 word essay on frogs.', {
  // change the variant to 'Precise'
  variant: 'Creative'
})
```

## Projects

If you create a cool integration, feel free to open a PR and add it to the list.

## Compatibility

- This package is ESM-only.
- This package supports `node >= 18`.
- This module assumes that `fetch` is installed globally.
- If you want to build a website using `bing-chat`, we recommend using it only from your backend API

## Credit

- Thanks to [waylaidwanderer](https://github.com/waylaidwanderer) and [canfam](https://github.com/canfam) for helping to reverse-engineer the API 💪

## Related

- [chatgpt](https://github.com/transitive-bullshit/chatgpt-api) - Node.js client for the unofficial ChatGPT API. Same author as this package.
- [discord](https://discord.gg/v9gERj825w) - Join our discord server for hackers building on top of ChatGPT / Bing / LLMs.

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

If you found this project interesting, please consider [sponsoring me](https://github.com/sponsors/transitive-bullshit) or <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
