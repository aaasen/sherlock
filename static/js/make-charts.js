
$(document).ready(function () {
    /*
        Unlike every other application, Google stores timestamps
        as the microseconds since midnight UTC on January 1, 1601

        This converts them to Javascript standard epoch (unix) time
    */
    function toEpoch(t) {
        return (t / 1000) - 11644473600000;
    }

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
            x["time"] = Math.round((toEpoch(x["time"]) % 86400000));
            return x;
        });

        data = group(data);

        var punchcard = new Punchcard(data, 800, 400);
    });
});
