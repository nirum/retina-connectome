// Create a 3d scatter plot within d3 selection parent.
function scatterPlot3d(parent) {

   // append the x3d canvas object
   var x3d = parent.append("x3d").style("width", parseInt(parent.style("width")) + "px").style("height", parseInt(parent.style("height")) + "px").style("border", "2px solid red")

   // append a 'scene'
   var scene = x3d.append("scene")
   scene.append("orthoviewpoint").attr("centerOfRotation", [5, 5, 5]).attr("fieldOfView", [-5, -5, 15, 15]).attr("orientation", [-0.5, 1, 0.2, 1.12 * Math.PI / 4]).attr("position", [8, 4, 15])

   // properties
   var points = getData();          // data is stored as an array of {x: , y: , z: } values
   var axisRange = [0, 10];         // axis range
   var scales = [];                 // store scale objects
   var ease = 'linear';             // ?
   var axisKeys = ["x", "y", "z"];

   // build the scales (axes)
   scales[0] = d3.scale.linear().domain([-5, 5]).range(axisRange);
   scales[1] = d3.scale.linear().domain([-5, 5]).range(axisRange);
   scales[2] = d3.scale.linear().domain([-5, 5]).range(axisRange);

   // get the s
   var x = scales[0], y = scales[1], z = scales[2];
   var sphereRadius = 0.3;

   // Draw a sphere at each x,y,z coordinate.
	 var datapoints = scene.selectAll(".datapoint").data(points);

						//scene.selectAll(".datapoint").data(points).enter().append("transform")
								//.attr("class", "circle")
								//.attr("cx", function(d) { return ; })
								//.attr("cy", function(d) { return 0.05*h*(d[1]-min[1])/max[1]+100; })
								//.attr("r", rad);

	 var newDatapoints = datapoints.enter().append("transform").attr("class", "datapoint").attr("scale", [sphereRadius, sphereRadius, sphereRadius]).append("shape");
	 newDatapoints.append("appearance").append("material");
	 newDatapoints.append("sphere");

	 datapoints.selectAll("shape appearance material").attr("diffuseColor", '#D2A43C')

	 datapoints.transition().ease(ease).duration(0).attr("translation", function(d) {
			return x(d['x']) + " " + y(d['y']) + " " + z(d['z']);
	 });

   function getData() {
      var rows = [];

      // Follow the convention where y(x,z) is elevation.
      for (var x = -5; x <= 5; x += 1) {
         for (var z = -5; z <= 5; z += 1) {
            rows.push({
               x: x,
               y: 5 * (Math.sin(0.5 * x + 2) * Math.cos(0.25 * z + 2)),
               z: z
            });
         }
      }
      return rows;
   }

}
