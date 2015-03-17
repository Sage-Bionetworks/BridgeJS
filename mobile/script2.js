var params = {};
location.search.substr(1).split("&").forEach(function(item) {
    var k = item.split("=")[0], 
        v = decodeURIComponent(item.split("=")[1]); 
    (k in params) ? params[k].push(v) : params[k] = [v,];
});

var webservices = (function() {
    if (/localhost/.test(location.host)) {
        return "http://localhost:9000";
    } else if (/-develop/.test(location.host)) {
        return "https://webservices-develop.sagebridge.org";
    } else if (/-staging/.test(location.host)) {
        return "https://webservices-staging.sagebridge.org";
    } else {
        return "https://webservices.sagebridge.org";
    }
}())

console.log("Host",webservices);

var studies = {
    api: { id: "api", title: "API", email: "bridgeit@sagebase.org" },
    asthma: { id: "asthma", title: "Asthma Study", email: "asthmamobilehealth@mssm.edu" },
    breastcancer: { id: "breastcancer", title: "Share the Journey", email: "BCSapp@sagebase.org" },
    cardiovascular: { id: "cardiovascular", title: "MyHeart Counts", email: "myheartcounts-support@stanford.edu" },
    diabetes: { id: "diabetes", title: "GlucoSuccess", email: "GlucoSuccess.help@partners.org" },
    parkinson: { id: "parkinson", title: "mPower", email: "PDapp@sagebase.org" }
};

var study = studies[params.study[0]];
if (!study) {
    study = studies['api'];
}

console.log("Study", study);

setTimeout(function() {
    document.title = study.title + " " + document.title;
    $("#logo").attr("src", "/mobile/images/"+study.id+".svg");
}, 1);
