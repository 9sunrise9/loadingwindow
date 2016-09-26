const ipcRenderer = require('electron').ipcRenderer
function notify() {
  new Notification("启动完毕",   {
      title: "启动完毕",
      body: "主窗口启动"
    });
}

function message() {
  console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // 发送一个同步消息synchronous-message


  ipcRenderer.send('asynchronous-message', 'ping');//发送消息
}

ipcRenderer.on('asynchronous-reply', function(event, arg) {
alert(arg); // 监听异步消息asynchronous-reply
});
