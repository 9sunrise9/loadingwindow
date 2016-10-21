const {electron ,dialog,Tray,app,globalShortcut,BrowserWindow,Menu,ipcMain,sender}= require("electron");
//const dialog = electron.dialog;
//const Tray = electron.Tray
//const app = electron.app;
//const globalShortcut = electron.globalShortcut;
//const BrowserWindow = electron.BrowserWindow;
//const Menu = electron.Menu;
//const ipcMain = electron.ipcMain;
//const sender = electron.ipcMain.sender;

let mainWindow;
let loadingWindow;
let tray = null;
//定义一个创建浏览器窗口的方法
function createWindow() {
    // 创建一个浏览器窗口对象，并指定窗口的大小
    mainWindow = new BrowserWindow({
        toolbar: false,
        width: 1200,
        height: 686,
        show:false,
        autoHideMenuBar:true,
        icon: '123.png',
        frame: false
   });
   const appIcon = new Tray('123.png')
    loadingWindow = new BrowserWindow({
        toolbar: false,
        width: 600,
        height: 300,
        frame: false,
        type:'splash',
        transparent: false
    });
    // 通过浏览器窗口对象加载index.html文件，同时也是可以加载一个互联网地址的
mainWindow.once('ready-to-show',() =>{
  mainWindow.show()
  loadingWindow.close()
});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // 同时也可以简化成：mainWindow.loadURL('./index.html');
    // 监听浏览器窗口对象是否关闭，关闭之后直接将mainWindow指向空引用，也就是回收对象内存空间
    mainWindow.on("closed", () => {
        mainWindow = null;
      if(loadingWindow){
        loadingWindow.close();
      }
    });
    loadingWindow.loadURL('file://' + __dirname + '/loading.html');
    // 同时也可以简化成：mainWindow.loadURL('./index.html');
    // 监听浏览器窗口对象是否关闭，关闭之后直接将mainWindow指向空引用，也就是回收对象内存空间
    loadingWindow.on("closed", () => {
        loadingWindow = null;
    });

}
// 监听应用程序对象是否初始化完成，初始化完成之后即可创建浏览器窗口
app.on("ready", () => {
  createWindow();
  tray = new Tray('icon.png')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'show', type: 'radio'},
    {label: 'exit', type: 'radio'},
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  globalShortcut.unregisterAll();

  //快捷键响应逻辑：先判断是否最小化，如果最小化则focus并且restore，如果没有最小化并且focus则最小化，如果没有最小化且没有focus则focus
  const ret = globalShortcut.register('CommandOrControl+`', () => {

if (mainWindow.isMinimized()|!mainWindow.isFocused()) {
  mainWindow.focus()
  mainWindow.restore()
} else {
    mainWindow.webContents.send('minsize', 'pong');
    mainWindow.minimize()
}

});
if (!ret) {
  console.log('registration failed')
}
console.log(globalShortcut.isRegistered('CommandOrControl+`'))
})


// 监听应用程序对象中的所有浏览器窗口对象是否全部被关闭，如果全部被关闭，则退出整个应用程序。该
app.on("window-all-closed", () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
    // 判断当前操作系统是否是window系统，因为这个事件只作用在window系统中
    if(process.platform != "darwin") {
        // 退出整个应用程序
        app.quit();
    }
});


app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
});

// 监听应用程序图标被通过点或者没有任何浏览器窗口显示在桌面上，那我们应该重新创建并打开浏览器窗口，避免Mac OS X系统回收或者销毁浏览器窗口
app.on("activate", () => {
    if(mainWindow === null) {
        createWindow();
    }
});



ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(dialog.showMessageBox({type:"warning",buttons:['ok','no'],title:"hello world",message:"success!",detail:arg}))  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', (event, arg) =>{
  console.log(arg);  // prints "ping"
  event.returnValue = 'pong';
});

ipcMain.on('close-message', (event, arg) =>{
  console.log(arg);
  mainWindow.close();
});
