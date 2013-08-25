/*
 * Controllers
 */

angular.module('myApp.controllers', [], function () {})
  .controller('MainCtrl', function($scope) {

   // number of cells
   $scope.cells = new Array(40);

	 // initialize
	 $scope.xaxis = 0;
	 $scope.yaxis = 1;
	 $scope.edges = [];

	 $scope.$watch('axis', function(newVal, oldVal) {
			 if (!newVal) {
					 return;
			 }
			 else {
				letters = newVal.split("");
				$scope.xaxis = letter2num(letters[0]);
				$scope.yaxis = letter2num(letters[1]);
			 }
	 });

	 $scope.$watch('cellID', function(newVal, oldVal) {
			 if (!newVal) {
					 return;
			 }
			 else {
					var id = parseInt(newVal);
					d3.json('json/cell' + id + '.json', function(error, data) {

						//// TODO: handle error
						if (error) {
								alert(error);
						}

						// update with data
						console.log(data.edges.length + ' edges for cell ' + id);
						$scope.edges = data.edges;
				});
			 }
	 });

	 var letter2num = function(letter) {
			 switch(letter) {
					 case "x":
							 return 0;
					 case "y":
							 return 1;
					 case "z":
							 return 2;
					 default:
							 // TOOD: handle error
							 return -1;
			 }
	 }


   //// loading?
   //$scope.isLoading = false;
   //// which projection to plot
   //var xIdx = 1,
      //yIdx = 0;

   //// scales
   //var extent = [
      //[30, 130],
      //[0, 120],
      //[0, 80]
   //];
   //var xScale = d3.scale.linear().range([margin, width - margin]).domain(extent[xIdx]);
   //var yScale = d3.scale.linear().range([margin, height - margin]).domain(extent[yIdx]);

   //function update(edgeData) {

      //console.log('starting to render');

      //// DATA JOIN
      //// join new edges with old ones, if any
      //var edges = svg.selectAll("line").data(edgeData);

      //// UPDATE
      //// update old edges with 'update' style
      //edges.attr("stroke", "green"); //.transition().duration(500);
      //console.log(edges.enter());

      //// ENTER
      //// create new edges
      //edges.enter().append("line").attr("stroke-width", 1).attr("stroke", "black").attr("x1", function(d) {
         //return xScale(d.p1[xIdx])
      //}).attr("x2", function(d) {
         //return xScale(d.p2[xIdx])
      //}).attr("y1", function(d) {
         //return yScale(d.p1[yIdx])
      //}).attr("y2", function(d) {
         //return yScale(d.p2[yIdx])
      //});

      //// EXIT
      //// remove old edges
      //console.log(edges.exit());
      //edges.exit().attr("stroke", "red"); //.remove(); //.transition().duration(750).remove();
   //}

   //// load cell data
   //$scope.loadCell = function(cellID) {

      ////$scope.isLoading = true;
      //console.log('loading JSON for ' + cellID);

      //// load json
      //var id = parseInt(cellID);
      //d3.json('json/cell' + id + '.json', function(error, data) {

         //// TODO: handle error
         //if (error) {
            //alert(error);
         //}

         //console.log('done loading.')

         //// update with data
         //console.log(data.edges.length + ' edges for cell ' + id);
         //update(data.edges);

         //// done loading
         //console.log('done rendering.')
         ////$scope.isLoading = false;
      //});

   //}
  });
