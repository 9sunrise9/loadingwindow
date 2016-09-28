var marked = require('marked');
require ('/home/sunyue/文档/loading2/vue.js');
const ipcRenderer = require('electron').ipcRenderer
function notify() {
  new Notification("Windy",   {
      title: "Windy",
      body: "最小化"
    });
}

function message() {
  console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // 发送一个同步消息synchronous-message


  ipcRenderer.send('asynchronous-message', 'ping');//发送消息
}

ipcRenderer.on('minsize', function(event, arg) {
 notify();// 监听异步消息asynchronous-reply
});

new Vue({
  el: '#editor',
  data: {
    input: '# hello'
  },
  filters: {
    marked: marked
  }
})
