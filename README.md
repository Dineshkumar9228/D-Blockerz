# D-Blockerz

**A privacy-focused browser extension for blocking ads and trackers.**

D-Blockerz is a Manifest V3 browser extension built with React and TypeScript. It uses the browser's `declarativeNetRequest` API to block network requests that match enabled rules, with controls for protection, site exceptions, and filter lists.

- **Version:** 0.1.0
- **Browser availability:** Microsoft Edge Add-ons
- **Repository:** https://github.com/Dineshkumar9228/D-Blockerz
- **Privacy policy:** https://dineshkumar9228.github.io/D-Blockerz/privacy-policy.html
- **Release:** https://github.com/Dineshkumar9228/D-Blockerz/releases/tag/v0.1.0

## Features

- Network request blocking using Manifest V3 `declarativeNetRequest`.
- Protection toggle to enable or disable blocking.
- Per-site whitelist to allow requests for selected domains.
- Built-in filter lists for advertising, tracking, and analytics domains.
- Persistent settings stored locally in browser extension storage.
- Popup interface showing the current website and protection state.
- Local statistics interface for stored blocking counters.
- Automated tests using Playwright.

> **Current limitations:** Filter coverage is limited in version 0.1.0. D-Blockerz does not guarantee that every ad or tracker will be blocked, and YouTube ads may still appear. Production-safe live counting of every blocked request is not implemented yet, so statistics may not reflect actual blocking activity. Cosmetic filtering (removing ad elements from web pages) is also not currently implemented.

## Installation

### Microsoft Edge

1. Open Microsoft Edge.
2. Open **Extensions** and choose **Get extensions from Microsoft Edge Add-ons**, or search the Edge Add-ons store for **D-Blockerz**.
3. Select D-Blockerz and click **Get**.
4. Confirm the installation when prompted.
5. Open the extension popup to configure protection, the whitelist, and filter lists.

### Local development build

1. Clone the repository and install dependencies.
2. Build the extension.
3. Open `chrome://extensions` in Chrome or `edge://extensions` in Edge.
4. Enable **Developer mode**.
5. Click **Load unpacked** and select the generated `dist` directory.

## Development

### Requirements

- Node.js and npm
- Git
- Chrome or Microsoft Edge for manual extension testing

### Setup

```bash
git clone https://github.com/Dineshkumar9228/D-Blockerz.git
cd D-Blockerz
npm install
```

### Build

```bash
npm run build
```

The built extension is written to `dist/`. Load this folder as an unpacked extension for local testing.

### Lint

```bash
npm run lint
```

### Automated tests

```bash
npx playwright test
```

The Playwright suite covers extension loading, smoke checks, protection controls, whitelist behavior, filter lists, and statistics UI. Extension-specific tests may require a headed Chromium environment depending on the local browser and test configuration.

## How It Works

```text
Website request
      |
      v
Browser declarativeNetRequest engine
      |
      v
Enabled D-Blockerz rules
      |
      +---- Rule matches ----> Block or allow request
      |
      +---- No match --------> Request continues
```

Blocking decisions are enforced by the browser's network request filtering API. Extension settings and whitelist data are stored locally using the browser's extension storage API. The core blocking functionality does not require a D-Blockerz backend server.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Chrome/Edge Manifest V3
- `declarativeNetRequest`
- Chrome Storage API
- Playwright
- ESLint
- Git and GitHub

## Permissions

| Permission | Purpose |
|---|---|
| `storage` | Persist protection state, whitelist, filter-list settings, and locally stored statistics. |
| `declarativeNetRequest` | Apply blocking and allow rules to network requests. |
| `tabs` | Read the active tab URL so the popup can show the current hostname and offer site-specific controls. |

D-Blockerz does not require a user account. See the [Privacy Policy](https://dineshkumar9228.github.io/D-Blockerz/privacy-policy.html) for data-handling details.

## Project Structure

```text
public/
  icons/
  manifest.json
src/
  components/
  pages/
  rules/
  services/
  types/
tests/
docs/
  privacy-policy.html
```

## Testing the Blocking Engine

The blocking engine has been tested locally in Chrome. A direct request to `https://www.google-analytics.com/analytics.js` returned `net::ERR_BLOCKED_BY_CLIENT` while the corresponding D-Blockerz filter rule was enabled.

This confirms that the matching rule can block a real network request in the tested setup. It does **not** mean that all analytics endpoints, advertisements, or YouTube ads are blocked.

## Release

The current release is **[D-Blockerz v0.1.0](https://github.com/Dineshkumar9228/D-Blockerz/releases/tag/v0.1.0)**.

Release downloads and source archives are available on the GitHub Releases page.

## Contributing

Issues and suggestions are welcome. Please include:

- Browser and browser version
- D-Blockerz version
- Steps to reproduce
- Expected behavior and actual behavior
- Relevant console errors or screenshots, with personal information removed

## License

No license has been specified yet. Unless a license is added to this repository, the source code is not automatically granted an open-source license.
