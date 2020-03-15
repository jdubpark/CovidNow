<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="keywords" content="coronavirus, covid, covid-19" />
    <meta name="description" content="Live updates and information regarding COVID-19." />
    <meta name="author" content="StudioPark.io" />
    <title>COVID-19 - CovidNow</title>
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

        <div id="hero" class="hero">
          <div class="container">
            <div class="hero-fc">
              <div class="hero-fc-head">
                <div id="stats-last-update" class="hero-fc-updated">Last updated: <span></span></div>
              </div>
              <div class="hero-fc-body">
                <div class="hero-fc-row total">
                  <div class="hero-fc-row-head">
                    <name>Total Cases</name>
                    <num id="stats-total-total">0</num>
                    <name class="mobile">Cases</name>
                  </div>
                  <div class="hero-fc-row-body">
                    <div class="hero-fc-item">
                      <name>USA</name>
                      <num id="stats-total-usa">0</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>China</name>
                      <num id="stats-total-china">0</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>Other</name>
                      <num id="stats-total-other">0</num>
                    </div>
                  </div>
                </div>
                <div class="hero-fc-row deaths">
                  <div class="hero-fc-row-head">
                    <name>Deaths</name>
                    <num id="stats-deaths-total">0</num>
                    <name class="mobile">Deaths</name>
                  </div>
                  <div class="hero-fc-row-body">
                    <div class="hero-fc-item">
                      <name>USA</name>
                      <num id="stats-deaths-usa">0</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>China</name>
                      <num id="stats-deaths-china">0</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>Other</name>
                      <num id="stats-deaths-other">0</num>
                    </div>
                  </div>
                </div>
                <div class="hero-fc-row recovered">
                  <div class="hero-fc-row-head">
                    <name>Recovered</name>
                    <num id="stats-recov-total">0</num>
                    <name class="mobile">Recovered</name>
                  </div>
                  <div class="hero-fc-row-body">
                    <div class="hero-fc-item">
                      <name>USA</name>
                      <num id="stats-recov-usa">0</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>China</name>
                      <num id="stats-recov-china">0</num>
                    </div>
                    <div class="hero-fc-item">
                      <name>Other</name>
                      <num id="stats-recov-other">0</num>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="hero-you">
              <div class="hero-you-head">
                <div class="hero-you-title">COVID-19 around ME</div>
              </div>
              <div class="hero-you-body">
                <div class="hero-you-search">
                  <div class="hero-you-search-title"><span>Look up address (use your Google maps address for best accuracy)</span></div>
                  <input id="you-search-bar" class="hero-you-search-bar" type="text" placeholder="Type in address with states abbr."></input>
                  <div id="you-search-btn" class="hero-you-search-btn"><span>Search</span></div>
                  <div class="hero-you-search-title" style="padding:20px 0 5px;max-width:600px;margin:0 auto;"><span>To deliver the most accurate data, we have temporary paused showing distance. Don't worry, it will come back in a few days.</span></div>
                </div>
                <ul class="hero-you-home">
                  <li id="you-search-lat" class="hero-you-home-lat">Latitude: <val>allow access...</val></li>
                  <li id="you-search-long" class="hero-you-home-long">Longtitude: <val>allow access...</val></li>
                  <!-- <li id="you-search-name" class="hero-you-home-prov">Location: <val>loading...</val></li> -->
                  <li id="you-search-invalid" class="hero-you-home-invalid">Sorry, we couldn't grab location data for the provided address. Please include the city/state or use the Google Maps address for better accuracy!</li>
                </ul>
                <div class="hero-you-locs">
                  <div id="geoloc-city" class="hero-you-loc">
                    <div id="geoloc-city-name" class="hero-you-loc-radius">City</div>
                    <ul>
                      <li class="cases"><val>?</val> preparing data</li>
                    </ul>
                  </div>
                  <div id="geoloc-county" class="hero-you-loc">
                    <div id="geoloc-county-name" class="hero-you-loc-radius">County</div>
                    <ul>
                      <li class="cases"><val>0</val> <name>Cases</name></li>
                    </ul>
                  </div>
                  <div id="geoloc-state" class="hero-you-loc">
                    <div id="geoloc-state-name" class="hero-you-loc-radius">State: <span></span></div>
                    <ul>
                      <li class="cases"><val>0</val> <name>Cases</name></li>
                    </ul>
                  </div>
                  <!-- <div id="geoloc-d0-10" class="hero-you-loc d0-10">
                    <div class="hero-you-loc-radius">~ 10 mi</div>
                    <ul>
                      <li class="cases"><val>0</val> <name>Cases</name></li>
                    </ul>
                  </div>
                  <div id="geoloc-d10-25" class="hero-you-loc d10-25">
                    <div class="hero-you-loc-radius">10-25 mi</div>
                    <ul>
                      <li class="cases"><val>0</val> <name>Cases</name></li>
                    </ul>
                  </div>
                  <div id="geoloc-d25-50" class="hero-you-loc d25-50">
                    <div class="hero-you-loc-radius">25-50 mi</div>
                    <ul>
                      <li class="cases"><val>0</val> <name>Cases</name></li>
                    </ul>
                  </div>
                  <div id="geoloc-d50-100" class="hero-you-loc d50-100">
                    <div class="hero-you-loc-radius">50-100 mi</div>
                    <ul>
                      <li class="cases"><val>0</val> <name>Cases</name></li>
                    </ul>
                  </div>
                  <div id="geoloc-d100-500" class="hero-you-loc d100-500">
                    <div class="hero-you-loc-radius">100-500 mi</div>
                    <ul>
                      <li class="cases"><val>0</val> <name>Cases</name></li>
                    </ul>
                  </div> -->
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

            <div class="hero-countries">
              <div class="hero-countries-head">
                <div class="hero-countries-title">Stats by Countries</div>
              </div>
              <div class="hero-countries-body">
                <div id="hero-countries-loading" class="hero-countries-loading">Loading...</div>
                <div id="hero-countries-table" class="hero-countries-table">
                  <div class="hero-countries-table-head">
                    <div class="hero-country hd mobile">
                      <div class="hero-country-name">Country</div>
                      <div class="hero-country-val">Total</div>
                      <div class="hero-country-val">Deaths</div>
                      <div class="hero-country-val">Recov.</div>
                      <div class="hero-country-dummy"></div>
                    </div>
                    <div class="hero-country hd">
                      <div class="hero-country-name">Country</div>
                      <div class="hero-country-val">Total</div>
                      <div class="hero-country-val">Deaths</div>
                      <div class="hero-country-val">Recov.</div>
                      <div class="hero-country-dummy"></div>
                    </div>
                  </div>
                  <div id="hero-countries-table-body" class="hero-countries-table-body">
                    <!-- <div class="hero-country">
                      <div class="hero-country-name">China</div>
                      <div class="hero-country-val total">20310</div>
                      <div class="hero-country-val deaths">20310</div>
                      <div class="hero-country-val recov">20310</div>
                    </div>
                    <div class="hero-country">
                      <div class="hero-country-name">United States</div>
                      <div class="hero-country-val total">20310</div>
                      <div class="hero-country-val deaths">20310</div>
                      <div class="hero-country-val recov">20310</div>
                    </div>
                    <div class="hero-country">
                      <div class="hero-country-name">United Kingdom</div>
                      <div class="hero-country-val total">20310</div>
                      <div class="hero-country-val deaths">20310</div>
                      <div class="hero-country-val recov">20310</div>
                    </div>
                    <div class="hero-country">
                      <div class="hero-country-name">Russia</div>
                      <div class="hero-country-val total">20310</div>
                      <div class="hero-country-val deaths">20310</div>
                      <div class="hero-country-val recov">20310</div>
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
    <script src="./lib/js/dist/home.bundle.js<?php echo "?v=".filemtime("./lib/js/dist/home.bundle.js"); ?>"></script>

  </body>
</html>
