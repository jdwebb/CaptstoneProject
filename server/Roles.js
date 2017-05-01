//   return Results.find({student: this.userId});
// });

Meteor.publish("testingSession", function () {
  return TestingSession.find({});
});
