var marked = require('marked');
require ('/home/sunyue/文档/loading2/vue.js');
var Chart = require('chart.js')
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

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
        }
    ]
};
var options = {
     //Boolean - If we show the scale above the chart data
     // 网格线是否在数据线的上面
     scaleOverlay : false,

     //Boolean - If we want to override with a hard coded scale
     // 是否用硬编码重写y轴网格线
     scaleOverride : false,

     //** Required if scaleOverride is true **
     //Number - The number of steps in a hard coded scale
     // y轴刻度的个数
     scaleSteps : null,
     //Number - The value jump in the hard coded scale
     // y轴每个刻度的宽度
     scaleStepWidth : null,
     //Number - The scale starting value
     // y轴的起始值
     scaleStartValue : null,

     //String - Colour of the scale line
     // x轴y轴的颜色
     scaleLineColor : "rgba(0,0,0,1)",

     //Number - Pixel width of the scale line
     // x轴y轴的线宽
     scaleLineWidth : 1,

     //Boolean - Whether to show labels on the scale
     // 是否显示y轴的标签
     scaleShowLabels : true,

     //Interpolated JS string - can access value
     // 标签显示值
     scaleLabel : "<%=value%>",

     //String - Scale label font declaration for the scale label
     // 标签的字体
     scaleFontFamily : "'Arial'",

     //Number - Scale label font size in pixels
     // 标签字体的大小
     scaleFontSize : 12,

     //String - Scale label font weight style
     // 标签字体的样式
     scaleFontStyle : "normal",

     //String - Scale label font colour
     // 标签字体的颜色
     scaleFontColor : "#666",

     ///Boolean - Whether grid lines are shown across the chart
     // 是否显示网格线
     scaleShowGridLines : true,

     //String - Colour of the grid lines
     // 网格线的颜色
     scaleGridLineColor : "rgba(0,0,0,.1)",

     //Number - Width of the grid lines
     // 网格线的线宽
     scaleGridLineWidth : 1,

     //Boolean - Whether the line is curved between points
     // 是否是曲线
     bezierCurve : true,

     //Boolean - Whether to show a dot for each point
     // 是否显示点
     pointDot : true,

     //Number - Radius of each point dot in pixels
     // 点的半径
     pointDotRadius : 3,

     //Number - Pixel width of point dot stroke
     // 点的线宽
     pointDotStrokeWidth : 1,

     //Boolean - Whether to show a stroke for datasets
     datasetStroke : true,

     //Number - Pixel width of dataset stroke
     // 数据线的线宽
     datasetStrokeWidth : 3,

     //Boolean - Whether to fill the dataset with a colour
     // 数据线是否填充颜色
     datasetFill : true,

     //Boolean - Whether to animate the chart
     // 是否有动画效果
     animation : true,

     //Number - Number of animation steps
     // 动画的步数
     animationSteps : 60,

     //String - Animation easing effect
     // 动画的效果
     animationEasing : "easeOutQuart",

     //Function - Fires when the animation is complete
     // 动画完成后调用
     onAnimationComplete : null
 }

var ctx = document.getElementById("myChart").getContext("2d");
var myline = new Chart(ctx,{
            type: "line",
            data: data,
            option:options
          });
