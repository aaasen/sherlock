
function Punchcard(data, h, w) {
    this.data = data;
    this.w = w;
    this.h = h;

    this.graph();
    this.explain();
}

Punchcard.prototype.graph = function() {
    var svg = d3.select("div#content")
        .append("svg")
        .attr("width", this.w)
        .attr("height", this.h)
        .attr("id", "punchcard");

    var xScale = d3.scale.linear()
        .domain([d3.min(this.data, function(d) { return d["time"]; }),
            d3.max(this.data, function(d) { return d["time"]; })])
        .range([0, this.w]);

    var yScale = d3.scale.ordinal()
        .range(this.data.map(function(x, i) {
                return i;
            })
        );

    svg.selectAll("circle")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d["time"]);
        })
        .attr("cy", function(d) {
            return yScale(d["domain"]);
        })
        .attr("r", function(d) {
            return 2;
        })
        .attr("fill", function(d) {
            return("#" + md5(d["domain"]).substring(0, 6));
        })
        .attr("url", function(d) { return d["url"]; })
        .attr("domain", function(d) { return d["domain"]; })
        .attr("time", function(d) { return d["time"]; });
}

Punchcard.prototype.explain = function() {
    $("svg#punchcard > circle").mouseover(function() {
        $("p#point-info").text($(this).attr("domain"));
    });
}
