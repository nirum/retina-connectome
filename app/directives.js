/*
 * Directives
 */

angular.module('myApp.directives', [])
  .directive('cellPlot', function() {

	// constants
	var margin = 20,
		width = 300,
		height = 500;

	console.log('asdf');

	return {
		restrict: 'E',
		scope: {
				edges: '=',
				xaxis: '=',
				yaxis: '='
		},
		link: function(scope, element, attrs) {

				// set up svg object
				var svg = d3.select(element[0])
						.append("svg")
								.attr("width",width)
								.attr("height",height)
								.style("border", "2px solid red");

				// scales
				var extent = [
						[30, 130],
						[0, 120],
						[0, 80]
				];
				var xScale = d3.scale.linear().range([margin, width - margin]).domain(extent[0]);
				var yScale = d3.scale.linear().range([margin, height - margin]).domain(extent[1]);
				var zScale = d3.scale.linear().range([margin, height - margin]).domain(extent[2]);

				// initialize axes
				scope.xIdx = 0;
				scope.yIdx = 1;

				// watch for changing data
				scope.$watch('edges', function(edgeData, oldData) {

						// do stuff
						console.log('starting to render');

						// remove everything
						svg.selectAll('*').remove();

						// DATA JOIN
						// join new edges with old ones, if any
						var edges = svg.selectAll("line").data(edgeData);

						// UPDATE
						// update old edges with 'update' style
						edges.attr("stroke", "green"); //.transition().duration(500);

						// ENTER
						// create new edges
						edges.enter().append("line").attr("stroke-width", 1).attr("stroke", "black").attr("x1", function(d) {
								return xScale(d.p1[scope.xIdx])
						}).attr("x2", function(d) {
								return xScale(d.p2[scope.xIdx])
						}).attr("y1", function(d) {
								return yScale(d.p1[scope.yIdx])
						}).attr("y2", function(d) {
								return yScale(d.p2[scope.yIdx])
						});

						// EXIT
						// remove old edges
						console.log(edges.exit());
						edges.exit().attr("stroke", "red").remove(); //.transition().duration(750).remove();


				});

				// watch for changing x-axis
				scope.$watch('xaxis', function(newX, oldX) {
						// do stuff
						console.log('new x-axis!');
						scope.xIdx = newX;
				});

				// watch for changing y-axis
				scope.$watch('yaxis', function(newY, oldY) {
						// do stuff
						console.log('new y-axis!');
						scope.yIdx = newY;
				});
		}
	}

	});
