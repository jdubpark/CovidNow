<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="keywords" content="coronavirus, covid, covid-19" />
    <meta name="description" content="Live updates and information regarding COVID-19." />
    <meta name="author" content="StudioPark.io" />
    <title>About - CovidNow</title>
    <!-- canonical: https://www.shopify.com/partners/blog/canonical-urls -->
    <link rel="canonical" href="https://covidnow.com/" />
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800&display=swap">
    <link rel="stylesheet" href="./lib/style/normalize.min.css" />
    <link rel="stylesheet" href="./lib/style/covidnow.css<?php echo "?v=".filemtime("./lib/style/covidnow.css"); ?>" />
    <link rel="stylesheet" href="./lib/style/universal.css<?php echo "?v=".filemtime("./lib/style/universal.css"); ?>" />
    <link rel="stylesheet" href="./lib/style/about.css<?php echo "?v=".filemtime("./lib/style/about.css"); ?>" />
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
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-103973100-4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-103973100-4');
    </script>
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
            <div class="about-section">
              <div class="about-section-head">
                <div class="about-section-title">Behind <span>COVID<r>NOW</r></span></div>
              </div>
              <div class="about-section-body">
                <div class="about-member">
                  <div class="about-member-img"><img src="./lib/img/me1.jpg" /></div>
                  <div class="about-member-name">Park Jong Won</div>
                  <div class="about-member-desc">
                    <p>In late-January, I began to realize how bad the whole situation was in South Korea, my home country (for reference, Korea's infection rate surpassed China's a while ago)</p>
                    <p>Although I live in the US, I wanted to help spread the awareness of the virus. So I started to build this website to inform people of COVID-19 and share what I know.</p>
                    <p>Instead of relying on biased media, I rely on unbiased research papers published around the world to supply facts and information. It's a painstaking process of searching and reading papers, but it's worth the time.</p>
                    <p><a href="https://parkjongwon.com" rel="noopener"><span>Check out my website for other projects.</span></a></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="about-section">
              <div class="about-section-head">
                <div class="about-section-title">Contribute!</div>
              </div>
              <div class="about-section-body">
                <div class="about-contribute">
                  <p>Please contribute if you know ways to improve the website or its content!</p>
                  <p><a href="mailto:contact@parkjongwon.com"><span>contact@parkjongwon.com</span></a></p>
                  <p>and stay safe!</p>
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

  </body>
</html>
