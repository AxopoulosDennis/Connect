
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





    //#region Single Product Info

    var products = $(".product");
    var close = $("#close-item");
    var lastPosBeforeItemOpen = window.scrollY;

    let slider;
    let thumbs;

    $(products).on("click", function (event) {

        $("#main-gallery-swiper").empty();
        $("#thumbs-gallery-swiper").empty();

        if (slider != undefined) {
            slider.destroy(true);

        }
        if (thumbs != undefined) {
            thumbs.destroy(true);

        }

        $("body").addClass("no-scroll");
        $(".main-content-page").addClass("blur");

        lastPosBeforeItemOpen = window.scrollY;

                var categoryIndex = $(this).attr("data-category");
                var category = $("#" + categoryIndex);
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


                    mainProducts +=
                        '                <div class="swiper-slide">' +
                        '                    <div class="text-photo-container">' +
                        '                        <div class="product-info">' +
                        '                            <div class="product-text">' +
                        '                                <h3 class="product-name">'+name+'</h3>' +
                        '                                <p class="product-desc">'+desc+'</p>' +
                        '                            </div>' +
                        '                            <div class="product-price">' +
                        '                                <p class="final-price has-discount">' +
                        '                                    <span class="original-price"></span>' +
                        '                                </p>' +
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="product-photo-container">' +
                        //'                           <img src="'+image+'" class="product-photo>'  +
                        '                        </div>' +
                        '                    </div>' +
                        '                </div>';

                    thumbsProducts +=
                        '                <div class="swiper-slide">' +
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

        slider = new Swiper('.gallery-slider', {
            slidesPerView: 1,
            centeredSlides: true,
            loop: false,
            //loopedSlides: 6, 
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        thumbs = new Swiper('.gallery-thumbs', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true,
            loop: false,
            slideToClickedSlide: true,
        });

        //slider.params.control = thumbs;
        //thumbs.params.control = slider;

        slider.controller.control = thumbs;
        thumbs.controller.control = slider;

        //#endregion
                //var currentIndex = $(this).attr("data-product-index");



                $(".item-info").addClass("display");

    });

    var close = $("#close-item");
    $(close).on("click", function () {


        $(".main-content-page").removeClass("hide");
        $(".item-info").removeClass("display");

        window.scrollTo({
            top: lastPosBeforeItemOpen,
            left: 0,
            behavior: 'instant',
        });

        $("body").removeClass("no-scroll");
        $(".main-content-page").removeClass("blur");
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
                },
                pagination: {
                    el: ".swiper-pagination",
                },
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

    function delay(fn, ms) {
        let timer = 0
        return function (...args) {
            clearTimeout(timer)
            timer = setTimeout(fn.bind(this, ...args), ms || 0)
        }
    }


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


    var allCategories = $(".category");


    $("#searchInput").on("keyup", delay(function (e) {

        $(".category").show();

        var searchTerm = this.value;

        if (searchTerm.trim() != "" && searchTerm != undefined)

        //uppercase gia tonous
        searchTerm = searchTerm.toUpperCase();

        var singleTerm = searchTerm.trim();
        $(allCategories).each(function (index) {

            var categoriesProducts = $(this).find(".product");

            $(categoriesProducts).each(function (index) {

                var dataName = $(this).attr("data-name");
                var dataCat = $(this).attr("data-category-name");
                var dataDesc = $(this).attr("data-desc");

                if (
                    (dataCat.toUpperCase().indexOf(singleTerm) > -1)
                    ||
                    (dataCat.toUpperCase().indexOf(singleTerm + "s") > -1)
                    ||
                    (dataCat.toUpperCase().indexOf(singleTerm.slice(0, -1)) > -1)
                    ||
                    (dataName.toUpperCase().indexOf(singleTerm) > -1)
                    ||
                    (dataName.toUpperCase().indexOf(singleTerm + "s") > -1)
                    ||
                    (dataName.toUpperCase().indexOf(singleTerm.slice(0, -1)) > -1)
                    ||
                    (dataDesc.toUpperCase().indexOf(singleTerm) > -1)


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
                                (dataCat.toUpperCase().indexOf(searchTermSplit[index]) > -1)
                                ||
                                (dataCat.toUpperCase().indexOf(searchTermSplit[index] + "s") > -1)
                                ||
                                (dataCat.toUpperCase().indexOf(searchTermSplit[index].slice(0, -1)) > -1)
                                ||
                                (dataName.toUpperCase().indexOf(searchTermSplit[index]) > -1)
                                ||
                                (dataName.toUpperCase().indexOf(searchTermSplit[index] + "s") > -1)
                                ||
                                (dataName.toUpperCase().indexOf(searchTermSplit[index].slice(0, -1)) > -1)
                                ||
                                (dataDesc.toUpperCase().indexOf(searchTermSplit[index]) > -1)
                                 

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










