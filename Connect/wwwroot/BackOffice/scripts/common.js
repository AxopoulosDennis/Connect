
var units = {
    "sqm_per_liters": "m²/lt",
    "sqm_per_liters": "m²/lt",
    "sqm_per_kilograms": "m²/kg",
    "sqm_per_sqm": "m²/m²",
    "sqm_per_item": "m²/item",
    "euro": "€",
    "cubic_meters": "m³",
    "liters": "lt",
    "kilograms": "kg",
    "grams": "g",
    "sqm": "m²",
    "item": "item",
    "meters": "m",
    "centimeters": "cm",
    "milimeters": "mm",
    "micrometers": "μm",
    "euro_per_day": "€/d",
    "euro_per_hour": "€/h",
    "euro_per_sqm": "€/m²",
    "euro_per_m": "€/m",
    "euro_per_lt": "€/lt"
};

var currentLanguage = 'en-US';
var translations = {
    "en-US": {
        "DatePickerFormat": "MM/DD/YYYY",
        "EntitySuccessfullySaved": "Entity successfully saved",
        "EntityDeletionFailed": "Entity deletion failed.",
        "EntitySuccessfullyDeleted": "Entity successfully deleted",
        "ErrorOccuredTryAgain": "An error occured. Please try again!",
        "Search": "Search"
    },
    "el-GR": {
        "DatePickerFormat": "DD/MM/YYYY",
        "EntitySuccessfullySaved": "Η αποθήκευση του αντικειμένου έγινε επιτυχώς.",
        "EntityDeletionFailed": "Η διαγραφή του αντικειμένου απέτυχε.",
        "EntitySuccessfullyDeleted": "Η διαγραφή του αντικειμένου έγινε επιτυχώς.",
        "ErrorOccuredTryAgain": "Κάποιο πρόβλημα παρουσιάστηκε. Παρακαλούμε δοκιμάστε ξανά.",
        "Search": "Αναζήτηση"
    }
};


var langs = translations[currentLanguage];


$(function () {

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-full-width", //"toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    $(document).on('collapsed.lte.pushmenu',
        '[data-widget="pushmenu"]',
        function() {

            SetSidebarVisibility(true)


        });

    $(document).on('shown.lte.pushmenu', '[data-widget="pushmenu"]', function () {

        SetSidebarVisibility(false)

    });



});



function SetSidebarVisibility(collapsed) {
    var request = {};
    request.collapsed = collapsed ? "true" : "false";

    var request_url = "/Home/SetSidebarVisibility";
    jQuery.post(request_url, request).done(function (result) {
        if (result.OK) {
        } 
    }).fail(function () { });

}

function FixNumberSeparators(string_number) {
    if (string_number == null) {
        return "";
    }

    if (!string_number) {
        return string_number + "";
    }

    //console.log(string_number);
    var string_to_use = "" + string_number;


    var indexOfComma = string_to_use.lastIndexOf(",");
    var indexOfDot = string_to_use.lastIndexOf(".");

    if (indexOfComma > -1 && indexOfDot > -1) {
        if (indexOfComma < indexOfDot) {
            //comma is used as thousands separator. 
            string_to_use = string_to_use.replace(".", "");
        } else {
            //dot is used as thousands separator.
            string_to_use = string_to_use.replace(",", "");
        }
    }

    // we have removed thousand separators
    indexOfComma = string_to_use.lastIndexOf(",");
    indexOfDot = string_to_use.lastIndexOf(".");

    if (indexOfComma > -1) {
        //comma is used as decimal separator. 
        if (currentLanguage != 'el-GR') {
            //it should be dot
            string_to_use = string_to_use.replace(",", ".");
        }
    }
    else if (indexOfDot > -1) {
        //dot is used as decimal separator. 
        if (currentLanguage == 'el-GR') {
            //it should be comma
            string_to_use = string_to_use.replace(".", ",");
        }
    }


    return string_to_use;
}

function SanitizeNumber(number) {

    var n = new Number(number);
    if (typeOfNaN(n)) {
        return number;
    }

    var myObj = {
        style: "decimal",
        maximumFractionDigits: 3,
        useGrouping: false
    }

    return n.toLocaleString(currentLanguage, myObj)
}


function typeOfNaN(x) {
    if (Number.isNaN(x) || isNaN(x)) {
        return true;
    }
    return false;
}

function TrimZeros(input) {

    if (input.endsWith("0")) {
        var result = input.substring(0, input.length - 2);
        return TrimZeros(result);
    }
    if (input.endsWith(".")) {
        var result = input.substring(0, input.length - 2);
        return TrimZeros(result);
    }
    if (input.endsWith(",")) {
        var result = input.substring(0, input.length - 2);
        return TrimZeros(result);
    }
    return input;
}