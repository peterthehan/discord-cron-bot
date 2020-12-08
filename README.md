# Discord Cron Bot

[![Discord](https://discordapp.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that sends messages on a schedule using cron expressions.

<div align="center">
  <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-cron-bot/cron.gif" />
</div>

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

   > Don't forget to give your bot the `Manage Webhooks` permission!

2. Download this widget and add it into the [src/widgets](https://github.com/peterthehan/create-discord-bot/tree/master/app/src/widgets) folder.

   > npm i -s cron@^1.8.2 to install this widget's dependencies.

3. Open [config.json](https://github.com/peterthehan/discord-cron-bot/blob/master/config.json) to configure your own settings:

```js
{
  "timezone": "America/Los_Angeles",
  "rules": [
    {
      "cronExpression": "0 0 */6 * * *",
      "channelPolicy": "random",
      "messagePolicy": "single",
      "reactionPolicy": "single",
      "channelIds": [
        "CHANNEL_ID_1",
        "CHANNEL_ID_2",
        // ...Add as many channel IDs as you want.
      ],
      "messages": [
        {
          "content": "Test message 1"
        },
        {
          "content": "Test message 2"
        },
        // ...Add as many messages as you want.
      ],
      "reactions": [
        "EMOJI_1",
        "EMOJI_2",
        // ...Add as many emojis as you want.
      ]
    },
    // ...Add as many rules as you want.
  ]
}
```

- `timezone` is the timezone you wish to localize your `cronExpression` to.
- `cronExpression` is the interval at which messages are sent.
- `channelPolicy` **must** be one of the following strings:
  - `all`: Sends to every channel in `channelIds`.
  - `random`: Sends to a single random channel in `channelIds`.
  - `single`: Sends to the first channel in `channelIds`.
- `messagePolicy` **must** be one of the following strings:
  - `all`: Sends all messages in `messages`.
  - `random`: Sends a single random message in `messages`.
  - `single`: Sends the first message in `messages`.
- `reactionPolicy` **must** be one of the following strings:
  - `all`: Reacts with all emojis in `reactions` on the sent message(s).
  - `random`: Reacts with a single random emoji in `reactions` on the sent message(s).
  - `single`: Reacts with the first emoji in `reactions` on the sent message(s).
- `channelIds` are the text channel(s) you want your message(s) to be forwarded to.
- `messages` is a list of [WebhookMessageOptions](https://discord.js.org/#/docs/main/master/typedef/WebhookMessageOptions) objects.
- `reactions` is a list of emojis. An emoji can be:

  - A unicode emoji. https://emojipedia.org is a good reference to copy and paste from.

  ```
  "emojiRoleMap": {
    "😳": ["ROLE_1_ID"],
    "🥺": ["ROLE_2_ID"]
  }
  ```

  - An emoji ID for custom emojis. You can get a custom emoji's ID by sending `\:YourCustomEmoji:` in chat (prefix a backslash `\` character in front of your desired emoji).

  ```
  "emojiRoleMap": {
    "716344914706694165": ["ROLE_1_ID"],
    "622635442013208589": ["ROLE_2_ID"]
  }
  ```

4. `npm start` to run the bot.

Some useful tools:

- [Moment Timezone](https://momentjs.com/timezone): find your `timezone` string.
- [crontab guru](https://crontab.guru): build your `cronExpression`. Note that the tool does not support seconds but this bot configuration does.
- [Embed Visualizer](https://leovoel.github.io/embed-visualizer): visualize your message content and embeds. Switch to `webhook` mode first.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
