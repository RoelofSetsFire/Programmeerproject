/* by Roelof Konijnenberg
** Script for the main page of the "Programmeerproject"
*/

var width = 600,
    height = 400,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal()
    .range(["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"]);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.pie()
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
        resize();
        svg.selectAll(".arc").remove();
        //data.sector.forEach(addButton);
        makeGraphs("Homeo");
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

function makeGraphs(sector){

  var rightSVG = d3.select("#rightGraphs"),
      margin = {top: 20, right: 80, bottom: 30, left: 50},
      rightWidth = rightSVG.attr("width") - margin.left - margin.right,
      rightHeight = rightSVG.attr("height") - margin.top - margin.bottom,
      rightG = rightSVG.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var x = d3.scaleBand().rangeRound([0, rightWidth]),
      y = d3.scaleLinear().range([rightHeight, 0]),
      z = d3.scaleOrdinal(d3.schemeCategory10);

  var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.xLine); })
      .y(function(d) { return y(d.value); });

  d3.csv("data/"+sector+".csv", type, function(error, csv) {
    if (error) throw error;

    var conditions = csv.columns.slice(1).map(function(id) {
      return {
        id: id,
        values: csv.map(function(d) {
          return {Likert: d.Likert, percentage: +d[id]};
        })
      };
    });

    x.domain(csv.map(function(d) { return d.Likert; }));

    y.domain([
      d3.min(conditions, function(c) { return d3.min(c.values, function(d) { return d.percentage; }); }),
      d3.max(conditions, function(c) { return d3.max(c.values, function(d) { return d.percentage; }); })
    ]);

    z.domain(conditions.map(function(c) { return c.id; }));

    rightG.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    rightG.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
      // .append("text")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", 6)
      //   .attr("dy", "0.71em")
      //   .attr("fill", "#000")
      //   .text("Temperature, ºF");

    var condition = rightG.selectAll(".condition")
      .data(conditions)
      .enter().append("g")
        .attr("class", "condition");

    condition.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return z(d.id); });

    // condition.append("text")
    //     .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
    //     .attr("transform", function(d) { return "translate(" + x(d.value.Likert) + "," + y(d.value.percentage) + ")"; })
    //     .attr("x", 3)
    //     .attr("dy", "0.35em")
    //     .style("font", "10px sans-serif")
    //     .text(function(d) { return d.id; });
  });
}

function addButton(name){
  var form = d3.select("#button")

  form.append("input")
      .attr("type", "button")
      .attr("value", name.sector)
      .attr("onclick", console.log(name));
}
