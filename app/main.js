/*
 * Retina Connectome
 */

function MainCtrl($scope) {

	 // number of cells
   $scope.cells = new Array(40);

	 // loading?
	 $scope.isLoading = false;

	 // svg properties
   var margin = 20, width = 300, height = 500;
	 var svg = d3.select("svg");
   svg.attr("width", width).attr("height", height).style("border", "2px solid red");

	 // which projection to plot
	 var xIdx = 1, yIdx = 0;

	 // scales
	 var extent = [ [30,130], [0,120], [0,80] ];
   var xScale = d3.scale.linear().range([margin, width - margin]).domain(extent[xIdx]);
   var yScale = d3.scale.linear().range([margin, height - margin]).domain(extent[yIdx]);

	 function update(edgeData) {

			 console.log('starting to render');

			 // DATA JOIN
			 // join new edges with old ones, if any
			 var edges = svg.selectAll("line").data(edgeData);

			 // UPDATE
			 // update old edges with 'update' style
			 edges.attr("stroke", "green"); //.transition().duration(500);

			 console.log(edges.enter());

			 // ENTER
			 // create new edges
			 edges.enter().append("line")
					 .attr("stroke-width", 1)
					 .attr("stroke", "black")
					 .attr("x1", function(d) {
								return xScale(d.p1[xIdx])
						})
						.attr("x2", function(d) {
								return xScale(d.p2[xIdx])
						})
						.attr("y1", function(d) {
								return yScale(d.p1[yIdx])
						})
						.attr("y2", function(d) {
								return yScale(d.p2[yIdx])
						});

				// EXIT
				// remove old edges
				console.log(edges.exit());
				edges.exit().attr("stroke", "red"); //.remove(); //.transition().duration(750).remove();

	 }

	 // load cell data
	 $scope.loadCell = function(cellID) {

			 //$scope.isLoading = true;
				console.log('loading JSON for ' + cellID);

			 // load json
			 var id = parseInt(cellID);
       d3.json('json/cell' + id + '.json', function(error, data) {

						// TODO: handle error
						if (error) {
								alert(error);
						}

						console.log('done loading.')

						// update with data
						console.log(data.edges.length + ' edges for cell ' + id);
						update(data.edges);

						// done loading
						console.log('done rendering.')
						//$scope.isLoading = false;

			 });

	 }

   //$scope.loadCell = function(cellID) {

      //// load json
      //var id = parseInt(cellID);
      //d3.json('json/cell' + id + '.json', function(error, data) {

         //// TODO: handle error
         //if (error) {
            //alert(error);
         //}

				 //// get cell type
				 //$scope.cellType = data.type;

         //// plot data
         //var svg = d3.select("svg");
         //var w = 300;
         //var h = 500;
         //var margin = 20;
         //var rad = 1;
         //var xIdx = 1;
         //var yIdx = 0;

         //// set up svg element
         //svg.attr("width", w).attr("height", h).style("border", "2px solid red");

         //// get extent of data
         ////var x_extent = d3.extent(data.edges, function(d) {
            ////return d.p1[xIdx]
         ////});
         ////var y_extent = d3.extent(data.edges, function(d) {
            ////return d.p2[yIdx]
         ////});
				 //extent = [ [30,130], [0,120], [0,80] ];

         //// build the scales
         ////var x = d3.scale.linear().range([margin, w - margin]).domain(x_extent);
         ////var y = d3.scale.linear().range([h - margin, margin]).domain(y_extent);
         //var x = d3.scale.linear().range([margin, w - margin]).domain(extent[xIdx]);
         //var y = d3.scale.linear().range([margin, h - margin]).domain(extent[yIdx]);

         //// make the axes
         //// var xAxis = d3.svg.axis().scale(x).orient("bottom");
         //// var yAxis = d3.svg.axis().scale(y).orient("left");
         ////svg.append("g").attr("class", "axis").attr("transform", "translate(0, "+(h-50)+")").call(xAxis);
         ////svg.append("g").attr("class", "axis").attr("transform", "translate("+(50-rad)+", 0)").call(yAxis);

         //// add edges to svg
         //svg.selectAll("line").data(data.edges).enter().append("line").attr("stroke-width", 1).attr("stroke", "red").attr("x1", function(d) {
            //return x(d.p1[xIdx])
         //})
         //.attr("x2", function(d) {
            //return x(d.p2[xIdx])
         //})
         //.attr("y1", function(d) {
            //return y(d.p1[yIdx])
         //})
         //.attr("y2", function(d) {
            //return y(d.p2[yIdx])
         //});
      //});

   //};
};
