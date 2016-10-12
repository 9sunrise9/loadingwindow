# Electron Test

## Loading Window
### 应用载入前loading（splash）window 的方法
设置主窗口`show：false` 并添加：
```javascript    
loadingWindow = new BrowserWindow({
        toolbar: false,
        width: 600,
        height: 300,
        frame: true,
       type:'splash',
        transparent: false
    });
    // 通过浏览器窗口对象加载index.html文件，同时也是可以加载一个互联网地址的
    mainWindow.once('ready-to-show',() =>{
    mainWindow.show()
    loadingWindow.close()
});
```
### nw添加splash window 的方法
[here](http://stackoverflow.com/questions/34735806/how-to-create-loading-screen-for-node-webkit)


## Dialog
**dialog只能在主进程main.js中使用**
>入口mian.js为主程序，index.html等页面为渲染程序，主程序可以控制渲染程序的启动和终止，而渲染程序只能控制自身的UI，但可以通过IPC或remote的方式与主程序相互通信

[官方文档](https://github.com/electron/electron/blob/master/docs/api/dialog.md)

`console.log(dialog.showMessageBox({type:"warning",buttons:['ok','no'],title:"helloworld",message:"success!",detail:"lalallalalallalalalalalalalal"}))`

## 全局快捷键
**mainWindow.restore()之前必须先focus()**


```javascript
app.on("ready", () => {
  createWindow();
  globalShortcut.unregisterAll();
  const ret = globalShortcut.register('CommandOrControl+`', () => {
if (mainWindow.isMinimized()) {
  mainWindow.focus()
  mainWindow.restore()
} else {
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
```

## Tray
**在.desktop文件加入EX项前加入：`env XDG_CURRENT_DESKTOP=Unity` 就能显示tray**
```
[Desktop Entry]
Name=Wechat
Exec=env XDG_CURRENT_DESKTOP=Unity /home/sunyue/electronic-wechat/dist/electronic-wechat-linux-x64/electronic-wechat
Terminal=false
Type=Application
Icon=/home/sunyue/electronic-wechat/assets/icon.png
```
terminal运行时添加参数`env XDG_CURRENT_DESKTOP=Unity electron .
`

## 主进程与渲染进程间通信

### 消息通信
```javascript
//mian.js
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(dialog.showMessageBox({type:"warning",buttons:['ok','no'],title:"hello world",message:"success!",detail:arg}))  // prints "ping"
  event.sender.send('misize', 'pong');
});

ipcMain.on('synchronous-message', (event, arg) =>{
  console.log(arg);  // prints "ping"
  event.returnValue = 'pong';
});

//或
  mainWindow.webContents.send('minsize', 'pong');
//index.html
const ipcRenderer = require('electron').ipcRenderer
function message() {
  console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // 发送一个同步消息synchronous-message


  ipcRenderer.send('asynchronous-message', 'ping');//发送消息
}

ipcRenderer.on('minsize', function(event, arg) {
 notify();// 监听异步消息asynchronous-reply
});
```

## [jQuery bug](http://classicoldsong.me/archives/264)
  <script type="text/javascript" src="jquery.js" onload="window.$ = window.jQuery = module.exports;"></script>
