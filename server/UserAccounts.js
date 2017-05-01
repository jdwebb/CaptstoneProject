Accounts.onCreateUser( function (options, user) {
  var userId = user._id;
  Roles.addUsersToRoles(userId, 'student');
  return user;
});

// For testing purposes only: two default user accounts
if (Meteor.users.find({roles: "admin"}).count() === 0) {
  var userId = Accounts.createUser({
    username: "Admin User",
    email: "admin@quinnipiac.edu",
    password: "admin",
    profile: {
      firstName: "Admin",
      lastName: "User"
    }
  });
  Roles.addUsersToRoles(userId, 'admin');
}

if (Meteor.users.find({roles: "student"}).count() === 0) {
  var userId = Accounts.createUser({
    username: "Student User",
    email: "student@quinnipiac.edu",
    password: "student",
    profile: {
      firstName: "Student",
      lastName: "User"
    }
  });
  Roles.addUsersToRoles(userId, 'student');
}