</div><!-- #wrapper -->
</div><!-- #body-main -->
<div id="page-back-to-top" class="page-back-to-top">
  <div class="page-back-to-top-btn"><i class="far fa-arrow-to-top"></i></div>
</div>
</div><!-- #page -->

<script src=<?php relDistFile('universal.bundle.js?cbv=819b47306d5d9a99c0b70891a4cf8aa9', 'js'); ?>></script>
<?php
  $cacheBuster = false; // cache buster will increase load time
  $distScripts = [
    'home' => ['home'],
    'states' => ['states'],
  ];
  if (defined('PAGE_NAME')) $distScriptsToLoad = $distScripts[PAGE_NAME] ?? [];
  else $distScriptsToLoad = [];

  foreach ($distScriptsToLoad as $item){
    echo '<script src="'.relDistFile($item, 'js', false).'.bundle.js?cbv=819b47306d5d9a99c0b70891a4cf8aa9"></script>';
  }
?>
</body>
</html>
