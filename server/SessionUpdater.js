var globalTime = 0;

Meteor.setInterval( function () {
  var activeTestingSession = TestingSession.findOne({active: true});
  var data = {
    cvp: activeTestingSession.cvp,
    svo2: activeTestingSession.svo2,
    bis: activeTestingSession.bis,
    alp: activeTestingSession.alp,
    bladTemp: activeTestingSession.bladTemp,
    esoTemp: activeTestingSession.esoTemp,
    abp: activeTestingSession.abp,
    map: activeTestingSession.map,
    ecg: activeTestingSession.ecg,
    hr: activeTestingSession.hr,
    cap: activeTestingSession.cap,
  };
  globalTime += 1;
  continuousWrite(activeTestingSession._id, globalTime, data);
}, 1000);

var continuousWrite = function (sessionId, globalTime, data) {
  // console.log(sessionId);
  var updatedData = [
    [globalTime, data.abp],
    [globalTime, data.svo2],
    [globalTime, data.map],
    [globalTime, data.cvp],
    [globalTime, data.cap],
    [globalTime, data.bis],
    [globalTime, data.alp],
    [globalTime, data.bladTemp],
    [globalTime, data.esoTemp],
  //   [globalTime, data.ecg],
  //   [globalTime, data.hr],
  ];

  Meteor.call('updateSessionHistory', sessionId, updatedData, function (error) {
    if (error) {
      console.log(error);
    }
  });
}