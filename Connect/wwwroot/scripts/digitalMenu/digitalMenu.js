
const navigation = document.getElementById('menuNav');
const navInitPosition = navigation.offsetTop;
const bottomContainer = document.getElementById('bottomContainer');
var whiteSpaceLove = document.getElementById('whiteSpaceLove');

const searchInput = document.getElementById('searchInput');

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

            bottomContainer.classList.add("display");

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
                if (window.scrollY > previousScrollY) {

                    bottomContainer.classList.add("display");
                    previousScrollY = window.scrollY;
                }
                else if (window.scrollY < previousScrollY) {

                    bottomContainer.classList.remove("display");



                    previousScrollY = window.scrollY;
                }

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




    let main;
    let thumbs;

    //#region Single Product Info

    var products = $(".product");
    var close = $("#close-item");
    var lastPosBeforeItemOpen = window.scrollY;

    //$(products).on("click", function (event) {

    //    lastPosBeforeItemOpen = window.scrollY;

    

    //            var categoryIndex = $(this).attr("data-category");
    //            var category = $("#" + categoryIndex);
    //            var catName = $(category).attr("data-section-name");
    //            var categoryItems = $(category).find(".product");

    //            $("#sectionTitle").text(catName);

    //            mainSplide = $("#main-splide-list");
    //            thumbsSplide = $("#thumbs-splide-list")
                
    //            var mainSplideCode = "";
    //            var thumbsCode = "";

    //            centerClass = "centered";
    //            if (categoryItems.length <= 2) {

    //                $("#thumbs-splide-list").addClass(centerClass);
    //            }
    //            else {
    //                $("#thumbs-splide-list").removeClass(centerClass);

    //            }

    //            var brandImageUrl = $("#brand-image-url").val();

    //            $(categoryItems).each(function (index) {
    //                var name = $(categoryItems[index]).attr("data-name");
    //                var desc = $(categoryItems[index]).attr("data-desc");
    //                var originalPrice = $(categoryItems[index]).attr("data-original-price");
    //                var finalPrice = $(categoryItems[index]).attr("data-final-price");
    //                var image = $(categoryItems[index]).attr("data-photo");


    //                var notAvailableClass = "";
    //                if (image == "" || image == undefined) {
    //                    image = brandImageUrl;
    //                    notAvailableClass = "not-available";
    //                }

 


    //                mainSplideCode +=
    //                '                        <li class="splide__slide">' +
    //                '                            <div class="splide__slide__container">' +
    //                '                                <img class="' + notAvailableClass +'" src="'+image+'" />' +
    //                '                            </div>' +
    //                '                        </li>';

    //                thumbsCode +=
    //                '                        <li class="splide__slide">' +
    //                '                            <div class="splide__slide__container">' +
    //                '                                <img class="' + notAvailableClass + '" src="' + image + '" />' +
    //                '<div class="name-container"><div class="product-name">' + name + '</div></div>' +

    //                '                            </div>' +
    //                '                        </li>';

    //            });

    //            var currentIndex = $(this).attr("data-product-index");

    //            $(mainSplide).append(mainSplideCode);
    //            $(thumbsSplide).append(thumbsCode);

    //            main = new Splide('#main-carousel', {
    //                type: 'fade',
    //                pagination: false,
    //                arrows: true,
    //                rewind: false,
    //                start: currentIndex

    //            });

    //            thumbs = new Splide('#thumbnail-carousel', {
    //                perPage: 2.5,

    //                rewind: false,
    //                pagination: false,
    //                isNavigation: true,
    //                arrows: false,
    //                rewind: true,
    //                gap: 4,
    //                start: currentIndex


    //            });

    //            main.sync(thumbs);
    //            main.mount();
    //            thumbs.mount();



    //            $(".main-content-page").addClass("hide");
    //            $(".item-info").addClass("display");
    //       /* }*/
    //   /* }*/





    //});

    //var close = $("#close-item");
    //$(close).on("click", function () {


    //    $(".main-content-page").removeClass("hide");
    //    $(".item-info").removeClass("display");

    //    window.scrollTo({
    //        top: lastPosBeforeItemOpen,
    //        left: 0,
    //        behavior: 'instant',
    //    });

    //    main.destroy(true);
    //    thumbs.destroy(true);

    //    $(mainSplide).empty();
    //    $(thumbsSplide).empty();
    //});

    //#endregion

    var outOfStockSwipers = new Array();
    var outOfStock = $(".out-of-stock-swiper");
    function buildSwiperOutOfStock(ele, index) {

        return new Swiper(".out-swiper-" + index, {
            scrollbar: {
                el: ".out-swiper-scrollbar-" + index,
                hide: true,
            },


        });
    }

    $(outOfStock).each(function (index) {
        $(this).addClass('out-swiper-' + index);
        var scrollbar = $(this).find(".swiper-scrollbar");
        $(scrollbar).addClass("out-swiper-scrollbar-" + index)

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





    //#region events

    //#endregion
});


//document.addEventListener('DOMContentLoaded', function () {

//    var splideCheck = document.getElementsByClassName("splide");
//    if (splideCheck.length) {
//        console.log('Splide is present');


//        var main = new Splide('#main-carousel', {
//            type: 'fade',
//            pagination: false,
//            arrows: false,
//            rewind:true,
//        });
   


//        var thumbnails = new Splide('#thumbnail-carousel', {
//            perPage: 2.5,
 
//            rewind: false,
//            pagination: false,
//            isNavigation: true,
//            arrows: false,
//            fixedHeight: 60,
//            rewind: true,

//        });

//        main.sync(thumbnails);
//        main.mount();
//        thumbnails.mount();


//    } else {
//        console.log('Splide is NOT present');
//    }


//});








    //#endregion

    //#region SERACH FUNCTIONS

    //SEARCH TRIGGER DISPLAY HANDLER
    //IF SCROLLING DOWN SHOW ELSE HIDE
    //if (window.scrollY > previousScrollY) {

    //    bottomSearch.classList.add("display");
    //    previousScrollY = window.scrollY;
    //}
    //else if (window.scrollY < previousScrollY) {

    //    if (isElementInViewport(whiteSpaceLove) == false) {
    //        bottomSearch.classList.remove("display");
    //    }

    //    previousScrollY = window.scrollY;

    //}
    //$(searchInput).on("focus", () => {
    //    openSearch();

    //});
    //$("#closeFullScreen").on("click", () => {
    //    closeSearch();
    //});

    //$('.nav-filter').on('click', function (event) { 

    //    if ($(this).find(".nav-item").hasClass('selected')) {

    //        $(this).find(".nav-item").removeClass('selected');
    //    }
    //    else {
    //        $(this).find(".nav-item").addClass('selected');

    //    }

    //    if ($(".cat-item.selected").length || $(".nav-item.selected").length) {
    //        $(".clear-filters-container").addClass("active");
    //    }
    //    else {
    //        $(".clear-filters-container").removeClass("active");

    //    }
    //});

    //$('.select-cat').on('click', function (event) { 

    //    if ($(this).find(".cat-item").hasClass('selected')) {

    //        $(this).find(".cat-item").removeClass('selected');
    //    }
    //    else {

    //        var allCatItems = $(".select-cat").find(".cat-item");
    //        $(this).find(".cat-item").addClass('selected');

    //        allFoodFiltersArray = [];

    //        allCatItems.forEach((currentElement) => {
    //            var foodFilters = $(catItem).attr("data-foodFilters");
    //            if (foodFilters) {
    //                var foodFiltersArray = foodFilters.split(",");
    //                foodFiltersArray.forEach((ele) => {
    //                    if (allFoodFiltersArray.indexOf(ele) == -1) {
    //                        allFoodFiltersArray.Add(ele);
    //                    }

    //                }) 

    //            }

    //        })



    //        alert(foodFiltersArray);     

    //    }

    //    if ($(".cat-item.selected").length || $(".nav-item.selected").length) {
    //        $(".clear-filters-container").addClass("active");
    //    }
    //    else {
    //        $(".clear-filters-container").removeClass("active");

    //    }
    //});

    //$(".clear-filters-container").on('click', function (event) { 

    //    $(".cat-item.selected").removeClass("selected");
    //    $(".nav-item.selected").removeClass("selected");
    //    $(".clear-filters-container").removeClass("active");

    //});

    //$(".show-results-container").on('click', function (event) { 
    //    $(".search-results-inner-container").addClass("display");

    //});

    //$(".sort-icon").on('click', function (event) { 
    //    if ($(this).hasClass('inverse')) {

    //        $(this).removeClass('inverse');
    //    }
    //    else {
    //        $(this).addClass('inverse');

    //    }

    //});

    //$("#selectAll").on('click', function (event) { 

    //    if ($(this).attr("data-selected") == "false") {
    //        $("#selectAll").attr("data-selected", "true");
    //        $(".cat-item").addClass('selected');
    //        $("#selectAll").text("Unselect All")
    //    }
    //    else {
    //        $("#selectAll").attr("data-selected", "false");
    //        $(".cat-item").removeClass('selected');
    //        $("#selectAll").text("Select All")

    //    }

    //});

    //#endregion

function openSearch() {

    lastPosBeforeSearch = window.scrollY;

    $(".search-page-container ").addClass("display");
    $(".page-content").addClass("stop-scroll");
    $("#closeFullScreen").addClass("display");
    $(".menu-navigation-bg-abs").addClass("display");

}

function closeSearch() {

    $(".page-content").removeClass("stop-scroll");

    window.scrollTo({
        top: lastPosBeforeSearch,
        left: 0,
        behavior: 'instant',
    });

    $(".search-page-container ").removeClass("display");
    $("#closeFullScreen").removeClass("display");
    $(".menu-navigation-bg-abs").removeClass("display");

}


