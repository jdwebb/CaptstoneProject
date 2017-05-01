// <!-- NOT USED IN THE CURRENT VERSION OF THE SOFTWARE! -->
Template.home.events({
  "click #student-portal": function () {
    Router.go("portal");
  },

  "click #perf-sim": function () {
    Router.go("simulator");
  }
});

Template.home.helpers({
  getUserRole: function () {
    return "Student ";
  }
});
// <!-- NOT USED IN THE CURRENT VERSION OF THE SOFTWARE! -->