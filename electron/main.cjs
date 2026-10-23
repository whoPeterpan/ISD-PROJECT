
const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut
} = require('electron');

const path = require('node:path');
const fs = require('node:fs/promises');

// Keep track of the main application window.
let mainWindow = null;

// Default data used when no saved records exist.
const emptyRecords = {
  profile: {
    fullName: '',
    employeeId: '',
    department: '',
    designation: '',
    email: ''
  },
  teaching: [],
  research: [],
  activities: []
};

// Store data in Electron's application-data directory.
function getRecordsPath() {
  return path.join(
    app.getPath('userData'),
    'faculty-records.json'
  );
}

// Load previously saved faculty records.
async function loadRecords() {
  try {
    const content = await fs.readFile(
      getRecordsPath(),
      'utf8'
    );

    const saved = JSON.parse(content);

    // Preserve defaults if older saved data lacks a section.
    return {
      ...structuredClone(emptyRecords),
      ...saved,
      profile: {
        ...emptyRecords.profile,
        ...(saved.profile || {})
      },
      teaching: Array.isArray(saved.teaching)
        ? saved.teaching
        : [],
      research: Array.isArray(saved.research)
        ? saved.research
        : [],
      activities: Array.isArray(saved.activities)
        ? saved.activities
        : []
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return structuredClone(emptyRecords);
    }

    console.error('Unable to load faculty records:', error);
    throw error;
  }
}

// Save faculty records to the local JSON file.
async function saveRecords(records) {
  if (
    !records ||
    typeof records !== 'object' ||
    Array.isArray(records)
  ) {
    throw new Error('Invalid faculty records.');
  }

  const data = {
    profile: records.profile,
    teaching: records.teaching,
    research: records.research,
    activities: records.activities
  };

  // Write to a temporary file before replacing the saved file.
  const filePath = getRecordsPath();
  const temporaryPath = `${filePath}.tmp`;

  await fs.writeFile(
    temporaryPath,
    JSON.stringify(data, null, 2),
    'utf8'
  );

  await fs.rename(temporaryPath, filePath);

  return { success: true };
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'Faculty Career App',
    backgroundColor: '#f5f7fb',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  // Clear the reference when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Report window state changes during development.
  mainWindow.on('maximize', () => {
    console.log('Faculty Career App window maximized');
  });

  mainWindow.on('unmaximize', () => {
    console.log('Faculty Career App window restored');
  });

  if (app.isPackaged) {
    mainWindow.loadFile(
      path.join(__dirname, '../dist/index.html')
    );
  } else {
    mainWindow.loadURL('http://127.0.0.1:5173');
  }
}

// Existing application information handler.
ipcMain.handle('app:get-info', () => ({
  name: app.getName(),
  version: app.getVersion(),
  platform: process.platform
}));

// Secure renderer access to local records.
ipcMain.handle('records:load', async () => {
  return loadRecords();
});

ipcMain.handle('records:save', async (_event, records) => {
  return saveRecords(records);
});

app.whenReady().then(() => {
  createWindow();

  // Open developer tools using the keyboard shortcut.
  globalShortcut.register(
    'CommandOrControl+Shift+I',
    () => {
      if (mainWindow) {
        mainWindow.webContents.openDevTools();
      }
    }
  );

  app.on('activate', () => {
    // Reopen the app if no windows remain.
    if (mainWindow === null) {
      createWindow();
    }
  });
});

// Release registered shortcuts when the app exits.
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
