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

         // plot data
         var svg = d3.select("svg");
         var w = 300;
         var h = 500;
         var margin = 50;
         var rad = 1;
         var xIdx = 2;
         var yIdx = 1;

         // set up svg element
         svg.attr("width", w).attr("height", h).style("border", "2px solid red");

         // get extent of data
         var x_extent = d3.extent(data.edges, function(d) {
            return d.x[xIdx]
         });
         var y_extent = d3.extent(data.edges, function(d) {
            return d.x[yIdx]
         });

         // build the scales
         var x = d3.scale.linear().range([margin, w - margin]).domain(x_extent);
         var y = d3.scale.linear().range([h - margin, margin]).domain(y_extent);

         // make the axes
         // var xAxis = d3.svg.axis().scale(x).orient("bottom");
         // var yAxis = d3.svg.axis().scale(y).orient("left");
         //svg.append("g").attr("class", "axis").attr("transform", "translate(0, "+(h-50)+")").call(xAxis);
         //svg.append("g").attr("class", "axis").attr("transform", "translate("+(50-rad)+", 0)").call(yAxis);

         // add edges to svg
         svg.selectAll("line").data(data.edges).enter().append("line").attr("stroke-width", 1).attr("stroke", "red").attr("x1", function(d) {
            return x(d.x[xIdx])
         })
         .attr("x2", function(d) {
            return x(d.y[xIdx])
         })
         .attr("y1", function(d) {
            return y(d.x[yIdx])
         })
         .attr("y2", function(d) {
            return y(d.y[yIdx])
         });
      });

   };
};
