
const navLinkEls = document.querySelectorAll('.nav-link');
const groupEls = document.querySelectorAll('.category');
const navigation = document.getElementById('menuNav');
let currentGroup = "home";
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

    var subGroups = $(".sub-slide");
    //MENU ITEM CLICK SCROLL TO MENU GROUP
    navLinkEls.forEach(navLinkEl => {

        $(navLinkEl).on("click", (event) => {
            event.preventDefault();

            let group_id = navLinkEl.dataset.link
            group_id = group_id.substring(1)
            var group = document.getElementById(group_id);

            let subGroup = findByData(subGroups, group_id);
            $(subGroups).removeClass("slide-active");
            $(subGroup).addClass("slide-active");

            $([document.documentElement, document.body]).animate({
                scrollTop: (group.offsetTop - 80)
            }, 120);
        });
    });

    window.addEventListener('scroll', () => {

        //#region NAVIGATION FUNCTIONS

        //ON SCROLL CHANGE SELECTED NAVIGATION ITEM BASED ON CURRENT POSITION
        groupEls.forEach(groupEl => {
            if (window.scrollY >= (groupEl.offsetTop - 150)) {
                currentGroup = groupEl.id;
            }
        });

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

        //#endregion

        //#region SEARCH FUNCTIONS
        if (window.scrollY > previousScrollY) {

            bottomContainer.classList.add("display");
            previousScrollY = window.scrollY;
        }
        else if (window.scrollY < previousScrollY) {

            if (isElementInViewport(whiteSpaceLove) == false) {
                bottomContainer.classList.remove("display");
            }

            previousScrollY = window.scrollY;
        }

        //#endregion

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


});




















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


