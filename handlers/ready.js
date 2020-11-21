const { timezone, rules } = require("../config");
const { CronJob } = require("cron");

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

class CronBot {
  constructor(client, rule) {
    this.client = client;
    this.rule = rule;
  }

  applyPolicyToList(policy, list) {
    switch (policy) {
      case "all":
        return list;
      case "random":
        return [list[getRandomInt(0, list.length)]];
      case "single":
      default:
        return [list[0]];
    }
  }

  async getWebhook(channelId) {
    const channel = await this.client.channels.fetch(channelId);
    const webhooks = await channel.fetchWebhooks();

    return !webhooks.size
      ? channel.createWebhook(this.client.user.username)
      : webhooks.first();
  }

  sendMessages() {
    const channelIds = this.applyPolicyToList(
      this.rule.channelPolicy,
      this.rule.channelIds
    );
    const messages = this.applyPolicyToList(
      this.rule.messagePolicy,
      this.rule.messages
    );

    channelIds.forEach(async (channelId) => {
      const webhook = await this.getWebhook(channelId);
      messages.forEach(async (message) => await webhook.send(message));
    });
  }
}

module.exports = async (client) => {
  console.log("cron: ready");

  rules.forEach((rule) => {
    const bot = new CronBot(client, rule);
    new CronJob(
      rule.cronExpression,
      () => bot.sendMessages(),
      null,
      true,
      timezone
    );
  });
};
