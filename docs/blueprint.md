# SupportBot — Bot specification

**Archetype:** support

**Voice:** helpful and friendly — write every user-facing message, button label, error, and empty state in this voice.

Telegram-бот первой линии поддержки, который приветствует пользователей, предоставляет интерактивный FAQ, автоматически создает тикеты при невозможности помочь, связывает переписку с тикетами и предоставляет владельцам аналитику по запросам и статусам обращений. Работает в режиме 'режим вне рабочего времени' с конфигурируемыми уведомлениями.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- product end users seeking support
- support admins/owners managing tickets and FAQ

## Success criteria

- 70% of user queries resolved via FAQ without ticket creation
- All unresolved queries automatically converted to tickets with 5s response time for admin notification
- Ticket status updates visible to users within 2s of admin action

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Open main greeting menu with FAQ buttons
  - inputs: none
  - outputs: greeting message, FAQ buttons
- **Связать с человеком** (button, actor: user, callback: ticket:create) — Initiate ticket creation flow
  - inputs: user message context
  - outputs: ticket confirmation, admin notification
- **/tickets** (command, actor: owner, command: /tickets) — List open tickets with filters
  - inputs: status filter, search term
  - outputs: ticket list, summary metrics
- **/faq** (command, actor: owner, command: /faq) — Manage FAQ entries (add/edit/delete)
  - inputs: question text, answer text, tags
  - outputs: FAQ management interface

## Flows

### Initial greeting
_Trigger:_ /start

1. Send greeting message
2. Display 3-8 most common FAQ buttons

_Data touched:_ User

### FAQ resolution
_Trigger:_ FAQ button click or question match

1. Match query to FAQ entry
2. Send answer with 'Was this helpful?' buttons
3. Handle follow-up clarification if needed

_Data touched:_ FAQ entry, Ticket

### Ticket creation
_Trigger:_ Unmatched query or 'Need human' request

1. Collect minimal ticket details
2. Generate sequential ticket ID
3. Notify admin
4. Link all subsequent messages to ticket

_Data touched:_ Ticket, User

### Offline handling
_Trigger:_ Message outside business hours

1. Show offline message
2. Create ticket with 'outside hours' flag
3. Notify admin with expected reply time

_Data touched:_ Ticket, User

### Ticket resolution
_Trigger:_ Admin marks ticket resolved

1. Notify user of resolution
2. Archive ticket with history
3. Update metrics

_Data touched:_ Ticket, Interaction logs

### Owner metrics
_Trigger:_ /tickets or daily digest

1. Show ticket volume by time
2. Display top N FAQ items
3. Show most frequent unmatched queries

_Data touched:_ Interaction logs, Ticket

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **User** _(retention: persistent)_ — Telegram user with support interaction history
  - fields: id, display name, last seen, active ticket id
- **FAQ entry** _(retention: persistent)_ — Support question and answer pair with metadata
  - fields: id, question label, answer text, tags, last updated, visibility
- **Ticket** _(retention: persistent)_ — Support request with full message history
  - fields: ticket id, user id, subject, message history, attachments, status, created_at, updated_at, assigned_to
- **Interaction logs** _(retention: persistent)_ — Conversation analytics data
  - fields: timestamp, query text, matched FAQ id, ticket created flag

## Integrations

- **Telegram** (required) — Bot API messaging
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- /tickets [status] - View tickets by status
- /faq add - Create new FAQ entry
- /faq edit [id] - Modify existing FAQ
- /set_hours - Configure support hours
- /set_offline_message - Set custom offline message

## Notifications

- Admin ticket alerts with T-XXXX reference
- Daily digest at 09:00 owner timezone
- User ticket resolution notifications

## Permissions & privacy

- Admins only can manage tickets/FAQ
- User PII limited to name and Telegram ID in notifications
- Message history retained for audit purposes

## Edge cases

- User provides insufficient ticket details
- FAQ entry updates during active conversation
- Multiple admins receiving notifications

## Required tests

- Greeting menu appears after /start
- FAQ button click shows correct answer
- Unresolved query converts to ticket with ID
- Admin receives ticket notification
- Daily digest shows top queries
- Offline message shown outside hours with ticket creation

## Assumptions

- Telegram user IDs provided for admin notifications
- FAQ management via bot commands keeps scope minimal
- Sequential numeric ticket IDs meet human-readable requirement
