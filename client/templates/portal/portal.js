Template.portal.helpers({
  getStudentTests: function () {
    return Results.find({student: Meteor.userId()});
  }
});

  // getBlogPosts: function () {
    // return BlogPosts.find({}, {sort: {created: -1}});
  // },