# 🛡️ D-Blockerz

D-Blockerz is a privacy-focused browser extension that blocks ads and trackers while you browse the web.

I'm building it as a **Manifest V3 Chrome extension** using React, TypeScript, Vite, and Tailwind CSS. The project is being developed step by step, with a focus on keeping the codebase simple, modular, and easy to maintain.

---

## 🚧 Project Status

**Current Status: Sprint 4 — User Controls ✅**

The project is being developed in multiple sprints:

* [x] Sprint 1 — Foundation
* [x] Sprint 2 — Chrome Extension Foundation
* [x] Sprint 3 — Blocking Engine
* [ ] Sprint 4 — User Controls
* [ ] Sprint 5 — Statistics
* [ ] Sprint 6 — Filter Lists
* [ ] Sprint 7 — Automated Testing
* [ ] Sprint 8 — Performance & Security
* [ ] Sprint 9 — UI/UX Polish
* [ ] Sprint 10 — Release

---

## 🎯 What I'm Building

The main idea behind D-Blockerz is to build a browser extension that gives users more control over what happens while they browse.

Some of the planned features include:

* Block unwanted advertisements
* Block common tracking requests
* See which requests have been blocked
* Whitelist trusted websites
* Control blocking for individual websites
* View basic blocking statistics
* Add and manage custom blocking rules
* Provide a simple and easy-to-use interface

The first version is mainly focused on getting the extension architecture and core functionality working properly before adding more advanced features.

---

## 🧰 Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Vite

### Chrome Extension

* Chrome Extension Manifest V3
* `declarativeNetRequest`
* Chrome Extension APIs
* Chrome Storage API

### Testing & Development

* Playwright
* ESLint
* Git
* GitHub
* VS Code

---

## 🏗️ Planned Architecture

The extension will be split into a few main parts. The React UI will handle the user-facing controls, while the background service worker will communicate with Chrome's extension APIs and manage the blocking logic.

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
```

---

## 🚀 Development

D-Blockerz is currently under active development. The initial work is focused on setting up the project structure, development environment, and extension foundation.

More features will be added as each sprint is completed.

---

## 📌 Project Goals

The long-term goal is to turn D-Blockerz into a practical browser extension that combines **ad blocking, tracker protection, user controls, and useful browsing statistics** in one lightweight tool.

This is also a learning project where I'm experimenting with **Chrome Extension APIs, React, TypeScript, browser networking, testing, and privacy-focused development**.
