// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  onLogFileLoaded: (
    callback: (data: { content: string; filePath: string; fileName: string }) => void
  ) => {
    ipcRenderer.on('log-file-loaded', (_event, data) => callback(data));
  },
});
