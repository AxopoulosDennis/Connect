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

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 2,
        freeMode: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        //scrollbar: {
        //    el: ".swiper-scrollbar",
        //},

    });


    //Click Scroll To Section
    navLinkEls.forEach(navLinkEl => {
        $(navLinkEl).click(function (event) {
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

        //if (window.scrollY >= navInitPosition + 10) {

        //    bottomSearch.classList.add("display");
        //}
        //else if (window.scrollY <= navInitPosition ) {
        //    bottomSearch.classList.remove("display");

        //}

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

    $(searchInput).on("focus", () => {
        openSearch();

    });

    $("#closeFullScreen").on("click", () => {
        closeSearch();
    });
});

function openSearch() {

    lastPosBeforeSearch = window.scrollY;


    $(".search-page-container ").addClass("display");
    $(".page-content").addClass("stop-scroll");
    $("#closeFullScreen").addClass("display");

}

function closeSearch() {
    $(".search-page-container ").removeClass("display");
    $(".page-content").removeClass("stop-scroll");
    $("#closeFullScreen").removeClass("display");


    window.scrollTo({
        top: lastPosBeforeSearch,
        left: 0,
        behavior: 'instant',
    });

    //$([document.documentElement, document.body]).animate({
    //    scrollTop: (lastPosBeforeSearch)
    //}, 0);

}
