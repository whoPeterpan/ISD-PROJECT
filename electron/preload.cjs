const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('facultyApp', {
  getAppInfo: () => ipcRenderer.invoke('app:get-info')
});