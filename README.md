# Discord Cron Bot

[![Discord](https://discord.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that sends messages on a schedule using cron expressions.

<div align="center">
  <img
    src="https://raw.githubusercontent.com/peterthehan/discord-cron-bot/master/assets/demo.gif"
    alt="demo"
  />
</div>

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

   > Don't forget to give your bot the `Manage Webhooks` permission!

2. Download this bot and move the `src-discord-cron-bot` folder into the [/src/bots](https://github.com/peterthehan/create-discord-bot/tree/master/src/bots) folder from step 1.

   > Run `npm i cron@^1.8.2` to install this bot's dependencies.

3. Open [config.json](./src-discord-cron-bot/config.json) to configure your own settings:

   ```json
   {
     "timezone": "America/Los_Angeles",
     "rules": [
       {
         "cronExpression": "39 39 * * * *",
         "channelPolicy": "single",
         "messagePolicy": "single",
         "reactionPolicy": "single",
         "channelIds": ["747319121582096434"],
         "messages": [
           {
             "content": "<@&785794153089990688>, hourly reminder to hydrate!"
           }
         ],
         "reactions": ["🥤"]
       }
     ]
   }
   ```

   Add as many rules as you want to configure for other servers.

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
   - `messages` is a list of [WebhookMessageOptions](https://discord.js.org/#/docs/main/master/typedef/WebhookMessageOptions).
   - `reactions` is a list of emojis. An emoji can be:

     - A unicode emoji. https://emojipedia.org is a good reference to copy and paste from.

       ```
       "😳", "🥺", // etc
       ```

     - An emoji ID for custom emojis. You can get a custom emoji's ID by sending `\:YourCustomEmoji:` in chat (prefix a backslash `\` character in front of your desired emoji).

       ```
       "716344914706694165", "622635442013208589", // etc
       ```

   Some useful resources:

   - [Moment Timezone](https://momentjs.com/timezone): find your `timezone` string.
   - [crontab guru](https://crontab.guru): build your `cronExpression`. Note that the tool does not support seconds but this bot configuration does.
   - [Embed Visualizer](https://leovoel.github.io/embed-visualizer): visualize your message content and embeds. Switch to `webhook` mode first.

4. `npm start` to run the bot.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discord.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
