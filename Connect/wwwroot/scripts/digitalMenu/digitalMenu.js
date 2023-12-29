const navLinkEls = document.querySelectorAll('.nav-link');
const groupEls = document.querySelectorAll('.category');
const navigation = document.getElementById('menuNav');
let currentGroup = "home";
const navInitPosition = navigation.offsetTop -10;

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

        if (window.scrollY >= navInitPosition + 10) {

            navigation.classList.add("sticky");
        }
        else if (window.scrollY <= navInitPosition) {
            navigation.classList.remove("sticky");

        }

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


    ///BUTTON EFFECT
    $('.button--bubble').each(function () {
        var $circlesTopLeft = $(this).parent().find('.circle.top-left');
        var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');

        var tl = new TimelineLite();
        var tl2 = new TimelineLite();

        var btTl = new TimelineLite({ paused: true });

        tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
        tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
        tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
        tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
        tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
        tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
        tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

        var tlBt1 = new TimelineLite();
        var tlBt2 = new TimelineLite();

        tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
        tlBt1.add(tl);

        tl2.set($circlesBottomRight, { x: 0, y: 0 });
        tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
        tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
        tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
        tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
        tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
        tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
        tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');

        tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
        tlBt2.add(tl2);

        btTl.add(tlBt1);
        btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
        btTl.add(tlBt2, 0.2);
        btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

        btTl.timeScale(2.6);

        $(this).on('mouseover', function () {
            btTl.restart();
        });

        $(this).on('click', function () {
            btTl.restart();
        });
    });
});


