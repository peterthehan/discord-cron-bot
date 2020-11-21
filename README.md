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
  - `single`: Sends to a single channel in `channelIds`.
- `messagePolicy` **must** be one of the following strings:
  - `all`: Sends all messages in `messages`.
  - `random`: Sends a single random message in `messages`.
  - `single`: Sends a single message in `messages`.
- `channelIds` are the text channel(s) you want your message(s) to be forwarded to.
- `messages` is a list of [WebhookMessageOptions](https://discord.js.org/#/docs/main/master/typedef/WebhookMessageOptions) objects.

4. `npm start` to run the bot.

Some useful tools:

- [Moment Timezone](https://momentjs.com/timezone): find your `timezone` string.
- [crontab guru](https://crontab.guru): build your `cronExpression`. Note that the tool does not support seconds but this bot configuration does.
- [Embed Visualizer](https://leovoel.github.io/embed-visualizer): visualize your message content and embeds. Switch to `webhook` mode first.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
