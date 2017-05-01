// x// set the document title on page load
// // document.title = "Results";

// Template.results.onRendered(function () {
//   // Remove the "Highcharts.com" logo under each individual graph
//   $("text").each( function (index) {
//     if ($(this).text() === "Highcharts.com") {
//       $(this).text("");
//     }
//   });
// });

// Template.results.helpers({
//   perfusionData: function () {
//     return {
//         chart: {
//             plotBackgroundColor: null,
//             plotBorderWidth: null,
//             plotShadow: true,
//             // height: 600,
//         },
//         title: {
//           text: "Sample Perfusion Data"
//         },
//         subtitle: {
//           text: "Student Name",
//         },
//         tooltip: {
//           crosshairs: [true, true]
//         },
//         yAxis: {
//             title: {
//                 text: 'Units'
//             },
//             plotLines: [{
//                 value: 0,
//                 width: 1,
//                 color: '#808080'
//             }]
//         },
//         plotOptions: {},
//         // series: [Meteor.call('getRequestedPerfusionData', function (error, result) {})]
//         series: [{ // this should be retrieved from the DB!
//             name: 'MAP',
//             data: [[0,1], [1,-3], [2,4], [3,1], [4,5]]
//         }, {
//             name: 'SVO2',
//             data: [[0,2], [1,0], [2,-2], [3,4], [4,6]]
//         }, {
//             name: 'Flow Rate',
//             data: [[0,2], [1,2], [2,2.5], [3,3], [4,2.7]]
//         }, {
//             name: 'ALP',
//             data: [[0,3], [1,-1], [2,7], [3,1], [4,0]]
//         }, {
//             name: 'Core Temp.',
//             data: [[0,4], [1,7], [2,0], [3,1], [4,4]]
//         }]
//     };
//   }
// });

// Highcharts.setOptions({
//     chart: {
//         style: {
//             fontFamily: 'Avenir Next'
//         }
//     }
// });