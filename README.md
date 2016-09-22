# loadingwindow

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
});```

### nw添加splash window 的方法
[there](http://stackoverflow.com/questions/34735806/how-to-create-loading-screen-for-node-webkit)
