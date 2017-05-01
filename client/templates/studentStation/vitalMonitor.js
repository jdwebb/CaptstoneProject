

Template.vitalMonitor.onCreated(function(){
    var x = TestingSession.findOne(); 

    Session.set('svo2value', x.svo2);
    Session.set('abpvalue1', x.abp);
    Session.set('abpvalue2', x.abp2);
    Session.set('bisvalue', x.bis);
    Session.set('mapvalue', x.map);
    Session.set('alpvalue', x.alp);
    Session.set('btempvalue', x.bladTemp);
    Session.set('etempvalue', x.esoTemp);
    Session.set('cvpvalue', x.cvp);
    Session.set('capnvalue', x.cap);
    Session.set('yValue', 0.1);
   
});

Template.vitalMonitor.helpers({
    'ecgGif':function(){
        return TestingSession.findOne().ecgGif;
    },
    'svo2Value':function(){
        var svo2value = TestingSession.findOne().svo2; 
        return svo2value;
    },
    'abpValue1':function(){
        let abp1 = TestingSession.findOne().abp;
        return abp1;
    },
    'abpValue2':function(){
        let abp2 = TestingSession.findOne().abp2;
        return abp2;
    },
    'bisValue':function(){
        let bisValue = TestingSession.findOne().bis;
        return bisValue;
    },
    'mapValue':function(){
        let mapValue = TestingSession.findOne().map;
        return mapValue;
    },
    'alpValue':function(){
        let alpValue = TestingSession.findOne().alp;
        return alpValue;
    },
    'bTempValue':function(){
        let bTempValue = TestingSession.findOne().bladTemp;
        return bTempValue;
    },
    'eTempValue':function(){
        let eTempValue = TestingSession.findOne().esoTemp;
        return eTempValue;
    },
    'cvpValue':function(){
        let cvpValue = TestingSession.findOne().cvp; 
        return cvpValue;
    },
    'capnValue':function(){
        let capnValue = TestingSession.findOne().cap;
        return capnValue;
    },
    'yValue' : function(){
        var y = Session.get('yValue');
        if(y == 0.1)
        {
            Session.set('yValue', 500);
            return y;
        }
        else
        {
            Session.set('yValue', 0.1);
            return y;
        }
    },
    'pump': function(){
        let pump = TestingSession.findOne().pump;
        return pump;
    },
});

Template.vitalMonitor.onRendered( function () {
    var Highcharts = require('highcharts/highstock');
    $(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        Highcharts.chart('abp', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                backgroundColor: '#080000',
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = TestingSession.findOne().abp;
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: '',
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent'
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            credits: {
                enabled: false
            },
            xAxis: {
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
            labels: {
                enabled: false
            },
            minorTickLength: 0,
            tickLength: 0,
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                },
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: 'transparent'
                }]

            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2) + 'mmHg';
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'ABP',
                color: 'red',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: TestingSession.findOne().abp
                        });
                    }
                    return data;
                }())
            }]
        });
    });
    $(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        Highcharts.chart('svo2', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                backgroundColor: '#080000',
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = TestingSession.findOne().svo2; 
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: ''
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            credits: {
                enabled: false
            },
            xAxis: {
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
            labels: {
                enabled: false
            },
            minorTickLength: 0,
            tickLength: 0,
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: 'transparent'
                }]

            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2) + '%';
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'SVO2',
                color: 'cyan',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: TestingSession.findOne().svo2
                        });
                    }
                    return data;
                }())
            }]
        });
    });
    // $(function () {
    //     Highcharts.setOptions({
    //         global: {
    //             useUTC: false
    //         }
    //     });
    //     Highcharts.chart('map', {
    //         chart: {
    //             type: 'spline',
    //             animation: Highcharts.svg, // don't animate in old IE
    //             marginRight: 10,
    //             backgroundColor: '#222223',
    //             events: {
    //                 load: function () {

    //                     // set up the updating of the chart each second
    //                     var series = this.series[0];
    //                     setInterval(function () {
    //                         var x = (new Date()).getTime(), // current time
    //                             y = TestingSession.findOne().map;
    //                         series.addPoint([x, y], true, true);
    //                     }, 1000);
    //                 }
    //             }
    //         },
    //         title: {
    //             text: ''
    //         },
    //         plotOptions: {
    //             series: {
    //                 marker: {
    //                     enabled: false
    //                 }
    //             }
    //         },
    //         credits: {
    //             enabled: false
    //         },
    //         xAxis: {
    //             lineWidth: 0,
    //             minorGridLineWidth: 0,
    //             lineColor: 'transparent',
    //         labels: {
    //             enabled: false
    //         },
    //         minorTickLength: 0,
    //         tickLength: 0,
    //         },
    //         yAxis: {
    //             title: {
    //                 text: ''
    //             },
    //             labels: {
    //                 enabled: false
    //             },
    //             plotLines: [{
    //                 value: 0,
    //                 width: 1,
    //                 color: 'transparent'
    //             }]

    //         },
    //         tooltip: {
    //             formatter: function () {
    //                 return '<b>' + this.series.name + '</b><br/>' +
    //                     Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
    //                     Highcharts.numberFormat(this.y, 2) + 'mmHg';
    //             }
    //         },
    //         legend: {
    //             enabled: false
    //         },
    //         exporting: {
    //             enabled: false
    //         },
    //         series: [{
    //             name: 'MAP',
    //             color: 'orange',
    //             data: (function () {
    //                 // generate an array of random data
    //                 var data = [],
    //                     time = (new Date()).getTime(),
    //                     i;

    //                 for (i = -19; i <= 0; i += 1) {
    //                     data.push({
    //                         x: time + i * 1000,
    //                         y: TestingSession.findOne().map
    //                     });
    //                 }
    //                 return data;
    //             }())
    //         }]
    //     });
    // });
    // $(function () {
    //     Highcharts.setOptions({
    //         global: {
    //             useUTC: false
    //         }
    //     });
    //     Highcharts.chart('ecg', {
    //         chart: {
    //             type: 'spline',
    //             animation: Highcharts.svg, // don't animate in old IE
    //             marginRight: 10,
    //             backgroundColor: '#222223',
    //             events: {
    //                 load: function () {
    //                     // set up the updating of the chart each second
    //                     var series = this.series[0];
                        
    //                     setInterval(function () {
    //                         var x = (new Date()).getTime(), // current time
    //                             y =  Template.vitalMonitor.__helpers[" yValue"]();
    //                         series.addPoint([x, y], true, true);
    //                     }, 500);
    //                 }
    //             }
    //         },
    //         title: {
    //             text: '',
    //             lineWidth: 0,
    //             minorGridLineWidth: 0,
    //             lineColor: 'transparent'
    //         },
    //         plotOptions: {
    //             series: {
    //                 marker: {
    //                     enabled: false
    //                 }
    //             }
    //         },
    //         credits: {
    //             enabled: false
    //         },
    //         xAxis: {
    //             lineWidth: 0,
    //             minorGridLineWidth: 0,
    //             lineColor: 'transparent',
    //         labels: {
    //             enabled: false
    //         },
    //         minorTickLength: 0,
    //         tickLength: 0,
    //         },
    //         yAxis: {
    //             title: {
    //                 text: ''
    //             },
    //             labels: {
    //                 enabled: false
    //             },
    //             plotLines: [{
    //                 value: 0,
    //                 width: 0,
    //                 color: 'transparent'
    //             }]

    //         },
    //         tooltip: {
    //            enabled: false
    //         },
    //         legend: {
    //             enabled: false
    //         },
    //         exporting: {
    //             enabled: false
    //         },
    //         series: [{
    //             name: 'ECG',
    //             color: 'white',
    //             enableMouseTracking: false,
    //             data: (function () {
    //                 // generate an array of random data
    //                 var data = [],
    //                     time = (new Date()).getTime(),
    //                     i;

    //                 for (i = -19; i <= 0; i += 1) {
    //                     data.push({
    //                         x: time + i * 500,
    //                         y:  Template.vitalMonitor.__helpers[" yValue"]()
    //                     });
    //                 }
    //                 return data;
    //             }())
    //         }]
    //     });
    // });
    $(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        Highcharts.chart('cvp', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                backgroundColor: '#080000',
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = TestingSession.findOne().cvp;
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: ''
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            credits: {
                enabled: false
            },
            xAxis: {
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
            labels: {
                enabled: false
            },
            minorTickLength: 0,
            tickLength: 0,
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: 'transparent'
                }]

            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2) + 'mmHg';
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'CVP',
                color: 'green',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: TestingSession.findOne().cvp
                        });
                    }
                    return data;
                }())
            }]
        });
    });
    // $(function () {
    //     Highcharts.setOptions({
    //         global: {
    //             useUTC: false
    //         }
    //     });
    //     Highcharts.chart('cap', {
    //         chart: {
    //             type: 'spline',
    //             animation: Highcharts.svg, // don't animate in old IE
    //             marginRight: 10,
    //             backgroundColor: '#080000',
    //             events: {
    //                 load: function () {

    //                     // set up the updating of the chart each second
    //                     var series = this.series[0];
    //                     setInterval(function () {
    //                         var x = (new Date()).getTime(), // current time
    //                             y = TestingSession.findOne().cap;
    //                         series.addPoint([x, y], true, true);
    //                     }, 1000);
    //                 }
    //             }
    //         },
    //         title: {
    //             text: ''
    //         },
    //         plotOptions: {
    //             series: {
    //                 marker: {
    //                     enabled: false
    //                 }
    //             }
    //         },
    //         credits: {
    //             enabled: false
    //         },
    //         xAxis: {
    //             lineWidth: 0,
    //             minorGridLineWidth: 0,
    //             lineColor: 'transparent',
    //         labels: {
    //             enabled: false
    //         },
    //         minorTickLength: 0,
    //         tickLength: 0,
    //         },
    //         yAxis: {
    //             title: {
    //                 text: ''
    //             },
    //             labels: {
    //                 enabled: false
    //             },
    //             plotLines: [{
    //                 value: 0,
    //                 width: 1,
    //                 color: 'transparent'
    //             }]

    //         },
    //         tooltip: {
    //             formatter: function () {
    //                 return '<b>' + this.series.name + '</b><br/>' +
    //                     Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
    //                     Highcharts.numberFormat(this.y, 2) + '%';
    //             }
    //         },
    //         legend: {
    //             enabled: false
    //         },
    //         exporting: {
    //             enabled: false
    //         },
    //         series: [{
    //             name: 'Capnograph',
    //             color: 'yellow',
    //             data: (function () {
    //                 // generate an array of random data
    //                 var data = [],
    //                     time = (new Date()).getTime(),
    //                     i;

    //                 for (i = -19; i <= 0; i += 1) {
    //                     data.push({
    //                         x: time + i * 1000,
    //                         y: TestingSession.findOne().cap
    //                     });
    //                 }
    //                 return data;
    //             }())
    //         }]
    //     });
    // });
});