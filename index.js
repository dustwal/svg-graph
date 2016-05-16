(function () {
  function drawSVG() {
    var container = document.body;
    var data = {
      "labels": ["Austin, TX", "Denver, CO", "Los Angeles, CA", "New York, NY",
                "Phoenix, AZ", "Seattle, WA", "Chicago, IL"],
      "Precipitation": {
        "values": [59.96,18.31,7.66,40.97,7.15,44.83,39.85],
        "color": "#22b",
        "fill": "rgba(34,34,187,0.7)"
      },
      "Snowfall": {
        "values": [0,57.8,0,50.3,0,0.8,50.7],
        "color": "#2aa",
        "fill": "rgba(34,170,170,0.7)"
      },
      "High Temperature": {
        "values": [105,98,101,97,117,95,92],
        "color": "#f77",
        "fill": "#f77"
      },
      "Low Temperature": {
        "values": [23,-10,36,2,31,25,-10],
        "color": "#77f",
        "fill": "#77f"
      },
      "Average Temperature": {
        "values": [69.8,52,68.3,56.7,76.7,55.6,50.1],
        "color": "#777",
        "fill": "rgba(119,119,119,0.9)",
        "width": 3
      }
    };
    var displayOrder = [3,1,4,2,0,5,6];
    container.appendChild(SVGGraph.graph.radarChart({
      "data": data,
      "keys": ["Precipitation"],
      "show": displayOrder,
      "size": Math.min(350, container.clientWidth),
      "graph": {
        "bounds": [0, 60, 20],
        "guides": {
          "show": true,
          "unit": "in"
        },
        "labels": { "rotate": true }
      },
      "title": "2015 Annual Precipitation"
    }));
    container.appendChild(SVGGraph.graph.radarChart({
      "data": data,
      "keys": ["Snowfall"],
      "show": displayOrder,
      "size": Math.min(350, container.clientWidth),
      "graph": {
        "bounds": [0, 60, 20],
        "guides": {
          "show": true,
          "unit": "in"
        },
        "labels": { "rotate": true }
      },
      "title": "2014-2015 Seasonal Snowfall"
    }));
    container.appendChild(SVGGraph.graph.radarChart({
      "data": data,
      "keys": ["Snowfall", "Precipitation"],
      "show": displayOrder,
      "size": Math.min(350, container.clientWidth),
      "graph": {
        "bounds": [0, 60, 30],
        "labels": { "rotate": true }
      },
      "title": "2015 Rain and Snow"
    }));
    container.appendChild(SVGGraph.graph.radarChart({
      "data": data,
      "keys": ["Average Temperature"],
      "show": displayOrder,
      "size": Math.min(350, container.clientWidth),
      "graph": {
        "bounds": [40, 80, 20],
        "guides": {
          "show": true,
          "unit": "&deg;F"
        },
        "labels": { "rotate": true }
      },
      "title": "2015 Average Temperature"
    }));
    var xy = [0.7,0.3];
    var rad = 0.6;
    var fsize = 16;
    if(container.clientWidth<500) {
      xy = [1,0];
      rad = 0.7;
      fsize = false;
    }
    container.appendChild(SVGGraph.graph.radarChart({
      "data": data,
      "keys": ["High Temperature", "Average Temperature", "Low Temperature"],
      "show": displayOrder,
      "size": Math.min(500, xy[0]*container.clientWidth),
      "graph": {
        "border": {
          "width": 1
        },
        "bounds": [-20, 120, 70],
        "font" : {"size":fsize},
        "guides": {
          "color": "rgba(0,0,0,0)",
          "font": {"color":"black"},
          "show": true,
          "unit": "&deg;F"
        },
        "labels": {"rotate": (container.clientWidth<500)},
        "radius": rad,
        "values": {
          "width": 1
        },
        "legend": Math.min(250, xy[1]*container.clientWidth)
      },
      "title": "2015 High/Low Temperatures"
    }));
  }

  function clearAndDraw() {
    document.querySelector('.root').innerHTML = "";
    drawSVG();
  }

  window.addEventListener('load', drawSVG);
  window.addEventListener('resize', clearAndDraw);
})();
