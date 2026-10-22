
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('node:path');

// Keep track of the main application window.
let mainWindow = null;

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

// Report the current window state when needed.
mainWindow.on('maximize', () => {
  console.log('Faculty Career App window maximized');
});

mainWindow.on('unmaximize', () => {
  console.log('Faculty Career App window restored');
});

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    mainWindow.loadURL('http://127.0.0.1:5173');
  }
}

ipcMain.handle('app:get-info', () => ({
  name: app.getName(),
  version: app.getVersion(),
  platform: process.platform
}));

app.whenReady().then(() => {
  createWindow();

  // Register a shortcut to open developer tools while debugging.
globalShortcut.register('CommandOrControl+Shift+I', () => {
  if (mainWindow) {
    mainWindow.webContents.openDevTools();
  }
});

  app.on('activate', () => {
  // Reopen the app window if none exists.
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
