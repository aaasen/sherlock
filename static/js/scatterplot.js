
$(document).ready(function () {
    var w = 800;
    var h = 600;
    var dataset = $.getJSON("/data/history.json", function(data) {
        var times = data.map(function(x) {
            return x["time"]
        })

        var maxTime = d3.max(times)
        var minTime = d3.min(times)
        var diffTime = maxTime - minTime;

        var svg = d3.select("div#content")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svg.selectAll("circle")
           .data(data)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                return w * ((maxTime - d["time"]) / diffTime);
            })
            .attr("cy", function(d) {
                return 10;
            })
            .attr("r", function(d) {
                return 1;
            });
    });
});
