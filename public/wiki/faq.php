<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="keywords" content="coronavirus, covid, covid-19" />
    <meta name="description" content="Live updates and information regarding COVID-19." />
    <meta name="author" content="StudioPark.io" />
    <title>FAQ - CovidNow</title>
    <!-- canonical: https://www.shopify.com/partners/blog/canonical-urls -->
    <link rel="canonical" href="https://covidnow.com/" />
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800&display=swap">
    <link rel="stylesheet" href="../lib/style/normalize.min.css" />
    <link rel="stylesheet" href="../lib/style/covidnow.css<?php echo "?v=".filemtime("../lib/style/covidnow.css"); ?>" />
    <link rel="stylesheet" href="../lib/style/universal.css<?php echo "?v=".filemtime("../lib/style/universal.css"); ?>" />
    <link rel="stylesheet" href="../lib/style/read.css<?php echo "?v=".filemtime("../lib/style/read.css"); ?>" />
    <!-- Fonts -->
    <!-- <link rel="stylesheet" href="../lib/style/font/glyphicons/glyphicons.css" /> -->
    <!-- <link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css"> -->
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

      <?php require_once '../components/main_nav_sub.php'; ?>

      <div id="doc">
        <div id="doc-menu" class="doc-menu">
          <div class="doc-menu-inner">
            <ul class="doc-leads">
              <li><b>COVID-19 FAQ</b></li>
              <li><a href="#spread-how">How does the virus spread?</a></li>
              <li><a href="#symptoms">What are the symptoms and when do they start to show?</a></li>
              <li><a href="#heat-kill">Does high heat kill COVID-19?</a></li>
              <li><b>Quarantine</b></li>
              <li><a href="#quarantine-14day">Is the 14-day quarantine enough?</a></li>
              <li><b>Hygiene</b></li>
              <li><a href="#hand-sanitizer">Are hand sanitizers effective at killing COVID-19?</a></li>
              <li><a href="#hand-sanitizer-wash">Do I still need to wash my hands after using hand sanitizers?</a></li>
              <li><b>Recovery</b></li>
              <li><a href="#when-know-recovered">How does a person know if they have recovered (after presumably mild symptoms)?</a></li>
              <li><a href="#recovery-immunity">Does recovering from COVID-19 give immunity (at least until the virus mutates)?</a></li>
              <li><a href="#recovery-spread">Can recovered patients still spread the virus?</a></li>
              <li><b>More coming!</b></li>
            </ul>
          </div>
        </div>
        <div class="doc-main">
          <div class="doc-main-inner">

            <div id="spread-persons" class="doc-section">
              <div class="dsec-title"><a href="#spread-how">How does the virus spread?</a></div>
              <div class="dsec-content">
                <div class="short-answer"><span>Short answer:</span> Person-to-person, through air droplets and indirect contacts</div>
                <div class="elaborate">
                  <p>A Johns Hopkins study shows that about 97.5% of people start to develop symptoms within 11.5 days of exposure (assuming they develop symptoms).</p>
                </div>
                <ul class="sources">
                  <li>Sources:</li>
                  <li><a href="https://www.health.harvard.edu/blog/as-coronavirus-spreads-many-questions-and-some-answers-2020022719004" target="_blank" rel="noopener">Harvard</a></li>
                </ul>
              </div>
            </div>

            <div id="symptoms-incubation" class="doc-section">
              <div class="dsec-title"><a href="#symptoms">What are the symptoms and when do they start to show (incubation period)?</a></div>
              <div class="dsec-content">
                <div class="short-answer"><span>Short answer:</span> Fever, tiredness, and dry cough; generally within 5 days of exposure; most within 11 days </div>
                <div class="elaborate">
                  <p>Incubation period is the time between initial exposure and developing symptoms.</p>
                  <p>Recent studies show that the average incubation period is about 5 days. A Johns Hopkins study shows that about 97.5% of people start to develop symptoms within 11.5 days of exposure (assuming they develop symptoms).</p>
                  <p>MERS-CoV and SARS-CoV have an average incubation period of 5-7 days and 2-7 days, respectively.</p>
                </div>
                <ul class="sources">
                  <li>Sources:</li>
                  <li><a href="https://hub.jhu.edu/2020/03/09/coronavirus-incubation-period/" target="_blank" rel="noopener">JHU</a></li>
                  <li><a href="https://www.who.int/news-room/q-a-detail/q-a-coronaviruses" target="_blank" rel="noopener">WHO 1</a></li>
                  <li><a href="https://www.who.int/csr/sars/clinical/en/">WHO 2</a></li>
                  <li><a href="https://www.who.int/csr/sars/en/WHOconsensus.pdf">WHO 3</a></li>
                </ul>
              </div>
            </div>

            <div id="quarantine-14day" class="doc-section">
              <div class="dsec-title"><a href="#quarantine-14day">Is the 14-day quarantine enough?</a></div>
              <div class="dsec-content">
                <div class="short-answer"><span>Short answer:</span> Majority of the time, yes.</div>
                <div class="elaborate">
                  <p>Currently CDC and health authorities around the world recommend using a 14-day quarantine method for patients with suspected/confirmed COVID-19.</p>
                  <p>Johns Hopkins associate professor, Justin Lessler: "Based on our analysis of publicly available data, the current recommendation of 14 days for active monitoring or quarantine is reasonable, although with that period some cases would be missed over the long-term."</p>
                  <!-- <p>The 14-day guideline came in light of</p> -->
                </div>
                <ul class="sources">
                  <li>Sources:</li>
                  <li><a href="https://hub.jhu.edu/2020/03/09/coronavirus-incubation-period/" target="_blank" rel="noopener">JHU</a></li>
                </ul>
              </div>
            </div>

            <div id="heat-kill" class="doc-section">
              <div class="dsec-title"><a href="#heat-kill">Does high heat kill COVID-19</a></div>
              <div class="dsec-content">
                <div class="short-answer"><span>Short answer:</span> </div>
                <div class="elaborate">
                  <p></p>
                </div>
                <ul class="sources">
                  <li>Sources:</li>
                  <li><a href="" target="_blank" rel="noopener"></a></li>
                </ul>
              </div>
            </div>

            <!-- <div id="heat-kill" class="doc-section">
              <div class="dsec-title"><a href="#heat-kill">Does high heat kill COVID-19</a></div>
              <div class="dsec-content">
                <div class="short-answer"><span>Short answer:</span> </div>
                <div class="elaborate">
                  <p></p>
                </div>
                <ul class="sources">
                  <li>Sources:</li>
                  <li><a href="" target="_blank" rel="noopener"></a></li>
                </ul>
              </div>
            </div> -->

          </div>
        </div>
      </div>

    </div>

    <!-- <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script> -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js"></script> -->
    <!-- <script src="https://code.jquery.com/pep/0.4.3/pep.js"></script> -->
    <!-- load from local for dev. -->
    <script src="../lib/js/src/pep-0.4.3.js">
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
    <script src="../lib/js/src/jquery-3.2.1.min.js"></script>
    <script src="../lib/js/dist/universal.bundle.js<?php echo "?v=".filemtime("../lib/js/dist/universal.bundle.js"); ?>"></script>
    <script src="../lib/js/dist/read.bundle.js<?php echo "?v=".filemtime("../lib/js/dist/read.bundle.js"); ?>"></script>

  </body>
</html>
