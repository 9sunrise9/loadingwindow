var selected_file
var reader
var matchArr = new Array();


var dropZone = document.getElementById('dataDropBox');
dropZone.addEventListener('drop', handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; // FileList object.
    readit(files[0]);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function loadtxt() {
    var chooser = document.querySelector('#fileLoader');

    chooser.addEventListener("change", function(evt) {

        var file = this.files[0];

        readit(file);
    }, false);
}

function load_txt() {
    loadtxt();
    document.getElementById("fileLoader").click();
}

function readit(file) {
    reader = new FileReader();
    var text;
    reader.readAsText(file, 'gbk');
    reader.onload = function(e) {
        date = file.lastModifiedDate
        match(reader.result);
    }
}

function match(txt) {
    var time = []; //时间序列
//    var t = /.{4,}(?=s)/g;
//    ok = txt.match(t); //找到时间序列
//    console.log(ok);
//    for (var i = 0; i < ok.length; i++) {
//        time[i] = Number(ok[i]);
//    }

    fvalue = txt.split(/\s/);
    var f1 = []; //子系统1拉力值
    var f2 = []; //子系统1拉力值
    var f3 = []; //子系统1拉力值
    var f4 = []; //子系统1拉力值
    var f5 = []; //子系统1拉力值
    var dygraph_data = [];
    for (var i = 0; i < fvalue.length / 18; i++) {
        time[i] = fvalue[i * 18];
        f1[i] = fvalue[i * 18 + 1];
        f2[i] = fvalue[i * 18 + 2];
        f3[i] = fvalue[i * 18 + 3];
        f4[i] = fvalue[i * 18 + 4];
        f5[i] = fvalue[i * 18 + 5];
        dygraph_data.push([time[i],f1[i],f2[i],f3[i],f4[i],f5[i]]);
    }
plot_echart(time,f1,f2,f3,f4,f5);
    //plot(dygraph_data);
}
