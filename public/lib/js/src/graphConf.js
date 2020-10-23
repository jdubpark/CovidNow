module.exports = function graphConf({
  title, yAxisMax, maxWidth, seriesArr,
}){
  return {
    chart: {
      type: 'area',
    },
    title: {
      text: title,
    },
    // subtitle: {
    //   text: 'Source: thesolarfoundation.com'
    // },
    rangeSelector: {
      selected: 1,
    },

    yAxis: {
      // type: 'logarithmic',
      max: yAxisMax,
      title: {
        text: '',
      },
    },

    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function(){
          return Highcharts.dateFormat('%Y-%m-%d', this.value);
        },
      },
      crosshair: true,
      // accessibility: {
      //   rangeDescription: 'Range: 2010 to 2017'
      // }
    },

    tooltip: {
      // split: true,
      shared: true,
      formatter: function(){
        return this.points.reduce((s, point) => {
          const idx = point.point.index, curVal = point.y;
          let change = '0';
          // point.series.processedYData
          if (point.series.yData[idx-1] != null){
            const preVal = point.series.yData[idx-1];
            change = curVal - preVal;
            if (change > 0) change = '+'+change;
          }
          return s+`<br/>${point.series.name}: ${curVal} (${change})`;
        }, '<b>'+(new Date(this.x)).toISOString().split('T')[0]+'</b>');
      },
    },

    legend: {
      // layout: 'horizontal', // 'vertical'
      // align: 'bottom',
      // verticalAlign: 'middle',
    },

    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666',
        },
      },
    },

    series: seriesArr,

    responsive: {
      rules: [{
        condition: {
          maxWidth: maxWidth,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      }],
    },
  };
};
