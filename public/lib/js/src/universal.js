'use strict';

const pb2topThres = 100;

function pb2topShow(){
  const $t = $(this);
  if ($(this).scrollTop() > pb2topThres){
    if (!$('#page-back-to-top').hasClass('show')) $('#page-back-to-top').addClass('show');
    $t.off('scroll.pb2top-show');
    $t.on('scroll.pb2top-hide', pb2topHide);
  }
}

function pb2topHide(){
  const $t = $(this);
  if ($t.scrollTop() < pb2topThres){
    if ($('#page-back-to-top').hasClass('show')) $('#page-back-to-top').removeClass('show');
    $t.off('scroll.pb2top-hide');
    $t.on('scroll.pb2top-show', pb2topShow);
  }
}

function windowToTop(){
  const $t = $(this), $page = $('html, body');
  $t.off('click.window2top');

  // slim doesn't have $.animate

  const duration = 600; // ms
  const cb = () => {
    $page.off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove');
    $t.on('click.window2top', windowToTop);
  };

  // https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
  // ease in and out

  // cancel if already on top
  if (document.documentElement.scrollTop === 0) return cb();
  const cosParameter = document.documentElement.scrollTop / 2;
  let scrollCount = 0, oldTimestamp = null, reqId = null;
  function step(newTimestamp){
    if (oldTimestamp !== null){
      // if duration is 0 scrollCount will be Infinity
      scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
      if (scrollCount >= Math.PI){
        document.documentElement.scrollTop = 0;
        return cb();
      }
      document.documentElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
    }
    oldTimestamp = newTimestamp;
    reqId = window.requestAnimationFrame(step);
  }
  reqId = window.requestAnimationFrame(step);

  // https://stackoverflow.com/questions/18445590/jquery-animate-stop-scrolling-when-user-scrolls-manually
  $page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function(){
    window.cancelAnimationFrame(reqId);
    cb();
  });

  return false;
}


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

  $(window).on('scroll.pb2top-show', pb2topShow);
  $('#page-back-to-top').on('click.window2top', windowToTop)
})(jQuery);
