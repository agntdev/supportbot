import { Composer } from "grammy";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";

// SCAFFOLD — generated from the bot blueprint BEFORE the agent runs.
// Keep a LIVE registration (.command / .callbackQuery / …) so this feature is
// never an empty stub. Replace the reply body with real logic + copy; if you
// change the user-facing text, update tests/specs to match EXACTLY.
// Do NOT rewrite src/bot.ts — buildBot() already auto-loads this module.
// Menu: wire this into /start via registerMainMenuItem({ label: "Связать с человеком", data: "ticket:create" }) if the toolkit exposes it.

const composer = new Composer();

composer.callbackQuery("ticket:create", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Create a new support ticket:", {
    reply_markup: inlineKeyboard([
      [inlineButton("💻 Technical issue", "ticket:new:tech")],
      [inlineButton("💰 Billing question", "ticket:new:billing")],
      [inlineButton("📋 General inquiry", "ticket:new:general")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

export default composer;
