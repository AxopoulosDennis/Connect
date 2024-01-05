const navLinkEls = document.querySelectorAll('.nav-link');
const groupEls = document.querySelectorAll('.category');
const navigation = document.getElementById('menuNav');
let currentGroup = "home";
const navInitPosition = navigation.offsetTop;
const bottomSearch = document.getElementById('bottomSearch');
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

    var swiper2 = new Swiper(".mySwiper2", {
        slidesPerView: "auto",
        spaceBetween: 2,
        freeMode: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var swiper2 = new Swiper(".mySwiper3", {
        slidesPerView: "auto",
        spaceBetween: 2,
        freeMode: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

    });

    //#endregion

    //MENU ITEM CLICK SCROLL TO MENU GROUP
    navLinkEls.forEach(navLinkEl => {

        $(navLinkEl).on("click", (event) => {
            event.preventDefault();

            let group_id = navLinkEl.dataset.link
            group_id = group_id.substring(1)
            var group = document.getElementById(group_id);

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

            if (navLinkEl.dataset.link.includes(currentGroup)) {
                document.querySelector('.active').classList.remove('active');
                navLinkEl.classList.add('active');

                swiper.slideTo(counter);
            }

            counter++;

        });
    });

    //#endregion

        //#region SERACH FUNCTIONS

    //SEARCH TRIGGER DISPLAY HANDLER
    //IF SCROLLING DOWN SHOW ELSE HIDE
    if (window.scrollY > previousScrollY) {

        bottomSearch.classList.add("display");
        previousScrollY = window.scrollY;
    }
    else if (window.scrollY < previousScrollY) {

        if (isElementInViewport(whiteSpaceLove) == false) {
            bottomSearch.classList.remove("display");
        }

        previousScrollY = window.scrollY;

    }
    $(searchInput).on("focus", () => {
        openSearch();

    });
    $("#closeFullScreen").on("click", () => {
        closeSearch();
    });

    $('.nav-filter').click(function (event) {

        if ($(this).find(".nav-item").hasClass('selected')) {

            $(this).find(".nav-item").removeClass('selected');
        }
        else {
            $(this).find(".nav-item").addClass('selected');

        }

        if ($(".cat-item.selected").length || $(".nav-item.selected").length) {
            $(".clear-filters-container").addClass("active");
        }
        else {
            $(".clear-filters-container").removeClass("active");

        }
    });

    $('.select-cat').click(function (event) {

        if ($(this).find(".cat-item").hasClass('selected')) {

            $(this).find(".cat-item").removeClass('selected');
        }
        else {

            var allCatItems = $(".select-cat").find(".cat-item");
            $(this).find(".cat-item").addClass('selected');

            allFoodFiltersArray = [];

            allCatItems.forEach((currentElement) => {
                var foodFilters = $(catItem).attr("data-foodFilters");
                if (foodFilters) {
                    var foodFiltersArray = foodFilters.split(",");
                    foodFiltersArray.forEach((ele) => {
                        if (allFoodFiltersArray.indexOf(ele) == -1) {
                            allFoodFiltersArray.Add(ele);
                        }

                    }) 

                }

            })



            alert(foodFiltersArray);     

        }

        if ($(".cat-item.selected").length || $(".nav-item.selected").length) {
            $(".clear-filters-container").addClass("active");
        }
        else {
            $(".clear-filters-container").removeClass("active");

        }
    });

    $(".clear-filters-container").click(function () {

        $(".cat-item.selected").removeClass("selected");
        $(".nav-item.selected").removeClass("selected");
        $(".clear-filters-container").removeClass("active");

    });

    $(".show-results-container").click(function () {
        $(".search-results-inner-container").addClass("display");

    });

    $(".sort-icon").click(function () {
        if ($(this).hasClass('inverse')) {

            $(this).removeClass('inverse');
        }
        else {
            $(this).addClass('inverse');

        }

    });

    $("#selectAll").click(function () {

        if ($(this).attr("data-selected") == "false") {
            $("#selectAll").attr("data-selected", "true");
            $(".cat-item").addClass('selected');
            $("#selectAll").text("Unselect All")
        }
        else {
            $("#selectAll").attr("data-selected", "false");
            $(".cat-item").removeClass('selected');
            $("#selectAll").text("Select All")

        }

    });

    //#endregion
});

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




    //$([document.documentElement, document.body]).animate({
    //    scrollTop: (lastPosBeforeSearch)
    //}, 0);

}
