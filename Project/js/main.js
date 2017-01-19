/* by Roelof Konijnenberg
** Script for the main page of the "Programmeerproject"
*/

var width = 600,
    height = 400,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    //.sort(null)
    .value(function(d) { return d.spending; });

var svg = d3.select("body").append("svg")
    .attr("id", "spending")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


d3.json("data/test2.json", function(error, data) {
  if (error) throw error;



  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")
      .on("click", function(d,i){
        selection = d3.select(this);
        //.attr
        resize();
        svg.selectAll(".arc").remove();
        //data.sector.forEach(addButton);
        makeGraphs(data[0].graphs);
        })
      ;

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.sector); });

  g.append("path")
     .attr("d", arc)
     .attr("data-legend", function(d) { return d.data.sector; })
     .attr("data-legend-pos", function(d, i) { return i; })
     .style("fill", function(d) { return color(d.data.sector); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.spending; });

  var padding = 20,
    legx = radius + padding,
    legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + legx + ", 0)")
    .style("font-size", "12px")
    .call(d3.legend);
});

function type(d) {
  d.spending = +d.spending;
  return d;
}

function resize() {
  d3.select("#spending")
  .transition()
  .duration(1500)
  .attr("width", width / 2)
  .attr("height", height / 2);
}

function makeGraphs(data){
  var rightMargin = {left: 20, right: 20, bottom: 20, top:20},
      rightWidth = 460 - rightMargin.left - rightMargin.right,
      rightHeight = 460 - rightMargin.bottom - rightMargin.top;


  // Set the ranges
  var	x = d3.scale.ordinal()
  .domain(data.Likert)
  .rangeRoundPoints([0, rightWidth]);

  var	y = d3.scale.linear().range([rightHeight, 0]);

  // Define the axes
  var	xAxis = d3.svg.axis().scale(x)
  	.orient("bottom");

  var	yAxis = d3.svg.axis().scale(y)
  	.orient("left");

  // Define the line
  // var	valueline = d3.svg.line()
  // 	.x(d.Likert)
  // 	.y(d.Eczema);

  // Adds the svg canvas
  var	rightChart = d3.select("#rightGraphs")
  	.append("svg")
      .attr("id", "proof")
  		.attr("width", rightWidth + rightMargin.left + rightMargin.right)
  		.attr("height", rightHeight + rightMargin.top + rightMargin.bottom)
  	.append("g")
  		.attr("transform", "translate(" + rightMargin.left + "," + rightMargin.top + ")");

  /* Get the data
  d3.csv("data1.csv", function(error, data) {
  	data.forEach(function(d) {
  		d.date = parseDate(d.date);
  		d.close = +d.close;
  	});
*/
  	// Scale the range of the data
  	y.domain([0, d3.max(data.Eczema)]);


  	// Add the valueline path.
  	rightChart.append("path")
  		.attr("class", "line")
  		.attr(d3.svg.line().x(data.Likert).y(data.Eczema));

  	// Add the X Axis
  	rightChart.append("g")
  		.attr("class", "x axis")
  		.attr("transform", "translate(0," + height + ")")
  		.call(xAxis);

  	// Add the Y Axis
  	rightChart.append("g")
  		.attr("class", "y axis")
  		.call(yAxis);

  //});
}

function addButton(name){
  var form = d3.select("#button")

  form.append("input")
      .attr("type", "button")
      .attr("value", name.sector)
      .attr("onclick", console.log(name));
}
