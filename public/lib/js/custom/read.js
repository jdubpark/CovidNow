'use strict';

let prevPadTop = -1;
function adjustMenuPad(navht, wintop){
  const padtop = Math.max(0, navht-wintop);
  // console.log(padtop);
  if (padtop !== prevPadTop) $('#doc-menu').css('padding-top', padtop);
  prevPadTop = padtop;
}

(function($){
  const navht = $('#main-nav').height(); // 89px mobile, 99px comp.
  adjustMenuPad(navht, $(window).scrollTop()); // init run
  $(window).on('scroll.docmenu', function(){
    adjustMenuPad(navht, $(this).scrollTop());
  });

  $('#doc-menu-trigger').on('click', function(){
    const $t = $(this);
    if ($t.hasClass('active')){
      $t.removeClass('active');
      $('#doc-menu-inner').removeClass('opened');
    } else {
      $t.addClass('active');
      $('#doc-menu-inner').addClass('opened');
    }
  });

  $(document).on('click', function(e){
    const $trigger = $('#doc-menu-trigger'), $inner = $('#doc-menu-inner');
    console.log(e.target);
    if (
      $inner !== e.target && !$inner.has(e.target).length &&
      $trigger !== e.target && !$trigger.has(e.target).length
    ){
      $trigger.removeClass('active');
      $inner.removeClass('opened');
    }
  });
})(jQuery);
