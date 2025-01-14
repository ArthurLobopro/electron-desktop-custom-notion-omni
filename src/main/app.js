const {
  app,
  BrowserWindow,
  screen,
  globalShortcut,
  shell,
  ipcMain
} = require('electron')
const path = require('path')
const windowStateKeeper = require('electron-window-state')

const isMacOS = process.argv.includes("--mac") || process.platform === 'darwin'
console.log(process.argv);
// const isMacOS = true // Testando fora do Mac

let win = null
app.allowRendererProcessReuse = true

const iconExtension = process.platform === 'win32' ? 'ico' : 'png'

function createWindow() {
  const mainScreen = screen.getPrimaryDisplay()
  const dimensions = mainScreen.size

  const mainWindowState = windowStateKeeper({
    defaultWidth: dimensions.width,
    defaultHeight: dimensions.height
  })

  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    frame: false,
    icon:
      isMacOS === 'darwin'
        ? undefined
        : path.resolve(app.getAppPath(), 'assets', `icon.${iconExtension}`),
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, '..', 'renderer', 'preload.js') // use a preload script
    }
  })

  mainWindowState.manage(win)

  win.loadURL('https://notion.so')

  win.webContents.on('new-window', checkerURL) // add event listener for URL check
}
function createShortcuts() {
  const reopen = 'Alt+Shift+r'

  globalShortcut.register(reopen, WindowVisibility.toggle)
}

/**
 * This function is used electron's new-window event
 * It allows non-electron links to be opened with the computer's default browser
 * Keep opening pop-ups for google login for example
 * @param {NewWindowEvent} e
 * @param {String} url
 */
function checkerURL(e, url) {
  const isNotUrlOfTheNotion = !url.match('/www.notion.so/')

  if (isNotUrlOfTheNotion) {
    e.preventDefault()
    shell.openExternal(url)
  }
}

const isUnicInstance = app.requestSingleInstanceLock() //Verifica se o app já foi iniciado

if (!isUnicInstance) {
    app.quit() // Caso o app já tiver sido aberto ele é fechado
} else {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(setTimeout(createWindow, 200)).then(createShortcuts);
}

app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (win.isMinimized()){
      win.restore()
    } 
    if(!win.isVisible()){
      win.show()
    }
    win.focus()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', recreateWindow)

function recreateWindow() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    setTimeout(createWindow, 200)
  }
}

ipcMain.on('request-app-path', (event, arg) => {
  event.returnValue = app.getAppPath()
})

ipcMain.on('isMac', (event) => {
  event.returnValue = isMacOS
})

ipcMain.on('minimize', (event, arg) => {
  const win = BrowserWindow.getFocusedWindow()
  win.minimize()
})

ipcMain.on('expand', (event, arg) => {
  const win = BrowserWindow.getFocusedWindow()
  if (win.isMaximized()) {
    win.restore()
  } else {
    win.maximize()
  }
})

ipcMain.on('fullscreen', () =>{
  const win = BrowserWindow.getFocusedWindow()
  if(!win.isFullScreen()){
    win.setFullScreen(true)
  }else{
    win.setFullScreen(false)
    win.restore()
  }
})

ipcMain.on('close', (event, arg) => {
  const win = BrowserWindow.getFocusedWindow()
  if(isMacOS){
    win.hide()
  }else{
    win.close()
  }
})

/**
 *
 *  Toggle Window Visibility
 *  in macOS we can use win.show() or win.hide() to toggle visibility.
 *
 *  in Win and Linux we can use win.minimize() or win.maximize() to toggle visibility.
 */

const WindowVisibility = {
  isVisible: true,

  toggle() {
    const show = isMacOS ? () => recreateWindow() : () => win.maximize()
    const hide = isMacOS ? () => win.close() : () => win.minimize()

    this.isVisible ? show() : hide()
    this.isVisible = !this.isVisible
  }
}
