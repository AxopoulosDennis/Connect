$(document).ready(function () {

    $("#logoIntro").fadeTo(1500, 1, function () {
        $("#logoIntro").fadeTo(750, 0, function () {

            $("#logoIntro").text("DIGITAL MENU SOLUTIONS");
            $("#logoIntro").fadeTo(1500, 1, function () {

                $("#logoIntro").fadeTo(750, 0, function () {

                    $(".small").show();
                    $(".small").fadeTo(100, 1, function () {

                        setTimeout(function () {
                            $(".small").addClass("big");

                        }, 50);

                    });

                });
            });
        });
    });

});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', () => {
    //Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});

