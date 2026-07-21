import { Composer } from "grammy";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";

// SCAFFOLD — generated from the bot blueprint BEFORE the agent runs.
// Keep a LIVE registration (.command / .callbackQuery / …) so this feature is
// never an empty stub. Replace the reply body with real logic + copy; if you
// change the user-facing text, update tests/specs to match EXACTLY.
// Do NOT rewrite src/bot.ts — buildBot() already auto-loads this module.

const composer = new Composer();

composer.command("faq", async (ctx) => {
  await ctx.reply("FAQ management:", {
    reply_markup: inlineKeyboard([
      [inlineButton("Add FAQ", "faq:add")],
      [inlineButton("Edit FAQ", "faq:edit")],
      [inlineButton("Delete FAQ", "faq:delete")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

export default composer;
