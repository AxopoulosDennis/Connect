const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");




$(document).ready(function () {

    $('.nav__link').click(function () {
        loadView($(this));
    });


    $(".back__container").on("click", function () {
        var iframe = $("#tonnyFrame", parent.document)
        $(iframe).attr('src', $(iframe).attr('src'));});


    $(".tab-panels").on("click", function (e) {
        var target = $(e.target);

        var storeId = $("#storeId").val();


        if (target.is("button#syncNow.sync__now")) {
            Swal.fire({
                title: "Are you sure?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    jQuery.ajax({
                        url: "/umbraco/backoffice/BackOffice/Stores/SyncProducts",
                        method: "POST",
                        data: {
                            storeId: storeId
                        },

                        success: function (data) {

                            Swal.fire("Ok!", "", "success");

                        },
                        error: function () {

                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                            });

                        }
                    });


                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }
    });
});

function addTable() {
    var storeId = $("#storeId").val();
    if (storeId != undefined) {
        var totalTables = $("#tablesQuantity").val();
        if (totalTables == undefined || totalTables == "") {
            $("#quantityError").show();
        }
        else {
            jQuery.ajax({
                url: "/umbraco/backoffice/BackOffice/Stores/AddTables",
                method: "POST",
                data: {
                    totalTables: totalTables,
                    storeId: storeId
                },

                success: function (data) {

                    $('#currentView').load('/umbraco/backoffice/BackOffice/Stores/GetTablesData?StoreId=' + storeId + '');

                },
                error: function () {


                }
            });



        }
    }
}

function loadView(item) {
    var storeId = $("#storeId").val();

    if (storeId != undefined) {
        var dataLink = $(item).attr("data-link");

        if (dataLink == "Tables") {
            $('#currentView').load('/umbraco/backoffice/BackOffice/Stores/GetTablesData?StoreId=' + storeId + '');

        }
        else if (dataLink == "SyncProducts") {
            $('#currentView').load('/umbraco/backoffice/BackOffice/Stores/GetSyncProducts?StoreId=' + storeId + '');

        }

    }
}

