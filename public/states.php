<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="keywords" content="coronavirus, covid, covid-19" />
    <meta name="description" content="Live updates and information regarding COVID-19." />
    <meta name="author" content="StudioPark.io" />
    <title>States - CovidNow</title>
    <!-- canonical: https://www.shopify.com/partners/blog/canonical-urls -->
    <link rel="canonical" href="https://covidnow.com/" />
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800&display=swap">
    <link rel="stylesheet" href="./lib/style/normalize.min.css" />
    <link rel="stylesheet" href="./lib/style/covidnow.css<?php echo "?v=".filemtime("./lib/style/covidnow.css"); ?>" />
    <link rel="stylesheet" href="./lib/style/universal.css<?php echo "?v=".filemtime("./lib/style/universal.css"); ?>" />
    <link rel="stylesheet" href="./lib/style/states.css<?php echo "?v=".filemtime("./lib/style/states.css"); ?>" />
    <!-- Fonts -->
    <!-- <link rel="stylesheet" href="./lib/style/font/glyphicons/glyphicons.css" /> -->
    <!-- <link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css"> -->
    <!-- Social Media -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="CovidNow" />
    <meta property="og:title" content="COVID-19 Live Updates" />
    <meta property="og:description" content="Live updates and information regarding COVID-19." />
    <meta property="og:image" content="./lib/img/covid-19-1330px.jpg" />
    <meta property="og:url" content="https://covidnow.com" />
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image:alt" content="./lib/img/covid-19-1330px.jpg" />
    <!-- 1. JavaScript workaround to enable styling of HTML5 elements in versions of Internet Explorer prior to version 9 (must be placed in the <head> element, after any stylesheets) -->
    <!-- 2. A fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more) -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- Track -->
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <!-- <noscript>
      You need to enable JavaScript to run this app.
    </noscript> -->
  </head>

  <body>

    <div id="page">

      <?php require_once './components/main_nav.php'; ?>

      <div id="wrapper">
        <div id="hero">
          <div class="container">
            <div class="hero-head">
              <div class="hero-title">U.S. States</div>
              <div class="hero-desc">Click on each state to see their COVID-19 situation</div>
            </div>
            <div class="hero-body">
              <div id="usmap-wrapper" class="hero-map-wrapper">
                <div id="usmap" class="hero-map"></div>
              </div>
              <div class="hero-state">
                <div class="state-name">State: <span id="usmap-state-name">Select a state</span></div>
                <div class="state-stats">
                  <div class="state-stat total">
                    <div id="usmap-state-stat-total" class="val">0</div>
                    <div class="name">Total Cases</div>
                  </div>
                  <div class="state-stat deaths">
                    <div id="usmap-state-stat-deaths" class="val">0</div>
                    <div class="name">Deaths</div>
                  </div>
                  <div class="state-stat recov">
                    <div id="usmap-state-stat-recov" class="val">0</div>
                    <div class="name">Recovered</div>
                  </div>
                </div>
                <div class="state-cases-wrapper">
                  <div class="state-cases-title">Reported Cases</div>
                  <div id="usmap-state-cases" class="state-cases">
                    <!-- <div class="state-case">
                      <div class="state-case-item loc">Location</div>
                      <div class="state-case-item stat total"><span>0</span> Cases</div>
                      <div class="state-case-item stat deaths"><span>0</span> Deaths</div>
                      <div class="state-case-item stat recov"><span>0</span> Recovered</div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script> -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js"></script> -->
    <!-- <script src="https://code.jquery.com/pep/0.4.3/pep.js"></script> -->
    <!-- load from local for dev. -->
    <script src="./lib/js/src/pep-0.4.3.js">
    // universal use
    // pointermove: a pointer moves, similar to touchmove or mousemove.
    // pointerdown: a pointer is activated, or a device button held.
    // pointerup: a pointer is deactivated, or a device button released.
    // pointerover: a pointer has moved onto an element.
    // pointerout: a pointer is no longer on an element it once was.
    // pointerenter: a pointer enters the bounding box of an element.
    // pointerleave: a pointer leaves the bounding box of an element.
    // pointercancel: a pointer will no longer generate events.
    </script>
    <script src="./lib/js/src/jquery-3.2.1.min.js"></script>
    <script src="./lib/js/src/raphael-2.0.js"></script>
    <script src="./lib/js/src/us-map-1.0.1.js"></script>
    <script src="./lib/js/dist/universal.bundle.js<?php echo "?v=".filemtime("./lib/js/dist/universal.bundle.js"); ?>"></script>
    <script src="./lib/js/dist/states.bundle.js<?php echo "?v=".filemtime("./lib/js/dist/states.bundle.js"); ?>"></script>

  </body>
</html>
