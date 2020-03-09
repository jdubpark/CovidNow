'use strict';

let prevPadTop = -1;
function adjustMenuPad(navht, wintop){
  const padtop = Math.max(0, navht-wintop);
  // console.log(padtop);
  if (padtop !== prevPadTop) $('#doc-menu').css('padding-top', padtop);
  prevPadTop = padtop;
}

(function($){
  const navht = $('#main-nav').height();
  $(window).on('scroll.docmenu', function(){
    adjustMenuPad(navht, $(this).scrollTop());
  });
})(jQuery);
