Meteor.methods({
  createNewSession: function (testingSessionId)
  //(testingSessionId, testingStudent, testingInstructor) 
  {
    var newSession = TestingSession.insert({
      "_id": testingSessionId,
      // "studentId" : testingStudent,
      // "instructorId" : testingInstructor,
      "active": true,
      "cvp" : 2,
      "svo2" : 75,
      "bis" : 50,
      "alp" : 220,
      "bladTemp" : 37,
      "esoTemp" : 37,
      "abp" : 120,
      "abp2" : 80,
      "map" : 93,
      "ecg" : 80,
      "hr" : 80,
      "cap" : 35,
      "ecgGif" : 1,
      "pump": false,
      "resultsId" : "12345", // needs to be implemented...
      "history" : [  ],
    });
    return newSession;
  }
});