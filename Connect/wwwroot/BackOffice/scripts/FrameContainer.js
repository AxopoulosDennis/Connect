
var umbracoSections = {
    "orders": "/umbraco#/tablesSection/tablesTree/overview",
};

function RegisterFrameUrl(new_hash) {
    if (window.location.hash != new_hash) {
        window.location.hash = new_hash;
    }
}


$(document).ready(function() {

    $('#tonnyFrame').on("load", function () {
        var currentUrl = window.frames['tonnyFrame'].location.href
            console.log("currentUrl ==> ", currentUrl);
    });




});
       
$(window).on("load", function (event) {
    FrameDeepLink(0);
});


function FrameDeepLink(repetition) {
    console.log("FrameDeepLink");
    if (repetition >= 40) {
        return;
    } 


    if (jQuery("#tonnyFrame").length == 0) {
        setTimeout(function() {
                FrameDeepLink(repetition + 1);
            },
            50);
        return;
    }

    var hash = location.hash;
    if (hash.indexOf("mculture") > -1) {
        hash = hash.substring(0, hash.indexOf("mculture") - 1);
    }

    //console.log(hash);

    var realUrl = "";
    if (hash.indexOf("?") > -1) {
        realUrl = hash.substring(hash.indexOf("?") + 1);
        var partialPath = decodeURIComponent(realUrl);
        if (partialPath.indexOf("mculture") > -1) {
            partialPath = partialPath.substring(0, partialPath.indexOf("mculture") - 1);
        }
    
        realUrl = "/umbraco/backoffice/tonny/" + partialPath;
    } else {

        realUrl = jQuery("#tonnyFrame").attr("default-src");

    }

    jQuery("#tonnyFrame").attr("src", realUrl);


}