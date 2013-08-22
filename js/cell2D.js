/*
 * 2D Cell viewr
 * Niru Maheswaranathan
 * Aug 20, 2013
 */

// get data
d3.json('cell32.json', function(error, data) {

   if (error) {
      alert(error);
   }

   // properties
   var svg = d3.select("svg");
   var w = 300;
   var h = 500;
   var margin = 50;
   var rad = 1;
	 var xIdx = 0;
	 var yIdx = 1;

	 // set up svg element
   svg.attr("width", w).attr("height", h).style("border", "2px solid red");

	 // get extent of data
	 var x_extent = d3.extent(data.nodes, function(d) { return d[xIdx] });
	 var y_extent = d3.extent(data.nodes, function(d) { return d[yIdx] });

	 // build the scales
   var x = d3.scale.linear().range([margin, w - margin]).domain(x_extent);
   var y = d3.scale.linear().range([h - margin, margin]).domain(y_extent);

   // make the axes
   // var xAxis = d3.svg.axis().scale(x).orient("bottom");
   // var yAxis = d3.svg.axis().scale(y).orient("left");
   //svg.append("g").attr("class", "axis").attr("transform", "translate(0, "+(h-50)+")").call(xAxis);
   //svg.append("g").attr("class", "axis").attr("transform", "translate("+(50-rad)+", 0)").call(yAxis);

   // add nodes to svg
	 svg.selectAll("circle").data(data.nodes).enter().append("circle")
			 .attr("cx", function(d) {
								return x(d[xIdx]);
						})
				.attr("cy", function(d) {
								return y(d[yIdx]);
						})
				.attr("r", rad);


		// add edges to svg
		svg.selectAll("line").data(data.edges).enter().append("line").attr("stroke-width", 1).attr("stroke", "red")
				.attr("x1", function(d) {return x(d.x[xIdx])})//data.nodes[d[0]][xIdx]})
				.attr("x2", function(d) {return x(d.y[xIdx])})//data.nodes[d[1]][xIdx]})
				.attr("y1", function(d) {return y(d.x[yIdx])})//data.nodes[0][yIdx]})
				.attr("y2", function(d) {return y(d.y[yIdx])});//data.nodes[d[1]][yIdx]});

	 // remove loading box
	 d3.select("#loading").remove();

});

// border around svg
d3.select("svg").style("border", "2px solid red");
