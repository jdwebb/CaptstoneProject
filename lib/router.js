Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'signin'});

// Router.route('/studentstation', {name: 'studentstation'});

// Router.route('/instructorstation', {name: 'instructorstation'});
Router.route('/test', {name: 'testFileUpload'});

Router.route('/signup/', {name: 'signup'});

Router.route('/portal/', {
  name: 'portal',
  waitOn: function () {
    Meteor.subscribe('results');
  },
});

Router.route('/simulator/', {name: 'simulator'});

Router.route('/instructorstation/', {
  name: 'instructorstation',
  waitOn: function () {
    Meteor.subscribe('waitingRoomUsers');
    return Meteor.subscribe('testingSession');
  },
  onBeforeAction: function () {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      this.next();
    } else {
      this.render('accessDenied');
    }
  },
});

Router.route('/studentstation/', {
  name: 'studentstation',
  waitOn: function () {
    Meteor.subscribe('waitingRoomUsers');
    return Meteor.subscribe('testingSession');
  },
  onBeforeAction: function () {
    this.next();
  },
});

Router.route('/waitingroom/', {
  name: 'waitingroom',
  waitOn: function () {
    return Meteor.subscribe('waitingRoomUsers');
  },
  onBeforeAction: function () {
    if (Meteor.userId()) {
      this.next();
    } else {
      this.render('accessDenied');
    }
  }
});

Router.route('/portal/results/:_id', {
  name: 'results',
  waitOn: function () {
    return Meteor.subscribe('results', this.params._id);
  },
  data: function () { return Results.findOne(this.params._id); }
});