# FieldDesk

Mobile helpdesk companion for **IT field technicians** - browse tickets, filter by priority and status, and open ticket details with site context. Built as a portfolio React Native (Expo) app with local mock data (no backend required).

## Features

- **Home / stats** - quick counts of open, in-progress, pending, and resolved tickets
- **Ticket queue** - filterable list by priority and status
- **Ticket detail** - description, field notes, assignee, requester, location, timestamps
- **Mock data** - 12 realistic IT support tickets (VPN, BitLocker, printers, Wi-Fi, backup, etc.)
- **Professional UI** - dark slate / teal field-ops aesthetic

## Screenshots

_Add screenshots here after running on a device or emulator:_

- Home dashboard
- Ticket list with filters
- Ticket detail

## Tech stack

| Layer | Choice |
| --- | --- |
| Runtime | Expo (managed), React Native |
| Language | JavaScript |
| Navigation | React Navigation (native stack) |
| Data | Local mock tickets (`data/tickets.js`) |
| Tests | Node.js built-in test runner (`node --test`) |

## How to run

Prerequisites: **Node.js LTS** and npm.

```bash
cd fielddesk-mobile
npm install
npx expo start
```

Then:

- Scan the QR code with **Expo Go** (iOS/Android), or
- Press `a` for Android emulator / `w` for web

## Tests

Pure helper functions for filter/sort/count live in `lib/ticketUtils.js`:

```bash
npm test
```

## Project structure

```
App.js                 # Navigation entry
screens/               # Home, TicketList, TicketDetail
components/            # TicketCard, PriorityBadge, StatusChip
data/tickets.js        # Mock tickets
lib/ticketUtils.js     # Filter / sort / stats helpers
constants/theme.js     # Color tokens
```

## License

MIT © 2026 cxolkaa
