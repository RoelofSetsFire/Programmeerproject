/* by Roelof Konijnenberg
 ** Script for the main page of the "Programmeerproject"
 */
var color = d3.scaleOrdinal()
	.range(d3.schemeCategory10);
var div = d3.select("#leftBottomLeft")
	.append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);
var div2 = d3.select("#leftBottomRight")
	.append("div")
	.attr("class", "tooltip2")
	.style("opacity", 0);
d3.json("data/data.json", function(error, data) {
	if (error) throw error;
	mainGraph(data);
	data.forEach(function(d, i) {
		var practColor = color(d.sector);
		for (var j = 0; j < d.practitioners; j += 1000) {
			d3.select("#leftBottomLeft")
				.append("span")
				.attr("class", "control glyphicon glyphicon-user")
				.attr("style", "color:" + practColor + "; opacity: 0.5")
				.attr("id", "practitionersOf" + d.sector)
				.on("mouseover", function() {
					div.transition()
						.duration(200)
						.style("opacity", .9);
					div.html(d.sector + "<br/>" + d.practitioners)
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY - 28) + "px");
				})
				.on("mouseout", function() {
					div.transition()
						.duration(500)
						.style("opacity", 0);
				});
		}
	});
	var width = leftBottomRight.offsetWidth * 0.8,
		height = leftBottomRight.offsetHeight * 0.8,
		radius = Math.min(width, height) / 2;
	var arc = d3.arc()
		.outerRadius(radius - 10)
		.innerRadius(0);
	var labelArc = d3.arc()
		.outerRadius(radius - 40)
		.innerRadius(radius - 40);
	var pie = d3.pie()
		//.sort(null)
		.value(function(d) {
			return d.users;
		});
	var svg = d3.select("#leftBottomRight")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("id", "users")
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	var g = svg.selectAll(".arc")
		.data(pie(data))
		.enter()
		.append("g")
		.attr("class", "arc");
	g.append("path")
		.attr("d", arc)
		.style("fill", function(d) {
			return color(d.data.sector);
		})
		.on("mouseover", function(d) {
			div2.transition()
				.duration(200)
				.style("opacity", .9);
			div2.html("Men: " + "<br/>" + (Math.round(d.data.users * 0.417438535))
					.toLocaleString() + "<br/>" + "Women: " + "<br/>" + (Math.round(d.data.users * 0.582561465))
					.toLocaleString())
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function() {
			div2.transition()
				.duration(500)
				.style("opacity", 0);
		});
	g.append("text")
		.attr("transform", function(d) {
			return "translate(" + labelArc.centroid(d) + ")";
		})
		.attr("dy", ".35em")
		.text(function(d) {
			return d.data.users / 1000;
		});
});

function mainGraph(data) {
	var width = leftTop.offsetWidth,
		height = leftTop.offsetHeight,
		radius = Math.min(width, height) / 2;
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
		.value(function(d) {
			return d.spending;
		});
	var mySvg = d3.selectAll("#leftTop")
		.append("svg")
		.attr("id", "spending")
		.attr("width", width)
		.attr("height", height)
		.style("opacity", 0);
	var svg = mySvg.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	var g = svg.selectAll(".arc")
		.data(pie(data))
		.enter()
		.append("g")
		.attr("class", "arc");
	g.append("path")
		.attr("d", arc)
		.style("fill", function(d) {
			return color(d.data.sector);
		});
	g.append("path")
		.attr("d", arc)
		.style("fill", function(d) {
			return color(d.data.sector);
		})
		.on("mouseover", function(d) {
			d3.select(this)
				.transition()
				.duration(1000)
				.attr("d", arcOver);
		})
		.on("mouseout", function(d) {
			d3.select(this)
				.transition()
				.duration(1000)
				.attr("d", arc);
		})
		.on("click", function(d, i) {
			d3.select("#spending")
				.transition()
				.duration(500)
				.style("opacity", 0);
			setTimeout(function() {
				d3.select("#usersByEducation1")
					.text(Math.round(d.data.users * 0.06586025)
						.toLocaleString());
				d3.select("#usersByEducation2")
					.text(Math.round(d.data.users * 0.193959749)
						.toLocaleString());
				d3.select("#usersByEducation3")
					.text(Math.round(d.data.users * 0.220435045)
						.toLocaleString());
				d3.select("#usersByEducation4")
					.text(Math.round(d.data.users * 0.519744956)
						.toLocaleString());
				d3.selectAll("#practitionersOf" + d.data.sector)
					.style("opacity", 1);
				d3.select("#spending")
					.remove();
				d3.select("#leftTop")
					.append("p")
					.attr("id", "backgroundinfo")
					.style("opacity", 0)
					.append("text")
					.text(d.data.background);
				d3.select("#backgroundinfo")
					.transition()
					.duration(500)
					.style("opacity", 1);
				d3.select("#leftTop")
					.append("input")
					.attr("type", "button")
					.attr("class", "button")
					.attr("id", "reset")
					.attr("value", "reset")
					.on("click", function() {
						d3.selectAll("#practitionersOf" + d.data.sector)
							.style("opacity", 0.5);
						d3.select("#right")
							.selectAll("svg")
							.transition()
							.duration(700)
							.style("opacity", 0);
						d3.select("#backgroundinfo")
							.transition()
							.duration(700)
							.style("opacity", 0);
						d3.selectAll(".button")
							.transition()
							.duration(700)
							.style("opacity", 0);
						setTimeout(function() {
							d3.select("#right")
								.selectAll("svg")
								.remove();
							d3.select("#backgroundinfo")
								.remove();
							mainGraph(data);
							d3.selectAll(".button")
								.remove();
						}, 700);
					});
			}, 500);
			d.data.graphs.forEach(function(d) {
				if (d.type == "line") {
					makeLine(d.config);
				} else if (d.type == "bar") {
					makeBar(d.config);
				}
			});
			setTimeout(function() {
				d3.select("#right")
					.selectAll("svg")
					.transition()
					.duration(500)
					.style("opacity", 1);
				d3.select("#right")
					.selectAll(".button")
					.transition()
					.duration(500)
					.style("opacity", 1);
			}, 500);
		});
	g.append("text")
		.attr("transform", function(d) {
			return "translate(" + labelArc.centroid(d) + ")";
		})
		.attr("dy", ".35em")
		.text(function(d) {
			return d.data.spending / 1000000;
		});
	var legendG = mySvg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
		.data(pie(data))
		.enter()
		.append("g")
		.attr("transform", function(d, i) {
			return "translate(" + (width - 120) + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
		})
		.attr("class", "legend");
	legendG.append("rect") // make a matching color rect
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", function(d) {
			return color(d.data.sector);
		});
	legendG.append("text") // add the text
		.text(function(d) {
			return d.data.sector;
		})
		.style("font-size", 12)
		.attr("y", 10)
		.attr("x", 11);
	d3.select("#leftTop")
		.selectAll("svg")
		.transition()
		.duration(500)
		.style("opacity", 1);
}

function makeBar(config) {
	var margin = {
			top: 20,
			right: 20,
			bottom: 30,
			left: 40
		},
		width = rightGraphs.offsetWidth - margin.left - margin.right,
		height = (rightGraphs.offsetHeight / 2) - margin.top - margin.bottom,
		svg = d3.select("#rightGraphs")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.style("opacity", 0),
		g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var x0 = d3.scaleBand()
		.rangeRound([0, width])
		.paddingInner(0.1);
	var x1 = d3.scaleBand()
		.padding(0.05);
	var y = d3.scaleLinear()
		.rangeRound([height, 0]);
	var z = d3.scaleOrdinal()
		.range(d3.schemeCategory20);
	d3.csv(config.csv, function(d, i, columns) {
		for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
		return d;
	}, function(error, data) {
		if (error) throw error;
		var keys = data.columns.slice(1);
		x0.domain(data.map(function(d) {
			return d.measure;
		}));
		x1.domain(keys)
			.rangeRound([0, x0.bandwidth()]);
		y.domain([0, d3.max(data, function(d) {
				return d3.max(keys, function(key) {
					return d[key];
				});
			})])
			.nice();
		g.append("g")
			.selectAll("g")
			.data(data)
			.enter()
			.append("g")
			.attr("transform", function(d) {
				return "translate(" + x0(d.measure) + ",0)";
			})
			.selectAll("rect")
			.data(function(d) {
				return keys.map(function(key) {
					return {
						key: key,
						value: d[key]
					};
				});
			})
			.enter()
			.append("rect")
			.attr("x", function(d) {
				return x1(d.key);
			})
			.attr("y", function(d) {
				return y(d.value);
			})
			.attr("width", x1.bandwidth())
			.attr("height", function(d) {
				return height - y(d.value);
			})
			.attr("fill", function(d) {
				return z(d.key);
			});
		g.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x0));
		g.append("g")
			.attr("class", "axis")
			.call(d3.axisLeft(y)
				.ticks(null, "s"))
			.append("text")
			.attr("x", 2)
			.attr("y", y(y.ticks()
				.pop()) + 0.5)
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
			.data(keys.slice()
				.reverse())
			.enter()
			.append("g")
			.attr("transform", function(d, i) {
				return "translate(0," + i * 20 + ")";
			});
		legend.append("rect")
			.attr("x", width - 19)
			.attr("width", 19)
			.attr("height", 19)
			.attr("fill", z);
		legend.append("text")
			.attr("x", width - 24)
			.attr("y", 9.5)
			.attr("dy", "0.32em")
			.text(function(d) {
				return d;
			});
	});
}

function makeLine(config) {
	var margin = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 20
		},
		width = rightGraphs.offsetWidth - margin.left - margin.right,
		height = (rightGraphs.offsetHeight / 2) - margin.top - margin.bottom,
		svg = d3.select("#rightGraphs")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.style("opacity", 0),
		g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var x = d3.scaleBand()
		.rangeRound([0, width]),
		y = d3.scaleLinear()
		.range([height, 0]),
		z = d3.scaleOrdinal(d3.schemeCategory20);
	var line = d3.line()
		.curve(d3.curveBasis)
		.x(function(d) {
			return x(d.measure);
		})
		.y(function(d) {
			return y(d.lineValue);
		});
	d3.csv(config.csv, type, function(error, data) {
		if (error) throw error;
		var lines = data.columns.slice(1)
			.map(function(id) {
				return {
					id: id,
					values: data.map(function(d) {
						return {
							measure: d.measure,
							lineValue: d[id]
						};
					})
				};
			});
		x.domain(data.map(function(d) {
			return d.measure;
		}));
		y.domain([
			d3.min(lines, function(c) {
				return d3.min(c.values, function(d) {
					return d.lineValue;
				});
			}),
			d3.max(lines, function(c) {
				return d3.max(c.values, function(d) {
					return d.lineValue;
				});
			})
		]);
		z.domain(lines.map(function(c) {
			return c.id;
		}));
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
			.enter()
			.append("g")
			.attr("class", "valueLine");
		valueLine.append("path")
			.attr("class", "line")
			.attr("d", function(d) {
				return line(d.values);
			})
			.attr("id", function(d) {
				return d.id;
			})
			.attr("active", "off")
			.style("stroke", function(d) {
				return z(d.id);
			});
		var buttons = data.columns.slice(1);
		buttons.forEach(addButton);

		function addButton(name) {
			d3.select("#buttons")
				.append("input")
				.attr("type", "button")
				.attr("class", "button")
				.attr("id", name + "button")
				.attr("value", name)
				.attr("style", function() {
					var color = d3.select("#" + name)
						.attr("style");
					color = color.replace("stroke: ", "");
					color = color.replace(";", "");
					return "background-color:" + color + "; opacity: 0";
				})
				.on("click", function() {
					var active = d3.select("#" + name)
						.attr("active") == "on" ? false : true,
						newOpacity = active ? 0 : 1;
					buttonOpacity = active ? 0.5 : 1;
					// Hide or show the elements
					d3.select("#" + name + "button")
						.style("opacity", buttonOpacity);
					d3.select("#" + name)
						.style("opacity", newOpacity);
					d3.select("#" + name)
						.attr("active", active ? "on" : "off");
				});
		}
	});
};

function type(d, _, columns) {
	for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
	return d;
}
