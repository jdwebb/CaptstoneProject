Meteor.startup(function () {

    sAlert.config({
        effect: '',
        position: 'top-right',
        timeout: 8000,
        html: true,
        onRouteClose: true,
        stack: true,
        offset: 0,
        beep: false,
        onClose: _.noop
    });

});