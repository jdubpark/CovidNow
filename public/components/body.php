<div id="body-side" class="body-side bside">
  <div class="container">
    <div class="bside-block bside-nav-wrapper">
      <ul class="bside-nav">
        <?php if (PAGE_NAME == 'home'): ?>
        <li class="nav-title"><a><i class="far fa-globe"></i>Global</a></li>
        <li><a href="#latest"><i class="far fa-wave-triangle"></i>Latest</a></li>
        <li><a href="#news"><i class="far fa-newspaper"></i>News</a></li>
        <li><a href="#top-countries"><i class="far fa-globe-stand"></i>Top Countries</a></li>
        <!-- <li><a href="#top-countries"><i class="far fa-chart-bar"></i>Trends</a></li> -->
        <?php elseif (PAGE_NAME == 'states'): ?>
        <li class="nav-title"><a><i class="far fa-flag-usa"></i>States</a></li>
        <li><a href="#usmap"><i class="far fa-wave-triangle"></i>Latest</a></li>
        <li><a href="#counties"><i class="far fa-map-signs"></i>Counties</a></li>
        <?php endif; ?>
      </ul>
      <?php if (PAGE_NAME == 'home'): ?>
      <div class="bside-nav-hline"></div>
      <ul class="bside-nav">
        <li class="nav-title"><a><i class="far fa-map-marked-alt"></i>Locality</a></li>
        <li><a href="#my-area"><i class="far fa-street-view"></i>My Area</a></li>
        <li><a href="#my-state"><i class="far fa-map-signs"></i>My State</a></li>
      </ul>
      <div class="bside-nav-hline"></div>
      <ul class="bside-nav">
        <li class="nav-title"><a><i class="far fa-flag-alt"></i>Country</a></li>
        <li><a href="#country-search"><i class="far fa-search"></i>Search</a></li>
        <!-- <li><a href="#country-trends"><i class="far fa-analytics"></i>Trends</a></li> -->
      </ul>
      <!-- <div class="bside-nav-hline"></div>
      <ul class="bside-nav">
        <li class="nav-title"><a><i class="far fa-flag-alt"></i>Misc</a></li>
        <li><a href="#survey"><i class="far fa-poll"></i>Survey</a></li>
      </ul> -->
      <?php endif; ?>
    </div>
  </div>
</div>

<div id="body-main" class="body-main">
  <div id="wrapper">
<!-- Closing tags come at footer -->
