Template.instructorEmerg.onRendered( function () {
  $("#slider").val(0);
});

Template.instructorEmerg.helpers({
  'pump': function(){
    let pump = TestingSession.findOne().pump;
    return pump;
  },
});

Template.instructorEmerg.events({

/*
    Starts the oxygen fail emergency scenario
*/  
  "click #oxyfail": function(){
    Meteor.call("oxyfail", "YbXTqtKTYjcc2w6ml", 30, 93, 120, 80, 60);
  },

/*
    Starts the anesthesia fail emergency scenario
*/
  "click #anesthfail": function(){
    Meteor.call("anesthfail", "YbXTqtKTYjcc2w6ml", 60, 20, 0, 33);
  },

/*
    Starts the inadequate anticoagulation emergency scenario
*/
  "click #inadanticoag": function(){
    console.log("inadanticoag");
    // Meteor.call("inadanticoag", "YbXTqtKTYjcc2w6ml");
  },

/*
    Starts the intravascular hemolysis emergency scenario
*/  
  "click #intravashemo": function(){
    Meteor.call("intravashemo", "YbXTqtKTYjcc2w6ml", 50, 60, 43, 70, 30);
  },

/*
    Starts the intravascular hemolysis emergency scenario
*/  
  "click #sequester": function () {
    yunCommand("servo", 9, 1);
  },

/*
    Starts the intravascular hemolysis emergency scenario
*/  
  "click #bypass": function () {
    yunCommand("servo", 9, 0);
  },

/*
    logout button exits the user to the sign in screen
*/  
  "click #logout": function () {
    Meteor.logout();
    Router.go('signin');
  },

/*
    Turns the pump on: changes HR to flatline and says pump is on
*/  
  "click #pumpon": function () {
    Meteor.call("pumpChange", "YbXTqtKTYjcc2w6ml", true);
    Meteor.call("changeHR", "YbXTqtKTYjcc2w6ml", 3);
  },

/*
    Turns the pump off: changes HR to fibrillation and says pump is off
*/  
  "click #pumpoff": function () {
    Meteor.call("pumpChange", "YbXTqtKTYjcc2w6ml", false);
    Meteor.call("changeHR", "YbXTqtKTYjcc2w6ml", 5);
  },


  "change #slider": function () {
    var sliderValue = $("#slider").val();
    yunCommand("servo", 9, sliderValue);
    $("#sliderValue").text(sliderValue + "% blood loss");
  },


/*
    Button that brings the user back to the waiting room
*/ 
  "click #return": function () {
    swal({
      title: "Are you sure?",
      text: "Are you sure you'd like to return to the waiting room?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#337ab7",
    }, function (isConfirm) {
      if (isConfirm) {
        Router.go('waitingroom');
      }
    });
  },

/*
    Button that ends the simulation and prompts the user to save the test data
    Also drops the database
*/ 
  "click #endSimulation":function(){
    swal({
      title: "Ending the simulation",
      text: "Please enter a file name below to store the most recent testing session:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "ChristovsTest"
    },
    function(inputValue){
      if (inputValue === false) return false;
      
      if (inputValue === "") {
        swal.showInputError("Please provide a valid file name.");
        return false
      }
      
      swal("Saved.","Your testing session: " + inputValue + " has been saved.", "success");
        Meteor.call('runCode', inputValue , function (err, response) {
          console.log(response);
        });
        Meteor.call("dropTestSession");
        Meteor.call("dropMessages");
        Router.go('portal');
    });
  }
});

var yunCommand = function (commandType, pin, value) {
  var ipAddress = "http://10.131.52.34";
  var requestString = "/arduino/" + commandType + "/" + pin + "/" + value;
  console.log(ipAddress + requestString);
  var headers = {};

  HTTP.call("GET", ipAddress + requestString, headers, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      return result;
    }
  });

}