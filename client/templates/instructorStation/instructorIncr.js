
Template.instructorIncr.helpers({
  hepaAmountdb: function (){
    let hepaAmountdb = TestingSession.findOne().hepaAmount;
    return hepaAmountdb;
  },
  hepaBoolean: function (){
    let hepaBoolean = TestingSession.findOne().hepa;
    if(hepaBoolean == true){
      return 'true';
    }
  }
});

Template.instructorIncr.events({

  "click #abpUp": function () {
    var abpValue1 = TestingSession.findOne().abp+10;
    var abpValue2 = TestingSession.findOne().abp2+10;
    if (abpValue1 <= 180) {
      Meteor.call('abpUp', "YbXTqtKTYjcc2w6ml");
    }
  },

  "click #abpDown": function () {
    var abpValue1 = TestingSession.findOne().abp-10;
    var abpValue2 = TestingSession.findOne().abp2-10;
    if (abpValue1 >= 40) {
      Meteor.call('abpDown', "YbXTqtKTYjcc2w6ml" );  
    }
  },

  "click #cvpUp": function () {
    var cvpValue = TestingSession.findOne().cvp+1;
    if (cvpValue <= 20) {
      Meteor.call('cvpUp', "YbXTqtKTYjcc2w6ml");
    }
  },

  "click #cvpDown": function () {
    var cvpValue = TestingSession.findOne().cvp-1;
    if (cvpValue >= 0) {
      Meteor.call('cvpDown', "YbXTqtKTYjcc2w6ml");
    }
  },

  "click #svo2Up": function () {
    var svo2Value = TestingSession.findOne().svo2+5;
    if (svo2Value <= 100) {
      Meteor.call('svo2Up',"YbXTqtKTYjcc2w6ml");
    }
  },

  "click #svo2Down": function () {
    var svo2Value = TestingSession.findOne().svo2-5;
    if (svo2Value >= 30) {
      Meteor.call('svo2Down',"YbXTqtKTYjcc2w6ml");
    }
  },

  "click #bisUp": function () {
    var bisValue = TestingSession.findOne().bis+3;
    if (bisValue <= 65) {
      Meteor.call('bisUp', "YbXTqtKTYjcc2w6ml");
    }
  },

  "click #bisDown": function () {
    var bisValue = TestingSession.findOne().bis-3;
    if (bisValue >= 15) {
      Meteor.call('bisDown', "YbXTqtKTYjcc2w6ml");
    }
  },

  "click #bladTempUp": function () {
    var bladTempValue = TestingSession.findOne().bladTemp+1;
    if (bladTempValue <= 38) {
      Meteor.call('bladTempUp', "YbXTqtKTYjcc2w6ml");
    }
  },

  "click #bladTempDown": function () {
    var bladTempValue = TestingSession.findOne().bladTemp-1;
    if (bladTempValue >= 18) {
      Meteor.call('bladTempDown', "YbXTqtKTYjcc2w6ml");
    }
  },

  "click #esoTempUp": function () {
    var esoTempValue = TestingSession.findOne().esoTemp+1;
    if (esoTempValue <= 38) {
      Meteor.call('esoTempUp', "YbXTqtKTYjcc2w6ml");
    }
  },

  "click #esoTempDown": function () {
    var esoTempValue = TestingSession.findOne().esoTemp-1;
    if (esoTempValue >= 18) {
      Meteor.call('esoTempDown', "YbXTqtKTYjcc2w6ml");
    }
  },

  "click #mapUp": function () {
    var mapValue = TestingSession.findOne().map+5;
    if (mapValue <= 110) {
      Meteor.call('mapUp', "YbXTqtKTYjcc2w6ml");  
    }
  },

  "click #mapDown": function () {
    var mapValue = TestingSession.findOne().map-5;
    if (mapValue >= 20) {
      Meteor.call('mapDown', "YbXTqtKTYjcc2w6ml");  
    }
  },

  "click #capUp": function () {
    var capValue = TestingSession.findOne().cap+5;
    if (capValue <= 70) {
      Meteor.call('capUp', "YbXTqtKTYjcc2w6ml");  
    }
  },

  "click #capDown": function () {
    var capValue = TestingSession.findOne().cap-5;
    if (capValue >= 0) {
      Meteor.call('capDown', "YbXTqtKTYjcc2w6ml");  
    }
  },

  "click #hrUp": function () {
    Meteor.call('hrUp', Session.get("activeSession"));  
  },

  "click #hrDown": function () {
    Meteor.call('hrDown', Session.get("activeSession"));  
  },
});