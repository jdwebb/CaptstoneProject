Template.signin.events({

/*
	Sign in button function checks email and password to make sure they are valid
*/
	'click #signin-btn': function () {
		var info = {
	    eventId: $('#event').val(),
	    email: $('#email').val(),
	    password: $('#password').val(),
	  };

    if (info.email.trim() === "" || info.password.trim() === "") {
      return swal({
        title: "Error",
        text: "Please fill in all form fields.",
        type: "error",
        confirmButtonColor: "#F27474",
      });
    }

		Meteor.loginWithPassword(info.email, info.password, function (error) {
			if (error) {
				swal(error.reason);
      } else {
				// Meteor.logoutOtherClients();
				// var loggedInUser = Meteor.user();
				Router.go('waitingroom');
			}
     });
	},

/*
    Sign-up button brings the user to the sign up page to create an account
*/
	'click #signup-btn': function () {
		Router.go('signup');
	}
});