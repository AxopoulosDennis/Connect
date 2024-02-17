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

                            });

                        }, 700);



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

        $([document.documentElement, document.body]).animate({
            scrollTop: (link.offsetTop - 110)
        }, 120);
    });
});


