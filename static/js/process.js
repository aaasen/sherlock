
/*

Groups data into the following format:

[
    {
        "domain" : "example.com",
        "visits" : [
            {
                "url" : "http://example.com/index.html",
                "body" : "",
                "title" : "An Example Site",
                "id" : 32,
                "time" : 1301122870280,
                "domain" : "example.com"
            }
        ]
    }
]

*/

function group(data) {
    var grouped = {}
    var domains = []

    data.forEach(function(d, i) {
        if (domains.indexOf(d["domain"]) >= 0) {
            grouped[d["domain"]].push(d);
        } else {
            grouped[d["domain"]] = [d];
            domains.push(d["domain"]);
        }
    });

    grouped = Object.keys(grouped).map(function(x) {
        var m = {};
        m["domain"] = x;
        m["visits"] = grouped[x];
        return m;
    });

    grouped = grouped.sort(function(a, b) {
        return d3.descending(a["visits"].length, b["visits"].length);
    });

    return grouped;
}
