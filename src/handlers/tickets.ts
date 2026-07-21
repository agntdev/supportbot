import { Composer } from "grammy";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";

// SCAFFOLD — generated from the bot blueprint BEFORE the agent runs.
// Keep a LIVE registration (.command / .callbackQuery / …) so this feature is
// never an empty stub. Replace the reply body with real logic + copy; if you
// change the user-facing text, update tests/specs to match EXACTLY.
// Do NOT rewrite src/bot.ts — buildBot() already auto-loads this module.

const composer = new Composer();

composer.command("tickets", async (ctx) => {
  await ctx.reply("Support tickets:", {
    reply_markup: inlineKeyboard([
      [inlineButton("Open tickets", "tickets:open")],
      [inlineButton("Closed tickets", "tickets:closed")],
      [inlineButton("My tickets", "tickets:mine")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

export default composer;
