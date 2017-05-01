Meteor.methods({
  updateSessionHistory: function (sessionId, historyData) {
    TestingSession.update({_id: sessionId}, {$push: {
      'history.0' : historyData[0],
      'history.1' : historyData[1],
      'history.2' : historyData[2],
      'history.3' : historyData[3],
      'history.4' : historyData[4],
      'history.5' : historyData[5],
      'history.6' : historyData[6],
      'history.7' : historyData[7],
      'history.8' : historyData[8],
    }});
  }
});