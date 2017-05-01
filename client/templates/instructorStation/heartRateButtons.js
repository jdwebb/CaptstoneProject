Template.heartRateButtons.events({


/*
    Change the ECG to normal sinus rhythm
*/
  "click #normalHR": function () {
  		Meteor.call("changeHR", "YbXTqtKTYjcc2w6ml", 1);
    },

/*
    Change the ECG to the faster heart rate
*/
    "click #fasterHR": function () {
  		Meteor.call("changeHR", "YbXTqtKTYjcc2w6ml", 2);
    },

/*
    Change the ECG to flatline
*/
    "click #flHR": function () {
  		Meteor.call("changeHR", "YbXTqtKTYjcc2w6ml", 3);
    },

/*
    Change the ECG to the slower heart rate
*/
    "click #slowerHR": function () {
  		Meteor.call("changeHR", "YbXTqtKTYjcc2w6ml", 4);
    },

/*
    Change the ECG to atrial fibrillation
*/
    "click #fibHr": function () {
  		Meteor.call("changeHR", "YbXTqtKTYjcc2w6ml", 5);
    },

});