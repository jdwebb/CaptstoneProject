Template.student.helpers({
  drugValues: function () {
    return TestingSesssion.find({_id:"isj9fj983j9"});  
  },
  hepaAmount: function (){
    let hepaAmount = Session.get("hepaAmount");
    return hepaAmount;
  },
  phenAmount: function (){
    let phenAmount = Session.get("phenAmount");
    return phenAmount;
  },
  nahcoAmount: function (){
    let nahcoAmount = Session.get("nahcoAmount");
    return nahcoAmount;
  },
  lidoAmount: function (){
    let lidoAmount = Session.get("lidoAmount");
    return lidoAmount;
  },
  magAmount: function (){
    let magAmount = Session.get("magAmount");
    return magAmount;
  },
  svo2Amount: function (){
    let svo2Amount = Session.get("svo2Amount");
    return svo2Amount;
  },
  
  //Testing purposes 
  // hepaAmountdb: function (){
  //   let hepaAmountdb = TestingSession.findOne().hepaAmount;
  //   return hepaAmountdb;
  // },
  // nahcoAmountdb: function (){
  //   let nahcoAmountdb = TestingSession.findOne().nahcoAmount;
  //   return nahcoAmountdb;
  // },
  // nahcoBol: function(){
  //   let nahcoBol = TestingSession.findOne().nahco;
  //   if(nahcoBol == false)
  //   return "false";
  // }
});

// Template.student.onCreated(function(){
//   var x = TestingSession.findOne(); 
//   Session.set('hepaAmountdb', x.hepaAmount);
//   Session.set('hepaBoolean', x.hepa);
// });

Template.student.rendered = function () {
  //init the slider

  Session.set('time', 1800);
  
  $('.timer').hide();

  this.$('.hepaSlider').noUiSlider({
    start: 0,
    connect: "lower",
    step: 1000,
    format: wNumb({
      decimals: 0,
    }),
    range: {
      'min': 0,
      'max': 50000
    },
  });

  var hepaSlider = this.$('.hepaSlider');
  Session.set("hepaAmount", hepaSlider.val());

  this.$('.phenSlider').noUiSlider({
    start: 0,
    connect: "lower",
    step: 10,
    format: wNumb({
      decimals: 0,
    }),
    range: {
      'min': 0,
      'max': 100
    },
  });
  var phenSlider = this.$('.phenSlider');
  Session.set("phenAmount", phenSlider.val());

  this.$('.nahcoSlider').noUiSlider({
    start: 0,
    connect: "lower",
    step: 5,
    format: wNumb({
      decimals: 0,
    }),
    range: {
      'min': 0,
      'max': 150
    },
  });
  var nahcoSlider = this.$('.nahcoSlider');
  Session.set("nahcoAmount", nahcoSlider.val());

  this.$('.lidoSlider').noUiSlider({
    start: 0,
    connect: "lower",
    step: 50,
    format: wNumb({
      decimals: 0,
    }),
    range: {
      'min': 0,
      'max': 250
    },
  });
  var lidoSlider = this.$('.lidoSlider');
  Session.set("lidoAmount", lidoSlider.val());

  this.$('.magSlider').noUiSlider({
    start: 0,
    connect: "lower",
    step: 1,
    format: wNumb({
      decimals: 0,
    }),
    range: {
      'min': 0,
      'max': 3
    },
  });
  var magSlider = this.$('.magSlider');
  Session.set("magAmount", magSlider.val());

  this.$('.svo2Slider').noUiSlider({
    start: 75,
    connect: "lower",
    step: 5,
    format: wNumb({
      decimals: 0,
    }),
    range: {
      'min': 20,
      'max': 100
    },
  });
  var svo2Slider = this.$('.svo2Slider');
  Session.set("svo2Amount", svo2Slider.val());
};

Template.student.events({
  "change .hepaSlider": function () {
    let hepaSlider = $('.hepaSlider');
    Session.set("hepaAmount", hepaSlider.val());
  },
  "slide .hepaSlider": function () {
    let hepaSlider = $('.hepaSlider');
    Session.set("hepaAmount", hepaSlider.val());
  },
  "change .phenSlider": function () {
    let phenSlider = $('.phenSlider');
    Session.set("phenAmount", phenSlider.val());
  },
  "slide .phenSlider": function () {
    let phenSlider = $('.phenSlider');
    Session.set("phenAmount", phenSlider.val());
  },
  "change .nahcoSlider": function () {
    let nahcoSlider = $('.nahcoSlider');
    Session.set("nahcoAmount", nahcoSlider.val());
  },
  "slide .nahcoSlider": function () {
    let nahcoSlider = $('.nahcoSlider');
    Session.set("nahcoAmount", nahcoSlider.val());
  },
  "change .lidoSlider": function () {
    let lidoSlider = $('.lidoSlider');
    Session.set("lidoAmount", lidoSlider.val());
  },
  "slide .lidoSlider": function () {
    let lidoSlider = $('.lidoSlider');
    Session.set("lidoAmount", lidoSlider.val());
  },
  "change .magSlider": function () {
    let magSlider = $('.magSlider');
    Session.set("magAmount", magSlider.val());
  },
  "slide .magSlider": function () {
    let magSlider = $('.magSlider');
    Session.set("magAmount", magSlider.val());
  },
  "change .svo2Slider": function () {
    let svo2Slider = $('.svo2Slider');
    Session.set("svo2Amount", svo2Slider.val());
  },
  "slide .svo2Slider": function () {
    let svo2Slider = $('.svo2Slider');
    Session.set("svo2Amount", svo2Slider.val());
  },
  "click #sweepUp": function () {
    Meteor.call('sweepUp');
  },

  "click #sweepDown": function () {
    Meteor.call('sweepDown');
  },

  "click #fioUp": function () {
    Meteor.call('fioUp');
  },

  "click #fioDown": function () {
    Meteor.call('fioDown');
  },

  "click #administer": function () {
    Meteor.call('administer');
  },

  "click #clear": function () {
    clearSlider();
  },

  "click #logout": function () {
    swal({
      title: "Are you sure?",
      text: "Are you sure you'd like to logout?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#337ab7",
    }, function (isConfirm) {
      if (isConfirm) {
        Meteor.logout();
        Router.go('signin');
      }
    });
  },

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

  "click #administer": function() {
    let hep = $(".hepaSlider").val();
    let phen = $(".phenSlider").val();
    let nahco = $(".nahcoSlider").val();
    let lido = $(".lidoSlider").val();
    let mag = $(".magSlider").val();

    if(hep > 0){
      $(".hepaSlider").attr('disabled','disabled');
      adminHeparin();
      //startTimer();
      $(".hepaSlider").val(0);
      Session.set("hepaAmount", 0);
      console.log("admin Heparin " + hep);
    }
    if(phen > 0){
      adminPhen();
      $(".phenSlider").val(0);
      Session.set("phenAmount", 0);
      console.log("admin Phen " + phen);
    }
    if(nahco > 0){
      adminNahco();
      $(".nahcoSlider").val(0);
      Session.set("nahcoAmount", 0);
      console.log("admin Nacho " + nahco);
    }
    if(lido > 0 && mag > 0){
      adminLido();
      Session.set("lidoAmount", 0);
      console.log("admin Lido " + lido);
      adminMag ();
      Session.set("magAmount", 0);
      console.log("admin Mag " + mag);
      $(".lidoSlider").val(0);
      $(".magSlider").val(0);
    }

  }
});

adminHeparin = function(){
    let hepaAmount = $(".hepaSlider").val();
    Meteor.call('adminHepa',"YbXTqtKTYjcc2w6ml", hepaAmount, true);
    Meteor.call('addMessage', hepaAmount, 'U/kg', "Heparin", new Date());

}

adminPhen = function(){
  let mapValue = TestingSession.findOne().map;
  let abp2 = TestingSession.findOne().abp2;
  let phenAmount = $(".phenSlider").val();
  let mapChanges = (mapValue+(0.5*phenAmount));
  let abp2Changes = abp2+(0.5*phenAmount);
  let abp1Changes = abp2Changes+40;
  let alpChanges = abp1Changes+100;
  if(mapChanges<110){
    Meteor.call('administerPhen',"YbXTqtKTYjcc2w6ml", mapChanges, abp1Changes, abp2Changes, alpChanges);
    Meteor.call('addMessage', phenAmount, 'μg', "Phenyl", new Date());
  }
  // console.log(TestingSession.findOne().map);
}

adminNahco = function(){
  let nahcoAmount = $(".nahcoSlider").val();
  Meteor.call('adminNahco',"YbXTqtKTYjcc2w6ml", nahcoAmount, true);
  Meteor.call('addMessage', nahcoAmount, 'mEq', "NaHCO3", new Date());
}

adminLido = function(){
  let lidoAmount = $(".lidoSlider").val();
  Meteor.call('adminLido',"YbXTqtKTYjcc2w6ml", lidoAmount, true);
  Meteor.call("changeHR", "YbXTqtKTYjcc2w6ml", 1);
  Meteor.call('addMessage', lidoAmount, 'mg', "Lido", new Date());

}

adminMag = function(){
  let magAmount = $(".magSlider").val();
  Meteor.call('adminMag',"YbXTqtKTYjcc2w6ml", magAmount, true);
  Meteor.call('addMessage', magAmount, 'g', "Mag", new Date());
}

function clearSlider(){
  $(".phenSlider").val(0);
  Session.set("phenAmount", 0);
  $(".nahcoSlider").val(0);
  Session.set("nahcoAmount", 0);
  $(".hepaSlider").val(0);
  Session.set("hepaAmount", 0);
  $(".lidoSlider").val(0);
  Session.set("lidoAmount", 0);
  $(".magSlider").val(0);
  Session.set("magAmount", 0);
}

// function startTimer(){
//     $('.timer').show();
//     var time = Session.get('time');
//     var minutes = Math.floor(time/60);
//     var seconds = time - minutes * 60;
//     Meteor.setInterval(function(){
//         var time = Session.get('time') - 1; 
//         Session.set('time', time);
//     }, 1000);
// }
