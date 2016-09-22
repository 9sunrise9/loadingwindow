
var options = [
  {
    title: "启动完毕",
    body: "主窗口启动"
  },
  {
    title: "Content-Image Notification",
    body: "Short message plus a custom content image",
  }
]

function notify() {
  new Notification(options[0].title, options[0]);
}
