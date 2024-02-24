
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

        $(".inner-body").show();
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
                    if (dataLink.includes(currentGroup)) {
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
     



        }, 10));


    });

    //#region TABS
    function buildSwiperButtons(ele, index) {

        return new Swiper('.tab-buttons-' + index, {
            slidesPerView: "auto",
            spaceBetween: 10,
            freeMode: false,
            grabCursor: true,
        });
    }
    function buildSwiperContent(ele, index) {

        return new Swiper('.tab-content-' + index, {
            slidesPerView: "auto",
            spaceBetween: 10,
            freeMode: false,
            grabCursor: true,
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

  

    $(products).on("click", function (event) {
        lastPosBeforeItemOpen = window.scrollY;

        
        $("body").addClass("no-scroll");
        $(".main-content-page").addClass("blur");


        let scrollElement = document.getElementById("mainPage");

        scrollElement.addEventListener('touchstart', onTouchStart)

        $("#main-gallery-swiper").empty();
        $("#thumbs-gallery-swiper").empty();






        if (slider != undefined) {
            slider.destroy(true);

        }
        if (thumbs != undefined) {
            thumbs.destroy(true);

        }



            var categoryIndex = parseInt($(this).attr("data-real-cat-index"));
            var category = $("#category_" + categoryIndex);
            var catName = $(category).attr("data-section-name");
            var categoryItems = $(category).find(".product");

            $("#sectionTitle").text(catName);

            let mainProducts = "";
            let thumbsProducts = "";

            $(categoryItems).each(function (index) {
                var name = $(categoryItems[index]).attr("data-name");
                var desc = $(categoryItems[index]).attr("data-desc");
                var originalPrice = $(categoryItems[index]).attr("data-original-price");
                var finalPrice = $(categoryItems[index]).attr("data-final-price");
                var image = $(categoryItems[index]).attr("data-photo");
                var hasDiscount = $(categoryItems[index]).attr("data-activate-discount");
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
                '                    <div class="text-photo-container ' + dealsClass +'">' +
                '                        <div class="product-info ' + className +'">' +
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
                    mainProducts +=
                        '                                <p class="final-price">' +
                    '                                       <span class="original-price">' + originalPrice  +'</span>' +
                        '                                </p>';
                }

                if (image != "" && image != undefined)
                {
                    mainProducts +=
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="product-photo-container">' +
                        '                           <img src="' + image + '" class="product-photo">' +
                        '                        </div>' +
                        '                    </div>' +
                        '                </div>';
                }
                else
                {
                    mainProducts +=
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="product-photo-container">' +
                        '                           <div src="" class="product-photo"></div>' +
                        '                        </div>' +
                        '                    </div>' +
                        '                </div>';
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

        
            var nextCat = document.getElementById("category_" + (categoryIndex + 1))
            var prevCat = document.getElementById("category_" + (categoryIndex + -1))

            //if is last swiper
            if (nextCat != null) {
                if (slider.isEnd) {

                    var swiped = s.touches.diff;

                    if (swiped != undefined) {
                        if (swiped < 0) {


                            //$(".gallery").addClass("hide");
                            //$(".loader-container").removeClass("hide");


                            //setTimeout(nextCatSwiper, 400, categoryIndex, true);

                            nextCatSwiper(categoryIndex, true);
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

    });
    function delay(fn, ms) {
        let timer = 0
        return function (...args) {
            clearTimeout(timer)
            timer = setTimeout(fn.bind(this, ...args), ms || 0)
        }
    }
    function nextCatSwiper(lastCategoryIndex, next) {

        $(".gallery").removeClass("hide");
        $(".loader-container").addClass("hide");

        var categoryIndex = lastCategoryIndex;

        if (next == true) {

            categoryIndex = categoryIndex + 1;
        }
        else {
            categoryIndex = categoryIndex -1;

        }

        var category = $("#category_" + categoryIndex);
        var catExists = document.getElementById("category_" + categoryIndex);

        if (catExists != null && catExists != undefined) {
            if (category != undefined) {



                $("#main-gallery-swiper").empty();
                $("#thumbs-gallery-swiper").empty();

                if (slider != undefined) {
                    slider.destroy(true);

                }
                if (thumbs != undefined) {
                    thumbs.destroy(true);

                }



                var catName = $(category).attr("data-section-name");
                var categoryItems = $(category).find(".product");

                $("#sectionTitle").text(catName);

                let mainProducts = "";
                let thumbsProducts = "";

                $(categoryItems).each(function (index) {
                    var name = $(categoryItems[index]).attr("data-name");
                    var desc = $(categoryItems[index]).attr("data-desc");
                    var originalPrice = $(categoryItems[index]).attr("data-original-price");
                    var finalPrice = $(categoryItems[index]).attr("data-final-price");
                    var image = $(categoryItems[index]).attr("data-photo");
                    var hasDiscount = $(categoryItems[index]).attr("data-activate-discount");

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
                        mainProducts +=
                            '                                <p class="final-price">' +
                            '                                       <span class="original-price">' + originalPrice + '</span>' +
                            '                                </p>';
                    }

                    if (image != "" && image != undefined) {
                        mainProducts +=
                            '                            </div>' +
                            '                        </div>' +
                            '                        <div class="product-photo-container">' +
                            '                           <img src="' + image + '" class="product-photo">' +
                            '                        </div>' +
                            '                    </div>' +
                            '                </div>';
                    }
                    else {
                        mainProducts +=
                            '                            </div>' +
                            '                        </div>' +
                            '                        <div class="product-photo-container">' +
                            '                           <div src="" class="product-photo"></div>' +
                            '                        </div>' +
                            '                    </div>' +
                            '                </div>';
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
            //pagination: {
            //    el: "swiper-pagination-" + index,
            //    dynamicBullets: true,
            //},
            direction: 'horizontal',

        });
    }

    $(outOfStock).each(function (index) {
        $(this).addClass('out-swiper-' + index);

        //var next = $(this).find(".swiper-button-next");
        //var prev = $(this).find(".swiper-button-prev");

        //$(next).addClass("next" + index);
        //$(prev).addClass("prev" + index);
        //$(pagination).addClass("swiper-pagination-" + index)

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
    $("#brand-info-trigger").on("click", function (event) {

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

        $(".main-content-page").removeClass("hide");
        $("#brand-info-content").removeClass("display");

        eventsSwiper.destroy(true, true);
    });



    //#region Search




    let lastPosBeforeSearch = window.scrollY;
    $("#search-trigger").on("click", function () {

        if ($(this).hasClass("expanded")) {

            //$(".search-results").removeClass("show");
            $(".brand-container").show();

            $(".out-of-stock-items").show();
            $(".category").show();
            $(".product").show();

            $(".search-placeholder").removeClass("expand");
            $(".menu-navigation-container").removeClass("hide");
            $(this).removeClass("expanded");

            $("#close-search-icon").removeClass("show");
            $("#open-search-icon").removeClass("hide");

            $("#searchInput").val("");

            window.scrollTo({
                top: lastPosBeforeSearch,
                left: 0,
                behavior: 'instant',
            });


        }//if going to expand
        else {

            lastPosBeforeSearch = window.scrollY;

            $(".category.deals").hide();

            $(".brand-container").hide();

            $(".menu-navigation-container").addClass("hide");
            $(".search-placeholder").addClass("expand");
            $(this).addClass("expanded")


            $("#open-search-icon").addClass("hide");
            $("#close-search-icon").addClass("show");
            //$(".search-results").addClass("show");

            $("#searchInput").trigger("focus");

            $(".out-of-stock-items").hide();


            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant',
            });

            //$([document.documentElement, document.body]).animate({
            //    scrollTop: 0
            //}, 100);

        }

 
    });


    var allCategories = $(".category:not(.deals)");


    $("#searchInput").on("keyup", delay(function (e) {

        $(".category:not(.deals)").show();

        var searchTerm = this.value;

        if (searchTerm.trim() != "" && searchTerm != undefined)

        searchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');

        var singleTerm = searchTerm.trim();
        $(allCategories).each(function (index) {

            var categoriesProducts = $(this).find(".product");

            $(categoriesProducts).each(function (index) {

                var dataName = $(this).attr("data-name").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
                var dataCat = $(this).attr("data-category-name").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
                var dataDesc = $(this).attr("data-desc").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();

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

            if ($(this).find(".product:visible").length == 0) {

                $(this).hide();
            }
            else {
                $(this).show();
            }
            

        });

        if ($(".category:visible").length == 0) {
            $("#no-results").show();
        }
        else {
            $("#no-results").hide();

        }



    }, 500));

    //#endregion
});










