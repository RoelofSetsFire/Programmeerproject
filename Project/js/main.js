/* by Roelof Konijnenberg
** Script for the main page of the "Programmeerproject"
*/

var width = 960,
    height = 500,
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

d3.csv("data/data.csv", type, function(error, data) {
  if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")
      .on("click", function(d,i){
        resize();})
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
  d3.select("spending")
  .transition()
  .duration(1500)
  .attr("width", width / 10)
  .attr("height", height / 10);
}
