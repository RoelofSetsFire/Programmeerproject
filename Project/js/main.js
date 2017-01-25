/* by Roelof Konijnenberg
** Script for the main page of the "Programmeerproject"
*/

var width = 450,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal()
    .range(["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"]);

var arc = d3.arc()
    .outerRadius(radius - 20)
    .innerRadius(0);

var arcOver = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.pie()
    //.sort(null)
    .value(function(d) { return d.spending; });

var svg = d3.selectAll("#left").append("svg")
    .attr("id", "spending")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


d3.json("data/data.json", function(error, data) {
  if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.sector); });

  g.append("path")
     .attr("d", arc)
     .attr("data-legend", function(d) { return d.data.sector; })
     .attr("data-legend-pos", function(d, i) { return i; })
     .style("fill", function(d) { return color(d.data.sector); })
     .on("mouseover", function(d) {
                 d3.select(this).transition()
                    .duration(1000)
                    .attr("d", arcOver);
                })
     .on("mouseout", function(d) {
                 d3.select(this).transition()
                    .duration(1000)
                    .attr("d", arc);
                })
     .on("click", function(d,i){
       //resize();
      //  svg.selectAll(".arc").remove();
       d.data.graphs.forEach(function(d){makeLine(d.config);});
       });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.spending; });

  // var padding = 20,
  //   legx = radius + padding,
  //   legend = svg.append("g")
  //   .attr("class", "legend")
  //   .attr("transform", "translate(" + legx + ", 0)")
  //   .style("font-size", "12px")
  //   .call(d3.legend);
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


function addButton(name){
  var form = d3.select("#button")

  form.append("input")
      .attr("type", "button")
      .attr("value", name.sector)
      .attr("onclick", console.log(name));
}
