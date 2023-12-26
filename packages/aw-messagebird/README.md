# Project Name

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-v1.0.0-brightgreen)]()

## Description

This package contains the open-source Node.js client for MessageBird's REST API. Documentation can be found at: https://developers.messagebird.com

## Requirements

- [Sign up](https://dashboard.messagebird.com/en/login) for a free MessageBird account
- Create a new access_key in the [developer's section](https://dashboard.messagebird.com/en/developers/settings)
- MessageBird REST API for Node.js requires Node.js >= 0.10 or io.js

## Installation

```bash
npm install
```

## Usage

We have put some self-explanatory examples in the examples directory, but here is a quick breakdown of how it works. Let's go ahead and initialize the library first. Don't forget to insert the access_key in @aw/env package <YOUR_ACCESS_KEY> with your actual access key.

```
import messagebirdClient from '@aw/messagebird';

const messagebird = new messagebirdClient();
  const messageContent: ConversationParameter = {
    to: 'YOUR_RECIPIENT_NUMBER',
    from: 'YOUR_CHANNEL_ID',
    type: 'image',
    url: 'https://media.istockphoto.com/id/529249803/photo/background.jpeg',
  };
  const response = await messagebird.sendMediaMessage(messageContent);
```

## Documentation
Complete documentation, instructions, and examples are available at: https://developers.messagebird.com