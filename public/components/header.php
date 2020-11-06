<?php
  function isLocalhost($whitelist = ['127.0.0.1', '::1']) {
    return in_array($_SERVER['REMOTE_ADDR'], $whitelist);
  }

  // RQ = require
  define('RQ_BASE_DIR', isLocalhost() ? '/website/CovidNow/public' : '');
  define('RQ_LIB_DIR', RQ_BASE_DIR.'/lib');
  function relDistFile($fname, $type='style', $echo=true){
    $path = RQ_LIB_DIR.'/'.$type.'/dist/'.$fname;
    if ($echo) echo $path;
    else return $path;
  }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="keywords" content="coronavirus, covid, covid-19" />
    <meta name="description" content="Live updates and information regarding COVID-19." />
    <meta name="author" content="Park Jong Won" />
    <title><?php echo PAGE_TITLE ?? 'COVID-19' ; ?> - CovidNow</title>
    <link rel="canonical" href="https://covidnow.com/" />
    <!-- External Style -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700;800&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.1/css/bulma.min.css" integrity="sha512-ZRv40llEogRmoWgZwnsqke3HNzJ0kiI0+pcMgiz2bxO6Ew1DVBtWjVn0qjrXdT3+u+pSN36gLgmJiiQ3cQtyzA==" crossorigin="anonymous" />
    <!-- Local Style -->
    <!-- cbv = cache buster version (set it to 1, intialized later) -->
    <!-- <link rel="stylesheet" href=<?php relDistFile('normalize.min.css', 'style');?> /> -->
    <link rel="stylesheet" href=<?php relDistFile('covidnow.min.css?cbv=8fb442932b560e58571898b845c861f0', 'style');?> />
    <!-- <link rel="stylesheet" href=<?php relDistFile('universal.min.css?cbv=8fb442932b560e58571898b845c861f0', 'style');?> /> -->
    <?php if (defined('PAGE_NAME')): ?>
    <?php if (PAGE_NAME == 'home'): ?>
    <link rel="stylesheet" href=<?php relDistFile('home.min.css?cbv=8fb442932b560e58571898b845c861f0', 'style');?> />
    <?php elseif (PAGE_NAME == 'states'): ?>
    <link rel="stylesheet" href=<?php relDistFile('states.min.css?cbv=8fb442932b560e58571898b845c861f0', 'style');?> />
    <?php elseif (PAGE_NAME == 'about'): ?>
    <link rel="stylesheet" href=<?php relDistFile('about.min.css?cbv=8fb442932b560e58571898b845c861f0', 'style');?> />
    <?php endif; endif; ?>
    <?php if (defined('NEED_CSS_fa') && NEED_CSS_fa): ?>
    <link rel="stylesheet" href=<?php relDistFile('_fa.min.css?cbv=8fb442932b560e58571898b845c861f0', 'style');?> />
    <?php endif; ?>
    <!-- Social Media -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="CovidNow" />
    <meta property="og:title" content="COVID-19 Live Updates" />
    <meta property="og:description" content="Live updates and information regarding COVID-19." />
    <meta property="og:image" content="../lib/img/covid-19-1330px.jpg" />
    <meta property="og:url" content="https://covidnow.com" />
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image:alt" content="../lib/img/covid-19-1330px.jpg" />
    <!-- 1. JavaScript workaround to enable styling of HTML5 elements in versions of Internet Explorer prior to version 9 (must be placed in the <head> element, after any stylesheets) -->
    <!-- 2. A fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more) -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- Track -->
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WJCF2FG');</script>
    <!-- End Track -->
    <!-- Lottie -->
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <!-- <noscript>
      You need to enable JavaScript to run this app.
    </noscript> -->
    <!-- External scripts -->
    <!-- Defaults -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
    <script src="https://code.jquery.com/pep/0.4.3/pep.min.js"></script><!-- Pointer Events Polyfill -->
    <!-- Page-specific -->
    <?php // if (defined('NEED_JS_d3js') && NEED_JS_d3js): ?>
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/d3js/6.2.0/d3.min.js"></script> -->
    <?php if (defined('NEED_JS_highchart') && NEED_JS_highchart): ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.2.0/highcharts.src.min.js"></script>
    <?php endif; if (defined('NEED_JS_usmap') && NEED_JS_usmap): ?>
    <!-- Load Rafael (2.0) then us-map -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.0.0/raphael-min.js" integrity="sha512-zm1p8trSsDQ8+oTAOw3EWdvl4tZXCBqOS+NXURzauWtTz9zjiNzu5bSimPknJqGdrxY+uzeLfUIeefFDu/aBvw==" crossorigin="anonymous"></script>
    <script src=<?php echo RQ_LIB_DIR.'/js/external/usmap-1.0.1.min.js'; ?>></script>
    <?php endif; ?>
    <!-- External scripts FALLBACK -->
    <script>
      if (!window.jQuery) document.write('<script src="<?php echo RQ_LIB_DIR.'/js/external/jquery-3.5.1.slim.min.js'; ?>"><\/script>');
      // if (!window.jQuery) document.write('<script src="<?php echo RQ_LIB_DIR.'/js/external/pep-0.4.3.min.js'; ?>"><\/script>');
    </script>
  </head>

  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJCF2FG"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <?php require_once './components/main_nav.php'; ?>

    <div id="page">

      <?php require_once './components/body.php'; ?>
