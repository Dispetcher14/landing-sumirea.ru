$(document).ready(function () {
    $(".scroll").on("click", function (e) {
        //prevent default scrolling
        e.preventDefault();

        //get target element
        var target = $(this).attr('href');

        //scroll to it
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 700);
    });
});