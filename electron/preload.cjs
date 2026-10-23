
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('facultyApp', {
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),

  // Load previously saved faculty records.
  loadRecords: () => ipcRenderer.invoke('records:load'),

  // Save faculty records through the main process.
  saveRecords: (records) =>
    ipcRenderer.invoke('records:save', records)
});
