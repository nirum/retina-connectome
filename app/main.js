/*
 * Retina Connectome
 */

function MainCtrl($scope) {
   $scope.cells = new Array(64);

   $scope.loadCell = function(cellID) {

      // load json
      var id = parseInt(cellID);
      d3.json('json/cell' + id + '.json', function(error, data) {

         // TODO: handle error
         if (error) {
            alert(error);
         }

				 // get cell type
				 $scope.cellType = data.type;

         // plot data
         var svg = d3.select("svg");
         var w = 300;
         var h = 500;
         var margin = 20;
         var rad = 1;
         var xIdx = 1;
         var yIdx = 0;

         // set up svg element
         svg.attr("width", w).attr("height", h).style("border", "2px solid red");

         // get extent of data
         //var x_extent = d3.extent(data.edges, function(d) {
            //return d.p1[xIdx]
         //});
         //var y_extent = d3.extent(data.edges, function(d) {
            //return d.p2[yIdx]
         //});
				 extent = [ [30,130], [0,120], [0,80] ];

         // build the scales
         //var x = d3.scale.linear().range([margin, w - margin]).domain(x_extent);
         //var y = d3.scale.linear().range([h - margin, margin]).domain(y_extent);
         var x = d3.scale.linear().range([margin, w - margin]).domain(extent[xIdx]);
         var y = d3.scale.linear().range([margin, h - margin]).domain(extent[yIdx]);

         // make the axes
         // var xAxis = d3.svg.axis().scale(x).orient("bottom");
         // var yAxis = d3.svg.axis().scale(y).orient("left");
         //svg.append("g").attr("class", "axis").attr("transform", "translate(0, "+(h-50)+")").call(xAxis);
         //svg.append("g").attr("class", "axis").attr("transform", "translate("+(50-rad)+", 0)").call(yAxis);

         // add edges to svg
         svg.selectAll("line").data(data.edges).enter().append("line").attr("stroke-width", 1).attr("stroke", "red").attr("x1", function(d) {
            return x(d.p1[xIdx])
         })
         .attr("x2", function(d) {
            return x(d.p2[xIdx])
         })
         .attr("y1", function(d) {
            return y(d.p1[yIdx])
         })
         .attr("y2", function(d) {
            return y(d.p2[yIdx])
         });
      });

   };
};
