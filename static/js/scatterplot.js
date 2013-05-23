
$(document).ready(function () {
function siteFrequency(data) {
    var w = 800;
    var h = 400;
    var padding = 50;

    var domains = data.map(function(x) {
        return getDomain(x["url"]);
    });

    var counts = {};

    domains.forEach(function(d, i) {
        if (d in counts) {
            counts[d] += 1;
        } else {
            counts[d] = 1;
        }
    });

    keys = Object.keys(counts);

    var counts = keys.map(function(x) {
        var m = {};
        m["domain"] = x;
        m["visits"] = counts[x];
        return m;
    });

    var visits = counts.map(function(x) {
        return x["visits"]
    });

    var maxVisits = d3.max(visits);

    var barPadding = 10;

    var data = counts;

    data = data.sort(function(a, b) {
        a = a["visits"];
        b = b["visits"];
        return d3.descending(a, b);
    });

    data = data.slice(0, 20);
    var l = data.length;

    // var xScale = d3.scale.linear()
    //     .domain([0, data.length);

    var svg = d3.select("div#content").append("svg")
        .attr("width", w)
        .attr("height", h);

    var bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect");

    bars.attr("x", function(d, i) {
            return i * (w / l);
        })
        .attr("y", function(d) {
            return (h - ((d["visits"] / maxVisits) * h)) + padding;
        })
        .attr("width", function(d) {
            return Math.max(1, w / l - barPadding);
        })
        .attr("height", function(d) {
            return ((d["visits"] / maxVisits) * h);
        });

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            return d["domain"];
        })
        .attr("x", function(d, i) {
            return i * (w / data.length) + (w / data.length - barPadding) / 2;
        })
        .attr("y", function(d) {
            return (h + padding) - ((d["visits"] / maxVisits) * h);
        })
        .attr("text-anchor", "right");
}
