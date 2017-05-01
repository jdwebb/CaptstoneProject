
Template.studentActions.onCreated(function (){
  Session.set("alertBol", false);
  Meteor.subscribe('messages');

});
Template.studentActions.helpers({
  'getMessages': function(){
    let message = Messages.find({}, {sort: {DateTime: -1,}});
    return message;
  },
  alert: function(){
    let message = Messages.find({} ,{sort: {DateTime: -1,}}).fetch();
    var count;
    for(count = 0; count < message.length; count++){
      var temp = message[count];
      if(temp.displayed == false){
        sAlert.error("Student administered " + temp.amount + " " + temp.units + " of " + temp.name);
      }
      Meteor.call("updateMessage", temp._id);
    }
    return null;
  }
});

