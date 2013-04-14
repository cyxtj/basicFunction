var agePlot;

// variable
var allTicks = ["全部"];
var genderTicks = ["男", "女"];

var recordsSumData = [[800]]; 
var recordsSumGenderData = [[600, 200], [300, 200, 100]];

var recordsSumName = ["记录总数"];
var physiqueTypes = [ '平和质', '气虚质', '阳虚质', '阴虚质', '痰湿质', '湿热质', '血瘀质', '气郁质', '特禀质' ]; 
var effectTypes = [ '好多了', '好一些', '差不多', '差一些', '差多了' ]; 

var physiqueSumData = [];
physiqueSumData.push([]);
for(var i=0; i<9; i++) {
    tempInt = Math.floor( Math.random()*1000 );
    physiqueSumData[0].push(tempInt);
}

var effectSumData = [[]];
for(var i=0; i<5; i++) {
    tempInt = Math.floor( Math.random()*1000 );
    effectSumData[0].push(tempInt);
}

var effectPieData = [[]];
for(var i=0; i<5; i++) {
    effectPieData[0].push([]);
    effectPieData[0][i].push(effectTypes[i]);
    tempInt = Math.floor( Math.random()*1000 );
    effectPieData[0][i].push(tempInt);
}

var physiqueSumGenderData = [];
for(var i=0; i<9; i++) {
    physiqueSumGenderData.push([]);
    tempInt = Math.floor( Math.random()*1000 );
    physiqueSumGenderData[i].push(tempInt);
    tempInt = Math.floor( Math.random()*1000 );
    physiqueSumGenderData[i].push(tempInt);
}


var physiqueMonths = []
for(var i=1; i<=12; i++) {
    physiqueMonths.push(i+"月");
}
var physiqueTime = [[],[],[],[],[],[],[],[],[]];
for(var i=0; i<9; i++) {
    for(var j=0; j<12; j++) {
        physiqueTime[i].push(
            Math.floor(
                Math.random()*100
            )
        );
    }
}

var physique5Years = [];
for(var i=5; i<=100; i=i+5) {
    physique5Years.push(i);
}


var physiqueAge = [[],[],[],[],[],[],[],[],[]];
for(var i=0; i<9; i++) {
    for(var j=0; j<20; j++) {
        physiqueAge[i].push(
            Math.floor(
                Math.random()*100
            )
        );
    }
}


var medicineBasic= function() {

    $("#analysis-sample").append(" <div id='optionsBox'></div> ");
    $("#analysis-sample #optionsBox").append(" <form class='form-inline'></form> ");
    $("#analysis-sample #optionsBox form").append("\
        <select>\n\
            <option value='0'>请选择统计变量</option>\n\
            <option value='1'>记录总数</option>\n\
            <option value='2'>四诊体质</option>\n\
            <option value='3'>四诊证候</option>\n\
            <option value='4'>干预效果</option>\n\
        </select>");

    $("#analysis-sample #optionsBox form").append("\
        <select>\n\
            <option value='0'>请选择分组变量</option>\n\
            <option value='1'>性别</option>\n\
            <option value='1'>时间</option>\n\
            <option value='2'>诊次</option>\n\
            <option value='3'>年龄</option>\n\
        </select>");

    $("#analysis-sample #optionsBox form").append("\
        <select>\n\
            <option value='0'>全组显示</option>\n\
            <option value='1'>男</option>\n\
            <option value='2'>女</option>\n\
        </select>");

    $("#analysis-sample #optionsBox form").append("<button class='btn'>显示分析</div>");

    $("#analysis-sample").append(" <div id='plotsBox'></div> ");
    $("#analysis-sample #plotsBox").css("margin-bottom", "50px");

    $("#analysis-sample").append(" <div id='tablesBox'></div> ");

    $("#analysis-sample #optionsBox form button").bind("click", medicineBasicShow);

}


var jqplotOptionsDefault = {
    seriesDefaults: {
        renderer: $.jqplot.BarRenderer,
        rendererOptions: {
        }
    },
    axes:{
        xaxis:{
            renderer: $.jqplot.CategoryAxisRenderer,
        }
    },
    legend:{
        placement: "outsideGrid",
        show:true
    },
}

var jqplotOptionsHere;

var effectPieOptions = {
    seriesDefaults:{
        renderer:$.jqplot.PieRenderer,
        rendererOptions: {
            showDataLabels: true,
        },
        pointLabels: {
            ypadding: 0,
            show:true,
        },
    },
    legend:{
        show:true
    }      
};

var medicineBasicShow = function() {
    var selectValue1 = $("#analysis-sample #optionsBox form select").eq(0).val();
    var selectValue2 = $("#analysis-sample #optionsBox form select").eq(1).val();
    var selectValue3 = $("#analysis-sample #optionsBox form select").eq(2).val();

    if( selectValue1=="1" && selectValue2=="0" ) {
        $("#analysis-sample #plotsBox").css("width", "800px");
        $("#analysis-sample #plotsBox").empty();
        jqplotOptionsHere = jqplotOptionsDefault;
        jqplotOptionsHere.axes.xaxis.ticks = [""];
        jqplotOptionsHere.legend.labels = recordsSumName;
        jqplotOptionsHere.seriesDefaults.rendererOptions.barWidth = 30;
        $.jqplot("plotsBox", recordsSumData, jqplotOptionsHere);
    }
    else if( selectValue1=="1" && selectValue2=="1" ) {
        $("#analysis-sample #plotsBox").css("width", "800px");
        $("#analysis-sample #plotsBox").empty();
        jqplotOptionsHere = jqplotOptionsDefault;
        jqplotOptionsHere.axes.xaxis.ticks = genderTicks;
        jqplotOptionsHere.legend.labels = recordsSumName;
        jqplotOptionsHere.seriesDefaults.rendererOptions.barWidth = 30;
        $.jqplot("plotsBox", recordsSumGenderData, jqplotOptionsHere);
    }
    else if( selectValue1=="2" && selectValue2=="0" ) {
        $("#analysis-sample #plotsBox").css("width", "800px");
        $("#analysis-sample #plotsBox").css("height", "400px");
        $("#analysis-sample #plotsBox").empty();
        jqplotOptionsHere = jqplotOptionsDefault;
        jqplotOptionsHere.axes.xaxis.ticks = [""];
        jqplotOptionsHere.legend.labels = physiqueTypes;
        $.jqplot("plotsBox", physiqueSumData, jqplotOptionsHere);
    }
    else if( selectValue1=="2" && selectValue2=="1" ) {
        $("#analysis-sample #plotsBox").css("width", "800px");
        $("#analysis-sample #plotsBox").css("height", "400px");
        $("#analysis-sample #plotsBox").empty();
        jqplotOptionsHere = jqplotOptionsDefault;
        jqplotOptionsHere.axes.xaxis.ticks = genderTicks;
        jqplotOptionsHere.legend.labels = physiqueTypes;
        $.jqplot("plotsBox", physiqueSumGenderData, jqplotOptionsHere);
    }
    else if( selectValue1=="4" && selectValue2=="0" ) {
        $("#analysis-sample #plotsBox").css("width", "800px");
        $("#analysis-sample #plotsBox").css("height", "400px");
        $("#analysis-sample #plotsBox").empty();
        jqplotOptionsHere = jqplotOptionsDefault;
        jqplotOptionsHere.legend.labels = effectTypes;
        $.jqplot("plotsBox", effectSumData, jqplotOptionsHere);
        //$.jqplot("plotsBox", effectSumData, effectPieOptions);
    }

    return false;
}

var healthBasic= function() {

}


var plotPhysique = function() {
    plotPhysiqueSum(); 

    plotPhysiqueTime();
    $("#analysis-sample").append("<button id='timeBar' class='btn btn-info'>bar</button>");
    $("#analysis-sample").append("<button id='timeLine' class='btn btn-info'>line</button>");
    $("#analysis-sample #timeBar").bind("click", function(){
        $("#plotPhysiqueTime").empty();
        AnalysisSample_PlotBarChart("plotPhysiqueTime", physiqueTime, '', physiqueMonths, physiqueTypes); 
    });
    $("#analysis-sample #timeLine").bind("click", function(){
        $("#plotPhysiqueTime").empty();
        AnalysisSample_PlotLineChart("plotPhysiqueTime", physiqueTime, '', physique5Years, physiqueTypes);
    });

    plotPhysiqueAge();
    $("#analysis-sample").append("<button id='ageBar' class='btn btn-info'>bar</button>");
    $("#analysis-sample").append("<button id='ageLine' class='btn btn-info'>line</button>");
    $("#analysis-sample #ageBar").bind("click", function(){
        $("#plotPhysiqueAge").empty();
        AnalysisSample_PlotBarChart("plotPhysiqueAge", physiqueAge, '', '', physiqueTypes); 
    });
    $("#analysis-sample #ageLine").bind("click", function(){
        $("#plotPhysiqueAge").empty();
        AnalysisSample_PlotLineChart("plotPhysiqueAge", physiqueAge, '', physique5Years, physiqueTypes);
    });

}


var plotPhysiqueSum = function() {

    $("#analysis-sample").append(" <div id='plotPhysiqueSum'></div> ");
    $("#plotPhysiqueSum").css("margin-bottom", "50px");
    $("#plotPhysiqueSum").css("width", "800px");
    $("#plotPhysiqueSum").css("height", "400px");

    plot = $.jqplot("plotPhysiqueSum", physiqueSumData, {
        title: "",
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
               varyBarColor: true
            },
            pointLabels: {
                ypadding: 0,
                show:true
            }
        },
        axes:{
            xaxis:{
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: physiqueTypes
            }
        },
    }); 

    return plot;
}



var plotPhysiqueTime = function() {
    $("#analysis-sample").append("<div id='plotPhysiqueTime'></div>");
    $("#plotPhysiqueTime").css("margin-bottom", "50px");
    $("#plotPhysiqueTime").css("width", "800px");
    $("#plotPhysiqueTime").css("height", "500px");

    plot = AnalysisSample_PlotLineChart("plotPhysiqueTime", physiqueTime, "", physiqueMonths, physiqueTypes);

    return plot;
}

var plotPhysiqueAge = function() {
    $("#analysis-sample").append("<div id='plotPhysiqueAge'></div>");
    $("#plotPhysiqueAge").css("margin-bottom", "50px");
    $("#plotPhysiqueAge").css("width", "800px");
    $("#plotPhysiqueAge").css("height", "500px");


    plot = AnalysisSample_PlotLineChart("plotPhysiqueAge", physiqueAge, "", physique5Years, physiqueTypes);

    return plot;
}

var AnalysisSample_PlotLineChart = function(xid, xdata, xtitle, xticks, xlabels) {
    plot = $.jqplot(xid, xdata, {
        title: xtitle,
        seriesDefaults:{
            renderer:$.jqplot.LineRenderer,
            pointLabels: {
                ypadding: 0,
                show:true
            }
        },
        axes:{
            xaxis:{
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: xticks
            }
        },
        legend:{
            renderer: $.jqplot.EnhancedLegendRenderer,
            seriesToggle: "normal",
            placement: "outsideGrid",
            labels: xlabels,
            show:true
        },
    });

    return plot;

}


var AnalysisSample_PlotBarChart = function(xid, xdata, xtitle, xticks, xlabels) {
    plot = $.jqplot(xid, xdata, {
        title: xtitle,
        seriesDefaults:{
            renderer: $.jqplot.BarRenderer,
            // rendererOptions: {
            //    varyBarColor: true
            // },
            pointLabels: {
                ypadding: 0,
                show:true
            }
        },
        axes:{
            xaxis:{
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: xticks
            }
        },
        legend:{
            renderer: $.jqplot.EnhancedLegendRenderer,
            seriesToggle: "normal",
            placement: "outsideGrid",
            labels: xlabels,
            show:true
        },
        stackSeries: true,
        // highlighter: {
        //     tooltipLocation: "n",
        //     tooltipOffset: 10,
        //     tooltipAxes: "y",
        //     formatString: "<table><tr><td>记录：</td><td>%d例</td></tr><tr><td>比例：</td><td>%.2f%</td></tr></table>",
        //     useAxesFormatters: false,
        //     showMarker: false,
        //     show:true
        // }
    }); 

    return plot;
}


var AnalysisSample_PlotPieChart = function(xid, xdata, xtitle, xticks, xlabels) {

    plot1 = $.jqplot (xid, xdata, {
        seriesDefaults: {
            // Make this a pie chart.
            renderer: $.jqplot.PieRenderer,
            rendererOptions: {
                // Put data labels on the pie slices.
                // By default, labels show the percentage of the slice.
                showDataLabels: true
            }
        }, 
        legend:{
            renderer: $.jqplot.EnhancedLegendRenderer,
            seriesToggle: "normal",
            placement: "outsideGrid",
            labels: xlabels,
            show:true
        }
    });

    return plot; 
}
