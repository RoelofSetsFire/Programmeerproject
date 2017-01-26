function makeBar(config){
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = config.width - margin.left - margin.right,
    height = config.height - margin.top - margin.bottom,
    svg = d3.select("#data").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom),
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

d3.csv(config.csv, function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);

  x0.domain(data.map(function(d) { return d.measure; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.measure) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); });

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text(config.measure);

      
  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});
}

function makeLine(config){
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = config.width - margin.left - margin.right,
    height = config.height - margin.top - margin.bottom,
    svg = d3.select("#data").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom),
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleBand()
    .rangeRound([0, width]) ,
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.measure); })
    .y(function(d) { return y(d.lineValue); });

d3.csv(config.csv, type, function(error, data) {
  if (error) throw error;

  var lines = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {measure: d.measure, lineValue: d[id]};
      })
    };
  });


  x.domain(data.map(function(d) { return d.measure; }));

  y.domain([
    d3.min(lines, function(c) { return d3.min(c.values, function(d) { return d.lineValue; }); }),
    d3.max(lines, function(c) { return d3.max(c.values, function(d) { return d.lineValue; }); })
  ]);

  z.domain(lines.map(function(c) { return c.id; }));

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text(config.measure);

  var valueLine = g.selectAll(".valueLine")
    .data(lines)
    .enter().append("g")
      .attr("class", "valueLine");

  valueLine.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .attr("id", function (d) { return d.id; })
      .attr("active", "off")
      .style("stroke", function(d) { return z(d.id); });

  // valueLine.append("text")
  //     .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
  //     .attr("transform", function(d) { return "translate(" + x(d.value.measure) + "," + y(d.value.lineValue) + ")"; })
  //     .attr("x", 3)
  //     .attr("dy", "0.35em")
  //     .style("font", "10px sans-serif")
  //     .text(function(d) { return d.id; });


      var buttons = data.columns.slice(1);
      buttons.forEach(addButton);

      function addButton(name){
            d3.select("#buttons").append("input")
            .attr("type", "button")
            .attr("class", "button")
            .attr("id", name + "button")
            .attr("value", name)
            .attr("style", function(){
              var color = d3.select("#"+name).attr("style");
              color = color.replace("stroke: ", "");
              color = color.replace(";", "");
              return "background-color:" + color;
              })
            .on("click", function(){
              var active = d3.select("#"+name).attr("active") == "on" ? false : true ,
              newOpacity = active ? 0 : 1;
              buttonOpacity = active ? 0.5 : 1;
              // Hide or show the elements
              d3.select("#" + name + "button").style("opacity", buttonOpacity);
              d3.select("#"+name).style("opacity", newOpacity);
              d3.select("#"+name).attr("active", active ? "on" : "off");
              });

      }

});

function type(d, _, columns) {
    for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
  return d;
}

}
