$(document).ready(function () {
    //add scrolling on click on elements with .scroll class
    $(".scroll").on("click", function (e) {
        //prevent default scrolling
        e.preventDefault();

        //get target element
        var target = $(this).attr('href');

        scrollToId(target);
    });
});

/**
 * Scrolls to element by it's id
 * @param target string - id of element with sharp #
 */
function scrollToId(target) {
    //scroll to it
    $('html, body').animate({
        scrollTop: $(target).offset().top,
    }, 700, function () {
        //change url hash
        window.location.hash = target;
    });
}

//disable video at breakpoint
$(function() {

// onload
if(document.body.clientWidth >= 870) {
    $('.video-overlay').attr('display', none);
}

});