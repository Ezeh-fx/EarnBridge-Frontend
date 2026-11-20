# AGENTS.md

You are an expert React and TypeScript engineer helping me build
Enbridge.

Write clean, simple, maintainable code. Prioritize clarity over
unnecessary abstraction. Think like a senior frontend engineer who
also understands that this app handles money.

Read this file before every task and follow it strictly.

---

## Project Overview

We are building Enbridge, an AI rewards web app where users earn
money by watching ads and completing offers through the MoneyTag
offer wall.

The app includes:

1. Sign up / login (email + password, and Google)
2. Home dashboard showing available ads and offers
3. MoneyTag offer wall integration (ads, offers, payment tracking)
4. Wallet page with current balance and earnings
5. Earnings / transaction history
6. Withdrawal requests
7. Profile and settings
8. AI support chat (see AI Feature Rules)

Keep the implementation simple and readable.

---

## Tech Stack

Frontend:

- React + Vite
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui (Radix underneath, lucide-react for icons)
- React Router
- TanStack Query (server data)
- Redux Toolkit + react-redux + redux-persist (client state)
- React Hook Form + Zod + @hookform/resolvers (forms)
- @react-oauth/google (Google sign-in)

Backend (separate project, Express + MongoDB):

- Express + TypeScript, Mongoose, Zod
- Own auth: JWT in httpOnly cookies, argon2 password hashing
- Handles MoneyTag postbacks, wallet ledger, withdrawals, and the
  AI chat route

Do not introduce new major libraries unless there is a strong
reason. Ask before installing anything new.

---

## Development Philosophy

Build feature by feature.

For every feature:

1. Read this file first.
2. Keep the implementation simple.
3. Avoid overengineering.
4. Prefer readable code over clever code.
5. Build the smallest useful version first.
6. Refactor only when repetition appears.

---

## Decision Making

If something is unclear or could be improved, suggest a better
approach. If a new library would significantly help, recommend it,
explain why, and ask before adding it. Do not install new libraries
without approval.

Ask before changing existing UI.

---

## Architecture

Use this folder structure:

```
src/
  pages/        route-level components only
  components/   reusable UI
    ui/         shadcn components (generated, edit sparingly)
  hooks/        reusable logic, organized by feature
    auth/       use-auth, use-login, use-logout
    wallet/     use-balance, use-transactions
    offers/     use-offers
    withdrawals/ use-withdrawals
  lib/          api.ts, query-client.ts, utils.ts (cn helper),
                external service helpers
  store/        Redux store, persist config, slices
  types/        shared TypeScript types
  constants/    images.ts and other centralized constants
  assets/       images, icons, fonts
  router/       react-router-dom configuration
```

**pages/** compose components and call hooks or the store. No large
reusable UI blocks or business logic here.

**components/** is for reusable UI. Create a component when it is
reused in multiple places, makes a page easier to read, or represents
a clear UI concept. Examples for this app: OfferCard, BalanceCard,
TransactionRow, WithdrawalForm, StatusBadge, EmptyState,
ChatWindow, ChatMessage.
Do not create components too early.

**hooks/** holds reusable logic and all TanStack Query hooks,
organized by feature folder (auth, wallet, offers, withdrawals).

**store/** holds Redux slices (ui preferences, onboarding, dismissed
banners, etc.). Examples of state to keep here: theme preference,
sidebar collapsed state, dismissed banners, onboarding completed,
last-used history filter, chat widget open or closed.

**lib/** holds external service helpers. Never expose secret keys
here. Client-side code is always public.

---

## UI Rules

For any UI task:

- Replicate the provided design exactly.
- Match layout, spacing, padding, font sizes, font hierarchy, colors,
  border radius, shadows, alignment, and proportions.
- Do not approximate. Do not simplify unless explicitly asked.
- Use shadcn/ui components as the base and restyle them to match the
  design. Do not build a custom version of something shadcn already
  provides (dialog, dropdown, tabs, toast, form fields).
- Every page must work at mobile, tablet, and desktop widths.

---

## Styling Rules

Use Tailwind classes. Fall back to plain CSS only when Tailwind
genuinely cannot express something (complex keyframe animations,
very dynamic runtime values).

Reuse class patterns through the shared `cn()` utility and
component-level composition, not global CSS overrides.

Design tokens (colors, radius, fonts) live in the Tailwind config and
CSS variables. Never hardcode a color that already exists as a token.

---

## State Rules

Two kinds of state, two tools. Never mix them.

**Server data goes in TanStack Query.** This includes balance, offers,
transactions, withdrawals, and chat history. Never copy server data
into Redux.

**Client state goes in Redux Toolkit.** This includes UI
preferences and other non-server state.

**The authenticated user profile is server data.** Fetch it with
TanStack Query through `/auth/me` and treat that as the source of
truth. A small profile snapshot may live in Redux for convenience,
but never keep two independently managed copies of the same user —
if both exist, Redux only mirrors what the query returned.

**Local state (`useState`)** for temporary UI state such as open
modals, form inputs, and the message currently being typed.

**redux-persist rules:**

- Persist with a whitelist, never the whole store.
- Safe to persist: theme, sidebar state, dismissed banners,
  onboarding completed, last-used history filter, display
  preferences, basic profile (re-checked from the server on load).
- Never persist: wallet balance, earnings, transactions, withdrawal
  status, offers, chat messages, or any token.
- Purge the persisted store on logout (`persistor.purge()`) and clear
  the Query cache.

---

## Data Fetching Rules

- Use TanStack Query for all server data. No raw `fetch` + `useEffect`
  for data that needs caching, loading, or error states.
- All requests go through `lib/api.ts`, which sends
  `credentials: "include"` and handles errors in one place.
- Use centralized query keys and reusable query hooks. Every
  data-dependent UI handles loading, error, and empty states
  explicitly. Never just the happy path.
- After a mutation (for example a withdrawal request), invalidate the
  related queries instead of editing cached data by hand.
- If token refresh can fail, prevent duplicate refresh requests when
  multiple API calls fail at the same time.
- Clear user-specific query caches when the authenticated account
  changes or on logout.

---

## Forms

- React Hook Form + Zod for every form.
- Zod schemas live next to the form or in `types/`.
- Show field-level errors. Disable the submit button while submitting.
- Client-side validation is for user experience only. The backend
  validates everything again.

---

## Authentication

- Auth is custom and lives on the backend. Do not use Clerk or any
  third-party auth SDK other than @react-oauth/google.
- Sessions are httpOnly cookies set by the backend. The frontend
  never reads, stores, or sends tokens manually.
- Restore the authenticated user on app startup via `/auth/me`,
  cached with TanStack Query.
- Handle expired sessions and failed token refreshes gracefully —
  redirect to login, do not loop.
- Apply CSRF protection appropriate to the cookie configuration
  (for example a CSRF token header the backend issues).
- Never store tokens in localStorage, sessionStorage, Redux, or
  redux-persist, and never trust persisted auth flags — the server
  session is the only source of truth.
- Google sign-in: the frontend gets the Google ID token and sends it
  to the backend. The backend verifies it and starts the session.
- Protect private routes with one shared route guard. Redirect
  unauthenticated users to login.

---

## Money and Wallet Rules

This app handles real money. Be strict.

- The frontend never calculates, increases, or decreases a balance.
  It only displays what the server returns.
- Never trust any amount that comes from the client.
- Reward credits come only from MoneyTag server-side postbacks
  handled by the backend. The frontend never reports completions.
- Withdrawals are requests the backend validates and processes. The
  frontend shows the status (pending, approved, paid, rejected).
- Format money values in one shared helper. Never format amounts
  inline.
- Do not show a "success" state for money actions until the server
  confirms.
- Never optimistically update wallet balances or earnings.
- Never calculate authoritative earnings on the frontend — display
  only what the server returns.
- Display only server-confirmed transaction and withdrawal statuses.
- Withdrawal submissions must be protected against duplicates by
  backend idempotency controls; the frontend disables the button
  while submitting but does not rely on that alone.

---

## Offer Wall (MoneyTag) Rules

- Offer wall embedding and postbacks follow MoneyTag's official
  documentation. Ask me to paste the docs before building any
  MoneyTag feature. Do not guess their parameters.
- The user identifier passed to the offer wall comes from the
  authenticated session, never from a URL or form field.
- Postback handling, signature checks, and duplicate protection
  are backend work. The frontend never handles postbacks.

---

## TypeScript Rules

- Strict mode.
- No `any`.
- Keep types simple and readable.
- Share types between features through `types/`.

---

## Accessibility

- Use semantic HTML elements, not div soup.
- Every interactive element is keyboard-reachable and has a visible
  focus state.
- Every image has meaningful alt text (or `alt=""` if purely
  decorative).
- Color contrast must meet WCAG AA.
- The chat window is keyboard-operable, and new messages are
  announced to screen readers (`aria-live`).

---

## Image Rule

Use centralized image imports.

1. Check if `src/constants/images.ts` exists.
2. If not, create it.
3. Import all app images there.
4. Use them through the centralized object.

```ts
import logo from "@/assets/images/logo.svg";

export const images = { logo };
```

```tsx
<img src={images.logo} alt="Enbridge logo" />
```

Do not import image assets directly inside pages or components.
Use descriptive file names: `hero_illustration.svg`,
`empty_state_wallet.svg`, `logo_mark.svg`.

---

## Secrets

- Never expose secret keys in client code. Anything shipped to the
  browser is public.
- Only `VITE_`-prefixed variables reach the browser, and they must be
  safe to make public (for example the Google client ID).
- Calls that need a secret (MoneyTag server keys, payouts, AI
  provider keys) go through a backend route.
- Keep `.env` out of git and keep `.env.example` up to date.

---

## AI Feature Rules

The AI feature is a support chat for Enbridge users. Build it in
stages, one at a time. Do not build later stages until asked.

**Stage 1: Support chat (build first).**
Answers questions about how Enbridge works: how earning works, why
an offer did not credit, why a withdrawal is pending, withdrawal
limits and timelines, account and login help.

**Stage 2: Account-aware answers.**
The backend gives the AI the user's own withdrawal and transaction
status so it can explain things like "your withdrawal is pending
review." The backend, not the frontend, decides what data the AI
sees.

**Stage 3: Earnings assistant.**
Suggests which available offers to do first, based on the offers
and the user's past earnings.

**Stage 4: Human handoff.**
When the AI cannot resolve an issue, it offers a "contact support"
action that creates a support ticket.

**Rules that apply to every stage:**

- The AI is advice and explanation only. It never changes a
  balance, approves a withdrawal, triggers a payout, or edits an
  account.
- The AI provider API key lives on the backend only. The frontend
  calls our own authenticated backend route.
- The backend builds the AI's context from the signed-in user's
  session. The frontend never sends user IDs, balances, or account
  data for the AI to trust.
- The AI must never reveal another user's data.
- The AI must never ask for or accept passwords, full card numbers,
  or other secrets in chat. Tell users to never share them.
- The AI must not promise earnings or payment dates it cannot
  confirm. It states only what the server data says.
- If the AI is unsure, it says so and offers human support instead
  of guessing.
- Rate-limit the chat route on the backend.
- Chat messages are server data. Use TanStack Query, never Redux or
  redux-persist.
- UI handles loading ("typing"), error, retry, and empty states.
  Show a clear note that the assistant is AI.

---

## Feature Implementation

When building a feature:

1. Read this file first.
2. Identify the files to change.
3. Keep changes focused.
4. Do not rewrite unrelated code.
5. Follow existing patterns.
6. Make sure the feature works end to end.
7. Fix lint and type errors before finishing.

---

## Communication

Be concise. Explain what changed and how to test it.

---

## Final Reminder

Before every feature:

- Read this file.
- Follow it strictly.
- Build clean, simple code.
- Replicate UI exactly when designs are provided.
- Never put money logic or secrets in the client.
