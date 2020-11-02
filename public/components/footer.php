</div><!-- #wrapper -->
</div><!-- #body-main -->
<div id="page-back-to-top" class="page-back-to-top">
  <div class="page-back-to-top-btn"><i class="far fa-arrow-to-top"></i></div>
</div>
</div><!-- #page -->

<script src=<?php relDistFile('universal.bundle.js?cbv=1780f66a1c4209c604d5de1b96bf0fd4', 'js'); ?>></script>
<?php
  $cacheBuster = false; // cache buster will increase load time
  $distScripts = [
    'home' => ['home'],
    'states' => ['states'],
  ];
  if (defined('PAGE_NAME')) $distScriptsToLoad = $distScripts[PAGE_NAME] ?? [];
  else $distScriptsToLoad = [];

  foreach ($distScriptsToLoad as $item){
    echo '<script src="'.relDistFile($item, 'js', false).'.bundle.js?cbv=1780f66a1c4209c604d5de1b96bf0fd4"></script>';
  }
?>
</body>
</html>
