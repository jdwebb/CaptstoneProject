Meteor.publish('waitingRoomUsers', function() {
  return WaitingRoomUsers.find({}); 
});

Meteor.publish('messages', function(){
	return Messages.find();	
});  

