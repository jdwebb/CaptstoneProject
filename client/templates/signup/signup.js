Template.signup.events({
  'click #signup-btn': function () {
    var user = {
      firstName: $("#firstName").val().trim(),
      lastName: $("#lastName").val().trim(),
      email: $("#email").val().trim(),
      verifyEmail: $("#verifyEmail").val().trim(),
      password: $("#password").val().trim(),
      verifyPassword: $("#verifyPassword").val().trim(),
    };

    if ((user.firstName === "" || user.lastName === "" || user.email === "") || user.password === "") {
      return swal({
        title: "Error",
        text: "Please fill in all form fields.",
        type: "error",
        confirmButtonColor: "#F27474",
      });
    }

    if ((user.email !== user.verifyEmail)) {
      return swal({
        title: "Error",
        text: "The supplied email addresses do not match.",
        type: "error",
        confirmButtonColor: "#F27474",
      });
    }

    if ((user.password !== user.verifyPassword)) {
      return swal({
        title: "Error",
        text: "The supplied passwords do not match.",
        type: "error",
        confirmButtonColor: "#F27474",
      });
    }
    
    Accounts.createUser({
      username: '',
      email: user.email,
      password: user.password,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName
      }
    }, function () {
      // ...
      
    });
    

    console.log(user);
    Router.go('signin');
  }
});