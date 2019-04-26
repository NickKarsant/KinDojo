var LintStream = require('jslint').LintStream;




$(window).on('scroll', function() { 
  
  var coverDistance = $('.cover').offset().top;

  var distanceScrolled = $(window).scrollTop();
  
  if (distanceScrolled >= coverDistance) {
   $('.cover').addClass('scrolled');
  }else {
     $('.cover').removeClass('scrolled');
  }
});






