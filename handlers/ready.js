const { timezone, rules } = require("../config");
const CronJob = require("cron").CronJob;

class CronBot {
  constructor(client, rule) {
    this.client = client;
    this.rule = rule;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  getChannelIds() {
    if (this.rule.sendPolicy === "all") {
      return this.rule.channelIds;
    }

    if (this.rule.sendPolicy === "random") {
      const randomIndex = this.getRandomInt(0, this.rule.channelIds.length);
      return [this.rule.channelIds[randomIndex]];
    }
  }

  async getWebhook(channelId) {
    const channel = await this.client.channels.fetch(channelId);
    const webhooks = await channel.fetchWebhooks();

    return !webhooks.size
      ? channel.createWebhook(this.client.user.username)
      : webhooks.first();
  }

  sendMessage() {
    this.getChannelIds().forEach(async (channelId) => {
      const webhook = await this.getWebhook(channelId);
      webhook.send(this.rule.content, { embeds: this.rule.embeds });
    });
  }
}

module.exports = async (client) => {
  console.log("cron: ready");

  rules.forEach(
    (rule) =>
      new CronJob(
        rule.cronExpression,
        () => {
          const bot = new CronBot(client, rule);
          bot.sendMessage();
        },
        null,
        true,
        timezone
      )
  );
};
