import { CronJob } from "cron";
import {
  Client,
  EmojiResolvable,
  Message,
  Snowflake,
  TextChannel,
  Webhook,
  WebhookMessageOptions,
} from "discord.js";
import { Config, CronRuleItem, Policy, Rule } from "../types";
import config from "../config.json";

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

class CronBot {
  client: Client;
  rule: Rule;

  constructor(client: Client, rule: Rule) {
    this.client = client;
    this.rule = rule;
  }

  sendMessages(): void {
    const channelIds = this._applyPolicyToList(
      this.rule.channelPolicy,
      this.rule.channelIds
    ) as Snowflake[];
    const messages = this._applyPolicyToList(
      this.rule.messagePolicy,
      this.rule.messages
    ) as WebhookMessageOptions[];
    const reactions = this._applyPolicyToList(
      this.rule.reactionPolicy,
      this.rule.reactions
    ) as EmojiResolvable[];

    channelIds.forEach(async (channelId) => {
      const webhook = await this._getWebhook(channelId);

      messages.forEach(async (message) => {
        const newMessage = (await webhook.send(message)) as Message;

        reactions.forEach(async (reaction) => await newMessage.react(reaction));
      });
    });
  }

  private _applyPolicyToList(
    policy?: Policy,
    list?: CronRuleItem[]
  ): CronRuleItem[] {
    if (!policy || !list || list.length === 0) {
      return [];
    }

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

  private async _getWebhook(channelId: Snowflake): Promise<Webhook> {
    const channel = (await this.client.channels.fetch(
      channelId
    )) as TextChannel;
    const webhooks = await channel.fetchWebhooks();

    return !webhooks.size
      ? channel.createWebhook(this.client.user?.username || "📢")
      : (webhooks.first() as Webhook);
  }
}

module.exports = async (client: Client): Promise<void> => {
  console.log(__dirname.split("\\").slice(-2)[0]);

  (config as Config).rules.forEach((rule) => {
    const bot = new CronBot(client, rule);
    new CronJob(
      rule.cronExpression,
      () => bot.sendMessages(),
      null,
      true,
      config.timezone
    );
  });
};
