
const navigation = document.getElementById('menuNav');
const navInitPosition = navigation.offsetTop;
const bottomContainer = document.getElementById('bottomContainer');
var whiteSpaceLove = document.getElementById('whiteSpaceLove');


let previousScrollY = 0;
let lastPosBeforeSearch = 0;

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    var rectTop = rect.top + 8;

    if (rectTop < (window.innerHeight || document.documentElement.clientHeight)) {

        return true;
    }

    return false;
}

$(document).ready(() => {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false) {

        var url = window.location.href;     // Returns full URL (https://example.com/path/example.html)

        jQuery.ajax({
            url: "/umbraco/surface/QRCodeGenerator/GetQRCode",
            method: "GET",

            data: {
                url: url
            },

            success: function (data) {

                var svg = data.result;
                if (svg != "" && svg != undefined) {

                    $(".qr-container").append(svg);
                    $(".qr-code").addClass("show");
                }

            },
            error: function () {


            }
        });


    }
    else {
        $(".loader__container").hide();
        $(".inner-body").show();
        $(".loader").hide();




    }



    //#region SWIPER INIT

    //MENU NAVIGATION SWIPER
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 2,
        freeMode: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        direction: 'horizontal',

    });

    //var swiper2 = new Swiper(".nav-sub-content", {
    //    slidesPerView: "auto",
    //    spaceBetween: 2,
    //    grabCursor: true,
    //    pagination: {
    //        el: ".swiper-pagination",
    //        clickable: true,
    //    },
    //});

    //var swiper2 = new Swiper(".mySwiper3", {
    //    slidesPerView: "auto",
    //    spaceBetween: 2,
    //    freeMode: true,
    //    grabCursor: true,
    //    pagination: {
    //        el: ".swiper-pagination",
    //        clickable: true,
    //    },

    //});

    var swiper_special = new Swiper(".swiperSpecials", {
        slidesPerView: "auto",
        spaceBetween: 2,
        freeMode: false,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        //scrollbar: {
        //    el: ".swiper-scrollbar",
        //},
        direction: 'horizontal',

    });


    //#endregion

    function findByData(groups, attr) {
        let item;

        if (groups.length) {
            $(groups).each(function (index) {

                if ($(this).attr("data-sub-slide") == attr) {
                    item = groups[index];
                    return false;
                }

            });

            return item;

        }

    }
    let currentGroup = "home";
    let currentSubGroup = "home";
    const groupEls = document.querySelectorAll('.category');
    var subGroups = $(".sub-slide");
    const navLinkEls = document.querySelectorAll('.nav-link');
    const subNavLinkEls = document.querySelectorAll('.sub-nav-link');
    const subGroupEls = document.querySelectorAll('.sub-cat-name-container');

    let preventOnce = false;
    //MENU ITEM CLICK SCROLL TO MENU GROUP
    navLinkEls.forEach(navLinkEl => {

        $(navLinkEl).on("click", (event) => {
            event.preventDefault();
            preventOnce = true;


            let group_id = navLinkEl.dataset.link
            group_id = group_id.substring(1)
            var group = document.getElementById(group_id);

            //$('.nav-link').removeClass("active");
            //$(navLinkEl).addClass("active");

            let subGroup = findByData(subGroups, group_id);
            //$(subGroups).removeClass("slide-active");
            //$(subGroup).addClass("slide-active");


            $([document.documentElement, document.body]).animate({
                scrollTop: (group.offsetTop - 80)
            }, 120);

            //bottomContainer.classList.add("display");

        });
    });

    subNavLinkEls.forEach(navLinkEl => {

        $(navLinkEl).on("click", (event) => {
            event.preventDefault();
            preventOnce = true;


            let group_id = navLinkEl.dataset.link
            group_id = group_id.substring(1)
            var group = document.getElementById(group_id);

            //$('.sub-nav-link').removeClass("active");
            //$(navLinkEl).addClass("active");

            let subGroup = findByData(subGroups, group_id);
            //$(subNavLinkEls).removeClass("active");
            //$(navLinkEl).addClass("active");


            $([document.documentElement, document.body]).animate({
                scrollTop: (group.offsetTop - 51 )
            }, 120);



        });
    });

    var subSwipers = new Array();
    function buildSubCatSwiper(ele, index) {

        return new Swiper('.sub-cat-swiper-' + index, {
            slidesPerView: "auto",
            spaceBetween: 2,
            freeMode: false,
            grabCursor: true,
            direction: 'horizontal',

        });
    }
    var subCats = $(".sub-cat-links");

    if (subCats.length) {
        $(subCats).each(function (index) {
            $(this).addClass('sub-cat-swiper-' + index);

            var anotherOne = buildSubCatSwiper($(this), index);
            subSwipers.push(anotherOne);
        });

    }


    window.addEventListener('scroll', () => {

        if ($("#brand-info-content").hasClass("display")) {
            return;
        }

        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function () {

            if (preventOnce == true) {
                    preventOnce = false;
                    previousScrollY = window.scrollY;

            }
            else {

                //#region NAVIGATION FUNCTIONS

                //ON SCROLL CHANGE SELECTED NAVIGATION ITEM BASED ON CURRENT POSITION

                //if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                //    currentGroup = $(groupEls).last().attr("id");
                //} else {
                    groupEls.forEach(groupEl => {

                        if (window.scrollY >= (groupEl.offsetTop - 150)) {
                            currentGroup = groupEl.id;
                        }

                    });


                    subGroupEls.forEach(subGroupEl => {

                        if (window.scrollY >= (subGroupEl.offsetTop - 150)) {
                            currentSubGroup = subGroupEl.id;
                        }

                    });

                //}


                var counter = 0;
                navLinkEls.forEach(navLinkEl => {
                    var dataLink = navLinkEl.dataset.link;
                    if (dataLink == ('#'+currentGroup)) {
                        $('.nav-link').removeClass('active');
                        navLinkEl.classList.add('active');
                        swiper.slideTo(counter);

                        let subGroup = findByData(subGroups, currentGroup);
                        $(subGroups).removeClass("slide-active");
                        $(subGroup).addClass("slide-active");
                    }
                    counter++;
                });

                var subCounter = 0;
                subNavLinkEls.forEach(subNavLinkEl => {
                    var dataLink = subNavLinkEl.dataset.link;
                    if (dataLink.includes(currentSubGroup)) {
                        $('.sub-nav-link').removeClass('active');
                        subNavLinkEl.classList.add('active');

                        var swipe = $(subNavLinkEl).attr("data-swiper");
                        if (swipe != undefined) {
                            subSwipers[swipe].slideTo(subCounter);

                        }



                    }
                    subCounter++;
                });


                //#endregion



                //#region SEARCH FUNCTIONS
                //if (window.scrollY > previousScrollY) {

                //    bottomContainer.classList.add("display");
                //    previousScrollY = window.scrollY;
                //}
                //else if (window.scrollY < previousScrollY) {

                //    bottomContainer.classList.remove("display");



                //    previousScrollY = window.scrollY;
                //}

                //#endregion
            }
     

            $("#dropdown-btn").removeClass("expand");
            $(".dropdown-content").removeClass("expand");

        }, 10));


    });

    //#region TABS
    function buildSwiperButtons(ele, index) {

        return new Swiper('.tab-buttons-' + index, {
            slidesPerView: "auto",
            spaceBetween: 10,
            freeMode: false,
            grabCursor: true,
            direction: 'horizontal',

        });
    }
    function buildSwiperContent(ele, index) {

        return new Swiper('.tab-content-' + index, {
            slidesPerView: "auto",
            spaceBetween: 10,
            freeMode: false,
            grabCursor: true,
            direction: 'horizontal',

        });
    }

    

    var tabs = $('.tabs-buttons .swiper-wrapper');
    if (tabs.length) {
        var tabButtons = $(".tabs-buttons");
        var tabContent = $(".tabs-content")

        // Loop over all of the fetched sliders and apply Swiper on each one.
        var swiperButtons = new Array();
        var swiperContent = new Array();

        if (tabButtons.length) {

            $(tabButtons).each(function (index) {
                $(this).addClass('tab-buttons-' + index);

                var anotherOne = buildSwiperButtons($(this), index);
                swiperButtons.push(anotherOne);
            });

            if (tabContent.length) {

                $(tabContent).each(function (index) {
                    $(this).addClass('tab-content-' + index);

                    var anotherOne = buildSwiperContent($(this), index);
                    swiperContent.push(anotherOne);
                });

                $(swiperButtons).each(function (index) {

                    swiperButtons[index].on('tap', function (swiper, event) {
                        if (event.target.classList.contains('swiper-slide') && !event.target.classList.contains('active-tab')) {
                            event.target.parentElement.querySelector('.active-tab').classList.remove('active-tab');
                            event.target.classList.add('active-tab');
                            swiperContent[index].slideTo(swiper.clickedIndex);
                        }
                    });
                });

                $(swiperContent).each(function (index) {

                    swiperContent[index].on('slideChange', function (swiper) {


                        var previous = tabs[index].children[swiper.previousIndex];
                        previous.classList.remove('active-tab');
                        var current = tabs[index].children[swiper.activeIndex];
                        current.classList.add('active-tab');

                        swiperButtons[index].slideTo(swiper.activeIndex);

                    });

                });
            }


        }

    }

    //#endregion


    function onTouchMove(event) {
        event.preventDefault()
        event.bubbles = false;
        return false
    }

    function onTouchStart(event) {
        event.preventDefault()
        event.bubbles = false;
        return false
    };



    //#region Single Product Info

    var products = $(".product");
    var close = $("#close-item");
    let lastPosBeforeItemOpen = window.scrollY;

    let slider;
    let thumbs;

    var themeColor = $("#themeColor").val();
    var style = 'style="background-color:' + themeColor + ';"'

    var enableOrders = $("#enableOrders").val();

    var pageId = $("#pageId").val();
    $(products).on("click", function (event)
    {
        if (enableOrders === "True") {

            lastPosBeforeItemOpen = window.scrollY;

            $(".main-content-page").addClass("blur");

            let scrollElement = document.getElementById("mainPage");

            scrollElement.addEventListener('touchstart', onTouchStart)

            $("#main-gallery-swiper").empty();


            if (slider != undefined) {
                slider.destroy(true, true);

            }


            var categoryIndex = parseInt($(this).attr("data-real-cat-index"));
            var category = $("#category_" + categoryIndex);
            var catName = $(category).attr("data-section-name");
            var categoryItems = $(category).find(".product");
            var catId = $(category).attr("id");

            $("#sectionTitle").text(catName);
            $("#sectionTitle").attr("data-current-cat-id", "#" + catId);
            $("#sectionTitle").attr("data-real-cat-index", categoryIndex);



            let mainProducts = "";

            $(categoryItems).each(function (index) {
                var name = $(categoryItems[index]).attr("data-name");
                var desc = $(categoryItems[index]).attr("data-desc");
                var originalPrice = $(categoryItems[index]).attr("data-original-price");
                var finalPrice = $(categoryItems[index]).attr("data-final-price");
                var image = $(categoryItems[index]).attr("data-photo");
                var hasDiscount = $(categoryItems[index]).attr("data-activate-discount");
                var hasPrice = $(categoryItems[index]).attr("data-has-price")
                var className = "";

                var pKey = $(categoryItems[index]).attr("data-product-key");
                var sKey = $(categoryItems[index]).attr("data-section-key");


                if (desc == undefined || desc == "") {
                    className = "no-desc";
                }

                //var isDeals = $(categoryItems[index]).attr("data-is-deals");
                var dealsClass = "";
                //if (isDeals != undefined && isDeals == "True") {
                //    dealsClass = "deals";
                //}

                mainProducts +=
                    '                <div class="swiper-slide" data-product-key="' + pKey + '"  data-section-key="' + sKey +'">' +
                    '                    <div class="text-photo-container ' + dealsClass + '">' +
                    '                        <div class="product-info ' + className + '">' +
                    '                            <div class="product-text">' +
                    '                                <h3 class="product-name">' + name + '</h3>' +
                    '                                <p class="product-desc">' + desc + '</p>' +
                    '                            </div>' +
                    '                            <div class="product-price">';




                if (hasDiscount === "True") {

                    mainProducts +=
                        '                                <p class="final-price has-discount">' + finalPrice +
                        '                                    <span class="original-price">' + originalPrice + '</span>' +
                        '                                </p>';
                }
                else {

                    if (hasPrice == "True") {
                        mainProducts +=
                            '                                <p class="final-price">' +
                            '                                       <span class="original-price">' + originalPrice + '</span>' +
                            '                                </p>';
                    }
                    else {
                        mainProducts +=
                            '                                <p class="final-price">' +
                            '                                       <span class="original-price"></span>' +
                            '                                </p>';
                    }

                }

                if (image != "" && image != undefined) {
                    mainProducts +=
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="product-photo-container">' +
                        '                           <img src="' + image + '" class="product-photo">' +
                        '                        </div>' +
                        '                    </div>' +
                        '                   <div class="tags-container">';

                    var tags = $(categoryItems[index]).find(".tags-container");
                    if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                        var children = $(tags).clone();
                        mainProducts += children.html();
                        mainProducts += '</div></div>';

                    }
                    else {
                        mainProducts += '</div></div>';
                    }



                }
                else {
                    mainProducts +=
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="product-photo-container">' +
                        '                           <div src="" class="product-photo"></div>' +
                        '                        </div>' +
                        '                    </div>' +
                        '                   <div class="tags-container">';

                    var tags = $(categoryItems[index]).find(".tags-container");
                    if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                        var children = $(tags).clone();
                        mainProducts += children.html();
                        mainProducts += '</div></div>';

                    }
                    else {
                        mainProducts += '</div></div>';
                    }

                }



            });

            $("#main-gallery-swiper").prepend(mainProducts);
            var currentIndex = $(this).attr("data-product-index");

            slider = new Swiper('.gallery-slider', {
                slidesPerView: 1,
                centeredSlides: false,
                direction: 'horizontal',

            });

            slider.on('sliderMove', function (s, e) {

                var thisCat = document.getElementById("category_" + (categoryIndex))
                var nextCat = document.getElementById("category_" + (categoryIndex + 1))
                var prevCat = document.getElementById("category_" + (categoryIndex + -1))

                //if is last swiper
                if (nextCat != null) {
                    if (slider.isEnd) {
                        var swiped = s.touches.diff;
                        if (swiped < 0) {


                            //$(".gallery").addClass("hide");
                            //$(".loader-container").removeClass("hide");


                            //setTimeout(nextCatSwiper, 400, categoryIndex, true);

                            nextCatSwiper(categoryIndex, true);
                        }
                        else {
                            if (swiped > 0) {

                                if ($(thisCat).find(".product").length == 1) {

                                    nextCatSwiper(categoryIndex, false,true);

                                }
                            }

                        }

                    }
                    else if (slider.activeIndex == 0) {
                        if (prevCat != null) {
                            var swiped = s.touches.diff;
                            if (swiped > 0) {
                                nextCatSwiper(categoryIndex, false,true);

                            }
                        }

                    }
                }
                else {
                    var swiped = s.touches.diff;
                    if (swiped > 0) {

                        nextCatSwiper(categoryIndex, false,true);
                    }
                }

            });


            slider.slideTo(currentIndex);

            var currentSectionKey = $(this).attr("data-section-key");
            var currentProductKey = $(this).attr("data-product-key");

            jQuery.ajax({
                url: "/umbraco/surface/Products/GetItemInfo",
                method: "GET",
                data: {
                    pageId: pageId,
                    sKey : currentSectionKey,
                    pKey: currentProductKey
                },

                success: function (data) {

                    $(".thumbs-container").append(data);

                },
                error: function () {


                }
            });

            $(".item-info").addClass("display");
            $("body").addClass("no-scroll");



        }
        else {
            lastPosBeforeItemOpen = window.scrollY;

            $(".main-content-page").addClass("blur");



            let scrollElement = document.getElementById("mainPage");

            scrollElement.addEventListener('touchstart', onTouchStart)

            $("#main-gallery-swiper").empty();
            $("#thumbs-gallery-swiper").empty();


            if (slider != undefined) {
                slider.destroy(true, true);

            }



            if (thumbs != undefined) {
                thumbs.destroy(true, true);

            }




            var categoryIndex = parseInt($(this).attr("data-real-cat-index"));
            var category = $("#category_" + categoryIndex);
            var catName = $(category).attr("data-section-name");
            var categoryItems = $(category).find(".product");
            var catId = $(category).attr("id");

            $("#sectionTitle").text(catName);
            $("#sectionTitle").attr("data-current-cat-id", "#" + catId);
            $("#sectionTitle").attr("data-real-cat-index", categoryIndex);

            //$("#sectionTitle").empty();

            //var allCategories = $(".category");

            //var sectionTitleHtml = '<div class="select-wrapper"><div class="select-dropdown">' +
            //    '<select>';
            //$(allCategories).each(function (index) {

            //    var thisCatName = $(allCategories[index]).attr("data-section-name");
            //    var thisCatId = $(allCategories[index]).attr("id");

            //    if (thisCatId == catId) {
            //        sectionTitleHtml += '<option value="' + thisCatId +'" selected>' + thisCatName + '</option>';

            //    }
            //    else {
            //        sectionTitleHtml += '<option value="' + thisCatId +'">' + thisCatName + '</option>';

            //    }


            //});
            //sectionTitleHtml += '</select>' +
            //    '</div></div>';

            //var sectionTitleHtml =
            //    '<div class="select-dropdown">' +
            //    '	<ul class="nav-links-dropdown">' +
            //    '		<option value="">2nd Option</option>' +
            //    '		<option value="" selected>' + catName + '</option>' +
            //    '		<option value="">Option Number 3</option>' +
            //    '	</select>' +
            //    '</div>';


            //$("#sectionTitle").append(sectionTitleHtml);



            let mainProducts = "";
            let thumbsProducts = "";

            $(categoryItems).each(function (index) {
                var name = $(categoryItems[index]).attr("data-name");
                var desc = $(categoryItems[index]).attr("data-desc");
                var originalPrice = $(categoryItems[index]).attr("data-original-price");
                var finalPrice = $(categoryItems[index]).attr("data-final-price");
                var image = $(categoryItems[index]).attr("data-photo");
                var hasDiscount = $(categoryItems[index]).attr("data-activate-discount");
                var hasPrice = $(categoryItems[index]).attr("data-has-price")
                var className = "";
                if (desc == undefined || desc == "") {
                    className = "no-desc";
                }

                //var isDeals = $(categoryItems[index]).attr("data-is-deals");
                var dealsClass = "";
                //if (isDeals != undefined && isDeals == "True") {
                //    dealsClass = "deals";
                //}

                mainProducts +=
                    '                <div class="swiper-slide">' +
                    '                    <div class="text-photo-container ' + dealsClass + '">' +
                    '                        <div class="product-info ' + className + '">' +
                    '                            <div class="product-text">' +
                    '                                <h3 class="product-name">' + name + '</h3>' +
                    '                                <p class="product-desc">' + desc + '</p>' +
                    '                            </div>' +
                    '                            <div class="product-price">';




                if (hasDiscount === "True") {

                    mainProducts +=
                        '                                <p class="final-price has-discount">' + finalPrice +
                        '                                    <span class="original-price">' + originalPrice + '</span>' +
                        '                                </p>';
                }
                else {

                    if (hasPrice == "True") {
                        mainProducts +=
                            '                                <p class="final-price">' +
                            '                                       <span class="original-price">' + originalPrice + '</span>' +
                            '                                </p>';
                    }
                    else {
                        mainProducts +=
                            '                                <p class="final-price">' +
                            '                                       <span class="original-price"></span>' +
                            '                                </p>';
                    }

                }

                if (image != "" && image != undefined) {
                    mainProducts +=
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="product-photo-container">' +
                        '                           <img src="' + image + '" class="product-photo">' +
                        '                        </div>' +
                        '                    </div>' +
                        '                   <div class="tags-container">';

                    var tags = $(categoryItems[index]).find(".tags-container");
                    if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                        var children = $(tags).clone();
                        mainProducts += children.html();
                        mainProducts += '</div></div>';

                    }
                    else {
                        mainProducts += '</div></div>';
                    }



                }
                else {
                    mainProducts +=
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="product-photo-container">' +
                        '                           <div src="" class="product-photo"></div>' +
                        '                        </div>' +
                        '                    </div>' +
                        '                   <div class="tags-container">';

                    var tags = $(categoryItems[index]).find(".tags-container");
                    if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                        var children = $(tags).clone();
                        mainProducts += children.html();
                        mainProducts += '</div></div>';

                    }
                    else {
                        mainProducts += '</div></div>';
                    }

                }



                thumbsProducts +=
                    '                <div class="swiper-slide"' + style + '>' +
                    '                    <div class="text-photo-container">' +
                    '                        <div class="product-info">' +
                    '                            <div class="product-text">' +
                    '                                <h3 class="product-name">' + name + '</h3>' +
                    '                            </div>' +
                    '                        </div>' +
                    '                    </div>' +
                    '                </div>';

            });

            $("#main-gallery-swiper").prepend(mainProducts);
            $("#thumbs-gallery-swiper").prepend(thumbsProducts);
            var currentIndex = $(this).attr("data-product-index");

            slider = new Swiper('.gallery-slider', {
                slidesPerView: 1,
                centeredSlides: false,
                direction: 'horizontal',

            });

            thumbs = new Swiper('.gallery-thumbs', {
                slidesPerView: 'auto',
                spaceBetween: 20,
                centeredSlides: true,
                slideToClickedSlide: true,
                direction: 'horizontal',

            });


            slider.on('slideChange', function () {
                thumbs.slideTo(slider.activeIndex)
            });

            thumbs.on('slideChange', function () {
                slider.slideTo(thumbs.activeIndex)
            });


            slider.on('sliderMove', function (s, e) {

                var thisCat = document.getElementById("category_" + (categoryIndex))
                var nextCat = document.getElementById("category_" + (categoryIndex + 1))
                var prevCat = document.getElementById("category_" + (categoryIndex + -1))

                //if is last swiper
                if (nextCat != null) {
                    if (slider.isEnd) {
                        var swiped = s.touches.diff;
                        if (swiped < 0) {


                            //$(".gallery").addClass("hide");
                            //$(".loader-container").removeClass("hide");


                            //setTimeout(nextCatSwiper, 400, categoryIndex, true);

                            nextCatSwiper(categoryIndex, true);
                        }
                        else {
                            if (swiped > 0) {

                                if ($(thisCat).find(".product").length == 1) {

                                    nextCatSwiper(categoryIndex, false);

                                }
                            }

                        }

                    }
                    else if (slider.activeIndex == 0) {
                        if (prevCat != null) {
                            var swiped = s.touches.diff;
                            if (swiped > 0) {
                                nextCatSwiper(categoryIndex, false);

                            }
                        }

                    }
                }
                else {
                    var swiped = s.touches.diff;
                    if (swiped > 0) {

                        nextCatSwiper(categoryIndex, false);
                    }
                }

            });
            thumbs.on('sliderMove', function (s, e) {

                var thisCat = document.getElementById("category_" + (categoryIndex))
                var nextCat = document.getElementById("category_" + (categoryIndex + 1))
                var prevCat = document.getElementById("category_" + (categoryIndex + -1))

                //if is last swiper
                if (nextCat != null) {
                    if (slider.isEnd) {
                        var swiped = s.touches.diff;
                        if (swiped < 0) {


                            //$(".gallery").addClass("hide");
                            //$(".loader-container").removeClass("hide");


                            //setTimeout(nextCatSwiper, 400, categoryIndex, true);

                            nextCatSwiper(categoryIndex, true);
                        }
                        else {
                            if (swiped > 0) {

                                if ($(thisCat).find(".product").length == 1) {

                                    nextCatSwiper(categoryIndex, false);

                                }
                            }

                        }
                    }
                    else if (slider.activeIndex == 0) {
                        if (prevCat != null) {
                            var swiped = s.touches.diff;
                            if (swiped > 0) {
                                nextCatSwiper(categoryIndex, false);

                            }
                        }

                    }
                }
                else {
                    var swiped = s.touches.diff;
                    if (swiped > 0) {

                        nextCatSwiper(categoryIndex, false);
                    }
                }

            });
            //slider.controller.control = thumbs;
            //thumbs.controller.control = slider;
            //slider.params.control = thumbs;
            //thumbs.params.control = slider;


            slider.slideTo(currentIndex);
            thumbs.slideTo(currentIndex);

            $(".item-info").addClass("display");
            $("body").addClass("no-scroll");

        }

    });



    
    function delay(fn, ms) {
        let timer = 0
        return function (...args) {
            clearTimeout(timer)
            timer = setTimeout(fn.bind(this, ...args), ms || 0)
        }
    }
    function nextCatSwiper(lastCategoryIndex, next, order = false) {

        if (order === false) {
            $(".gallery").removeClass("hide");
            $(".loader-container").addClass("hide");

            var categoryIndex = lastCategoryIndex;

            if (next == true) {

                categoryIndex = categoryIndex + 1;
            }
            else {
                categoryIndex = categoryIndex - 1;

            }

            var category = $("#category_" + categoryIndex);
            var catExists = document.getElementById("category_" + categoryIndex);

            if (catExists != null && catExists != undefined) {
                if (category != undefined) {



                    $("#main-gallery-swiper").empty();
                    $("#thumbs-gallery-swiper").empty();

                    if (slider != undefined) {
                        slider.destroy(false, true);

                    }
                    if (thumbs != undefined) {
                        thumbs.destroy(false, true);

                    }



                    var catName = $(category).attr("data-section-name");
                    var categoryItems = $(category).find(".product");



                    $("#sectionTitle").text(catName);
                    $("#sectionTitle").attr("data-current-cat-id", "#category_" + categoryIndex);
                    $("#sectionTitle").attr("data-real-cat-index", categoryIndex);


                    let mainProducts = "";
                    let thumbsProducts = "";


                    $(categoryItems).each(function (index) {
                        var name = $(categoryItems[index]).attr("data-name");
                        var desc = $(categoryItems[index]).attr("data-desc");
                        var originalPrice = $(categoryItems[index]).attr("data-original-price");
                        var finalPrice = $(categoryItems[index]).attr("data-final-price");
                        var image = $(categoryItems[index]).attr("data-photo");
                        var hasDiscount = $(categoryItems[index]).attr("data-activate-discount");
                        var hasPrice = $(categoryItems[index]).attr("data-has-price")
                        var className = "";
                        if (desc == undefined || desc == "") {
                            className = "no-desc";
                        }

                        //var isDeals = $(categoryItems[index]).attr("data-is-deals");
                        var dealsClass = "";
                        //if (isDeals != undefined && isDeals == "True") {
                        //    dealsClass = "deals";
                        //}


                        mainProducts +=
                            '                <div class="swiper-slide">' +
                            '                    <div class="text-photo-container ' + dealsClass + '">' +
                            '                        <div class="product-info ' + className + '">' +
                            '                            <div class="product-text">' +
                            '                                <h3 class="product-name">' + name + '</h3>' +
                            '                                <p class="product-desc">' + desc + '</p>' +
                            '                            </div>' +
                            '                            <div class="product-price">';




                        if (hasDiscount === "True") {

                            mainProducts +=
                                '                                <p class="final-price has-discount">' + finalPrice +
                                '                                    <span class="original-price">' + originalPrice + '</span>' +
                                '                                </p>';
                        }
                        else {

                            if (hasPrice == "True") {
                                mainProducts +=
                                    '                                <p class="final-price">' +
                                    '                                       <span class="original-price">' + originalPrice + '</span>' +
                                    '                                </p>';
                            }
                            else {
                                mainProducts +=
                                    '                                <p class="final-price">' +
                                    '                                       <span class="original-price"></span>' +
                                    '                                </p>';
                            }

                        }

                        if (image != "" && image != undefined) {
                            mainProducts +=
                                '                            </div>' +
                                '                        </div>' +
                                '                        <div class="product-photo-container">' +
                                '                           <img src="' + image + '" class="product-photo">' +
                                '                        </div>' +
                                '                    </div>' +
                                '                   <div class="tags-container">';

                            var tags = $(categoryItems[index]).find(".tags-container");
                            if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                                var children = $(tags).clone();
                                mainProducts += children.html();
                                mainProducts += '</div></div>';

                            }
                            else {
                                mainProducts += '</div></div>';
                            }



                        }
                        else {
                            mainProducts +=
                                '                            </div>' +
                                '                        </div>' +
                                '                        <div class="product-photo-container">' +
                                '                           <div src="" class="product-photo"></div>' +
                                '                        </div>' +
                                '                    </div>' +
                                '                   <div class="tags-container">';

                            var tags = $(categoryItems[index]).find(".tags-container");
                            if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                                var children = $(tags).clone();
                                mainProducts += children.html();
                                mainProducts += '</div></div>';

                            }
                            else {
                                mainProducts += '</div></div>';
                            }

                        }



                        thumbsProducts +=
                            '                <div class="swiper-slide"' + style + '>' +
                            '                    <div class="text-photo-container">' +
                            '                        <div class="product-info">' +
                            '                            <div class="product-text">' +
                            '                                <h3 class="product-name">' + name + '</h3>' +
                            '                            </div>' +
                            '                        </div>' +
                            '                    </div>' +
                            '                </div>';

                    });

                    $("#main-gallery-swiper").prepend(mainProducts);
                    $("#thumbs-gallery-swiper").prepend(thumbsProducts);

                    //Swiper to initial View Or Last Based On Swipe Direction


                    var countSwipers = $("#main-gallery-swiper").find(".swiper-slide").length;

                    if (next == false) {
                        slider = new Swiper('.gallery-slider', {
                            slidesPerView: 1,
                            centeredSlides: false,
                            cssMode: false,
                            initialSlide: countSwipers,
                            direction: 'horizontal',

                        });

                        thumbs = new Swiper('.gallery-thumbs', {
                            slidesPerView: 'auto',
                            spaceBetween: 20,
                            centeredSlides: true,
                            slideToClickedSlide: true,
                            cssMode: false,
                            initialSlide: countSwipers,
                            direction: 'horizontal',


                        });

                    }
                    else {
                        slider = new Swiper('.gallery-slider', {
                            slidesPerView: 1,
                            centeredSlides: false,
                            cssMode: false,
                            initialSlide: 0,
                            direction: 'horizontal',

                        });

                        thumbs = new Swiper('.gallery-thumbs', {
                            slidesPerView: 'auto',
                            spaceBetween: 20,
                            centeredSlides: true,
                            slideToClickedSlide: true,
                            cssMode: false,
                            initialSlide: 0,
                            direction: 'horizontal',


                        });


                    }



                    slider.on('slideChange', function () {
                        thumbs.slideTo(slider.activeIndex)
                    });
                    thumbs.on('slideChange', function () {
                        slider.slideTo(thumbs.activeIndex)
                    });

                    slider.on('sliderMove', function (s, e) {

                        var thisCat = document.getElementById("category_" + (categoryIndex))
                        var nextCat = document.getElementById("category_" + (categoryIndex + 1))
                        var prevCat = document.getElementById("category_" + (categoryIndex + -1))

                        //if is last swiper
                        if (nextCat != null) {
                            if (slider.isEnd) {
                                var swiped = s.touches.diff;
                                if (swiped < 0) {


                                    //$(".gallery").addClass("hide");
                                    //$(".loader-container").removeClass("hide");


                                    //setTimeout(nextCatSwiper, 400, categoryIndex, true);

                                    nextCatSwiper(categoryIndex, true);
                                }
                                else {
                                    if (swiped > 0) {

                                        if ($(thisCat).find(".product").length == 1) {

                                            nextCatSwiper(categoryIndex, false);

                                        }
                                    }

                                }
                            }
                            else if (slider.activeIndex == 0) {
                                if (prevCat != null) {
                                    var swiped = s.touches.diff;
                                    if (swiped > 0) {
                                        nextCatSwiper(categoryIndex, false);

                                    }
                                }

                            }
                        }
                        else {
                            var swiped = s.touches.diff;
                            if (swiped > 0) {

                                nextCatSwiper(categoryIndex, false);
                            }
                        }

                    });
                    thumbs.on('sliderMove', function (s, e) {

                        var thisCat = document.getElementById("category_" + (categoryIndex))
                        var nextCat = document.getElementById("category_" + (categoryIndex + 1))
                        var prevCat = document.getElementById("category_" + (categoryIndex + -1))

                        //if is last swiper
                        if (nextCat != null) {
                            if (slider.isEnd) {
                                var swiped = s.touches.diff;
                                if (swiped < 0) {


                                    //$(".gallery").addClass("hide");
                                    //$(".loader-container").removeClass("hide");


                                    //setTimeout(nextCatSwiper, 400, categoryIndex, true);

                                    nextCatSwiper(categoryIndex, true);
                                }
                                else {
                                    if (swiped > 0) {

                                        if ($(thisCat).find(".product").length == 1) {

                                            nextCatSwiper(categoryIndex, false);

                                        }
                                    }

                                }
                            }
                            else if (slider.activeIndex == 0) {
                                if (prevCat != null) {
                                    var swiped = s.touches.diff;
                                    if (swiped > 0) {
                                        nextCatSwiper(categoryIndex, false);

                                    }
                                }

                            }
                        }
                        else {
                            var swiped = s.touches.diff;
                            if (swiped > 0) {

                                nextCatSwiper(categoryIndex, false);
                            }
                        }

                    });

                    //slider.controller.control = thumbs;
                    //thumbs.controller.control = slider;
                    //slider.params.control = thumbs;
                    //thumbs.params.control = slider;





                }
            }

        }
        else {

            $(".gallery").removeClass("hide");
            $(".loader-container").addClass("hide");

            var categoryIndex = lastCategoryIndex;

            if (next == true) {

                categoryIndex = categoryIndex + 1;
            }
            else {
                categoryIndex = categoryIndex - 1;

            }

            var category = $("#category_" + categoryIndex);
            var catExists = document.getElementById("category_" + categoryIndex);

            if (catExists != null && catExists != undefined) {
                if (category != undefined) {



                    $("#main-gallery-swiper").empty();

                    if (slider != undefined) {
                        slider.destroy(false, true);

                    }




                    var catName = $(category).attr("data-section-name");
                    var categoryItems = $(category).find(".product");



                    $("#sectionTitle").text(catName);
                    $("#sectionTitle").attr("data-current-cat-id", "#category_" + categoryIndex);
                    $("#sectionTitle").attr("data-real-cat-index", categoryIndex);


                    let mainProducts = "";


                    $(categoryItems).each(function (index) {
                        var name = $(categoryItems[index]).attr("data-name");
                        var desc = $(categoryItems[index]).attr("data-desc");
                        var originalPrice = $(categoryItems[index]).attr("data-original-price");
                        var finalPrice = $(categoryItems[index]).attr("data-final-price");
                        var image = $(categoryItems[index]).attr("data-photo");
                        var hasDiscount = $(categoryItems[index]).attr("data-activate-discount");
                        var hasPrice = $(categoryItems[index]).attr("data-has-price")

                        var className = "";
                        if (desc == undefined || desc == "") {
                            className = "no-desc";
                        }

                        //var isDeals = $(categoryItems[index]).attr("data-is-deals");
                        var dealsClass = "";
                        //if (isDeals != undefined && isDeals == "True") {
                        //    dealsClass = "deals";
                        //}


                        mainProducts +=
                            '                <div class="swiper-slide">' +
                            '                    <div class="text-photo-container ' + dealsClass + '">' +
                            '                        <div class="product-info ' + className + '">' +
                            '                            <div class="product-text">' +
                            '                                <h3 class="product-name">' + name + '</h3>' +
                            '                                <p class="product-desc">' + desc + '</p>' +
                            '                            </div>' +
                            '                            <div class="product-price">';




                        if (hasDiscount === "True") {

                            mainProducts +=
                                '                                <p class="final-price has-discount">' + finalPrice +
                                '                                    <span class="original-price">' + originalPrice + '</span>' +
                                '                                </p>';
                        }
                        else {

                            if (hasPrice == "True") {
                                mainProducts +=
                                    '                                <p class="final-price">' +
                                    '                                       <span class="original-price">' + originalPrice + '</span>' +
                                    '                                </p>';
                            }
                            else {
                                mainProducts +=
                                    '                                <p class="final-price">' +
                                    '                                       <span class="original-price"></span>' +
                                    '                                </p>';
                            }

                        }

                        if (image != "" && image != undefined) {
                            mainProducts +=
                                '                            </div>' +
                                '                        </div>' +
                                '                        <div class="product-photo-container">' +
                                '                           <img src="' + image + '" class="product-photo">' +
                                '                        </div>' +
                                '                    </div>' +
                                '                   <div class="tags-container">';

                            var tags = $(categoryItems[index]).find(".tags-container");
                            if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                                var children = $(tags).clone();
                                mainProducts += children.html();
                                mainProducts += '</div></div>';

                            }
                            else {
                                mainProducts += '</div></div>';
                            }



                        }
                        else {
                            mainProducts +=
                                '                            </div>' +
                                '                        </div>' +
                                '                        <div class="product-photo-container">' +
                                '                           <div src="" class="product-photo"></div>' +
                                '                        </div>' +
                                '                    </div>' +
                                '                   <div class="tags-container">';

                            var tags = $(categoryItems[index]).find(".tags-container");
                            if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                                var children = $(tags).clone();
                                mainProducts += children.html();
                                mainProducts += '</div></div>';

                            }
                            else {
                                mainProducts += '</div></div>';
                            }

                        }



                    });

                    $("#main-gallery-swiper").prepend(mainProducts);

                    //Swiper to initial View Or Last Based On Swipe Direction


                    var countSwipers = $("#main-gallery-swiper").find(".swiper-slide").length;

                    if (next == false) {
                        slider = new Swiper('.gallery-slider', {
                            slidesPerView: 1,
                            centeredSlides: false,
                            cssMode: false,
                            initialSlide: countSwipers,
                            direction: 'horizontal',

                        });



                    }
                    else {
                        slider = new Swiper('.gallery-slider', {
                            slidesPerView: 1,
                            centeredSlides: false,
                            cssMode: false,
                            initialSlide: 0,
                            direction: 'horizontal',

                        });



                    }



                    slider.on('sliderMove', function (s, e) {

                        var thisCat = document.getElementById("category_" + (categoryIndex))
                        var nextCat = document.getElementById("category_" + (categoryIndex + 1))
                        var prevCat = document.getElementById("category_" + (categoryIndex + -1))

                        //if is last swiper
                        if (nextCat != null) {
                            if (slider.isEnd) {
                                var swiped = s.touches.diff;
                                if (swiped < 0) {


                                    //$(".gallery").addClass("hide");
                                    //$(".loader-container").removeClass("hide");


                                    //setTimeout(nextCatSwiper, 400, categoryIndex, true);

                                    nextCatSwiper(categoryIndex, true , true);
                                }
                                else {
                                    if (swiped > 0) {

                                        if ($(thisCat).find(".product").length == 1) {

                                            nextCatSwiper(categoryIndex, false, true);

                                        }
                                    }

                                }
                            }
                            else if (slider.activeIndex == 0) {
                                if (prevCat != null) {
                                    var swiped = s.touches.diff;
                                    if (swiped > 0) {
                                        nextCatSwiper(categoryIndex, false, true);

                                    }
                                }

                            }
                        }
                        else {
                            var swiped = s.touches.diff;
                            if (swiped > 0) {

                                nextCatSwiper(categoryIndex, false, true);
                            }
                        }

                    });
    
                }
            }


        }
        


    }
    function newCatSwiper(lastCategoryIndex, order = false) {

        if (order === false) {
            $(".gallery").removeClass("hide");
            $(".loader-container").addClass("hide");

            var categoryIndex = lastCategoryIndex;

            var category = $("#category_" + categoryIndex);
            var catExists = document.getElementById("category_" + categoryIndex);


            if (catExists != null && catExists != undefined) {
                if (category != undefined) {


                    $("#main-gallery-swiper").empty();
                    $("#thumbs-gallery-swiper").empty();

                    if (slider != undefined) {
                        slider.destroy(false, true);

                    }
                    if (thumbs != undefined) {
                        thumbs.destroy(false, true);

                    }



                    var catName = $(category).attr("data-section-name");
                    var categoryItems = $(category).find(".product");




                    $("#sectionTitle").text(catName);
                    $("#sectionTitle").attr("data-current-cat-id", "#category_" + categoryIndex);
                    $("#sectionTitle").attr("data-real-cat-index", categoryIndex);



                    let mainProducts = "";
                    let thumbsProducts = "";


                    $(categoryItems).each(function (index) {
                        var name = $(categoryItems[index]).attr("data-name");
                        var desc = $(categoryItems[index]).attr("data-desc");
                        var originalPrice = $(categoryItems[index]).attr("data-original-price");
                        var finalPrice = $(categoryItems[index]).attr("data-final-price");
                        var image = $(categoryItems[index]).attr("data-photo");
                        var hasDiscount = $(categoryItems[index]).attr("data-activate-discount");
                        var hasPrice = $(categoryItems[index]).attr("data-has-price")

                        var className = "";
                        if (desc == undefined || desc == "") {
                            className = "no-desc";
                        }

                        //var isDeals = $(categoryItems[index]).attr("data-is-deals");
                        var dealsClass = "";
                        //if (isDeals != undefined && isDeals == "True") {
                        //    dealsClass = "deals";
                        //}


                        mainProducts +=
                            '                <div class="swiper-slide">' +
                            '                    <div class="text-photo-container ' + dealsClass + '">' +
                            '                        <div class="product-info ' + className + '">' +
                            '                            <div class="product-text">' +
                            '                                <h3 class="product-name">' + name + '</h3>' +
                            '                                <p class="product-desc">' + desc + '</p>' +
                            '                            </div>' +
                            '                            <div class="product-price">';




                        if (hasDiscount === "True") {

                            mainProducts +=
                                '                                <p class="final-price has-discount">' + finalPrice +
                                '                                    <span class="original-price">' + originalPrice + '</span>' +
                                '                                </p>';
                        }
                        else {

                            if (hasPrice == "True") {
                                mainProducts +=
                                    '                                <p class="final-price">' +
                                    '                                       <span class="original-price">' + originalPrice + '</span>' +
                                    '                                </p>';
                            }
                            else {
                                mainProducts +=
                                    '                                <p class="final-price">' +
                                    '                                       <span class="original-price"></span>' +
                                    '                                </p>';
                            }

                        }

                        if (image != "" && image != undefined) {
                            mainProducts +=
                                '                            </div>' +
                                '                        </div>' +
                                '                        <div class="product-photo-container">' +
                                '                           <img src="' + image + '" class="product-photo">' +
                                '                        </div>' +
                                '                    </div>' +
                                '                   <div class="tags-container">';

                            var tags = $(categoryItems[index]).find(".tags-container");
                            if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                                var children = $(tags).clone();
                                mainProducts += children.html();
                                mainProducts += '</div></div>';

                            }
                            else {
                                mainProducts += '</div></div>';
                            }



                        }
                        else {
                            mainProducts +=
                                '                            </div>' +
                                '                        </div>' +
                                '                        <div class="product-photo-container">' +
                                '                           <div src="" class="product-photo"></div>' +
                                '                        </div>' +
                                '                    </div>' +
                                '                   <div class="tags-container">';

                            var tags = $(categoryItems[index]).find(".tags-container");
                            if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                                var children = $(tags).clone();
                                mainProducts += children.html();
                                mainProducts += '</div></div>';

                            }
                            else {
                                mainProducts += '</div></div>';
                            }

                        }



                        thumbsProducts +=
                            '                <div class="swiper-slide"' + style + '>' +
                            '                    <div class="text-photo-container">' +
                            '                        <div class="product-info">' +
                            '                            <div class="product-text">' +
                            '                                <h3 class="product-name">' + name + '</h3>' +
                            '                            </div>' +
                            '                        </div>' +
                            '                    </div>' +
                            '                </div>';

                    });

                    $("#main-gallery-swiper").prepend(mainProducts);
                    $("#thumbs-gallery-swiper").prepend(thumbsProducts);

                    //Swiper to initial View Or Last Based On Swipe Direction


                    var countSwipers = $("#main-gallery-swiper").find(".swiper-slide").length;

                    slider = new Swiper('.gallery-slider', {
                        slidesPerView: 1,
                        centeredSlides: false,
                        cssMode: false,
                        initialSlide: 0,
                        direction: 'horizontal',

                    });

                    thumbs = new Swiper('.gallery-thumbs', {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        cssMode: false,
                        initialSlide: 0,
                        direction: 'horizontal',


                    });



                    slider.on('slideChange', function () {
                        thumbs.slideTo(slider.activeIndex)
                    });
                    thumbs.on('slideChange', function () {
                        slider.slideTo(thumbs.activeIndex)
                    });

                    slider.on('sliderMove', function (s, e) {

                        var thisCat = document.getElementById("category_" + (categoryIndex))
                        var nextCat = document.getElementById("category_" + (categoryIndex + 1))
                        var prevCat = document.getElementById("category_" + (categoryIndex + -1))

                        //if is last swiper
                        if (nextCat != null) {
                            if (slider.isEnd) {
                                var swiped = s.touches.diff;
                                if (swiped < 0) {


                                    //$(".gallery").addClass("hide");
                                    //$(".loader-container").removeClass("hide");


                                    //setTimeout(nextCatSwiper, 400, categoryIndex, true);

                                    nextCatSwiper(categoryIndex, true);
                                }
                                else {
                                    if (swiped > 0) {

                                        if ($(thisCat).find(".product").length == 1) {

                                            nextCatSwiper(categoryIndex, false);

                                        }
                                    }

                                }
                            }
                            else if (slider.activeIndex == 0) {
                                if (prevCat != null) {
                                    var swiped = s.touches.diff;
                                    if (swiped > 0) {
                                        nextCatSwiper(categoryIndex, false);

                                    }
                                }

                            }
                        }
                        else {
                            var swiped = s.touches.diff;
                            if (swiped > 0) {

                                nextCatSwiper(categoryIndex, false);
                            }
                        }

                    });
                    thumbs.on('sliderMove', function (s, e) {

                        var thisCat = document.getElementById("category_" + (categoryIndex))
                        var nextCat = document.getElementById("category_" + (categoryIndex + 1))
                        var prevCat = document.getElementById("category_" + (categoryIndex + -1))

                        //if is last swiper
                        if (nextCat != null) {
                            if (slider.isEnd) {
                                var swiped = s.touches.diff;
                                if (swiped < 0) {


                                    //$(".gallery").addClass("hide");
                                    //$(".loader-container").removeClass("hide");


                                    //setTimeout(nextCatSwiper, 400, categoryIndex, true);

                                    nextCatSwiper(categoryIndex, true);
                                }
                                else {
                                    if (swiped > 0) {

                                        if ($(thisCat).find(".product").length == 1) {

                                            nextCatSwiper(categoryIndex, false);

                                        }
                                    }

                                }
                            }
                            else if (slider.activeIndex == 0) {
                                if (prevCat != null) {
                                    var swiped = s.touches.diff;
                                    if (swiped > 0) {
                                        nextCatSwiper(categoryIndex, false);

                                    }
                                }

                            }
                        }
                        else {
                            var swiped = s.touches.diff;
                            if (swiped > 0) {

                                nextCatSwiper(categoryIndex, false);
                            }
                        }

                    });

                    //slider.controller.control = thumbs;
                    //thumbs.controller.control = slider;
                    //slider.params.control = thumbs;
                    //thumbs.params.control = slider;





                }
            }
        }
        else {
            $(".gallery").removeClass("hide");
            $(".loader-container").addClass("hide");

            var categoryIndex = lastCategoryIndex;

            var category = $("#category_" + categoryIndex);
            var catExists = document.getElementById("category_" + categoryIndex);


            if (catExists != null && catExists != undefined) {
                if (category != undefined) {


                    $("#main-gallery-swiper").empty();

                    if (slider != undefined) {
                        slider.destroy(false, true);

                    }
    



                    var catName = $(category).attr("data-section-name");
                    var categoryItems = $(category).find(".product");




                    $("#sectionTitle").text(catName);
                    $("#sectionTitle").attr("data-current-cat-id", "#category_" + categoryIndex);
                    $("#sectionTitle").attr("data-real-cat-index", categoryIndex);



                    let mainProducts = "";


                    $(categoryItems).each(function (index) {
                        var name = $(categoryItems[index]).attr("data-name");
                        var desc = $(categoryItems[index]).attr("data-desc");
                        var originalPrice = $(categoryItems[index]).attr("data-original-price");
                        var finalPrice = $(categoryItems[index]).attr("data-final-price");
                        var image = $(categoryItems[index]).attr("data-photo");
                        var hasDiscount = $(categoryItems[index]).attr("data-activate-discount");
                        var hasPrice = $(categoryItems[index]).attr("data-has-price")

                        var className = "";
                        if (desc == undefined || desc == "") {
                            className = "no-desc";
                        }

                        //var isDeals = $(categoryItems[index]).attr("data-is-deals");
                        var dealsClass = "";
                        //if (isDeals != undefined && isDeals == "True") {
                        //    dealsClass = "deals";
                        //}


                        mainProducts +=
                            '                <div class="swiper-slide">' +
                            '                    <div class="text-photo-container ' + dealsClass + '">' +
                            '                        <div class="product-info ' + className + '">' +
                            '                            <div class="product-text">' +
                            '                                <h3 class="product-name">' + name + '</h3>' +
                            '                                <p class="product-desc">' + desc + '</p>' +
                            '                            </div>' +
                            '                            <div class="product-price">';




                        if (hasDiscount === "True") {

                            mainProducts +=
                                '                                <p class="final-price has-discount">' + finalPrice +
                                '                                    <span class="original-price">' + originalPrice + '</span>' +
                                '                                </p>';
                        }
                        else {

                            if (hasPrice == "True") {
                                mainProducts +=
                                    '                                <p class="final-price">' +
                                    '                                       <span class="original-price">' + originalPrice + '</span>' +
                                    '                                </p>';
                            }
                            else {
                                mainProducts +=
                                    '                                <p class="final-price">' +
                                    '                                       <span class="original-price"></span>' +
                                    '                                </p>';
                            }

                        }

                        if (image != "" && image != undefined) {
                            mainProducts +=
                                '                            </div>' +
                                '                        </div>' +
                                '                        <div class="product-photo-container">' +
                                '                           <img src="' + image + '" class="product-photo">' +
                                '                        </div>' +
                                '                    </div>' +
                                '                   <div class="tags-container">';

                            var tags = $(categoryItems[index]).find(".tags-container");
                            if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                                var children = $(tags).clone();
                                mainProducts += children.html();
                                mainProducts += '</div></div>';

                            }
                            else {
                                mainProducts += '</div></div>';
                            }



                        }
                        else {
                            mainProducts +=
                                '                            </div>' +
                                '                        </div>' +
                                '                        <div class="product-photo-container">' +
                                '                           <div src="" class="product-photo"></div>' +
                                '                        </div>' +
                                '                    </div>' +
                                '                   <div class="tags-container">';

                            var tags = $(categoryItems[index]).find(".tags-container");
                            if ((tags != undefined && tags.length) && $(tags.children()) != undefined && $(tags.children().length)) {
                                var children = $(tags).clone();
                                mainProducts += children.html();
                                mainProducts += '</div></div>';

                            }
                            else {
                                mainProducts += '</div></div>';
                            }

                        }


                    });

                    $("#main-gallery-swiper").prepend(mainProducts);

                    //Swiper to initial View Or Last Based On Swipe Direction


                    var countSwipers = $("#main-gallery-swiper").find(".swiper-slide").length;

                    slider = new Swiper('.gallery-slider', {
                        slidesPerView: 1,
                        centeredSlides: false,
                        cssMode: false,
                        initialSlide: 0,
                        direction: 'horizontal',

                    });






                    slider.on('sliderMove', function (s, e) {

                        var thisCat = document.getElementById("category_" + (categoryIndex))
                        var nextCat = document.getElementById("category_" + (categoryIndex + 1))
                        var prevCat = document.getElementById("category_" + (categoryIndex + -1))

                        //if is last swiper
                        if (nextCat != null) {
                            if (slider.isEnd) {
                                var swiped = s.touches.diff;
                                if (swiped < 0) {


                                    //$(".gallery").addClass("hide");
                                    //$(".loader-container").removeClass("hide");


                                    //setTimeout(nextCatSwiper, 400, categoryIndex, true);

                                    nextCatSwiper(categoryIndex, true, true);
                                }
                                else {
                                    if (swiped > 0) {

                                        if ($(thisCat).find(".product").length == 1) {

                                            nextCatSwiper(categoryIndex, false, true);

                                        }
                                    }

                                }
                            }
                            else if (slider.activeIndex == 0) {
                                if (prevCat != null) {
                                    var swiped = s.touches.diff;
                                    if (swiped > 0) {
                                        nextCatSwiper(categoryIndex, false , true);

                                    }
                                }

                            }
                        }
                        else {
                            var swiped = s.touches.diff;
                            if (swiped > 0) {

                                nextCatSwiper(categoryIndex, false , true);
                            }
                        }

                    });

                }
            }
        }





    }



    var close = $("#close-item");
    $(close).on("click", function () {


        let scrollElement = document.getElementById("mainPage");
        scrollElement.removeEventListener('touchstart', onTouchStart)


        $(".main-content-page").removeClass("hide");
        $(".item-info").removeClass("display");



        $("body").removeClass("no-scroll");
        $(".main-content-page").removeClass("blur");

        window.scrollTo({
            top: lastPosBeforeItemOpen,
            left: 0,
            behavior: 'instant',
        });
    });


    var outOfStockSwipers = new Array();
    var outOfStock = $(".out-of-stock-swiper");
    function buildSwiperOutOfStock(ele, index) {

        return new Swiper(".out-swiper-" + index, {
            //scrollbar: {
            //    el: ".out-swiper-scrollbar-" + index,
            //    hide: true,
            //},
            //navigation: {
            //    nextEl: ".next" + index,
            //    prevEl: ".prev" + index,
            //},
            pagination: {
                el: ".out-swiper-pagination-" + index,
                dynamicBullets: true,
            },
            direction: 'horizontal',

        });
    }

    $(outOfStock).each(function (index) {
        $(this).addClass('out-swiper-' + index);

        //var next = $(this).find(".swiper-button-next");
        //var prev = $(this).find(".swiper-button-prev");

        //$(next).addClass("next" + index);
        //$(prev).addClass("prev" + index);

        var pagination = $(this).find(".swiper-pagination");
        $(pagination).addClass("out-swiper-pagination-" + index);
        $(pagination).addClass("out-of-stock-pagination");

        var anotherOne = buildSwiperOutOfStock($(this), index);
        outOfStockSwipers.push(anotherOne);

    });


    $('.collapse').on('show.bs.collapse', function (e) {
        // Get clicked element that initiated the collapse...
        var clicked = $(document).find("[href='#" + $(e.target).attr('id') + "']")
        var arrow = $(clicked).find(".fa-chevron-down")
        $(arrow).removeClass("fa-chevron-down");
        $(arrow).addClass("fa-chevron-up");
    });

    $('.collapse').on('hide.bs.collapse', function (e) {
        // Get clicked element that initiated the collapse...
        var clicked = $(document).find("[href='#" + $(e.target).attr('id') + "']")
        var arrow = $(clicked).find(".fa-chevron-up")
        $(arrow).removeClass("fa-chevron-up");
        $(arrow).addClass("fa-chevron-down");

        var dataIndex = clicked.attr("data-index");
        outOfStockSwipers[dataIndex].slideTo(0);

    });


    //#endregion

    var eventsSwiper;
    let lastWindowBeforeInfo;

    $("#brand-info-trigger").on("click", function (event) {
        lastWindowBeforeInfo = window.scrollY;

        $(".main-content-page").addClass("hide");
        $("#brand-info-content").addClass("display");

        eventsSwiper = new Swiper(".events-swiper", {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                    direction: 'horizontal',

                },
            //pagination: {
            //    el: ".swiper-pagination",
            //    type: "progressbar",
            //},
                autoplay: {
                    delay: 3000,
                 },
                 autoplayDisableOnInteraction: true,
                 pauseOnMouseEnter: true,


        });


    });

    

    $("#close-info").on("click", function (event) {

        window.scrollTo({
            top: lastWindowBeforeInfo,
            left: 0,
            behavior: 'instant',
        });

        $(".main-content-page").removeClass("hide");
        $("#brand-info-content").removeClass("display");

        eventsSwiper.destroy(true, true);



    });



    //#region Search

    var allCategories = $(".category:not(.deals)");
    const biggestPriceVal = $("#biggestPriceValue").val();
    const smallestPriceVal = parseInt($("#smallestPriceValue").val());
    var hasPriceFilter = false;
    var globalSearchTerm = "";
    var lastPosBeforeSearch = 0;
    $("#search-trigger").on("click", function () {

        if ($(this).hasClass("expanded")) {

            $("#priceRangeVal").text()
            $("#priceRangeValContainer").hide();
            hasPriceFilter = false;
            globalSearchTerm = "";


            $("#filtersContainer").hide();

            //$(".search-results").removeClass("show");
            $(".brand-container").show();

            var prev = $(".out-of-stock-items").prev();
            if (prev != undefined) {
                $(prev).children().css("border-bottom", "1px solid rgba(237, 231, 225,0.75)");
            }
            $(".out-of-stock-items").show();
            $(".collapse").show();

            $(".category").show();
            $(".product").show();

            $(".search-placeholder").removeClass("expand");
            $(".menu-navigation-container").removeClass("hide");
            $(this).removeClass("expanded");

            $("#close-search-icon").removeClass("show");
            $("#open-search-icon").removeClass("hide");
            $("#searchInput").val("");



            $(this).removeClass("expanded");

            //setTimeout(function () {
            //    window.scrollTo({
            //        top: lastPosBeforeSearch,
            //        left: 0,
            //        behavior: 'instant',
            //    });
            //}, 50);
            window.scrollTo({
                top: lastPosBeforeSearch,
                left: 0,
                behavior: 'instant',
            });

            $([document.documentElement, document.body]).animate({
                scrollTop: lastPosBeforeSearch
            }, 100);


        }//if going to expand
        else {
            lastPosBeforeSearch = window.scrollY;


            $(this).addClass("expanded")

            $(".category.deals").hide();

            $(".brand-container").hide();

            $(".menu-navigation-container").addClass("hide");
            $(".search-placeholder").addClass("expand");
            $(this).addClass("expanded")


            $("#open-search-icon").addClass("hide");
            $("#close-search-icon").addClass("show");
            //$(".search-results").addClass("show");

            var prev = $(".out-of-stock-items").prev();
            if (prev != undefined) {
                $(prev).children().css("border-bottom", 0);
            }

            $(".out-of-stock-items").hide();
            $(".collapse").hide();

            $("#filtersContainer").show();
            //window.scrollTo({
            //    top: 0,
            //    left: 0,
            //    behavior: 'instant',
            //});

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant',
            });

            $([document.documentElement, document.body]).animate(
            { scrollTop: 0 },
            100);


            $("#searchInput").trigger("focus");


            //$([document.documentElement, document.body]).animate({
            //    scrollTop: 0
            //}, 100);

        }

 
    });

    //$(".filter").on("click", function () {

    //    var type = $(this).attr("filter-type");
    //    if (type == "price-range") {


    //    }

    //});
    function applyPriceFilter(minPrice, maxPrice) {
        $(".category:not(.deals)").show();

        $(allCategories).each(function (index) {

            var categoriesProducts = $(this).find(".product");

            $(categoriesProducts).each(function (index) {

                var activateDiscount = $(this).attr("data-activate-discount").toLowerCase();
                var dataOriginalPrice = $(this).attr("data-original-price");
                var dataFinalPrice = $(this).attr("data-final-price");


                if (activateDiscount === "true") {

                    if (dataFinalPrice != undefined) {

                        dataFinalPrice = parseFloat(dataFinalPrice.slice(0, -1));

                        if (
                            dataFinalPrice >= minPrice && dataFinalPrice <= maxPrice
                        ) {
                            $(categoriesProducts[index]).show();
                        }
                        else {
                            $(categoriesProducts[index]).hide();

                        }
                    }


                }
                else {

                    if (dataOriginalPrice != undefined) {
                        dataOriginalPrice = parseFloat(dataOriginalPrice.slice(0, -1));

                        if (
                            dataOriginalPrice >= minPrice && dataOriginalPrice <= maxPrice
                        ) {
                            var prod = $(categoriesProducts[index]);
                            if ($(prod).is(":hidden")) {
                                $(prod).show();

                            }

                        }
                        else {
                            $(categoriesProducts[index]).hide();


                        }
                    }



                }


            });

            if ($(this).find(".product:not(:hidden)").length == 0) {

                $(this).hide();
            }
            else {
                $(this).show();
            }


        });

        if ($(".category:not(:hidden)").length == 0) {
            $("#no-results").show();
        }
        else {
            $("#no-results").hide();

        }


    }
    function applySearchTerm(searchTerm) {
        searchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');

        var singleTerm = searchTerm.trim();

        if (hasPriceFilter === true) {
            var minPrice = $("#input-min").val();
            var maxPrice = $("#input-max").val();

            $(allCategories).each(function (index) {

                var categoriesProducts = $(this).find(".product");

                $(categoriesProducts).each(function (index) {

                    var dataName = $(this).attr("data-name").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
                    var dataCat = $(this).attr("data-category-name").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
                    var dataDesc = $(this).attr("data-desc").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
                    var tags = $(this).find(".tag");

                    var activateDiscount = $(this).attr("data-activate-discount").toLowerCase();
                    var dataOriginalPrice = $(this).attr("data-original-price");
                    var dataFinalPrice = $(this).attr("data-final-price");



                    if (
                        (dataCat.indexOf(singleTerm) > -1)
                        ||
                        (dataCat.indexOf(singleTerm + "s") > -1)
                        ||
                        (dataCat.indexOf(singleTerm.slice(0, -1)) > -1)
                        ||
                        (dataName.indexOf(singleTerm) > -1)
                        ||
                        (dataName.indexOf(singleTerm + "s") > -1)
                        ||
                        (dataName.indexOf(singleTerm.slice(0, -1)) > -1)
                        ||
                        (dataDesc.indexOf(singleTerm) > -1)
                        || multipleItemsIndex(tags, singleTerm)


                    ) {

                        $(categoriesProducts[index]).show();

                        if (activateDiscount === "true") {

                            if (dataFinalPrice != undefined) {

                                dataFinalPrice = parseFloat(dataFinalPrice.slice(0, -1));

                                if (
                                    dataFinalPrice >= minPrice && dataFinalPrice <= maxPrice
                                ) {
                                }
                                else {
                                    $(categoriesProducts[index]).hide();

                                }
                            }


                        }
                        else {

                            if (dataOriginalPrice != undefined) {
                                dataOriginalPrice = parseFloat(dataOriginalPrice.slice(0, -1));

                                if (
                                    dataOriginalPrice >= minPrice && dataOriginalPrice <= maxPrice
                                ) {


                                }
                                else {
                                    $(categoriesProducts[index]).hide();


                                }
                            }



                        }

                    }
                    else {
                        let searchTermSplit = searchTerm.split(' ');
                        //filter input space
                        searchTermSplit = searchTermSplit.filter((item) => item != '');

                        if (searchTermSplit.length > 1) {

                            $(searchTermSplit).each(function (index) {


                                if (
                                    (dataCat.indexOf(searchTermSplit[index]) > -1)
                                    ||
                                    (dataCat.indexOf(searchTermSplit[index] + "s") > -1)
                                    ||
                                    (dataCat.indexOf(searchTermSplit[index].slice(0, -1)) > -1)
                                    ||
                                    (dataName.indexOf(searchTermSplit[index]) > -1)
                                    ||
                                    (dataName.indexOf(searchTermSplit[index] + "s") > -1)
                                    ||
                                    (dataName.indexOf(searchTermSplit[index].slice(0, -1)) > -1)
                                    ||
                                    (dataDesc.indexOf(searchTermSplit[index]) > -1)


                                ) {
                                    $(categoriesProducts[index]).show();

                                }
                                else {
                                    $(categoriesProducts[index]).hide();

                                }
                            })

                        }
                        else {

                            $(categoriesProducts[index]).hide();

                        }


                    }




                });

                if ($(this).find(".product:not(:hidden)").length == 0) {

                    $(this).hide();
                }
                else {
                    $(this).show();
                }


            });

        }
        else {
            $(allCategories).each(function (index) {

                var categoriesProducts = $(this).find(".product");

                $(categoriesProducts).each(function (index) {

                    var dataName = $(this).attr("data-name").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
                    var dataCat = $(this).attr("data-category-name").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
                    var dataDesc = $(this).attr("data-desc").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
                    var tags = $(this).find(".tag");



                    if (
                        (dataCat.indexOf(singleTerm) > -1)
                        ||
                        (dataCat.indexOf(singleTerm + "s") > -1)
                        ||
                        (dataCat.indexOf(singleTerm.slice(0, -1)) > -1)
                        ||
                        (dataName.indexOf(singleTerm) > -1)
                        ||
                        (dataName.indexOf(singleTerm + "s") > -1)
                        ||
                        (dataName.indexOf(singleTerm.slice(0, -1)) > -1)
                        ||
                        (dataDesc.indexOf(singleTerm) > -1)
                        || multipleItemsIndex(tags, singleTerm)


                    ) {

                        $(categoriesProducts[index]).show();

                    }
                    else {
                        let searchTermSplit = searchTerm.split(' ');
                        //filter input space
                        searchTermSplit = searchTermSplit.filter((item) => item != '');

                        if (searchTermSplit.length > 1) {

                            $(searchTermSplit).each(function (index) {


                                if (
                                    (dataCat.indexOf(searchTermSplit[index]) > -1)
                                    ||
                                    (dataCat.indexOf(searchTermSplit[index] + "s") > -1)
                                    ||
                                    (dataCat.indexOf(searchTermSplit[index].slice(0, -1)) > -1)
                                    ||
                                    (dataName.indexOf(searchTermSplit[index]) > -1)
                                    ||
                                    (dataName.indexOf(searchTermSplit[index] + "s") > -1)
                                    ||
                                    (dataName.indexOf(searchTermSplit[index].slice(0, -1)) > -1)
                                    ||
                                    (dataDesc.indexOf(searchTermSplit[index]) > -1)


                                ) {
                                    $(categoriesProducts[index]).show();

                                }
                                else {
                                    $(categoriesProducts[index]).hide();

                                }
                            })

                        }
                        else {

                            $(categoriesProducts[index]).hide();

                        }


                    }




                });

                if ($(this).find(".product:not(:hidden)").length == 0) {

                    $(this).hide();
                }
                else {
                    $(this).show();
                }


            });

        }



        if ($(".category:not(:hidden)").length == 0) {
            $("#no-results").show();
        }
        else {
            $("#no-results").hide();

        }

    }



    if (biggestPriceVal != undefined) {


        $("#input-min").attr("value",smallestPriceVal);
        $("#input-max").attr("value", biggestPriceVal);

        $("#rangeMin").attr("max", biggestPriceVal);
        $("#rangeMax").attr("max", biggestPriceVal);

        $("#rangeMin").attr("min", smallestPriceVal);
        $("#rangeMax").attr("min", smallestPriceVal);

        $("#rangeMin").val(smallestPriceVal)
        $("#rangeMax").val(biggestPriceVal)

        const rangeInput = document.querySelectorAll(".range-input input"),
            priceInput = document.querySelectorAll(".price-input input"),
            range = document.querySelector(".slider .progress");
        let priceGap = 1;

        priceInput.forEach((input) => {
            input.addEventListener("input", (e) => {
                let minPrice = parseInt(priceInput[0].value),
                    maxPrice = parseInt(priceInput[1].value);


                if (maxPrice > biggestPriceVal) {
                    maxPrice = biggestPriceVal;
                    $("#input-max").val(maxPrice);

                }

                if (maxPrice < smallestPriceVal) {
                    maxPrice = smallestPriceVal + priceGap;
                    $("#input-max").val(maxPrice);

                }


                if (minPrice < smallestPriceVal) {
                    minPrice = smallestPriceVal;
                    $("#input-min").val(minPrice);

                }

                if (minPrice > biggestPriceVal) {
                    minPrice = biggestPriceVal - priceGap;
                    $("#input-min").val(minPrice);
                }



                if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                    if (e.target.className === "input-min") {
                        rangeInput[0].value = minPrice;
                        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";


                    } else {


                        rangeInput[1].value = maxPrice;
                        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                    }
                }
            });
        });

        rangeInput.forEach((input) => {
            input.addEventListener("input", (e) => {
                let minVal = parseInt(rangeInput[0].value),
                    maxVal = parseInt(rangeInput[1].value);



                if (maxVal - minVal < priceGap) {
                    if (e.target.className === "range-min") {
                        rangeInput[0].value = maxVal - priceGap;
                    } else {
                        rangeInput[1].value = minVal + priceGap;
                    }
                } else {
                    priceInput[0].value = minVal;
                    priceInput[1].value = maxVal;
                    if (minVal >= 1) {

                        range.style.left = ((minVal-1) / rangeInput[0].max) * 100 + "%";

                    }
                    else {

                        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";

                    }

                    range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";

                }
            });
        });
    }


    $("#acceptPriceFilter").on("click", function () {

        var minPrice = $("#input-min").val();
        var maxPrice = $("#input-max").val();

        applyPriceFilter(minPrice, maxPrice);
       
        hasPriceFilter = true;

        if (globalSearchTerm.trim() != "" && globalSearchTerm != undefined) {

            applySearchTerm(globalSearchTerm);

        }


        $("#priceRangeVal").text(minPrice + " - " + maxPrice)
        $("#priceRangeValContainer").show();
    });

    $("#removePriceFilter").on("click", function () {
        $("#priceRangeVal").text()
        $("#priceRangeValContainer").hide();

        applyPriceFilter(smallestPriceVal, biggestPriceVal);


        hasPriceFilter = false;

        if (globalSearchTerm.trim() != "" && globalSearchTerm != undefined) {

            applySearchTerm(globalSearchTerm);

        }

    });


    $('textarea').on('touchstart', function () {
        $(this).trigger("focus");
    });

    function multipleItemsIndex(items, term) {
        var match = false;

        if (items != undefined && items.length) {
            $(items).each(function (index) {

                var text = $(items[index]).text().normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();

                if (text.indexOf(term) > -1) {
                    match = true;
                }
                else {

                    if ($(items[index]).attr("data-spicy") == "true")
                    {
                        if (("spicy").indexOf(term) > -1 || ("πικαντικο").indexOf(term) > -1)
                        {
                            match = true;

                        }
                    }
                    
                }
            });

        }

        return match;
    }


    $("#searchInput").on("keyup", delay(function (e) {

        $(".category:not(.deals)").show();
        globalSearchTerm = this.value;

        if (globalSearchTerm != undefined) {

            applySearchTerm(globalSearchTerm);

        }


        $([document.documentElement, document.body]).animate({
            scrollTop: 0
        }, 120);

    }, 500));

    //#endregion


    $("#closeDemo").on("click", function () {

        $("#isDemo").hide();

    });


    let justOpened = false;

    $("#sectionTitle").on("click", function () {

        $("#categoriesOverlay").empty();


        var allCategories = $(".category");
        var currentCategoryId = $("#sectionTitle").attr("data-current-cat-id");
        var currentCategoryName = $("#sectionTitle").attr("data-current-cat-name");


        var itemsHtml = "";

        $(allCategories).each(function (index) {

            var thisCatName = $(allCategories[index]).attr("data-section-name");
            var thisCatId = $(allCategories[index]).attr("id");
            var categoryIndex = index + 1;

            if ("#" + thisCatId == currentCategoryId) {
                itemsHtml += '<li class="overlay-category-item selected"  id="#' + thisCatId + '" data-real-cat-index="' + categoryIndex + '"><span>' + thisCatName + '</span></li>';

            }
            else {
                itemsHtml += '<li class="overlay-category-item"  id="#' + thisCatId + '" data-real-cat-index="' + categoryIndex + '"><span>' + thisCatName + '</span></li>';

            }


        });
        justOpened = true;


        $("#itemsCategories").removeClass("hide");
        $("#itemsCategories").addClass("show");
        $("#itemsCategories").show();




        $(".item-info").addClass("item-info-overlayed");

        $("#categoriesOverlay").append(itemsHtml);




    })


    $("#closeCategoriesOverlay").on("click", function () {

        $(".item-info").removeClass("item-info-overlayed");
        $("#itemsCategories").removeClass("show");
        $("#itemsCategories").addClass("hide");

        setTimeout(function () {

            $("#itemsCategories").hide();
        }, 200);
    });

    $("#categoriesOverlay").on("click", 'li', function () {
        var lastCategoryIndex = parseInt($(".overlay-category-item.selected").attr("data-real-cat-index"));


        $(".overlay-category-item.selected").removeClass("selected");
        $(this).addClass("selected");


        var newCategoryIndex = parseInt($(".overlay-category-item.selected").attr("data-real-cat-index"));

        if (enableOrders === "True") {
            newCatSwiper(newCategoryIndex, true);

        }
        else {
            newCatSwiper(newCategoryIndex, false);

        }



        setTimeout(function () {
            $(".item-info").removeClass("item-info-overlayed");

            $("#itemsCategories").removeClass("show");
            $("#itemsCategories").addClass("hide");

            $("#categoriesOverlay").empty();
        }, 300);


        setTimeout(function () {
            $("#itemsCategories").hide();
        }, 500);

        var newCatId = $(".overlay-category-item.selected").attr("id");


        $("#sectionTitle").attr("data-real-cat-index", newCategoryIndex);
        $("#sectionTitle").attr("data-current-cat-id", newCatId);

    });


    //$(".item-info").on("click", function (e) {

    //    if (justOpened == false) {
    //        if ($(this).hasClass("item-info-overlayed")) {


    //            if ($("#itemCategories").hasClass("show"));
    //            {
    //                setTimeout(function () {
    //                    $(".item-info").removeClass("item-info-overlayed");

    //                    $("#itemsCategories").removeClass("show");
    //                    $("#itemsCategories").addClass("hide");

    //                    $("#categoriesOverlay").empty();
    //                }, 300);


    //                setTimeout(function () {
    //                    $("#itemsCategories").hide();
    //                }, 500);
    //            }

    //        }
    //    }
    //    else {
    //        justOpened = false;
    //    }






    //});


    //$("#dropdown-btn").on("click", function (event) {



    //    if ($(this).is(":focus")) {
    //        $(this).trigger("blur");
    //    }
    //    else {
    //        $(this).trigger("focus");

    //    }

    //});
    var cancelNext = false;
 
    var langButton = document.getElementById("dropdown-btn");
    if (langButton != undefined) {
        langButton.addEventListener("click", function (event) {

            $(this).addClass("expand");
            $(".dropdown-content").addClass("expand");


        });

        //langButton.addEventListener("mousedown", function (event) {


        //    if (cancelNext == false) {

        //        if ($(this).hasClass("expand")) {
        //            $(this).removeClass("expand");
        //            $(".dropdown-content").removeClass("expand");
        //        }
        //        else {
        //            $(this).addClass("expand");
        //            $(".dropdown-content").addClass("expand");
        //        }

        //        cancelNext = true;

        //    }
        //    else {
        //        cancelNext = false;

        //    }

        //});
    }

    //$("body").on("click", function (event) {

    //    if ($(".dropdown-content").hasClass("expand")) {
    //        $(".dropdown-content").removeClass("expand");

    //    }

    //});


});








//, "zh-CN", "de-DE", "es-ES", "fr-FR", "hi-IN", "it-IT", "in-ID", "ja-JP", "ko-KR", "nl-NL", "no-NO", "pl-PL", "pt-BR", "sv-SE", "fi-FI", "th-TH", "tr-TR", "uk-UA", "vi-VN", "ru-RU", "he-IL"

    var selectedLanguages = $("#selectedLanguages").val();
//if (selectedLanguages != undefined && selectedLanguages.length) {
/*}*/
var lowerCaseLocales
let locales = selectedLanguages;

    if (locales != undefined) {
        locales = locales.split(",");


        lowerCaseLocales = locales.map(function (v) {
            return v.toLowerCase();
        });
    }

    function getFlagSrc(countryCode) {
        return /^[A-Z]{2}$/.test(countryCode)
            ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
            : "";
    }

    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownContent = document.getElementById("dropdown-content");

    //dropdownBtn.addEventListener("touchend", function () {
    //    $(this).trigger("focus");

    //});


    function intiLocale(locale, hasLang = true) {
        const intlLocale = new Intl.Locale(locale);
        const langName = new Intl.DisplayNames([locale], {
            type: "language",
        }).of(intlLocale.language);

        dropdownContent.innerHTML = "";

        const otherLocales = locales.filter((loc) => loc !== locale);
        otherLocales.forEach((otherLocale) => {
            const otherIntlLocale = new Intl.Locale(otherLocale);
            const otherLangName = new Intl.DisplayNames([otherLocale], {
                type: "language",
            }).of(otherIntlLocale.language);

            const listEl = document.createElement("li");
            listEl.innerHTML = `${otherLangName}<img src="${getFlagSrc(
                otherIntlLocale.region
            )}" />`;
            listEl.value = otherLocale;
            listEl.addEventListener("click", function () {
                setSelectedLocale(otherLocale);
            });
            //listEl.addEventListener("mouseout", function () {
            //    setSelectedLocale(otherLocale);
            //});
            dropdownContent.appendChild(listEl);
        });

        dropdownBtn.innerHTML = `<img src="${getFlagSrc(
            intlLocale.region
        )}" />${langName}<span class="arrow-down"></span>`;

        var fullUrl = window.location.href;

        if (hasLang == true) {



        }
        else {

            if (fullUrl.slice(-1) == "/") {

                fullUrl = fullUrl.slice(0, -1);
            }

            fullUrl = fullUrl + "/" + intlLocale.baseName.toLowerCase();

            window.location.replace(String(fullUrl));

        }


    }

    function setSelectedLocale(locale, hasLang = true) {
        const intlLocale = new Intl.Locale(locale);
        const langName = new Intl.DisplayNames([locale], {
            type: "language",
        }).of(intlLocale.language);

        dropdownContent.innerHTML = "";

        const otherLocales = locales.filter((loc) => loc !== locale);
        otherLocales.forEach((otherLocale) => {
            const otherIntlLocale = new Intl.Locale(otherLocale);
            const otherLangName = new Intl.DisplayNames([otherLocale], {
                type: "language",
            }).of(otherIntlLocale.language);

            const listEl = document.createElement("li");
            listEl.innerHTML = `${otherLangName}<img src="${getFlagSrc(
                otherIntlLocale.region
            )}" />`;
            listEl.value = otherLocale;
            listEl.addEventListener("click", function () {
                setSelectedLocale(otherLocale);
            });

            //listEl.addEventListener("mouseout", function () {
            //    setSelectedLocale(otherLocale);
            //});
            dropdownContent.appendChild(listEl);
        });

        dropdownBtn.innerHTML = `<img src="${getFlagSrc(
            intlLocale.region
        )}" />${langName}<span class="arrow-down"></span>`;

        var fullUrl = window.location.href;

        if (fullUrl.slice(-1) == "/") {

            fullUrl = fullUrl.slice(0, -1);
        }

        fullUrl = fullUrl.slice(0, fullUrl.lastIndexOf("/"));
        fullUrl = fullUrl + "/" + intlLocale.baseName;


        window.location.replace(fullUrl.toLowerCase());



    }

    var lastword = window.location.href.slice(window.location.href.lastIndexOf("/")).replace("/", "");
    if (lastword == "") {
        lastword = window.location.href.slice(0, -1);
        lastword = lastword.slice(lastword.lastIndexOf("/")).replace("/", "");
    }

    function prepareLang(hasLang = false) {

        if (hasLang == false) {
            intiLocale(locales[0], false);
        }
        else {
            const currentUrl = window.location.href;

            var lastPart = currentUrl.split("/").pop();
            if (lastPart == "") {
                lastPart = currentUrl.slice(0, -1).split("/").pop();
            }
            const lower = locales.map(element => {
                return element.toLowerCase();
            });


            localeIndex = lower.indexOf(lastPart);

            intiLocale(lowerCaseLocales[localeIndex], true);
        }



    }


    if (locales != undefined) {
        if (lowerCaseLocales.indexOf(lastword) == -1) {

            prepareLang(false);

        }
        else {

            prepareLang(true);

        }
    }
  


$("#dropdown-btn").on("focusout", function () {

    setTimeout(function () {
        $(".dropdown-content").removeClass("expand");
    }, 50);

})

$("#dropdown-btn").on("blur", function () {

    setTimeout(function () {
        $(this).removeClass("expand");
        $(".dropdown-content").removeClass("expand");
    }, 55);

})


$(".cover-image").on("click", function(){

    setTimeout(function () {
        $(".dropdown-content").removeClass("expand");
    }, 60);
})

$(".brand-info-container").on("click", function () {
    setTimeout(function () {
        $(".dropdown-content").removeClass("expand");
    }, 60);
})

$(".content-container").on("click", function () {
    setTimeout(function () {
        $(".dropdown-content").removeClass("expand");
    }, 60);
})

$(".brand-image-container").on("click", function () {
    setTimeout(function () {
        $(".dropdown-content").removeClass("expand");
    }, 80);
})