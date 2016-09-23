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
