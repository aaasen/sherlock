
$(document).ready(function () {
    function getDomain(url) {
        var domain = url.split("/")[2];
        var parts = domain.split(".");

        if (parts[0] == "www") {
            parts = parts.slice(1);
        }

        return parts.join(".");
    }

    var data = $.getJSON("/data/history.json", function(data) {
        var data = data.map(function(x) {
            x["domain"] = getDomain(x["url"]);
            x["time"] = Math.round(x["time"] / 10000);
            return x;
        });

        data = group(data);

        var punchcard = new Punchcard(data, 800, 400);
    });
});
