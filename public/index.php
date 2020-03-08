<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="keywords" content="coronavirus, covid, covid-19" />
    <meta name="description" content="Live updates and information regarding COVID-19." />
    <meta name="author" content="StudioPark.io" />
    <title>CovidNow</title>
    <!-- canonical: https://www.shopify.com/partners/blog/canonical-urls -->
    <link rel="canonical" href="https://covidnow.com/" />
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800&display=swap">
    <link rel="stylesheet" href="./lib/style/normalize.min.css" />
    <link rel="stylesheet" href="./lib/style/covidnow.css<?php echo "?v=".filemtime("./lib/style/covidnow.css"); ?>" />
    <link rel="stylesheet" href="./lib/style/universal.css<?php echo "?v=".filemtime("./lib/style/universal.css"); ?>" />
    <link rel="stylesheet" href="./lib/style/home.css<?php echo "?v=".filemtime("./lib/style/home.css"); ?>" />
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

        <div id="hero" class="hero">
          <div class="container">
            <div class="hero-fc">
              <div class="hero-fc-head">
                <div class="hero-fc-updated">Last updated - <span>March 27</span> (updated every five minutes)</div>
              </div>
              <div class="hero-fc-body">
                <div class="hero-fc-row total">
                  <div class="hero-fc-row-head">
                    <name>Total Cases</name>
                    <num>102304</num>
                  </div>
                  <div class="hero-fc-row-body">
                    <div class="hero-fc-item">
                      <name>USA</name>
                      <num>405</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>China</name>
                      <num>80231</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>Other</name>
                      <num>15032</num>
                    </div>
                  </div>
                </div>
                <div class="hero-fc-row deaths">
                  <div class="hero-fc-row-head">
                    <name>Deaths</name>
                    <num>3059</num>
                  </div>
                  <div class="hero-fc-row-body">
                    <div class="hero-fc-item">
                      <name>USA</name>
                      <num>19</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>China</name>
                      <num>2503</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>Other</name>
                      <num>467</num>
                    </div>
                  </div>
                </div>
                <div class="hero-fc-row recovered">
                  <div class="hero-fc-row-head">
                    <name>Recovered</name>
                    <num>3059</num>
                  </div>
                  <div class="hero-fc-row-body">
                    <div class="hero-fc-item">
                      <name>USA</name>
                      <num>19</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>China</name>
                      <num>2503</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>Other</name>
                      <num>467</num>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="hero-you">
              <div class="hero-you-head">
                <div class="hero-you-title">COVID-19 around YOU</div>
              </div>
              <div class="hero-you-body">
                <ul class="hero-you-home">
                  <li class="hero-you-home-lat">Latitude: <val>43.0392</val></li>
                  <li class="hero-you-home-long">Longtitude: <val>-72.4938</val></li>
                  <li class="hero-you-home-prov">Location: <val>Boston, MA</val></li>
                </ul>
                <div class="hero-you-locs">
                  <div class="hero-you-loc d0-10">
                    <div class="hero-you-loc-radius">within 10 mi</div>
                    <ul>
                      <li class="cases"><name>Cases:</name> <val>0</val></li>
                      <li class="deaths"><name>Deaths:</name> <val>0</val></li>
                      <li class="recov"><name>Recov:</name> <val>0</val></li>
                    </ul>
                  </div>
                  <div class="hero-you-loc d10-25">
                    <div class="hero-you-loc-radius">10-25 mi</div>
                    <ul>
                      <li class="cases"><name>Cases:</name> <val>0</val></li>
                      <li class="deaths"><name>Deaths:</name> <val>0</val></li>
                      <li class="recov"><name>Recov:</name> <val>0</val></li>
                    </ul>
                  </div>
                  <div class="hero-you-loc d25-50">
                    <div class="hero-you-loc-radius">25-50 mi</div>
                    <ul>
                      <li class="cases"><name>Cases:</name> <val>0</val></li>
                      <li class="deaths"><name>Deaths:</name> <val>0</val></li>
                      <li class="recov"><name>Recov:</name> <val>0</val></li>
                    </ul>
                  </div>
                  <div class="hero-you-loc d50-100">
                    <div class="hero-you-loc-radius">50-100 mi</div>
                    <ul>
                      <li class="cases"><name>Cases:</name> <val>0</val></li>
                      <li class="deaths"><name>Deaths:</name> <val>0</val></li>
                      <li class="recov"><name>Recov:</name> <val>0</val></li>
                    </ul>
                  </div>
                  <div class="hero-you-loc d100">
                    <div class="hero-you-loc-radius">100+ mi</div>
                    <ul>
                      <li class="cases"><name>Cases:</name> <val>0</val></li>
                      <li class="deaths"><name>Deaths:</name> <val>0</val></li>
                      <li class="recov"><name>Recov:</name> <val>0</val></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="hero-linkboxes">
              <div class="hero-linkbox states">
                <a class="hero-linkbox-inner" href="./states">
                  <div class="hero-linkbox-name">States Breakdown &#8250;</div>
                  <div class="hero-linkbox-desc">Check out current COVID-19 cases and status in each state.</div>
                </a>
              </div>
              <div class="hero-linkbox research">
                <a class="hero-linkbox-inner" href="./research">
                  <div class="hero-linkbox-name">Information &#8250;</div>
                  <div class="hero-linkbox-desc">Learn more about COVID-19 and current researches.</div>
                </a>
              </div>
              <div class="hero-linkbox prevention">
                <a class="hero-linkbox-inner" href="./prevention">
                  <div class="hero-linkbox-name">Prevention &#8250;</div>
                  <div class="hero-linkbox-desc">How you can minimize your exposure to COVID-19.</div>
                </a>
              </div>
              <div class="hero-linkbox myths">
                <a class="hero-linkbox-inner" href="./myths">
                  <div class="hero-linkbox-name">Myths &#8250;</div>
                  <div class="hero-linkbox-desc">Expert-backed facts to disprove COVID-19 myths and rumors.</div>
                </a>
              </div>
              <div class="hero-linkbox faq">
                <a class="hero-linkbox-inner" href="./faq">
                  <div class="hero-linkbox-name">FAQ &#8250;</div>
                  <div class="hero-linkbox-desc">We answered some of the most asked questions about COVID-19.</div>
                </a>
              </div>
              <div class="hero-linkbox about">
                <a class="hero-linkbox-inner" href="./about">
                  <div class="hero-linkbox-name">About &#8250;</div>
                  <div class="hero-linkbox-desc">Help us improve our website and data. Your voice matters.</div>
                </a>
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
    <script src="./lib/js/dist/home.bundle.js<?php echo "?v=".filemtime("./lib/js/dist/home.bundle.js"); ?>"></script>

  </body>
</html>
