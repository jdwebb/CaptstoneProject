Template.waitingroom.onCreated(function () {
  $(document).ready(function() {
    Session.setDefault("selectedUser", null);
    Meteor.call("addUserToWaitingRoom", Meteor.userId());
  });
});

Template.waitingroom.onDestroyed(function () {
  // Session.set("selectedUser", null);
  Meteor.call("removeUserFromWaitingRoom", Meteor.userId());
});

window.onbeforeunload = function () {
  // Session.set("selectedUser", null);
  Meteor.call("removeUserFromWaitingRoom", Meteor.userId());
}

Meteor.setInterval(function() {
  var students = WaitingRoomUsers.find({role: "student"});
  var instructors = WaitingRoomUsers.find({role: "admin"});
  if (students.count() === 1 && instructors.count() === 1) {
    var studentUserId = students.fetch()[0].userId;
    var instructorUserId = instructors.fetch()[0].userId;
    var testingSessionId = "YbXTqtKTYjcc2w6ml";
    //Meteor.call('createNewSession', testingSessionId, studentUserId, instructorUserId);
    Meteor.call('createNewSession', testingSessionId);
    // Session.set("activeSession", testingSessionId);

    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Router.go('instructorstation');
    } else {
      Router.go('studentstation');
    }
    Meteor.call("removeUserFromWaitingRoom", Meteor.userId());
  }
}, 5000);

Template.waitingroom.helpers({
  getCurrentStudentUsers: function () {
    return WaitingRoomUsers.find({role: "student"});
  },

  getCurrentInstructorUsers: function () {
    return WaitingRoomUsers.find({role: "admin"});
  },

  getCurrentStudentUsersCount: function () {
    return WaitingRoomUsers.find({role: "student"}).count();
  },

  getCurrentInstructorUsersCount: function () {
    return WaitingRoomUsers.find({role: "admin"}).count();
  },

  userIsSelected: function () {
    return Session.get("selectedUser") !== null;
  }
});

Template.waitingRoomUser.helpers({
  selectedClass: function () {
    var userId = this.userId;
    var selectedUser = Session.get('selectedUser');

    if ((userId === selectedUser) && (userId !== Meteor.userId())) {
      return "selected";
    }
  },

  youHelper() {
    if (this.userId === Meteor.userId()) {
      return "(YOU)";
    }
  }
});

Template.waitingroom.events({
  'click #gois': function () {
    var testingSessionId = "YbXTqtKTYjcc2w6ml";
    Meteor.call('createNewSession', testingSessionId);
    Router.go('instructorstation');
  },

  'click #goss': function () {
    var testingSessionId = "YbXTqtKTYjcc2w6ml";
    Meteor.call('createNewSession', testingSessionId);
    Router.go('studentstation');
  },
});

// if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      // console.log("Good to go");
      // Meteor.runAsync( function* () {
        // var result = yield Meteor.callPromise("createNewSession", studentUserId, instructorUserId);
        // console.log("Async done. " + result);
        // return result;
      //}); .then(result => );
      // var result = Meteor.callPromise("createNewSession", studentUserId, instructorUserId);
      // console.log("Async done. " + result);
      // Meteor.call('createNewSession', studentUserId, instructorUserId).then(
        // function (data) {
          // console.log("data lol");
        // }
      // , console.log("ERROR"));
      // Meteor.call('createNewSession', studentUserId, instructorUserId, function (error, result) {
        // Session.set("globalTime", 0);
        // if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
          // Router.go('instructorstation');
          // swal("You're an admin, go to instructorstation, Session ID: " + newSession);
        // } else {
          // Router.go('studentstation');
          // swal("You're a student, go to studentstation, Session ID: " + newSession);
        // }
      // });
    // }
    // console.log(Session.get("idResult"));
    // var newSession = Meteor.call('createNewSession', studentUserId, instructorUserId, function (error, result) {
    //   // Session.set("activeSession", result);
    //   // Session.set("globalTime", 0);
    //   // if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    //     // Router.go('instructorstation');
    //     // swal("You're an admin, go to instructorstation, Session ID: " + newSession);
    //   // } else {
    //     // Router.go('studentstation');
    //     // swal("You're a student, go to studentstation, Session ID: " + newSession);
    //   // }
    // });