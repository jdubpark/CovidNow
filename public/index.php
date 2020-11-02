<?php
  define('PAGE_NAME', 'home');
  define('PAGE_TITLE', 'COVID-19');

  define('NEED_JS_highchart', true);
  define('NEED_CSS_fa', true);

  require './components/header.php';
?>
<div id="global" class="global">
  <div class="container">

    <div id="global-stats" class="columns is-multiline elm-section global-stats">

      <div class="column is-12">
        <div class="elm-subsection global-stats-header">
          <div id="stats-last-update">Data as of <span>loading...</span></div>
        </div>
      </div>

      <div id="latest" class="column is-12">
        <div class="elm-subsection global-stats-overview">
          <div class="columns is-multiline">
            <div class="column is-narrow confirmed">
              <div class="name">Confirmed</div>
              <div id="stats-confirmed-total" class="num">0</div>
              <div id="stats-confirmed-countries" class="note"><span>189</span> countries</div>
            </div>

            <div class="column is-narrow deaths">
              <div class="name">Deaths</div>
              <div id="stats-deaths-total" class="num">0</div>
              <div id="stats-fatality-rate" class="note"><span>0</span>%</div>
            </div>

            <div class="column is-narrow recovered">
              <div class="name">Recovered</div>
              <div id="stats-recov-total" class="num">0</div>
              <div id="stats-recovery-rate" class="note"><span>0</span>%</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div id="global-mix" class="columns is-multiline elm-section global-mix">

      <div id="top-countries" class="column is-8">
        <div class="elm-subsection elm-shadow-box global-top">
          <div class="columns is-multiline global-top-cols">
            <div class="column is-one-third">
              <div class="global-top-name">Top Confirmed</div>
              <div class="global-top-note">global %</div>
              <ul id="stats-top-countries-total" class="global-top-list confirmed"><!-- filled here --></ul>
            </div>

            <div class="column is-one-third">
              <div class="global-top-name">Top Deaths</div>
              <div class="global-top-note">global %, national %</div>
              <ul id="stats-top-countries-deaths" class="global-top-list deaths"><!-- filled here --></ul>
            </div>

            <div class="column is-one-third">
              <div class="global-top-name">Top Recovery</div>
              <div class="global-top-note">global %, national %</div>
              <ul id="stats-top-countries-recovered" class="global-top-list recovered"><!-- filled here --></ul>
            </div>
          </div>
        </div>
      </div>

      <div id="news" class="column is-4">
        <div class="elm-subsection global-news">
          <div class="columns is-multiline">
            <div class="column is-12">
              <div class="elm-title-ssec global-news-title">News</div>
            </div>

            <div class="column is-12">
              <ul id="global-news-list" class="global-news-list">
                <!-- Data filled here -->
                <!-- <li class="hero-news-item">
                  <div class="pubdate"></div>
                  <div class="source"></div>
                  <div class="headline"></div>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>

<div id="locality" class="locality">
  <div class="container">

    <div id="locality-search" class="columns is-multiline elm-section locality-search">

      <div class="column is-12">
        <div class="elm-subsection locality-search-header">
          <div class="elm-title-sec locality-search-title">My Area</div>
        </div>
      </div>

      <div id="my-area" class="column is-12">
        <div class="elm-subsection locality-search">
          <div class="columns is-multiline">
            <div class="column is-12">
              <div class="columns is-mobile locality-search-form">
                <div id="locality-search-tab" class="column is-narrow locality-search-item locality-search-tab">
                  <i class="far fa-globe"></i>
                  <i class="far fa-spinner-third"></i>
                </div>
                <div class="column locality-search-box">
                  <!-- value="Manhattan, NYC"  -->
                  <input id="locality-search-input" class="locality-search-input" type="text" placeholder="Search address (via Google Maps)" />
                </div>
                <div id="locality-search-btn" class="column is-narrow locality-search-item locality-search-btn disabled"><i class="far fa-search"></i></div>
                <div id="locality-search-clear-btn" class="column is-narrow locality-search-item locality-search-clear-btn"><i class="far fa-times"></i></div>
              </div>
            </div>

            <div class="column is-12">
              <div class="columns is-mobile locality-search-current">
                <div class="column is-narrow">
                  <div id="locality-search-current-btn" class="locality-search-current-btn">Use current location (allow access)</div>
                </div>
                <div class="column is-narrow">
                  <div id="locality-search-current-note" class="locality-search-current-note"></div>
                </div>
              </div>
            </div>

            <div class="column is-12">
              <div class="columns is-multiline locality-search-return">
                <div class="column is-12 locality-search-return-error">
                  <div id="locality-search-error-fips"></div>
                  <div id="locality-search-error-length"></div>
                </div>
                <div class="column is-narrow locality-search-return-name">
                  Retrieved Address:
                </div>
                <div class="column is-narrow locality-search-return-addr">
                  <div id="locality-search-return-addr"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

    <div id="locality-area" class="columns is-multiline elm-section locality-area">

      <div id="my-county" class="column is-6">
        <div class="elm-subsection locality-data locality-county">
          <div class="columns is-multiline">
            <div class="column is-12">
              <div class="elm-title-ssec locality-area-title">County Report</div>
            </div>

            <div class="column is-12">
              <div id="locality-county-data" class="columns is-multiline is-mobile locality-data-box">
                <div class="column is-narrow">
                  <div class="locality-data-name">Cases</div>
                  <div id="locality-county-cases-today" class="locality-data-val confirmed"></div>
                </div>
                <div class="column is-narrow">
                  <div class="locality-data-name">Deaths</div>
                  <div id="locality-county-deaths-today" class="locality-data-val deaths"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="my-state" class="column is-6">
        <div class="elm-subsection locality-data locality-state">
          <div class="columns is-multiline">
            <div class="column is-12">
              <div class="elm-title-ssec locality-area-title">State Report</div>
            </div>

            <div class="column is-12">
              <div id="locality-state-data" class="columns is-multiline is-mobile locality-data-box">
                <div class="column is-narrow">
                  <div class="locality-data-name">Cases</div>
                  <div id="locality-state-cases-today" class="locality-data-val confirmed"></div>
                </div>
                <div class="column is-narrow">
                  <div class="locality-data-name">Deaths</div>
                  <div id="locality-state-deaths-today" class="locality-data-val deaths"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div id="my-county-mask" class="column is-6">
        <div class="elm-subsection locality-data locality-mask">
          <div class="columns is-multiline">
            <div class="column is-12">
              <div class="elm-title-ssec locality-mask-title">County Mask Usage</div>
              <div class="locality-mask-desc">NYTimes: 250,000 survey responses (July 2 ~ 14)</div>
            </div>

            <div class="column is-12">
              <div id="locality-county-mask-data" class="columns is-multiline is-mobile locality-data-smallbox"></div>
            </div>
          </div>
        </div>
      </div>

      <div id="my-graphs" class="column is-12">
        <div class="columns is-multiline elm-subsection locality-graph">
          <div class="column is-6">
            <div class="elm-shadow-box locality-data-graph">
              <div id="locality-county-graph"></div>
            </div>
          </div>
          <div class="column is-6">
            <div class="elm-shadow-box locality-data-graph">
              <div id="locality-state-graph"></div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>

<?php require './components/footer.php';
