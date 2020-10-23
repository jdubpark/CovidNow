<?php
  define('PAGE_NAME', 'states');
  define('PAGE_TITLE', 'US States');

  define('NEED_JS_highchart', true);
  define('NEED_JS_usmap', true);
  define('NEED_CSS_fa', true);

  require './components/header.php';
?>
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
        <div class="state-top-info">Updated every 4 hours</div>
        <div class="state-name">State: <span id="usmap-state-name">Select a state</span></div>
        <div class="state-stats">
          <div class="state-stat confirmed">
            <div id="usmap-state-stat-confirmed" class="num">0</div>
            <div class="name">Confirmed</div>
          </div>
          <div class="state-stat deaths">
            <div id="usmap-state-stat-deaths" class="num">0</div>
            <div class="name">Deaths</div>
          </div>
          <!-- <div class="state-stat recovered">
            <div id="usmap-state-stat-recovered" class="num">0</div>
            <div class="name">Recovered</div>
          </div> -->
        </div>
        <div id="counties" class="state-counties-wrapper">
          <div class="state-counties-title">Reported Counties</div>
          <div class="state-counties-info">More features coming: historical data and charts!</div>
          <div class="state-counties">
            <div class="state-county header">
              <div class="state-county-item loc">County</div>
              <div class="state-county-item stat-f">Confirmed</div>
              <div class="state-county-item stat-f">Deaths</div>
              <!-- <div class="state-county-item stat-f">Recovered</div> -->
            </div>
          </div>
          <div id="usmap-state-counties" class="state-counties">
            <!-- <div class="state-county">
              <div class="state-county-item loc">Location</div>
              <div class="state-county-item stat confirmed">0</div>
              <div class="state-county-item stat deaths">0</div>
              <div class="state-county-item stat recovered">0</div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<?php require './components/footer.php';
