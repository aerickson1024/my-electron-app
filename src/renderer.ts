/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

const mainScreen = document.getElementById('main-screen');
const aboutScreen = document.getElementById('about-screen');
const navButtons = document.querySelectorAll<HTMLButtonElement>('.nav-button');

const setActiveScreen = (screenId: string): void => {
	const screens = [mainScreen, aboutScreen];

	screens.forEach((screen) => {
		if (!screen) {
			return;
		}

		const isActive = screen.id === screenId;
		screen.classList.toggle('screen--active', isActive);
		screen.setAttribute('aria-hidden', String(!isActive));
	});

	navButtons.forEach((button) => {
		const isActive = button.dataset.screen === screenId;
		button.classList.toggle('nav-button--active', isActive);
		button.setAttribute('aria-current', isActive ? 'page' : 'false');
	});
};

navButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const screenId = button.dataset.screen;

		if (screenId) {
			setActiveScreen(screenId);
		}
	});
});

declare global {
	interface Window {
		electronAPI: {
			onLogFileLoaded: (
				callback: (data: { content: string; filePath: string; fileName: string }) => void
			) => void;
		};
	}
}

let logFileContent: string | null = null;

window.electronAPI.onLogFileLoaded(({ content, fileName }) => {
	logFileContent = content;
	console.log(`Log file loaded: ${fileName} (${logFileContent.length} characters)`);
  console.log(logFileContent);
});