(function () {
  function drawSVG() {
    var data = {
      "labels": ["Clinton", "Cruz", "Kasich", "Trump", "Carson", "Rubio", "Sanders"],
      "National Average": {
        "values": [0.62, 0.45, 0.25, 0.8, 0.05, 0.1, 0.4],
        "color": "#666",
        "width": 2
      },
      "Fox News Network": {
        "values": [0.5, 0.54, 0.37, 0.86, 0.15, 0.2, 0.19],
        "color": "#f53",
        "fill": "rgba(255,100,70,0.5)"
      },
      "MSNBC": {
        "values": [0.75, 0.33, 0.21, 0.7, 0.02, 0.05, 0.45],
        "color": "#3af",
        "fill": "rgba(70,200,255,0.5)"
      },
      "PBS": {
        "values": [0.55, 0.5, 0.35, 0.6, 0.1, 0.1, 0.53],
        "color": "#3f3",
        "fill": "rgba(70,255,70,0.5)"
      }
    };
    document.body.appendChild(SVGGraph.graph.radarChart({
      "data": data,
      "keys": ["National Average", "Fox News Network"],
      "show": [6,0,3,1,2,4,5],
      "size": 300,
      "graph": {
        "bounds": [0, 1, 0.5],
        "labels": { "rotate": true }
      },
      "title": "Fox News Presidential Candidate Coverage"
    }));
    document.body.appendChild(SVGGraph.graph.radarChart({
      "data": data,
      "keys": ["National Average", "MSNBC"],
      "show": [6,0,3,1,2,4,5],
      "size": 300,
      "graph": {
        "bounds": [0, 1, 0.5],
        "radius": 0.65
      },
      "title": "MSNBC Presidential Candidate Coverage"
    }));
    document.body.appendChild(SVGGraph.graph.radarChart({
      "data": data,
      "keys": ["National Average", "PBS"],
      "show": [6,0,3,1,2,4,5],
      "size": 300,
      "graph": {
        "bounds": [0, 1, 0.5],
        "labels": { "rotate": true }
      },
      "title": "PBS Presidential Candidate Coverage"
    }));
    document.body.appendChild(SVGGraph.graph.radarChart({
      "data": data,
      "keys": ["PBS", "MSNBC", "Fox News Network"],
      "show": [6,0,3,1,2,4,5],
      "size": 300,
      "graph": {
        "border": { "type": "round" },
        "bounds": [0, 1, 0.5],
        "labels": { "rotate": true },
        "legend": 90
      },
      "title": "Presidential Candidate Coverage"
    }));
    document.body.appendChild(SVGGraph.graph.radarChart({
      "data": data,
      "keys": ["MSNBC", "Fox News Network"],
      "show": [6,0,3,1],
      "size": 500,
      "graph": {
        "border": {
          "width": 1
        },
        "bounds": [0, 1, 0.25],
        "guides": {
          "color": "rgba(0,0,0,0.3)"
        },
        "values": {
          "width": 1
        },
        "legend": 250
      },
      "title": "Presidential Candidate Coverage"
    }));
  }

  window.addEventListener('load', drawSVG);
})();
