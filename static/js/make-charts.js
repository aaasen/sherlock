
$(document).ready(function () {
    function getDomain(url) {
        var a = url.split("/");
        return a[2];
    }

    var data = $.getJSON("/data/history.json", function(data) {
        var data = data.map(function(x) {
            x["domain"] = getDomain(x["url"]);
            return x;
        });

        var punchcard = new Punchcard(data, 800, 600);
    });
});
