# Discord Cron Bot

[![Discord](https://discordapp.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that sends messages on a schedule using cron expressions.

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
      "channelIds": ["CHANNEL_1_ID", "CHANNEL_2_ID"],
      "sendPolicy": "all",
      "cronExpression": "0 30 */3 * * *",
      "content": "Hello World from content!",
      "embeds": [
        { "description": "Hello World from embed!" }
      ]
    },
    // ...Add as many rules as you want.
  ]
}
```

- `timezone` is the timezone you wish to localize your `cronExpression` to.
- `channelIds` are the text channels you want your message to be forwarded to.
- `sendPolicy` **must** be one of the following strings:
  - `all`: Sends the message to every channel in `channelIds`.
  - `random`: Sends the message to a single random channel in `channelIds`.
- `cronExpression` is interval at which the messages are sent.
- `content` is the message sent to Discord. Leave as an empty string if you wish to not send a message.
- `embeds` is the list of embeds sent to Discord. Leave as an empty array if you wish to not send embeds.

  Some useful tools:

  - [Moment Timezone](https://momentjs.com/timezone) - find your `timezone` string.
  - [crontab guru](https://crontab.guru) - build your `cronExpression`. Note that the tool does not support seconds but this bot configuration does.
  - [Embed Visualizer](https://leovoel.github.io/embed-visualizer) - visualize your message content and embeds. Switch to `webhook` mode first.

4. `npm start` to run the bot.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
