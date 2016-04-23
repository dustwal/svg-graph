function buildSVG(obj) {

  var c = {
    border: {color:"#444", width:2},
    fontFamily: (obj.font || "sans-serif"),
    guides: {color:"#888", width:1}, 
    labelFont: {color:"#333",size:obj.size/23},
    legendFont: {color:"#333",size:obj.size/21},
    length: obj.show.length,
    radius: obj.size/2*0.9,
    size: obj.size,
    values: {color:"#333", width:3}
  };

  function line(x1, y1, x2, y2, color, width) {
    return '<line x1="' + x1 + '" y1="' + y1 + 
      '" x2="' + x2 + '" y2="' + y2 + 
      '" stroke="' + color + 
      '" stroke-width="' + width + '"/>';
  }

  function ellipse(x, y, width, height, color) {
    return '<ellipse cx="' + x + '" cy="' + y + 
      '" rx="' + width + '" ry="' + height + 
      '" fill="' + color + '"/>';
  }

  function rotatedText(cx, cy, dx, dy, displayText, fontSize, rotation) {
    var turn = ((rotation*180/Math.PI)+450)%360; // rotation relative to upright
    if (turn > 90 && turn < 270) { 
      turn += 180;
      cx += 2*(c.radius+c.labelFont.size/2)*Math.cos(rotation);
      cy += 2*(c.radius+c.labelFont.size/2)*Math.sin(rotation);
    }
    return '<text x="' + (cx+dx) + '" y="' + (cy+dy-3) + 
      '" font-family="' + c.fontFamily + 
      '" font-size="' + c.labelFont.size + 
      '" text-anchor="middle"' + 
      '  transform="rotate(' + 
      turn + ' ' + cx + ',' + cy + ')"' +
      '>' + displayText + '</text>';
  }

  function text(x, y, displayText, fontSize) {
    return '<text x="' + x + '" y="' + y + 
      '" font-family="' + c.fontFamily + 
      '" font-size="' + fontSize + '">' + displayText + '</text>';
  }

  function svgOpen() {
    return '<svg xmlns="http://www.w3.org/2000/svg" ' + 
      'width="' + (c.size+obj.legend) + '" height="' + c.size + 
      '">' 
  }

  function svgClose() {
    return '</svg>';
  }

  function startDelta() {
    return Math.PI/2 - Math.PI/c.length;
  }

  function buildBackground() {
    var xml = "";
    var delta = startDelta();
    var points = [];
    for (var i = 0; i < c.length; i++) {
      delta -= 2*Math.PI/c.length;
      delta %= 2*Math.PI;
      var point = [
        c.size/2+c.radius*Math.cos(delta), 
        c.size/2+c.radius*Math.sin(delta),
        c.size/2+c.radius/2*Math.cos(delta), 
        c.size/2+c.radius/2*Math.sin(delta)
      ];
      xml += line(c.size/2, c.size/2, point[0], point[1], 
          c.guides.color, c.guides.width);
      xml += rotatedText(c.size/2, c.size/2, 0, -c.radius, 
          obj.data.labels[obj.show[i]], c.labelFont.size, delta);
      points.push(point);
    }
    for (var i = 1; i < points.length; i++) {
      xml += line(points[i-1][0], points[i-1][1],
          points[i][0], points[i][1], 
          c.border.color, c.border.width);
      xml += line(points[i-1][2], points[i-1][3],
          points[i][2], points[i][3], 
          c.guides.color, c.guides.width);
    }
    xml += line(points[0][0], points[0][1],
        points[points.length-1][0], points[points.length-1][1], 
        c.border.color, c.border.width);
    xml += line(points[0][2], points[0][3],
        points[points.length-1][2], points[points.length-1][3], 
        c.guides.color, c.guides.width);
    return xml;
  }

  function drawLegend() {
    var xml = "";
    if (obj.legend) {
      var i = 0;
      for(var key in obj.data) {
        if(obj.keys.indexOf(key) >= 0) {
          xml += ellipse(c.size+20, 20+i*1.5*c.legendFont.size, 4, 4, obj.data[key].color);
          xml += text(c.size+30, (1.75+i*1.5)*c.legendFont.size, key, c.legendFont.size);
          i++;
        }
      }
    }
    return xml;
  }

  function drawAllValues() {
    var xml = "";
    for(var key in obj.data) {
      if (obj.keys.indexOf(key) >= 0) { xml += drawValues(key); }
    }
    return xml;
  }

  function drawValues(key) {
    var delta = startDelta();
    var points = [];
    for(var i = 0; i < c.length; i++) {
      var index = obj.show[i];
      delta -= 2*Math.PI/c.length;
      delta %= 2*Math.PI;
      points.push([
        c.size/2+c.radius*obj.data[key].values[index]*Math.cos(delta),
        c.size/2+c.radius*obj.data[key].values[index]*Math.sin(delta)
      ]);
    }
    var xml = "";
    for (var i = 1; i < points.length; i++) {
      xml += line(points[i-1][0], points[i-1][1],
          points[i][0], points[i][1], 
          obj.data[key].color || c.values.color, 
          obj.data[key].width || c.values.width);
    }
    xml += line(points[0][0], points[0][1],
        points[points.length-1][0], points[points.length-1][1], 
        obj.data[key].color || c.values.color, 
        obj.data[key].width || c.values.width);
    return xml;
  }

  return svgOpen() + buildBackground() + drawLegend() + 
    drawAllValues() + svgClose();

}
