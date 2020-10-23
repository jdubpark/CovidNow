// set the dimensions and margins of the graph
let
  // margin convention // https://observablehq.com/@d3/margin-convention
  margin = {top: 50, right: 50, bottom: 50, left: 50},
  width = 500 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom,
  tooltipSize = {width: 100, height: 100, x: 10, y: -30};

// const
//   bisectDate = d3.bisector(d => d.dateP).left,
//   formatValue = d3.format(',');

// parse the date / time
const parseTime = d3.timeParse('%Y-%m-%d');
// format the data
data.county.forEach(d => {
  d.dateP = parseTime(d.date);
  d.cases = +d.cases;
});

// X and Y scale
const
  yMul = 0.1, yMin = d3.min(data.county, d => d.cases), yMax = d3.max(data.county, d => d.cases),
  xScale = d3.scaleTime(),
  yScale = d3.scaleLinear();

xScale.domain(d3.extent(data.county, d => d.dateP)).range([0, width]);
yScale.domain([yMin*(1-yMul), yMax*(1+yMul)]).rangeRound([height, 0]);

// define the line
const line = d3.line()
  .x(d => xScale(d.dateP))
  .y(d => yScale(d.cases));
  // .curve(d3.curveMonotoneX); // line smoothing

// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
const chart = d3.select('#my_dataviz')
  .append('svg')
  .attr('width', width+margin.left+margin.right)
  .attr('height', height+margin.top+margin.bottom)
  .append('g')
  .attr('transform', 'translate('+margin.left+','+margin.top+')');

const tooltip = d3.select('#tooltip');
const tooltipLine = chart.append('line');
// const xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
// const yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));

// Add the x-axis in the group tag
chart.append('g')
  .attr('class', 'x-axis')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(xScale));

// Add the y-axis in the group tag
chart.append('g')
  .attr('class', 'y-axis')
  .call(d3.axisLeft(yScale));

// Add the valueline path
chart.append('path')
  .data([data.county]) // this one needs to be wrapped
  .attr('class', 'line')
  .attr('d', line);

// Append circle to each data point
chart.selectAll('.dot')
  .data(data.county).enter()
  .append('circle') // Uses the enter().append() method
  .attr('class', 'dot') // Assign a class for styling
  .attr('cx', d => xScale(d.dateP))
  .attr('cy', d => yScale(d.cases))
  .attr('r', 3);

// chart.selectAll()
//   .data(data.county).enter()
//   .append('path')
//   .attr('fill', 'none')
//   .attr('stroke', d => d.color)
//   .attr('stroke-width', 2)
//   .datum(d => d.history)
//   .attr('d', line);

// chart.selectAll()
//   .data(data.county).enter()
//   .append('text')
//   .html(d => d.name)
//   .attr('fill', d => d.color)
//   .attr('alignment-baseline', 'middle')
//   .attr('x', width)
//   .attr('dx', '.5em')
//   .attr('y', d => y(d.currentPopulation));

// http://bl.ocks.org/wdickerson/64535aff478e8a9fd9d9facccfef8929
let tipBox = chart.append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('opacity', 0)
  .on('mousemove', drawTooltip)
  .on('mouseout', removeTooltip);

function removeTooltip(){
  if (tooltip) tooltip.style('display', 'none');
  if (tooltipLine) tooltipLine.attr('stroke', 'none');
}

function drawTooltip(event, d_){
  // const year = Math.floor((xScale.invert(d3.mouse(tipBox.node())[0]) + 5) / 10) * 10;
  // const year = Math.floor((xScale.invert(event.x) + 5) / 10) * 10;
  const hoverTime = new Date(xScale.invert(d3.pointer(event)[0])).toISOString().split('T')[0];
  const timeData = hoverTime;

  // states.sort((a, b) => {
  //   return b.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
  // });

  tooltipLine.attr('stroke', 'black')
    .attr('x1', xScale(year))
    .attr('x2', xScale(year))
    .attr('y1', 0)
    .attr('y2', height);


  tooltip.html(year)
    .style('display', 'block')
    .style('left', event.x + 20)
    .style('top', event.y - 20)
    .selectAll()
    .data(data.county).enter()
    .append('div')
    // .style('color', d => d.color)
    // .html(d => d.name + ': ' + d.history.find(h => h.year == year).population);
    .html(d => 'Cases: ' + d.cases);
}
