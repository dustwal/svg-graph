(function () {
  function drawSVG() {
    document.body.innerHTML += buildSVG({
      "data": {
        "labels": ["Clinton", "Cruz", "Kasich", "Trump", "Carson", "Rubio", "Sanders"],
        "National Average": {
          "values": [0.62, 0.45, 0.25, 0.8, 0.05, 0.1, 0.4],
          "color": "#666",
          "width": 2
        },
        "Fox News Network": {
          "values": [0.5, 0.54, 0.37, 0.86, 0.15, 0.2, 0.19],
          "color": "#f53"
        },
        "MSNBC": {
          "values": [0.75, 0.33, 0.21, 0.7, 0.02, 0.05, 0.45],
          "color": "#3af"
        },
        "PBS": {
          "values": [0.55, 0.5, 0.35, 0.6, 0.1, 0.1, 0.53],
          "color": "#3f3"
        }
      },
      "keys": ["Fox News Network", "MSNBC"],
      "legend": 200,
      "show": [0,3,6],
      "size": 300
    });
  }

  window.addEventListener('load', drawSVG);
})();
