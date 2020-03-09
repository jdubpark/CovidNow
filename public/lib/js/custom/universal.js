'use strict';

(function($){
  $('#main-nav-trigger').on('click', function(){
    const $t = $(this);
    if ($t.hasClass('active')){
      $t.removeClass('active');
      $('#main-nav-menu').removeClass('opened');
      if ($('#wrapper')) $('#wrapper').removeClass('paused');
    } else {
      $t.addClass('active');
      $('#main-nav-menu').addClass('opened');
      if ($('#wrapper')) $('#wrapper').addClass('paused');
    }
  });
})(jQuery);
