# Faculty App — Basic DMG Prototype

Features: one appraisal form, local storage, admin records page, search/sort, PDF export.

## Run on macOS
Install Node.js LTS, extract this folder, then in Terminal:
```bash
cd faculty-app-basic
npm install
npm start
```

## Build the DMG on macOS
```bash
npm run dist
```
Electron Builder creates the installer in `dist/`.

This intentionally basic version has no login, shared server, or automatic Google Scholar syncing. The Admin Records tab is not access-controlled; use demo data only until authentication and security are added.
# Faculty-Career-App
