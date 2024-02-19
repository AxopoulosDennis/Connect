var reCaptchaSiteKey = "6LcOX3YpAAAAAB2NABV0JchPsJgJpDwS3RzE1Qdr";
var formWorking = false;

var debugging = false;

function toggle(ele) {

    if (ele.matches(".hide")) {
        ele.classList.remove("hide");
    }
    else {
        ele.classList.add("hide");

    }

}
function sumbitContactForm(token) {

    var model = new FormData();
    var form = $('#__AjaxAntiForgeryForm');
    var RequestVerificationToken = $('input[name="__RequestVerificationToken"]', form).val();

    model.append("recaptcha", token);


    model.append("Subject", $('.contact-form [name="subject"]').val());
    model.append("FirstName", $('.contact-form [name="fname"]').val());
    model.append("LastName", $('.contact-form [name="lname"]').val());
    model.append("Email", $('.contact-form [name="email"]').val());
    model.append("Tel", $('.contact-form [name="tel"]').val());
    model.append("Message", $('.contact-form [name="message"]').val());
    model.append("TermsAccepted", $('.contact-form [name="termsAccepted"]').prop("checked"));
    model.append("debugging", debugging);


    var antiforgeryToken = $('input[name="__RequestVerificationToken"]').val();
    //console.log(formData.get('country'));
    formWorking = true;
    //console.log(model['recaptcha'])
    $.ajax({
        headers: { "RequestVerificationToken": antiforgeryToken },
        type: 'POST',
        url: '/umbraco/surface/Forms/ContactFormSubmit',
        data: model,  //    __RequestVerificationToken: RequestVerificationToken,

        // Tell jQuery not to process data or worry about content-type
        // You *must* include these options!
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {

            formWorking = false;

            if (result.ok) {

                $("#NewsletterSuccessMessage").show();
                var offset = $('#NewsletterSuccessMessage').offset().top;
                offset -= 200;
                window.scrollTo({ top: offset, behavior: 'smooth' });

                $("#btnSumbit").attr("disabled", true);
            }
            else {
                $(".send-error").remove();

                if (!jQuery.isEmptyObject(result.errors)) {
                    for (var key in result.errors) {
                        var msg = result.errors[key];
                        var field = $('.contact-form [name="' + key.toLowerCase() + '"]');
                        if (field.length > 0) {
                            $(field).addClass("input-validation-error");
                            var error = "<span class=send-error>" + msg + "</span>";
                            $(error).insertAfter(field);
                        } else {
                            if (key == "ReCaptcha") {
                                //don't show anything. it's a bot.
                            }

                            else {


                                var field = $(".contact-form");
                                var error = "<span style=\"margin-top: 4em; \" class=send-error>" + "Η αποστολή απέτυχε, παρακαλώ προσπαθήστε ξανά αργότερα." + "</span>";
                                $(error).insertAfter(field);
                                break;

                            }
                        }

                    }
                } else {


                    var field = $(".contact-form");
                    var error = "<span style=\"margin-top: 4em; \" class=send-error>" + "Η αποστολή απέτυχε, παρακαλώ προσπαθήστε ξανά αργότερα." + "</span>";
                    $(error).insertAfter(field);
                }
            }
        },
        // Custom XMLHttpRequest
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            return myXhr;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            formWorking = false;
            console.log(xhr.responseText);
        }
    });
}

$(document).ready(function () {

    //CONTACT FORM
    $(".contact-form").validate({
        ignore: [],

        rules: {
            fname: {
                required: true,
                minlength: 1,
            },
            lname: {
                required: true,
                minlength: 1,
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true,
                minlength: 1,
            },
            message: {
                required: true,
                minlength: 1,
            },
            termsAccepted: {

                required: true
            }
        },


        errorElement: 'span',
        errorElementClass: 'feedback-error',
        errorClass: 'feedback-error',
        errorPlacement: function (error, element) { },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(this.settings.errorElementClass).removeClass(errorClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass(this.settings.errorElementClass).removeClass(errorClass);
        },
        onkeyup: false,
        errorPlacement: function (error, element) { error.insertBefore(element); },
        submitHandler: function () {
            if (formWorking) {
                return;
            }

            if (debugging) {

                sumbitContactForm("");
            }
            else {

                grecaptcha.ready(function () {
                    grecaptcha.execute(reCaptchaSiteKey, { action: 'submit' })
                        .then(function (token) {


                            sumbitContactForm(token);


                        });
                });
            }

        }
    });
    //jQuery.extend(jQuery.validator.messages, {
    //    required: "Το πεδίο είναι υποχρεωτικό.",
    //    remote: "Please fix this field.",
    //    email: "Please enter a valid email address.",
    //    url: "Please enter a valid URL.",
    //    date: "Please enter a valid date.",
    //    dateISO: "Please enter a valid date (ISO).",
    //    number: "Please enter a valid number.",
    //    digits: "Please enter only digits.",
    //    creditcard: "Please enter a valid credit card number.",
    //    equalTo: "Please enter the same value again.",
    //    accept: "Please enter a value with a valid extension.",
    //    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    //    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    //    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    //    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    //    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    //    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    //});
});

