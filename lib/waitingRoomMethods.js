Meteor.methods({
  addUserToWaitingRoom: function (inputUserId) {
    if (WaitingRoomUsers.find({userId: inputUserId}).count() === 0) {
      var currentUserRole = Meteor.users.find({_id: inputUserId}).fetch()[0].roles[0];
      var currentUser = Meteor.users.find({_id: inputUserId}).fetch()[0];

      WaitingRoomUsers.insert({userId: inputUserId, firstName: currentUser.username, lastName: "", role: currentUserRole});
    }
  },

  removeUserFromWaitingRoom: function (inputUserId) {
    WaitingRoomUsers.remove({userId: inputUserId});
  },

});