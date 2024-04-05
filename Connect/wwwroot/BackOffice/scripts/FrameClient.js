


var umbracoSections = {
    //"makers": "/umbraco#/makersSection/makersTree/overview",
    "orders": "/umbraco#/tables/tablesTree/overview",
};

function GetShortUrl() {
    //console.log("GetShortUrl()")
    var full = window.location.href;
    //console.log("full", full);
    var backofficePos = full.toLowerCase().lastIndexOf("tonny/") + 7;
    //console.log("backofficePos", backofficePos);
    var shortUrl = full.substring(backofficePos);
    //console.log("shortUrl", shortUrl)
    return shortUrl;
}

function FullUrl() {
    console.log("FullUrl()")
    var url = GetShortUrl();
    return umbracoSections[currentController] + "?" + url;
}

function GetHash() {
    console.log("GetHash()")
    return decodeURIComponent(FullUrl().replace("/umbraco#", "#"));
}


$(function () {

    if (!parent.RegisterFrameUrl) {
        //console.log("EnsureSectionFrame");
        var newUrl = FullUrl();
        console.log(newUrl);
        window.location.href = FullUrl();
    }
    else {
        //console.log("Allready in frame => RegisterFrameUrl");

        //ΔΕΝ ΚΑΝΟΥΜΕ UPDATE ΤΟ HASH ΓΙΑΤΙ ΠΡΟΚΑΛΕΙ ΕΝΑ ΕΙΔΟΣ RELOAD ΑΠΟ ΤΗΝ ANGULAR
        //ΓΙΑ ΝΑ ΤΟ ΛΥΣΟΥΜΕ ΑΥΤΟ ΠΡΕΠΕΙ ΝΑ ΠΕΙΡΑΞΟΥΜΕ ΤΟ WWWROOT/UMBRACO/JS/INIT.JS ΤΟ ΟΠΟΙΟ
        //ΜΑΛΛΟΝ ΣΤΗΝ ΕΚΔΟΣΗ 10 ΕΙΝΑΙ ΕMBEDED. <= Λύθηκε. Όταν κάνουμε publish δημιουργείται ο φάκελος WWWROOT/UMBRACO
        //και μπορούμε να βρούμε το αρχείο JS/INIT.JS για να το πειράξουμε. Το πειραγμένο αρχείο είναι στον φάκελο solutions files.
        //Αν αλλάξουμε Umbraco version ενδεχομένως να πρέπει να αλλάξουμε και το αρχείο αυτό.

        //console.log(window.location.href);
        if (window.location.href.indexOf("localhost") < 0) {
            var newUrl = GetHash();
            //console.log(newUrl);
            parent.RegisterFrameUrl(newUrl);
        }

    }




});