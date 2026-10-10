# D-Blockerz

**A privacy-focused browser extension for blocking ads and trackers.**

D-Blockerz is a Manifest V3 browser extension built with React and TypeScript. It uses the browser's `declarativeNetRequest` API to block network requests that match enabled rules, with controls for protection, site exceptions, and filter lists.

<p align="center">
  <a href="https://microsoftedge.microsoft.com/addons/detail/dblockerz/epkagdkhfmodpgoaahfbfnengijnjinc">
    <img src="https://img.shields.io/badge/Microsoft%20Edge-Install%20D--Blockerz-0078D7?logo=microsoftedge&logoColor=white" alt="Install D-Blockerz from Microsoft Edge Add-ons">
  </a>
  <a href="https://github.com/Dineshkumar9228/D-Blockerz/releases/tag/v0.1.0">
    <img src="https://img.shields.io/badge/Release-v0.1.0-blue" alt="D-Blockerz version 0.1.0">
  </a>
</p>

## Project Links

- **Install on Microsoft Edge:** [D-Blockerz — Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/dblockerz/epkagdkhfmodpgoaahfbfnengijnjinc)
- **Source code:** [GitHub Repository](https://github.com/Dineshkumar9228/D-Blockerz)
- **Latest release:** [D-Blockerz v0.1.0](https://github.com/Dineshkumar9228/D-Blockerz/releases/tag/v0.1.0)
- **Privacy policy:** [Read the Privacy Policy](https://dineshkumar9228.github.io/D-Blockerz/privacy-policy.html)

## Features

- **Ad and tracker blocking** using the browser's Manifest V3 `declarativeNetRequest` API.
- **Protection toggle** to enable or disable network blocking.
- **Per-site whitelist** to allow requests for selected domains.
- **Built-in filter lists** for advertising, tracking, and analytics domains.
- **Persistent settings** stored locally using browser extension storage.
- **Current website detection** to display the active website in the popup.
- **Local statistics interface** for stored blocking counters.
- **Modern popup UI** built with React, TypeScript, and Tailwind CSS.
- **Automated tests** using Playwright.

## Installation

### Microsoft Edge

**[Install D-Blockerz from Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/dblockerz/epkagdkhfmodpgoaahfbfnengijnjinc)**

1. Open the official listing above.
2. Click **Get**.
3. Confirm the installation when prompted.
4. Open the D-Blockerz icon in the browser toolbar.
5. Configure protection, whitelist settings, and filter lists.

### Install locally in Chrome or Edge

To test the development build:

1. Clone the repository and install its dependencies.
2. Build the extension.
3. Open `chrome://extensions` in Chrome or `edge://extensions` in Edge.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the project's generated `dist` directory.

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Chrome and Microsoft Edge Manifest V3
- `declarativeNetRequest`
- Chrome Storage API
- Playwright
- ESLint
- Git and GitHub

## How It Works

D-Blockerz uses the browser's native network request filtering API to enforce its configured rules.

```text
Website network request
          |
          v
Browser declarativeNetRequest engine
          |
          v
D-Blockerz blocking rules
          |
          +---- Rule matches ----> Block request
          |
          +---- Allow rule ------> Allow request
          |
          +---- No match --------> Request continues
```

Protection settings, whitelist entries, filter-list settings, and locally stored statistics use the browser's extension storage API.

The core blocking engine does not require a separate D-Blockerz backend server.

## Project Structure

```text
D-Blockerz/
├── public/
│   ├── icons/
│   └── manifest.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── rules/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   └── background.ts
├── tests/
├── docs/
│   └── privacy-policy.html
├── index.html
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Development Setup

### Requirements

- [Node.js](https://nodejs.org/)
- npm
- Git
- Chrome or Microsoft Edge

### Clone the repository

```bash
git clone https://github.com/Dineshkumar9228/D-Blockerz.git
cd D-Blockerz
```

### Install dependencies

```bash
npm install
```

### Build the extension

```bash
npm run build
```

The production build is generated in the `dist/` directory.

Load `dist/` as an unpacked extension to test the build locally.

### Run lint

```bash
npm run lint
```

### Run automated tests

```bash
npx playwright test
```

The Playwright suite covers extension loading, smoke checks, protection controls, whitelist behavior, filter lists, and statistics UI. Some extension-specific tests may require a headed Chromium environment, depending on the test configuration.

## Browser Permissions

D-Blockerz requests the following permissions:

| Permission | Purpose |
|---|---|
| `storage` | Save protection state, whitelist entries, filter-list settings, and locally stored statistics. |
| `declarativeNetRequest` | Apply network blocking and allow rules. |
| `tabs` | Read the active tab URL so the popup can display the current website and provide site-specific controls. |

For details about data handling, see the [Privacy Policy](https://dineshkumar9228.github.io/D-Blockerz/privacy-policy.html).

## Testing the Blocking Engine

The blocking engine has been tested locally in Chrome. A request to:

`https://www.google-analytics.com/analytics.js`

returned `net::ERR_BLOCKED_BY_CLIENT` while the corresponding D-Blockerz filter rule was enabled.

This confirms that a matching rule can block a real network request in the tested environment. It does not mean that every advertising or analytics endpoint will be blocked.

## Current Limitations

Version 0.1.0 is an initial release, and development is ongoing.

- **Filter coverage:** The built-in filter lists cover a limited set of domains and do not block every advertisement or tracker.
- **YouTube ads:** Some or all YouTube ads may still appear because the current rules do not cover every advertising mechanism.
- **Cosmetic filtering:** Removing ad elements from a webpage is not currently implemented.
- **Live statistics:** Production-safe counting of every blocked request is not implemented. The displayed statistics may not reflect actual blocking activity.

These limitations will guide future improvements to filter coverage, statistics, and protection capabilities.

## Release History

### v0.1.0

Initial public release.

- Network blocking engine using Manifest V3.
- Protection ON/OFF toggle.
- Per-site whitelist.
- Built-in filter lists.
- Popup UI and locally stored settings.
- Initial statistics interface.
- Published on Microsoft Edge Add-ons.

**Download:** [D-Blockerz v0.1.0 on GitHub](https://github.com/Dineshkumar9228/D-Blockerz/releases/tag/v0.1.0)

## Contributing

Bug reports, suggestions, and contributions are welcome.

When reporting an issue, include:

- Browser and browser version.
- D-Blockerz version.
- Steps to reproduce the problem.
- Expected and actual behavior.
- Relevant console errors or screenshots, with personal information removed.

Report issues through [GitHub Issues](https://github.com/Dineshkumar9228/D-Blockerz/issues).

## License

No license has been specified yet. Unless a license is added to this repository, the source code is not automatically granted an open-source license.
