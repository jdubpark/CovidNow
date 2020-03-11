'use strict';

(function($){
  $('#main-nav-trigger').on('click', function(){
    const $t = $(this);
    if ($t.hasClass('active')){
      $t.removeClass('active');
      $('#main-nav-menu').removeClass('opened');
      $('body').removeClass('paused');
    } else {
      $t.addClass('active');
      $('#main-nav-menu').addClass('opened');
      $('body').addClass('paused');
    }
  });
})(jQuery);
