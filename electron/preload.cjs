const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('facultyApp', {
  getAppInfo: () => ({
    name: 'Faculty Career App',
    version: '1.0.0'
  })
});
