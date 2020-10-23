<div id="hero" class="hero">

  <div class="container">

    <div class="hero-you">
      <div class="hero-you-inner">
        <div class="hero-you-head">
          <div class="hero-you-title">Search Location</div>
          <div class="hero-you-search-title"><span>Look up address on Google maps</span></div>
        </div>
        <div class="hero-you-body">
          <div class="hero-you-search">
            <input id="you-search-bar" class="hero-you-search-bar" type="text" placeholder="Type in address with states abbr."></input>
            <div id="you-search-btn" class="hero-you-search-btn"><span>Search</span></div>
          </div>
          <ul class="hero-you-home">
            <li id="you-search-lat" class="hero-you-home-lat">Latitude: <val>allow access...</val></li>
            <li id="you-search-long" class="hero-you-home-long">Longtitude: <val>allow access...</val></li>
            <!-- <li id="you-search-name" class="hero-you-home-prov">Location: <val>loading...</val></li> -->
            <li id="you-search-invalid" class="hero-you-home-invalid">Sorry, we couldn't grab location data for the provided address. Please include the city/state or use the Google Maps address for better accuracy!</li>
          </ul>
          <div class="hero-you-locs">
            <!-- <div id="geoloc-city" class="hero-you-loc">
              <div id="geoloc-city-name" class="hero-you-loc-radius">City</div>
              <ul>
                <li class="cases"><val>?</val> preparing data</li>
              </ul>
            </div> -->
            <div id="geoloc-county" class="hero-you-loc">
              <div id="geoloc-county-name" class="hero-you-loc-radius">County</div>
              <ul>
                <li class="confirmed">
                  <div class="num">0</div>
                  <div class="name">Confirmed</div>
                </li>
                <li class="deaths">
                  <div class="num">0</div>
                  <div class="name">Deaths</div>
                </li>
              </ul>
            </div>
            <div id="geoloc-state" class="hero-you-loc">
              <div id="geoloc-state-name" class="hero-you-loc-radius">State: <span></span></div>
              <ul>
                <li class="confirmed">
                  <div class="num">0</div>
                  <div class="name">Confirmed</div>
                </li>
                <li class="deaths">
                  <div class="num">0</div>
                  <div class="name">Deaths</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-cases">
      <div class="hero-cases-inner">
        <div class="hero-cases-head">
          <div class="hero-cases-title">Location Report</div>
        </div>
        <div class="hero-cases-body">
          <ul id="hero-cases-list" class="hero-cases-list">
            <!-- Data loaded here -->
            <!-- <li>
              <div class="pubdate"></div>
              <div class="headline"></div>
              <div class="location"></div>
              <div class="source">()</div>
            </li> -->
          </ul>
        </div>
      </div>
    </div>

    <div class="hero-linkboxes">
      <div class="hero-linkboxes-inner">
        <div class="hero-linkbox states">
          <a class="hero-linkbox-inner" href="./states">
            <div class="hero-linkbox-name">States Breakdown &#8250;</div>
            <div class="hero-linkbox-desc">Check out current COVID-19 cases and status in each state.</div>
          </a>
        </div>
        <div class="hero-linkbox research">
          <a class="hero-linkbox-inner" href="./flu">
            <div class="hero-linkbox-name">COVID-19 vs. Flu &#8250;</div>
            <div class="hero-linkbox-desc">Learn more about how COVID-19 differs from the seasonal flu.</div>
          </a>
        </div>
        <div class="hero-linkbox prevention">
          <a class="hero-linkbox-inner" href="./economy">
            <div class="hero-linkbox-name">Economy &#8250;</div>
            <div class="hero-linkbox-desc">See how the virus has impacted the economy, in live data.</div>
          </a>
        </div>
        <div class="hero-linkbox myths">
          <a class="hero-linkbox-inner" href="./wiki">
            <div class="hero-linkbox-name">Wiki &#8250;</div>
            <div class="hero-linkbox-desc">Learn more about COVID-19, with expert-backed facts and evidence.</div>
          </a>
        </div>
        <div class="hero-linkbox faq">
          <a class="hero-linkbox-inner" href="./about">
            <div class="hero-linkbox-name">About &#8250;</div>
            <div class="hero-linkbox-desc">Learn about the developers behind the website and contribute. Your voice matters.</div>
          </a>
        </div>
        <div class="hero-linkbox about">
          <a class="hero-linkbox-inner" href="https://ko-fi.com/covidnow" target="_blank" rel="noopener">
            <div class="hero-linkbox-name">Help us &#8250;</div>
            <div class="hero-linkbox-desc">Help us maintain the website and present you factual information!</div>
          </a>
        </div>
      </div>
    </div>

    <div class="hero-countries">
      <div class="hero-countries-inner">
        <div class="hero-countries-head">
          <div class="hero-countries-title">Numbers by Countries</div>
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
              <!-- Data loaded here -->
              <!-- <div class="hero-country">
                <div class="hero-country-name">China</div>
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
