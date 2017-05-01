// Session.setDefault("globalTime", 0);

// var timeIncrement = 1; // represents the amount of time in seconds between PMD data updates

// Template.pmd.onRendered(function () {
// });

// Meteor.setInterval(function() {
//   if (!Session.get("activeSession")) {
//     Session.set("activeSession", "YbXTqtKTYjcc2w6ms");
//   }
// }, 1000);

// Template.pmd.helpers({
//   testingSession: function() {
//     return TestingSession.findOne({_id: Session.get("activeSession")});
//   },

//   abpHelper: function (input) {
//     return Math.floor(input/1.5);
//   },

//   heartRateHelper: function (heartRate) {
//     if (heartRate <= 40) {
//       return "asystole.png";
//     } else if (heartRate > 40 && heartRate <= 75) {
//       return "vfib.png";
//     } else if (heartRate > 75 && heartRate <= 100) {
//       return "nsr.png";
//     } else if (heartRate > 100) {
//       return "vtach.png";
//     }
//   },

//   abpChart: function () {
//     var currentSession = TestingSession.findOne({_id: Session.get("activeSession")});
//     var historyLength = currentSession.history[0].length;
//     var abpData = currentSession.history[0].slice(historyLength-10, historyLength);
//     var copiedData = [];

//     for (i=0 ; i<abpData.length ; i++) {
//       copiedData.push([abpData[i][0], parseInt(abpData[i][1])]);
//     }

//     chartObject = {
//       plotOptions: {
//         series: {
//           color: '#FF0000',
//           marker: {
//             enabled: false,
//           },
//           lineWidth: 4,
//         },
//       },
//       series: [{
//           name: 'ABP',
//           data: copiedData,
//       }]
//     };
    
//     return chartObject;
//   },

//   svo2Chart: function () {
//     var currentSession = TestingSession.findOne({_id: Session.get("activeSession")});
//     var historyLength = currentSession.history[1].length;
//     var svo2Data = currentSession.history[1].slice(historyLength-10, historyLength);
//     var copiedData = [];

//     for (i=0 ; i<svo2Data.length ; i++) {
//       copiedData.push([svo2Data[i][0], parseInt(svo2Data[i][1])]);
//     }

//     chartObject = {
//         plotOptions: {
//           series: {
//             color: '#0d74fe',
//             marker: {
//               enabled: false,
//             },
//             lineWidth: 4,
//           },
//         },

//         series: [{
//             name: 'SVO2',
//             data: copiedData,
//         }]
//     };
    
//     return chartObject;
//   },

//   mapChart: function () {
//     var currentSession = TestingSession.findOne({_id: Session.get("activeSession")});
//     var historyLength = currentSession.history[2].length;
//     var mapData = currentSession.history[2].slice(historyLength-10, historyLength);
//     var copiedData = [];

//     for (i=0 ; i<mapData.length ; i++) {
//       copiedData.push([mapData[i][0], parseInt(mapData[i][1])]);
//     }

//     chartObject = {
//         plotOptions: {
//           series: {
//             color: '#FF8000',
//             marker: {
//               enabled: false,
//             },
//             lineWidth: 4,
//           },
//         },

//         series: [{
//             name: 'MAP',
//             data: copiedData,
//         }]
//     };
    
//     return chartObject;
//   },

//   cvpChart: function () {
//     var currentSession = TestingSession.findOne({_id: Session.get("activeSession")});
//     var historyLength = currentSession.history[3].length;
//     var cvpData = currentSession.history[3].slice(historyLength-10, historyLength);
//     var copiedData = [];

//     for (i=0 ; i<cvpData.length ; i++) {
//       copiedData.push([cvpData[i][0], parseInt(cvpData[i][1])]);
//     }

//     var chartObject = {
//       plotOptions: {
//         series: {
//           color: '#00FF00',
//           marker: {
//             enabled: false,
//           },
//           lineWidth: 4,
//         },
//       },

//       series: [{
//         name: 'CVP',
//         data: copiedData,
//       }]
//     };
    
//     return chartObject;
//   },

//   capChart: function () {
//     var currentSession = TestingSession.findOne({_id: Session.get("activeSession")});
//     var historyLength = currentSession.history[4].length;
//     var capData = currentSession.history[4].slice(historyLength-10, historyLength);
//     var copiedData = [];

//     for (i=0 ; i<capData.length ; i++) {
//       copiedData.push([capData[i][0], parseInt(capData[i][1])]);
//     }

//     var chartObject = {
//       plotOptions: {
//         series: {
//           color: '#0d74fe',
//           marker: {
//             enabled: false,
//           },
//           lineWidth: 4,
//         }
//       },
//       series: [{
//         name: 'Capnograph',
//         data: copiedData,
//       }]
//     };
    
//     return chartObject;
//   },

// });

// Highcharts.setOptions({
//   chart: {
//     plotBackgroundColor: 'transparent',
//     backgroundColor: 'transparent',
//     plotBorderWidth: null,
//     plotShadow: false,
//     height: 96,
//     width: 420,
//     style: {
//       fontFamily: 'Avenir Next'
//     }
//   },

//   title: {
//     text: ""
//   },
//   subtitle: {
//     text: "",
//   },
//   tooltip: {
//     crosshairs: [false, false]
//   },
//   yAxis: {
//     gridLineWidth: 0,
//     title: {
//       text: ''
//     },
//     labels: {
//       enabled: false,
//     },
//   },
//   xAxis: {
//     labels: {
//       enabled: false,
//     },
//     minorTickLength: 0,
//     tickLength: 0,
//     lineWidth: 0,
//     minorGridLineWidth: 0,
//     lineColor: 'transparent',
//   },
//   legend: {
//     enabled: false,
//   },
// });

// // PMD "Waiting Room" functionality _____________________________________
// Template.pmd.onCreated(function () {
//   $(document).ready(function() {
//     Meteor.call("addUserToWaitingRoom", Meteor.userId());
//   });
// });

// Template.pmd.onDestroyed(function () {
//   Meteor.call("removeUserFromWaitingRoom", Meteor.userId());
// });

// window.onbeforeunload = function () {
//   Meteor.call("removeUserFromWaitingRoom", Meteor.userId());
// }