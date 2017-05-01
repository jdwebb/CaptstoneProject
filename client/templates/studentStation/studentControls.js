Template.studentControls.helpers({
  svo2Amount: function (){
    let svo2Amount = Session.get("svo2Amount");
    return svo2Amount;
  },
  bladTempAmount: function (){
    let bladTempAmount = Session.get("bladTempAmount");
    return bladTempAmount;
  },
  'pump': function(){
    let pump = TestingSession.findOne().pump;
    return pump;
  },
});

Template.studentControls.rendered = function () {
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

  this.$('.bladTempSlider').noUiSlider({
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
  var bladTempSlider = this.$('.bladTempSlider');
  Session.set("bladTempAmount", bladTempSlider.val());
};

Template.studentControls.events({
  
	"change .svo2Slider": function () {
    	let svo2Slider = $('.svo2Slider');
    	Session.set("svo2Amount", svo2Slider.val());
  	},
  	"slide .svo2Slider": function () {
    	let svo2Slider = $('.svo2Slider');
    	Session.set("svo2Amount", svo2Slider.val());
  	},
  	"change .bladTempSlider": function () {
    	let bladTempSlider = $('.bladTempSlider');
    	Session.set("bladTempAmount", bladTempSlider.val());
  	},
  	"slide .bladTempSlider": function () {
    	let bladTempSlider = $('.bladTempSlider');
    	Session.set("bladTempAmount", bladTempSlider.val());
  	},
});