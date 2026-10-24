# Faculty Career App

A lightweight Electron desktop application for organizing faculty self-appraisal and academic career records.

## Overview

Faculty Career App provides a single workspace for maintaining professional profile details, teaching contributions, research records, and academic activities. It is built with React and Electron as a desktop application.

The project demonstrates desktop application development, reusable React components, state management, inter-process communication, and local data persistence.

## Features

- **Dashboard:** Quick access to the main appraisal sections.
- **Faculty Profile:** Maintain professional details, view a live profile summary, and track profile completion.
- **Teaching Records:** Add, view, and delete course and lecture records.
- **Research Records:** Organize publications, projects, and other research contributions.
- **Academic Activities:** Record seminars, conferences, workshops, and professional development activities.
- **Local Persistence:** Save faculty profile and academic records locally and restore them after restarting the application.
- **Save Status:** Display feedback about local saving operations.
- **Desktop Application:** Native application window, secure preload bridge, and keyboard shortcut for developer tools.

## Technology Stack

- React
- JavaScript
- Electron
- Vite
- HTML and CSS
- Electron IPC
- Local JSON file storage
- electron-builder for packaging

## Requirements

- Node.js and npm
- Git
- macOS for building and testing the macOS installer

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/amethystakira/Faculty-Career-App.git
cd Faculty-Career-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development mode

```bash
npm run dev
```

This starts the Vite development server and launches the Electron application.

### 4. Create a production web build

```bash
npm run build
```

### 5. Package the macOS application

```bash
npm run dist
```

The installer is generated in the configured output directory, typically `release/`.

## Data Storage

Faculty profile details and academic records are stored locally in an application-data JSON file.

The Electron main process handles file access. The renderer communicates with it through a restricted preload bridge using IPC.

This design keeps direct Node.js access disabled in the renderer.

**Important:** The application currently provides local, device-specific storage. It does not provide university-wide synchronization, user authentication, or shared server storage. Keep separate backups of important records.

## Project Structure

```text
Faculty-Career-App/
├── electron/
│   ├── main.cjs
│   └── preload.cjs
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── ProfileForm.jsx
│   │   ├── ProfileSummary.jsx
│   │   ├── ProfileCompletion.jsx
│   │   ├── TeachingForm.jsx
│   │   ├── ResearchForm.jsx
│   │   └── ActivitiesForm.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Security and Architecture

- Electron context isolation is enabled.
- Node.js integration is disabled in the renderer.
- A preload script exposes specific application operations.
- IPC handlers provide access to application information and local records.

## Current Scope

This is a basic faculty self-appraisal desktop application intended as an academic software project and a foundation for further development.

Possible future enhancements include PDF appraisal reports, data backup and restore, faculty/admin roles, and integration with university systems.

## Author

Developed as a faculty self-appraisal and career development application.

## License

No license has been specified yet. Contact the repository owner for permission before redistributing or reusing this project.
