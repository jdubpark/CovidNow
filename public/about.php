<?php
  define('PAGE_NAME', 'about');
  define('PAGE_TITLE', 'About');

  require './components/header.php';
?>
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
<?php require './components/footer.php';
