// Set the title of each page of the website
document.title = "Team Ichor";

Template.navbar.helpers({
  // This helper adds the "active" class to a navbar item if the user is currently on that page
  activeClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();

    // check if the user has navigated to a page defined by the router
    if (Router.current().route) {
      var active = _.any(args, function(name) {
        return Router.current() && Router.current().route.getName() === name;
      });
    }
    
    return active && 'active';
  }
});