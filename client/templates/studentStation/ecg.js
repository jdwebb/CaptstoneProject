// Template.ecg.onCreated(function(){
//     function startTimer(duration, display) {
//         var timer = duration, minutes, seconds;
//         setInterval(function () {
//             minutes = parseInt(timer / 60, 10)
//             seconds = parseInt(timer % 60, 10);

//             minutes = minutes < 10 ? "0" + minutes : minutes;
//             seconds = seconds < 10 ? "0" + seconds : seconds;

//             display.text(minutes + ":" + seconds);

//             if (--timer < 0) {
//                 timer = duration;
//             }
//         }, 1000);
//     }

//     jQuery(function ($) {
//         var fiveMinutes = 60 * 30,
//             display = $('#time');
//         startTimer(fiveMinutes, display);
//     });
// });

function timer(){
    var time = Session.get('time');
    var minutes = Math.floor(time/60);
    var seconds = time - minutes * 60;
    Meteor.setInterval(function(){
        var time = Session.get('time') - 1; 
        Session.set('time', time);
    }, 1000);
}


Template.ecg.onCreated( function() {
    Session.set('time', 1800);
});

Template.ecg.helpers({
    'minutes' : function(){
        var minutes = ("0" + (Math.floor(Session.get('time')/60))).slice(-2);
        return minutes;
    },
    'seconds' : function(){
        var minutes = Math.floor(Session.get('time')/60);
        var seconds = ("0" + (Session.get('time') - minutes * 60)).slice(-2);
        return seconds;
    }
});

Template.ecg.events({
    "click #timerStart": function () {
        timer();
    }
});
// Template.vitalMonitor.onCreated(function(){
//     Session.set('yValue', 0.1);
// });
// Template.ecg.helpers({
//     'yValue' : function(){
//         var y = Session.get('yValue');
//         if(y == 0.1)
//         {
//             Session.set('yValue', 4.9);
//             return y;
//         }
//         else
//         {
//             Session.set('yValue', 0.1);
//             return y;
//         }
//     }
// });

// Template.ecg.onRendered( function () {
//     var Highcharts = require('highcharts/highstock');
//     $(function () {
//         Highcharts.setOptions({
//             global: {
//                 useUTC: false
//             }
//         });
//         Highcharts.chart('ecgTest', {
//             chart: {
//                 type: 'spline',
//                 animation: Highcharts.svg, // don't animate in old IE
//                 marginRight: 10,
//                 backgroundColor: '#222223',
//                 events: {
//                     load: function () {
//                         // set up the updating of the chart each second
//                         var series = this.series[0];
                        
//                         setInterval(function () {
//                             var x = (new Date()).getTime(), // current time
//                                 y =  Template.ecg.__helpers[" yValue"]();
//                             series.addPoint([x, y], true, true);
//                         }, 750);
//                     }
//                 }
//             },
//             title: {
//                 text: '',
//                 lineWidth: 0,
//                 minorGridLineWidth: 0,
//                 lineColor: 'transparent'
//             },
//             plotOptions: {
//                 series: {
//                     marker: {
//                         enabled: false
//                     }
//                 }
//             },
//             credits: {
//                 enabled: false
//             },
//             xAxis: {
//                 lineWidth: 0,
//                 minorGridLineWidth: 0,
//                 lineColor: 'transparent',
//             labels: {
//                 enabled: false
//             },
//             minorTickLength: 0,
//             tickLength: 0,
//             },
//             yAxis: {
//                 title: {
//                     text: '',
//                 },
//                 min:0,
//                 max:5
//                 ,
//                 labels: {
//                     enabled: false
//                 },
//                 plotLines: [{
//                     value: 0,
//                     width: 0,
//                     color: 'transparent'
//                 }]

//             },
//             tooltip: {
//                enabled: false
//             },
//             legend: {
//                 enabled: false
//             },
//             exporting: {
//                 enabled: false
//             },
//             series: [{
//                 name: 'ECG',
//                 color: 'Green',
//                 enableMouseTracking: false,
//                 data: (function () {
//                     // generate an array of random data
//                     var data = [],
//                         time = (new Date()).getTime(),
//                         i;

//                     for (i = -19; i <= 0; i += 1) {
//                         data.push({
//                             x: time + i * 750,
//                             y:  Template.ecg.__helpers[" yValue"]()
//                         });
//                     }
//                     return data;
//                 }())
//             }]
//         });
//     });
// });