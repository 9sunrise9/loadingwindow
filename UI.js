//UI交互代码
const ipcRenderer = require('electron').ipcRenderer

//最小化通知
function notify() {
  new Notification("Windy",   {
      title: "Windy",
      body: "最小化"
    });
}

//与main.js通信
function message() {
  console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // 发送一个同步消息synchronous-message
  ipcRenderer.send('asynchronous-message', 'ping');//发送消息
}
ipcRenderer.on('minsize', function(event, arg) {
 notify();// 监听异步消息asynchronous-reply
});

//拖选卡片的鼠标hover
function change() {
}
function normal() {
}

//sidebar绑定
$('.ui.sidebar').sidebar({context: $('.bottom.segment')}).sidebar('attach events', '.topbar .item');


//关闭窗口按钮
function close_win() {
  console.log("here");
  ipcRenderer.send('close-message', 'close');
}

//遮罩
function test() {
  console.log("here");
  ipcRenderer.send('close-message', 'close');
}
