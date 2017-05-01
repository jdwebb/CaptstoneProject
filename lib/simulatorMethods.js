Meteor.methods({
  cvpUp: function (sessionId) {
    TestingSession.update({_id: sessionId}, {$inc: {cvp: 1}});
  },

  cvpDown: function (sessionId) {
    TestingSession.update({_id: sessionId}, {$inc: {cvp: -1}});
  },

  svo2Up: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {svo2: 5}});
  },

  svo2Down: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {svo2: -5}});
  },

  bisUp: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {bis: 3}});
  },

  bisDown: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {bis: -3}});
  },

  bladTempUp: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {bladTemp: 1}});
  },

  bladTempDown: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {bladTemp: -1}});
  },

  esoTempUp: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {esoTemp: 1}});
  },

  esoTempDown: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {esoTemp: -1}});
  },

  abpUp: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {abp: 10, abp2: 10, map:10, alp:10}});
  },

  abpDown: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {abp: -10, abp2: -10, map:-10, alp:-10}});
  },

  capUp: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {cap: 5}});
  },

  capDown: function (sessionId) {
  	TestingSession.update({_id: sessionId}, {$inc: {cap: -5}});
  },

  hrUp: function (sessionId) {
    TestingSession.update({_id: sessionId}, {$inc: {hr: 5}});
  },
  hrUp: function (sessionId) {
    TestingSession.update({_id: sessionId}, {$inc: {hr: 5}});
  },

  hrDown: function (sessionId) {
    TestingSession.update({_id: sessionId}, {$inc: {hr: -5}});
  },

  administerPhen: function (sessionId, mapValue, abp1Changes, abp2Changes, alpChanges) {
    TestingSession.update({_id: sessionId}, {$set:{map: mapValue, abp:abp1Changes, abp2: abp2Changes, alp:alpChanges}});
  },
  adminHepa: function(sessionId, hepaAmountVar, hepabool){
    TestingSession.update({_id: sessionId}, {$set:{hepaAmount: hepaAmountVar, hepa:hepabool}});
  },
  adminNahco: function(sessionId, nahcoAmountVar, nahcobool){
    TestingSession.update({_id: sessionId}, {$set:{nahcoAmount: nahcoAmountVar, nahco:nahcobool}});
  },
  adminLido: function(sessionId, lidoAmountVar, lidobool){
    TestingSession.update({_id: sessionId}, {$set:{lidoAmount: lidoAmountVar, lido:lidobool}});
  },
  adminMag: function(sessionId, magAmountVar, magbool){
    TestingSession.update({_id: sessionId}, {$set:{magAmount: magAmountVar, mag:magbool}});
  },
  changeHR: function(sessionId, btnNum){
    TestingSession.update({_id: sessionId}, {$set:{ecgGif: btnNum}});
  },
  oxyfail: function(sessionId, svo2Amount, mapAmount, abp1Amount, abp2Amount, bisAmount){
    TestingSession.update({_id: sessionId}, {$set:{svo2:svo2Amount, abp:abp1Amount, abp2:abp2Amount, map:mapAmount, bis:bisAmount}});
  },
  anesthfail: function(sessionId, abp1Amount, abp2Amount, capAmount, mapAmount){
    TestingSession.update({_id: sessionId}, {$set:{abp:abp1Amount, abp2:abp2Amount, cap:capAmount, map:mapAmount}});
  },
  // inadanticoag: function(sessionId),
  intravashemo: function(sessionId, svo2Amount, bisAmount, mapAmount, abp1Amount, abp2Amount){
    TestingSession.update({_id: sessionId}, {$set:{svo2:svo2Amount, bis:bisAmount, map:mapAmount, abp:abp1Amount, abp2:abp2Amount}});
  },
  addMessage: function(amount, unit, name, date){
    Messages.insert({"name": name, "units":unit, "amount": amount, "DateTime": date, displayed:false});
  },
  updateMessage: function(id){
    Messages.update({_id: id}, {$set:{displayed:true}});
  },
  dropMessages: function(){
    var message = Messages.find({}).fetch();
    var count;
    for(count = 0; count < message.length; count++){
      var temp = message[count];
      console.log(temp);
      Messages.remove(temp._id);
    }
  },
  dropTestSession: function(){
    TestingSession.remove("YbXTqtKTYjcc2w6ml");
  },
  pumpChange: function(sessionId, pumpBool){
    TestingSession.update({_id: sessionId}, {$set:{pump: pumpBool}});
  }
});