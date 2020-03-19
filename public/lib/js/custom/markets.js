'use strict';

const
  // from Yahoo Finance
  highestYTD = {
    '^DJI': 29568.57,
    '^SPX': 3393.52,
    '^NYA': 14183.26,
    '^RUT': 1715.08,
    '^TNX': 1.9030,
  };

function stockChange($els, _change){
  let change = _change;
  if (typeof change !== 'number') change = parseFloat(change);
  const isUp = change > 0, isDown = change < 0;
  $els.forEach($el => {
    if (isUp) $el.removeClass('down nochange').addClass('up');
    else if (isDown) $el.removeClass('up nochange').addClass('down');
    else $el.removeClass('down up').addClass('nochange');
  });
}

(function($){
  const prom = $.ajax({
    url: 'https://api.coinwis.com/trivial/composite-indice',
    dataType: 'json',
  });

  prom.done(res => {
    console.log(res);
    Object.keys(res).forEach(name => {
      const
        $stock = $('#market-'+name.replace('^', '')),
        stock = res[name],
        highest = highestYTD[name];

      const {price, change, changePerc} = stock;
      const ytdChange = Number(price)-highest;
      const ytdChangePerc = ((ytdChange/highest)*100).toFixed(2)+'%';

      const
        $price = $stock.find('.price'),
        $change = $stock.find('.change'),
        $changePerc = $stock.find('.change-perc'),
        $ytdChange = $stock.find('.ytd-change'),
        $ytdChangePerc = $stock.find('.ytd-change-perc');

      stockChange([$change, $changePerc], change);
      stockChange([$ytdChange, $ytdChangePerc], ytdChange);

      $price.html(price);
      $change.html(change);
      $changePerc.html(parseFloat(changePerc).toFixed(2)+'%');
      $ytdChange.html(ytdChange.toFixed(2));
      $ytdChangePerc.html(ytdChangePerc);
    });
  });

  prom.fail((a, b, c) => {
    console.error(a, b, c);
  });
})(jQuery);
