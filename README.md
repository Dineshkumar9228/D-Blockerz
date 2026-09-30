# 🛡️ D-Blockerz

A privacy-focused browser extension for blocking ads and trackers.

D-Blockerz is a Manifest V3 browser extension built with React, TypeScript, Vite, and Tailwind CSS.

The project is being developed incrementally using a modular architecture, automated testing, and AI-assisted development.

---

## 🚧 Project Status

**Current Status:** Sprint 1 — Foundation ✅

### Sprint Progress

- [x] Sprint 1 — Foundation
- [ ] Sprint 2 — Chrome Extension Foundation
- [ ] Sprint 3 — Blocking Engine
- [ ] Sprint 4 — User Controls
- [ ] Sprint 5 — Statistics
- [ ] Sprint 6 — Filter Lists
- [ ] Sprint 7 — Automated Testing
- [ ] Sprint 8 — Performance & Security
- [ ] Sprint 9 — UI/UX Polish
- [ ] Sprint 10 — Release

---

# 🎯 Project Goal

D-Blockerz aims to provide a browser-based privacy and content-blocking solution capable of:

- Blocking advertisements
- Blocking trackers
- Managing blocked requests
- Allowing users to whitelist websites
- Providing blocking statistics
- Providing per-site controls
- Supporting customizable blocking rules
- Providing a clean and simple user interface

The first version focuses on building a reliable browser extension with a modular architecture.

---

# 🧰 Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

## Browser Extension

- Chrome Extension Manifest V3
- `declarativeNetRequest`
- Chrome Extension APIs
- Chrome Storage API

## Testing

- Playwright

## Development

- ESLint
- Git
- GitHub
- VS Code

---

# 🏗️ Planned Architecture

```text
                    D-Blockerz
                        │
                        ▼
              React + TypeScript UI
                        │
                        ▼
                  Manifest V3
                        │
              ┌─────────┴─────────┐
              │                   │
              ▼                   ▼
            Popup          Background Worker
              │                   │
              │                   ▼
              │          Chrome Extension APIs
              │                   │
              └─────────┬─────────┘
                        ▼
              Blocking Engine
                        │
                        ▼
           declarativeNetRequest
                        │
                 ┌──────┴──────┐
                 │             │
                 ▼             ▼
               BLOCK         ALLOW
                 │
                 ▼
              Statistics
                 │
                 ▼
          Chrome Storage
