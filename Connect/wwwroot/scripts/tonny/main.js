$(document).ready(function () {


    var partners = $(".partner");
    if (partners != undefined && partners.length > 0) {

        $(partners).each(function (index) {

            var urlEle = $(this).find(".partner__url");
            if (urlEle != undefined && urlEle != "") {
                url = $(urlEle).val();
                var host = "https://" + document.location.hostname;
                var fullUrl = host + url;

                jQuery.ajax({
                    url: "/umbraco/surface/QRCodeGenerator/GetQRCode",
                    method: "GET",

                    data: {
                        url: fullUrl
                    },

                    success: function (data) {

                        var svg = data.result;
                        if (svg != "" && svg != undefined) {

                            $(partners[index]).prepend('<a href="' + fullUrl + '" target="_blank">' + svg + '</a>');
                        }

                    },
                    error: function () {


                    }
                });
            }

        });
    }

    $("#logoIntro").fadeTo(1500, 1, function () {
        $("#logoIntro").fadeTo(750, 0, function () {

            $("#logoIntro").text("DIGITAL MENU SOLUTIONS");
            $("#logoIntro").fadeTo(1500, 1, function () {

                $("#logoIntro").fadeTo(450, 0, function () {


                    $(".small").show();
                    $(".small").fadeTo(100, 1, function () {

                        setTimeout(function () {
                            $(".small").addClass("big");
                            $(".logo").fadeTo(100, 1);

                        }, 50);

                        setTimeout(function () {

                            $(".big").removeClass("small");
                            $(".intro").hide();
                            $("body").addClass("block");

                            $(".main__content").fadeTo(100, 1, function () {

                                $("#footer").show();
                                //    $(".grecaptcha-badge").fadeTo(100, 1);

                                var countDownDate = new Date("May 31, 2024 00:00").getTime();

                                // Get today's date and time
                                var now = new Date().getTime();

                                // Find the distance between now and the count down date
                                var distance = countDownDate - now;

                                // Time calculations for days, hours, minutes and seconds
                                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                                // Display the result in the element with id="demo"
                                document.getElementById("countdown").innerHTML = days + " ΜΕΡΕΣ ΔΩΡΕΑΝ ΔΟΚΙΜΗ";

                                // If the count down is finished, write some text
                                if (distance < 0) {
                                    clearInterval(x);
                                    document.getElementById("countdown").innerHTML = "-";
                                }

                                // Update the count down every 1 second
                                //var x = setInterval(function () {


                                //}, 1000);
                            });

                        }, 700);



                    });

                });
            });
        });
    });

    var privacyTerms = $(".privacy__terms");

    if (privacyTerms.length) {
        $("body").addClass("loaded");

        $("#footer").show();

    }
   


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




    const checkbox = document.querySelector('.my-form input[type="checkbox"]');
    const btns = document.querySelectorAll(".my-form button");

    checkbox.addEventListener("change", function () {
        const checked = this.checked;
        for (const btn of btns) {
            checked ? (btn.disabled = false) : (btn.disabled = true);
        }
    });

    $(".nav__link").on("click", function (event) {
        event.preventDefault();

        var href = $(this).attr("href").slice(1);
        let link = document.getElementById(href);

        if ($(this).hasClass("contact__trigger")) {
            $("#subject").val("Θέλω να μάθω περισσότερα");
        }

        if ($(".nav-links").hasClass("open")) {
            navLinks.classList.toggle("open");
            links.forEach(link => {
                link.classList.toggle("fade");
            });

            //Hamburger Animation
            hamburger.classList.toggle("toggle");
        }

        $([document.documentElement, document.body]).animate({
            scrollTop: (link.offsetTop - 110)
        }, 120);
    });

    
});


