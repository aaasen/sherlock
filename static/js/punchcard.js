
function Punchcard(data, w, h) {
    this.data = data;
    this.w = w;
    this.h = h;
    this.padding = { top: 32, bottom: 32, right: 32, left: 32 };

    this.graph();
    this.explain();
}

Punchcard.prototype.graph = function() {
    // this.data = this.data.slice(0, 50);

    var svg = d3.select("div#content")
        .append("svg")
        .attr("width", this.w)
        .attr("height", this.h)
        .attr("id", "punchcard");

    var xScale = d3.time.scale()
        .domain([new Date(d3.min(this.data, function(d) { return d["time"] / 10000; })),
            new Date(d3.max(this.data, function(d) { return d["time"] / 10000; }))])
        .rangeRound([0 + this.padding.left, this.w - this.padding.right]);

    var yScale = d3.scale.ordinal()
        .range(this.data.map(function(x, i) {
                return i;
            })
        );

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .ticks(5)
        .tickFormat(d3.time.format("%a %B %Y"))
        .tickSize(0)
        .tickPadding(8);

    svg.selectAll("circle")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(new Date(Math.round(d["time"] / 10000)));
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

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (this.h - this.padding.bottom) + ")")
        .call(xAxis);
}

Punchcard.prototype.explain = function() {
    $("svg#punchcard > circle").mouseover(function() {
        $("p#point-info").text($(this).attr("domain"));
    });
}
