var SVGGraph = {};
SVGGraph.xmlns = 'http://www.w3.org/2000/svg';
SVGGraph.utils = {};
SVGGraph.graph = {};

SVGGraph.utils.createSVG = function(obj) {
  var svg = document.createElementNS(SVGGraph.xmlns, 'svg');
  svg.setAttribute('xmlns', SVGGraph.xmlns);
  for(var key in obj) {
    svg.setAttribute(key, obj[key]);
  }
  return svg;
};

SVGGraph.utils.createSVGElement = function(tagName, obj, innerSVG) {
  var element = document.createElementNS(SVGGraph.xmlns, tagName);
  for(var key in obj) {
    element.setAttribute(key, obj[key]);
  }
  if (innerSVG) { element.innerHTML = innerSVG; }
  return element;
};

SVGGraph.graph.radarChart = function(obj) {
  obj.graph = obj.graph || {};
  obj.graph.border = obj.graph.border || {};
  obj.graph.font = obj.graph.font || {};
  obj.graph.guides = obj.graph.guides || {};
  obj.graph.guides.font = obj.graph.guides.font || {};
  obj.graph.labels = obj.graph.labels || {};
  obj.graph.values = obj.graph.values || {};
  var c = {
    border: {
      color: (obj.graph.border.color || "#444"),
      width: (obj.graph.border.width || 2),
      type:  (obj.graph.border.type  || "sharp") // 'sharp' || 'round'
    },
    font: {
      color:  (obj.graph.font.color  || "#333"),
      family: (obj.graph.font.family || "sans-serif"),
      size:   (obj.graph.font.size   || obj.size/25)
    },
    guides: {
      color: (obj.graph.guides.color || "#888"),
      show: (obj.graph.guides.show || false),
      font: {
        color: (obj.graph.guides.font.color || obj.graph.font.color || "#333"),
        family: (obj.graph.guides.font.family || obj.graph.font.family || "sans-serif"),
        size: (obj.graph.guides.font.size ||
            (obj.graph.font.size || obj.size/25)*0.8)
      },
      unit: (obj.graph.guides.unit || ""),
      width: (obj.graph.guides.width || 1)
    },
    labels: {
      padding: (obj.graph.labels.padding || 1)*10,
      rotate: (obj.graph.labels.rotate)
    },
    legend: (obj.graph.legend || 0),
    length: (obj.show || obj.data.labels).length,
    radius: (obj.graph.radius || 0.7)*obj.size/2,
    bounds:  (obj.graph.bounds || [0.0, 1.0, 0.5]),
    size:   obj.size,
    values: { // default values for data lines
      color: (obj.graph.values.color || "#333"),
      fill: (obj.graph.values.fill  || "transparent"),
      width: (obj.graph.values.width || 3)
    }
  };

  function startTheta() { return Math.PI/2 - Math.PI/c.length; }
  function delta() { return -2*Math.PI/c.length; }

  function drawChart(svg) {
    var theta = startTheta();
    var ticks = [];
    var border = [];
    for (var i = 0; i < c.length; i++) {
      theta %= 2*Math.PI;
      var point = [
        c.radius*Math.cos(theta),
        c.radius*Math.sin(theta)
      ];
      border.push(point);
      svg.appendChild(SVGGraph.utils.createSVGElement('line', {
        x1: 0,
        y1: 0,
        x2: point[0],
        y2: point[1],
        stroke: c.guides.color,
        "stroke-width": c.guides.width
      }));
      var label = "";
      if (obj.show) {
        label = obj.data.labels[obj.show[i]];
      } else {
        label = obj.data.labels[i];
      }
      var lcm = "middle";
      var txtloc = [(c.radius+c.labels.padding)*Math.cos(theta),
          (c.radius+c.labels.padding)*Math.sin(theta)];
      var rotation = "rotate(0 0,0)";
      if (c.labels.rotate) {
        txtloc = [0, -c.radius-c.labels.padding];
        var center = [0,0];
        var turn = ((theta*180/Math.PI)+450)%360;
        if (turn > 90 && turn < 270) {
          turn += 180;
          center[0] = 2*(c.radius+c.font.size/3+c.labels.padding)*Math.cos(theta);
          center[1] = 2*(c.radius+c.font.size/3+c.labels.padding)*Math.sin(theta);
          txtloc[0] += center[0];
          txtloc[1] += center[1];
        }
        rotation = "rotate("+turn+" "+center[0]+","+center[1]+")";
      } else {
        var modtheta = (2*Math.PI+theta)%(2*Math.PI);
        if (modtheta < 3*Math.PI/8 || modtheta > 13*Math.PI/8) { lcm = "start"; }
        else if (modtheta > 5*Math.PI/8 && modtheta < 11*Math.PI/8) { lcm = "end"; }
      }
      svg.appendChild(SVGGraph.utils.createSVGElement('text', {
        x: txtloc[0],
        y: txtloc[1],
        "font-size": c.font.size,
        "font-family": c.font.family,
        "text-anchor": lcm,
        transform: rotation
      }, label));
      var tick = [];
      for (var v = c.bounds[2]+c.bounds[0]; v < c.bounds[1]; v += c.bounds[2]) {
        tick.push([
          Math.cos(theta)*valueRadius(v),
          Math.sin(theta)*valueRadius(v)
        ]);
      }
      ticks.push(tick);
      theta += delta();
    }
    if (ticks.length > 0) {
      var ds = [];
      for(var i = 0; i < ticks[0].length; i++) {
        var d = "M" + ticks[0][i][0] + " " + ticks[0][i][1] + " ";
        for(var j = 1; j < ticks.length; j++) {
          d += "L " + ticks[j][i][0] + " " + ticks[j][i][1] + " ";
        }
        d += "Z";
        ds.push(d);
      }
      for (var i = 0; i < ds.length; i++) {
        svg.appendChild(SVGGraph.utils.createSVGElement('path', {
          d: ds[i],
          fill: "transparent",
          stroke: c.guides.color,
          "stroke-width": c.guides.width
        }));
      }
    }
    if (c.border.type != "round") {
    var d = "M" + border[0][0] + " " + border[0][1] + " ";
    for(var i = 1; i < border.length; i++) {
      d += "L " + border[i][0] + " " + border[i][1] + " ";
    }
    d += "Z";
    svg.appendChild(SVGGraph.utils.createSVGElement('path', {
      d: d,
      fill: "transparent",
      stroke: (c.border.type == "sharp" ? c.border.color : c.guides.color),
      "stroke-linejoin": "round",
      "stroke-width": (c.border.type == "sharp" ? c.border.width : c.guides.width)
    }));
    }
    if (c.border.type != "sharp") {
      svg.appendChild(SVGGraph.utils.createSVGElement('ellipse', {
        cx: 0,
        cy: 0,
        rx: c.radius,
        ry: c.radius,
        fill: "transparent",
        stroke: c.border.color,
        "stroke-width": c.border.width
      }));
    }
  }

  function valueRadius(val) {
    return (val-c.bounds[0])/(c.bounds[1]-c.bounds[0])*c.radius;
  }

  function keySet() {
    return obj.keys || Object.keys(obj.data);
  }

  function drawValues(svg) {
    var keys = obj.keys || Object.keys(obj.data);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key != "labels") {
        var theta = startTheta();
        var index = 0;
        if (obj.show) { index = obj.show[0]; }
        var value = obj.data[key].values[index];
        var d = "M" + (valueRadius(value)*Math.cos(theta)) + " " +
          (valueRadius(value)*Math.sin(theta)) + " ";
        for(var j = 1; j < c.length; j++) {
          theta += delta();
          index = obj.show ? obj.show[j] : j;
          value = obj.data[key].values[index];
          d += "L " + valueRadius(value)*Math.cos(theta) + " " +
            valueRadius(value)*Math.sin(theta) + " ";
        }
        svg.appendChild(SVGGraph.utils.createSVGElement('path', {
          d: (d+"Z"),
          fill:   (obj.data[key].fill || c.values.fill),
          stroke: (obj.data[key].color || c.values.color),
          "stroke-linejoin": "round",
          "stroke-width": (obj.data[key].width || c.values.width)
        }));
      }
    }
  }

  function drawLegend(svg) {
    var keys = keySet();
    var offset = 0;
    for(var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key != "labels") {
        svg.appendChild(SVGGraph.utils.createSVGElement('ellipse', {
          cx: c.size/2+20,
          cy: -c.size/4+offset*c.font.size*1.5,
          rx: c.font.size/4,
          ry: c.font.size/4,
          fill: obj.data[key].color
        }));
        svg.appendChild(SVGGraph.utils.createSVGElement('text', {
          x: c.size/2+30,
          y: -c.size/4+offset*c.font.size*1.5+0.3*c.font.size,
          "font-family": c.font.family,
          "font-size": c.font.size*1.1
        }, key));
        offset++;
      }
    }
  }

  function drawScale() {
    if(c.guides.show) {
      for(var i = c.bounds[0]; i <= c.bounds[1]; i+=c.bounds[2]) {
        svg.appendChild(SVGGraph.utils.createSVGElement('text', {
          fill: c.guides.font.color,
          x: -5,
          y: c.guides.font.size/3-valueRadius(i),
          "font-family": c.guides.font.family,
          "font-size": c.guides.font.size,
          "text-anchor": "end"
        }, i+c.guides.unit));
      }
    }
  }

  var svg = SVGGraph.utils.createSVG({
    height: c.size,
    viewBox: (-c.size/2) + " " + (-c.size/2) + " " +
      (c.size+c.legend) + " " + (c.size),
    width:  c.size+c.legend
  });
  drawChart(svg);
  if (c.legend) { drawLegend(svg); }
  if (obj.title) {
    svg.appendChild(SVGGraph.utils.createSVGElement('text', {
      x: (c.size+c.legend-c.size)/2,
      y: c.font.size*1.1-c.size/2,
      "text-anchor": "middle",
      "font-size": c.font.size*1.25,
      "font-family": c.font.family
    }, obj.title));
  }
  drawValues(svg);
  drawScale();
  return svg;
};
