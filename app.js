var echarts = require('/home/sunyue/文档/loading2/echarts.js');


function plot_echart(time, f1, f2, f3, f4, f5) {
    myChart = echarts.init(document.getElementById('container'));
    // 指定图表的配置项和数据
    option = {
        title: {
            text: '拉力实验数据'
        },
        toolbox: {
            show: true,
            feature: {

                mark: {
                    show: true
                },
                dataZoom: {
                  yAxisIndex: 'none',
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                show: true,
                animation: true,
            }
        },
            	animation: false,
            	calculble :false,
            	sample :'average',
        legend: {
            data: ['拉力1']//, '拉力2', '拉力3', '拉力4', '拉力5']
        },
        xAxis: {
            name: 'time',
            axisLabel: {
                formatter: '{value} s'
            },
            data: (function() {
                var data = [];
                for (var i = 0; i < time.length; i++) {
                    data.push(time[i]);
                }
                return data;
            })()
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} N'
            }
        },
        dataZoom: [{
          realtime: true,
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 1,
            end: 100
        }, {
            type: 'inside',
            realtime: true,
            xAxisIndex: [0],
            start: 1,
            end: 100
        }],
        series: [{
            name: '拉力1',
            type: 'line',
            large: 'true',
            data: (function() {
                var data = [];
                for (var i = 0; i < f1.length; i++) {
                    data.push(f1[i]);
                }
                return data;
            })()
        }]};
    myChart.setOption(option);
};
