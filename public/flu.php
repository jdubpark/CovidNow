<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="keywords" content="coronavirus, covid, covid-19" />
    <meta name="description" content="Live updates and information regarding COVID-19." />
    <meta name="author" content="StudioPark.io" />
    <title>COVID-19 vs. Seasonal Flu - CovidNow</title>
    <!-- canonical: https://www.shopify.com/partners/blog/canonical-urls -->
    <link rel="canonical" href="https://covidnow.com/" />
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800&display=swap">
    <link rel="stylesheet" href="./lib/style/normalize.min.css" />
    <link rel="stylesheet" href="./lib/style/covidnow.css<?php echo "?v=".filemtime("./lib/style/covidnow.css"); ?>" />
    <link rel="stylesheet" href="./lib/style/universal.css<?php echo "?v=".filemtime("./lib/style/universal.css"); ?>" />
    <link rel="stylesheet" href="./lib/style/read.css<?php echo "?v=".filemtime("./lib/style/read.css"); ?>" />
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

      <div id="doc">
        <div id="doc-menu" class="doc-menu">
          <div id="doc-menu-trigger" class="doc-menu-trigger"><img src="./lib/svg/doc-menu-trigger.svg" /> <span>Menu</span></div>
          <div id="doc-menu-inner" class="doc-menu-inner">
            <ul class="doc-leads">
              <li><b>COVID-19 vs. Seasonal Flu: They are different!</b></li>
              <li><a href="#pandemic">Pandemic</a></li>
              <li><a href="#numbers">Numbers</a></li>
              <li><a href="#estimates">Estimates</a></li>
              <li><a href="#vaccine">Vaccine</a></li>
              <li><a href="#transmission">Transmission</a></li>
              <li><a href="#science">Science</a></li>
              <!-- <li><a href="#worldwide">Worldwide</a></li> -->
              <li><a href="#age-group">Age-group</a></li>
              <li><a href="#economy">Economic Damage</a></li>
              <li><a href="#virus-family">Virus Family</a></li>
            </ul>
          </div>
        </div>
        <div class="doc-main">
          <div class="doc-main-inner">

            <div id="pandemic" class="doc-section">
              <div class="dsec-title"><a href="#pandemic">Global Pandemic</a></div>
              <div class="dsec-content">
                <div class="elaborate">
                  <p>COVID-19 is a <b>GLOBAL PANDEMIC</b> declared by WHO, whereas flu is a seasonal illness (flu pandemics generally exclude recurrences of seasonal flu).</p>
                  <p>WHO Director-General: "We have never before seen a pandemic sparked by a coronavirus. This is the first pandemic caused by a coronavirus."</p>
                  <p>Italy has went on a <b>complete national lockdown</b>, and many other countries are following the lockdown procedures. The U.S. declared it a <b>national health emergency</b>. International travelling has been virtually banned due to COVID-19. Meanwhile, flu is a seasonally accepted illness.</p>
                </div>
                <ul class="sources">
                  <li><a href="https://www.who.int/dg/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---11-march-2020" target="_blank" rel="noopener">WHO 1</a></li>
                  <li><a href="https://www.who.int/health-topics/coronavirus" target="_blank" rel="noopener">WHO 2</a></li>
                  <li><a href="https://www.npr.org/2020/03/16/816080263/reporters-notebook-rome-under-coronavirus-lockdown" target="_blank" rel="noopener">NPR</a></li>
                </ul>
              </div>
            </div>

            <div id="numbers" class="doc-section">
              <div class="dsec-title"><a href="#numbers">Numbers</a></div>
              <div class="dsec-content">
                <div class="elaborate">
                  <p>Data as of March 16, 2020; flu data is 2019-20 USA only</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Disease</th>
                        <th>Illness</th>
                        <th>Deaths</th>
                        <th>Fatality Rate</th>
                        <th>Vaccine</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Seasonal flu</td>
                        <td>36 – 51 million</td>
                        <td>22,000 – 55,000</td>
                        <td>~0.1%</td>
                        <td>YES</td>
                      </tr>
                      <tr>
                        <td>COVID-19 (USA)</td>
                        <td>4,000+</td>
                        <td>70+</td>
                        <td>~2%</td>
                        <td>NO</td>
                      </tr>
                      <tr>
                        <td>COVID-19 (worldwide)</td>
                        <td>170,000+</td>
                        <td>6,500+</td>
                        <td>~4%</td>
                        <td>NO</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul class="sources">
                  <li><a href="https://www.cdc.gov/flu/about/burden/preliminary-in-season-estimates.htm" target="_blank" rel="noopener">CDC</a></li>
                </ul>
              </div>
            </div>

            <div id="estimates" class="doc-section">
              <div class="dsec-title"><a href="#estimates">Estimates</a></div>
              <div class="dsec-content">
                <div class="elaborate">
                  <p>It is estimated that more people are infected with COVID-19 than currently known because of the lack of test kits and the asymptomatic nature of the virus.</p>
                  <p>For example, the director of the Ohio Department of Health, Dr. Amy Acton, said in March 12 that an estimate of <b>100,000</b> people in Ohio have COVID-19, most of whom are untested.</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Disease</th>
                        <th>Positive</th>
                        <th>CDC labs</th>
                        <th>Public labs</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Seasonal flu</td>
                        <td>39,600+</td>
                        <td>x</td>
                        <td>x</td>
                        <td>70,300+</td>
                      </tr>
                      <tr>
                        <td>COVID-19</td>
                        <td>4,000+</td>
                        <td>4,000+</td>
                        <td>18,600+</td>
                        <td>22,600+</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>All data in the US only. Official tests numbers include CDC labs and U.S. public health laboratories. Last updated March 15.</p>
                  <p></p>
                  <p>The death rate also varies, from <b>1% ~ 12%</b>, depending on the regions.</p>
                </div>
                <ul class="sources">
                  <li><a href="https://thehill.com/policy/healthcare/487329-ohio-health-official-estimates-100000-people-in-state-have-coronavirus" target="_blank" rel="noopener">Dr. Acton</a></li>
                  <li><a href="https://www.cdc.gov/flu/weekly/#PublicHealthLaboratories" target="_blank" rel="noopener">CDC 1</a></li>
                  <li><a href="https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/testing-in-us.html" target="_blank" rel="noopener">CDC 2</a></li>
                  <li><a href="https://wwwnc.cdc.gov/eid/article/26/6/20-0233_article" target="_blank" rel="noopener">CDC 3</a></li>
                </ul>
              </div>
            </div>

            <div id="vaccine" class="doc-section">
              <div class="dsec-title"><a href="#vaccine">Vaccine</a></div>
              <div class="dsec-content">
                <div class="elaborate">
                  <p>In 2017-18, flu vaccination prevented 6.2 million illnesses, 3.2 million medical visits, 91,000 hospitalizations, and 5,700 deaths. Many people who die from flu are <b>NOT VACCINATED</b>.</p>
                  <p>In comparison, COVID-19 has <b>NO VACCINE</b>, meaning there is <i>no way you can avoid catching the virus</i> unless you stay isolated.</p>
                  <p>There is not much research/vaccine progress with coronavirus because of their lack of activities until recent days. On the other hand, seasonal flu vaccine is well-prepared by researchers and companies seeking profits.</p>
                </div>
                <ul class="sources">
                  <li><a href="https://www.webmd.com/cold-and-flu/news/20180215/cdc-most-children-dying-from-flu-not-vaccinated" target="_blank" rel="noopener">WebMD</a></li>
                  <li><a href="https://www.cdc.gov/flu/about/burden-averted/2017-2018.htm" target="_blank" rel="noopener">CDC</a></li>
                </ul>
              </div>
            </div>

            <div id="transmission" class="doc-section">
              <div class="dsec-title"><a href="#transmission">Transmission</a></div>
              <div class="dsec-content">
                <div class="elaborate">
                  <p><b>Flu</b>: Airborne droplets made when people with flu cough, sneeze or talk (up to about 6 feet).</p>
                  <p><b>COVID-19</b>: Airborne droplets via cough and sneeze, contacts with virus droplets on surface (unknown on how long they last on surface)</p>
                  <p>Only one in three flu-infected people are asymptomatic (able to spread without showing symptoms). In comparison, there is not enough data/evidence on how much of the COVID-19 infected patients are asymptomatic. But recent researches confirm that COVID-19 is <b>asymptomatic</b>.</p>
                </div>
                <ul class="sources">
                  <li><a href="https://www.cdc.gov/flu/about/disease/spread.htm" target="_blank" rel="noopener">CDC 1</a></li>
                  <li><a href="https://wwwnc.cdc.gov/eid/article/26/6/20-0301_article" target="_blank" rel="noopener">CDC 2</a></li>
                  <li><a href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/transmission.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Ftransmission.html" target="_blank" rel="noopener">CDC 3</a></li>
                  <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2646474/" target="_blank" rel="noopener">NLM (NIH)</a></li>
                  <li><a href="https://www.nejm.org/doi/full/10.1056/NEJMc2001468" target="_blank" rel="noopener">NEJM</a></li>
                </ul>
              </div>
            </div>

            <div id="science" class="doc-section">
              <div class="dsec-title"><a href="#science">Science</a></div>
              <div class="dsec-content">
                <div class="elaborate">
                  <p>WHO: "Coronavirus disease (COVID-19) is a new strain that was discovered in 2019 and has not been previously identified in humans."</p>
                  <p>In other words, COVID-19 has never been researched before and there is no pre-existing data on COVID-19. On the other hand, the seasonal flu has been recurring for decades and researchers have identified 27 subtypes of the flu.</p>
                  <p>Reseraches show that only type A and B affect humans. Although the flu has high mutation rates and frequent genetic reassortments, the latest significant outbreak was in 2009-10 season caused by the A(H1N1) strain.</p>
                  <p>In comparison, there is no data at all for COVID-19, and not so much on the <a href="#virus-family">coronavirus family itself</a>.</p>
                </div>
                <ul class="sources">
                  <li>Sources:</li>
                  <li><a href="https://www.who.int/health-topics/coronavirus" target="_blank" rel="noopener">WHO 1</a></li>
                  <li><a href="https://www.who.int/ith/diseases/influenza_seasonal/en/" target="_blank" rel="noopener">WHO 2</a></li>
                </ul>
              </div>
            </div>

            <!-- <div id="worldwide" class="doc-section">
              <div class="dsec-title"><a href="#worldwide">Worldwide</a></div>
              <div class="dsec-content">
                <div class="elaborate">
                  <p></p>
                </div>
                <ul class="sources">
                  <li>Sources:</li>
                  <li><a href="" target="_blank" rel="noopener"></a></li>
                </ul>
              </div>
            </div> -->

            <div id="age-group" class="doc-section">
              <div class="dsec-title"><a href="#age-group">Age-group</a></div>
              <div class="dsec-content">
                <div class="elaborate">
                  <p>Around 65% of the annual seasonal flu deaths are among people 65 years and older. The flu causes an estimate of 389,000 annual deaths around the world, most of which are in poor regions and countries. However, a study from Global Burden of Disease Study found that a range of 99 000 to 200 000 annual deaths are directly attributable to the flu.</p>
                  <p>Similarly, COVID-19 has greater death rates among older people, esepcially 60 years and older. Most people who die from COVID-19 have underlying health conditions. However, the virus can also be fatal to younger and healthier groups.</p>
                </div>
                <ul class="sources">
                  <li>Sources:</li>
                  <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6815659/" target="_blank" rel="noopener">NLM (NIH)</a></li>
                  <li><a href="https://www.weforum.org/agenda/2020/03/coronavirus-covid19-cov2-wuhan-china-virus-disease-risks-fatality-rates" target="_blank" rel="noopener">WEF</a></li>
                  <li><a href="https://www.npr.org/sections/goatsandsoda/2020/03/04/811688057/who-faces-the-greatest-risk-of-severe-illness-from-coronavirus" target="_blank" rel="noopener">NPR</a></li>
                </ul>
              </div>
            </div>

            <div id="economy" class="doc-section">
              <div class="dsec-title"><a href="#economy">Economic Damage</a></div>
              <div class="dsec-content">
                <div class="elaborate">
                  <p>The economic damage has been far worse than any other disease-induced damages. Many countries are enacting bans on international travelling, which has already been hit by lower travelling demands.</p>
                  <p>Domestic travelling is also being limited in many countries. The US has banned travels to Europe and the European Union is proposing a restriction on all non-essential travels.</p>
                  <p>Due to the recommended self-isolation/quarantine methods and national emergencies/lockdowns, local and national consumer businesses have been hit esepcially hard. Hoarding foods and home goods have limited many people to purchase items necessary for daily life, thus causing them to stockpile as well.</p>
                  <p>McKinsey estimates that the COVID-19 can <b>decrease</b> the US 2020 GDP growth anywhere from <b>23% to 74%</b>, depending on the government responses. In addition, they estimate that the global 2020 GDP can fall anywhere between <b>20% to 60%</b> all because of COVID-19.</p>
                  <p>Manufacturing has significantly slowed down in China, which is rapidly <b>disrupting the global supply chain</b>. Companies like Apple are struggling to maintain their inventories and challenges securing critial supplies are arising.</p>
                </div>
                <ul class="sources">
                  <li>Sources:</li>
                  <li><a href="https://www.mckinsey.com/business-functions/risk/our-insights/covid-19-implications-for-business" target="_blank" rel="noopener">McKinsey</a></li>
                  <li><a href="https://fortune.com/2020/02/15/apple-coronavirus-iphone-impact/" target="_blank" rel="noopener">Fortune</a></li>
                  <li><a href="https://www.ft.com/content/f5bedb66-51a1-3eb2-a1ef-9ab452acc357" target="_blank" rel="noopener">FT</a></li>
                </ul>
              </div>
            </div>

            <div id="virus-family" class="doc-section">
              <div class="dsec-title"><a href="#virus-family">Virus Family & Mutations</a></div>
              <div class="dsec-content">
                <div class="elaborate">
                  <p>COVID-19 (SARS-CoV-2) is classified under the coronavirus family. Other significant viruses in the family are SARS-CoV and MERS-CoV, most active during 2002-3 and 2012-16, respectively.</p>
                  <p><b>SARS-CoV</b> has resulted in 8098 patients and 916 deaths (<b>fatality rate of ~11%</b>). <b>MERS-CoV</b> has resulted in at least 800 deaths with <b>~35% fatality rate</b>. Although COVID-19 has a much lower fatality rate, any mutations can occur to the virus that can increase/decrease the fatality rate.</p>
                  <p>(working on flu data.)</p>
                </div>
                <ul class="sources">
                  <li>Sources:</li>
                  <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6357155/" target="_blank" rel="noopener">NLM (NIH)</a></li>
                </ul>
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
    <script src="./lib/js/dist/universal.bundle.js<?php echo "?v=".filemtime("./lib/js/dist/universal.bundle.js"); ?>"></script>
    <script src="./lib/js/dist/read.bundle.js<?php echo "?v=".filemtime("./lib/js/dist/read.bundle.js"); ?>"></script>

  </body>
</html>
