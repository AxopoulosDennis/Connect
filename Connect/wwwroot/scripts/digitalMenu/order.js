let modalEditIngredientsMem;
let modalExtraMem;
let modalCommentsMem;
function modalMemory(ele) {

    modalEditIngredientsMem = undefined;

    var target = $(ele).attr("data-bs-target");

    if (target != undefined) {

        if (target == "#expandIngredients") {

            modalEditIngredientsMem = $(target).find(".ingredients__container").clone();

        }
        else if (target == "#expandAddExtra") {
            modalExtraMem = $(target).find(".ingredients__container").clone();

        }
        else if (target == "#expandComments") {

            modalCommentsMem = $(target).find(".comments__container").clone();

            $('input[maxlength], textarea').maxlength({
                alwaysShow: true, //if true the threshold will be ignored and the remaining length indication will be always showing up while typing or on focus on the input. Default: false.
                // threshold: 10, //Ignored if alwaysShow is true. This is a number indicating how many chars are left to start displaying the indications. Default: 10
                warningClass: "form-text text-muted mt-1", //it's the class of the element with the indicator. By default is the bootstrap "badge badge-success" but can be changed to anything you'd like.
                limitReachedClass: "form-text text-muted mt-1", //it's the class the element gets when the limit is reached. Default is "badge badge-danger". Replace with text-danger if you want it to be red.
                //separator: ' of ', //represents the separator between the number of typed chars and total number of available chars. Default is "/".
                //preText: 'You have ', //is a string of text that can be outputted in front of the indicator. preText is empty by default.
                //postText: ' chars remaining.', //is a string outputted after the indicator. postText is empty by default.
                //showMaxLength: true, //showMaxLength: if false, will display just the number of typed characters, e.g. will not display the max length. Default: true.
                //showCharsTyped: true, //if false, will display just the remaining length, e.g. will display remaining lenght instead of number of typed characters. Default: true.
                placement: 'bottom-right-inside', //is a string, object, or function, to define where to output the counter. Possible string values are: bottom ( default option ), left, top, right, bottom-right, top-right, top-left, bottom-left and centered-right. Are also available : **bottom-right-inside** (like in Google's material design, **top-right-inside**, **top-left-inside** and **bottom-left-inside**. stom placements can be passed as an object, with keys top, right, bottom, left, and position. These are passed to $.fn.css. A custom function may also be passed. This method is invoked with the {$element} Current Input, the {$element} MaxLength Indicator, and the Current Input's Position {bottom height left right top width}.

                //appendToParent: true, // appends the maxlength indicator badge to the parent of the input rather than to the body.
                //message: an alternative way to provide the message text, i.e. 'You have typed %charsTyped% chars, %charsRemaining% of %charsTotal% remaining'. %charsTyped%, %charsRemaining% and %charsTotal% will be replaced by the actual values. This overrides the options separator, preText, postText and showMaxLength. Alternatively you may supply a function that the current text and max length and returns the string to be displayed. For example, function(currentText, maxLength) { return '' + Math.ceil(currentText.length / 160) + ' SMS Message(s)';}
                //utf8: if true the input will count using utf8 bytesize/encoding. For example: the '£' character is counted as two characters.
                //showOnReady: shows the badge as soon as it is added to the page, similar to alwaysShow
                //twoCharLinebreak: count linebreak as 2 characters to match IE/Chrome textarea validation
                //customMaxAttribute: String -- allows a custom attribute to display indicator without triggering native maxlength behaviour. Ignored if value greater than a native maxlength attribute. 'overmax' class gets added when exceeded to allow user to implement form validation.
                //allowOverMax: Will allow the input to be over the customMaxLength. Useful in soft max situations.
            });
        }
    }



}
function resetMemory(ele) {

    var type = $(ele).attr("data-type");
    if (type == "#expandIngredients") {

        if (modalEditIngredientsMem != undefined) {
            $(type).find(".ingredients__container").replaceWith(modalEditIngredientsMem);

        }
    }
    else if (type == "#expandAddExtra") {
        if (modalExtraMem != undefined) {
            $(type).find(".ingredients__container").replaceWith(modalExtraMem);

        }
    }
    else if (type == "#expandComments") {
        if (modalCommentsMem != undefined) {
            $(type).find(".comments__container").replaceWith(modalCommentsMem);

        }
    }

}
function saveOption(ele) {
    var type = $(ele).attr("data-type");
    if (type == "#expandIngredients") {

        var ingredients = $(type).find(".ingredients__container").find(".form-check");
        if (ingredients != undefined) {
            var listIngredients = [];

            $(ingredients).each(function (index) {

                var input = $(ingredients[index]).find("input");
                var itemIsChecked = $(input).prop("checked");


                if (itemIsChecked) {
                    var label = $("label[for='" + $(input).attr('id') + "']").text();

                    if (label != undefined && label != "") {

                        listIngredients.push(label.trim());
                    }
                }


            });

            if (listIngredients.length) {
                var myHtml = "";
                var maxIngredients = $("#maxIngredients").val();

                if (maxIngredients == undefined || maxIngredients < 4) {
                    maxIngredients = 3;
                }

                $(listIngredients).each(function (index) {

                    if (index < maxIngredients) {

                        var total = listIngredients.length - 1;
                        if (listIngredients[index] == listIngredients[total]) {
                            myHtml += '<span class="ingridient">' + listIngredients[index] + '</span>';

                        }
                        else {
                            myHtml += '<span class="ingridient">' + listIngredients[index] + ',</span>';

                        }
                    }
                    else {

                        var total = listIngredients.length - maxIngredients > 0;
                        if (total == true) {

                            myHtml += '<span class="ingridient">+' + (listIngredients.length - maxIngredients) + '</span>';
                            return false;
                        }
                        else {
                            myHtml += '<span class="ingridient">' + listIngredients[index] + '</span>';

                        }

                    }




                });


                var container = $("#shrinkedIngridients").find(".ingridients");
                $(container).html(myHtml);

            }
            else {
                var container = $("#shrinkedIngridients").find(".ingridients");
                $(container).html("");

            }
        }

    }
    else if (type == "#expandAddExtra") {

        var ingredients = $(type).find(".ingredients__container").find(".form-check");
        if (ingredients != undefined) {

            var counter = 0;
            $(ingredients).each(function (index) {

                var input = $(ingredients[index]).find("input");
                var itemIsChecked = $(input).prop("checked");


                if (itemIsChecked) {
                    counter = counter + 1;
                }


            });

            var container = $("#addExtraIngredients").find(".ingridients");

            if (counter > 0) {
                var myHtml = '<span class="ingridient counter">+' + counter + '</span>';

                $(container).html(myHtml);

            }
            else {
                $(container).html("");

            }
        }

    }
    else if (type == "#expandComments") {
        var input = $("#commentsArea").val();
        var container = $("#addComments").find(".ingridients");

        if (input != undefined) {

            var myHtml = '<div class="comments__container"><span class="comments">' + input + '</span></div>';

            $(container).html(myHtml);
        }
        else {
            $(container).html("");

        }



    }

}

function buttonPlus(ele) {
    var $n = $(ele)
        .parent(".qty-container")
        .find(".input-qty");

    var amount = Number($n.val());

    if (amount < 99) {
        $n.val(Number($n.val()) + 1);

    }
};

function buttonMinus(ele) {
    var $n = $(ele)
        .parent(".qty-container")
        .find(".input-qty");
    var amount = Number($n.val());
    if (amount > 1) {
        $n.val(amount - 1);
    }

};

function checkQuantity(ele) {
    var amount = $(ele).val();
    if (amount < 1) {
        $(ele).val(1);
    }
    else if (amount > 99) {
        $(ele).val(99);

    }
}



$(document).ready(function () {
    $("#productForm").on("submit", function (e) {
        e.preventDefault();

        var token = $('input:hidden[name="__RequestVerificationToken"]').val();
        var form = $("#productForm");

        var pageId = $(form).find('input:hidden[name="PageId"]').val();
        var sectionKey = $(form).find('input:hidden[name="SectionKey"]').val();
        var productKey = $(form).find('input:hidden[name="ProductKey"]').val();
        var quantityInBasket = $(form).find('input[name="QuantityInBasket"]').val();

        var ingredients = $(form).find("#expandIngredients");
        let ingredientsObj;

        if (ingredients.length) {

            ingredients = $(ingredients).find('input[type=checkbox]');
            ingredientsObj = convertCheckboxes(ingredients);
        }

        var extras = $(form).find("#expandAddExtra");
        let extrasObj;

        if (extras.length) {

            extras = $(extras).find('input[type=checkbox]');
            extrasObj = convertExtras(extras);
        }

        var model =
        {
            PageId: pageId,
            Sectionkey: sectionKey,
            ProductKey: productKey,
            QuantityInBasket: quantityInBasket,
            Ingredients: ingredientsObj,
            Extras: extrasObj,
        }


        jQuery.ajax({
            url: "/umbraco/surface/Orders/AddProductToOrder",
            method: "POST",
            data: {
                __RequestVerificationToken: token,
                model: JSON.stringify(model),
            },

            success: function (data) {


            },
            error: function () {


            }
        });


    });
});

function convertCheckboxes(ingredients) {

    var objs = [];

    if (ingredients.length) {

        $(ingredients).each(function () {

            var name = $(this).attr("data-name");
            var isSelected = $(this).prop("checked");

            var obj =
            {
                IngredientName: name,
                IsIngredientSelected: isSelected,

            }

            objs.push(obj);

        });
    }
    //var results = Object.assign({}, objs);
    return objs;

}

function convertExtras(extras) {

    var objs = [];

    if (extras.length) {

        $(extras).each(function () {

            var name = $(this).attr("data-name");
            var isSelected = $(this).prop("checked");
            var price = $(this).attr("data-price");

            var obj =
            {
                ExtraName: name,
                ExtraPrice: price,
                IsExtraSelected: isSelected
            }

            objs.push(obj);

        });
    }
    //var results = Object.assign({}, objs);
    return objs;
}