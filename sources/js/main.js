$(document).ready(function () {
    var anchors = [],
        newAnchor,
        direction,
        allowWheel = true,
        currentAnchor = 0;

    //parse scrollable anchors
    $("section").each(function (i, el) {
        anchors.push(el.id);
    });

    newAnchor = parseUrlAnchor(anchors);
    if (newAnchor !== false) {
        currentAnchor = newAnchor;
    }

    //block default user scroll by mouse wheel
    document.body.addEventListener("wheel", function (e) {
        e = e || window.event;

        //prevent default scroll
        e.preventDefault();

        if (allowWheel) {
            var delta = e.deltaY || e.detail || e.wheelDelta;
            direction = delta > 0; //true = down, false = up

            newAnchor = scrollToNextSection(currentAnchor, anchors, direction);
            if (newAnchor !== false) {
                allowWheel = false;
                setTimeout(function () {
                    allowWheel = true;
                }, 600);

                currentAnchor = newAnchor;
            }
        }
    });

    //block default user scroll by arrows
    document.body.addEventListener("keydown", function (e) {
        //38 - up, 40 - down
        if (e.keyCode === 38) {
            direction = false;
        }

        if (e.keyCode === 40) {
            direction = true;
        }

        newAnchor = scrollToNextSection(currentAnchor, anchors, direction);
        if (newAnchor !== false) {
            allowWheel = false;
            setTimeout(function () {
                allowWheel = true;
            }, 600);

            currentAnchor = newAnchor;
        }
    });

    //add scrolling on click on elements with .scroll class
    $(".scroll").on("click", function (e) {
        //prevent default scrolling
        e.preventDefault();

        //get target element
        var target = $(this).attr('href');

        scrollToId(target);
    });

    //init slider
    $('.slider').bxSlider();
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

/**
 * Count to which section we need to scroll
 * @param currentAnchor integer - current anchor id in anchors array
 * @param anchors array - array of anchors
 * @param direction bool - up or down, true = down, false = up
 * @returns {*}
 */
function scrollToNextSection(currentAnchor, anchors, direction) {
    if (currentAnchor === 0 && !direction) {
        //we already at the top
        return false;
    } else if (anchors.length - 1 === currentAnchor && direction) {
        //we already at the bottom
        return false;
    } else {
        if (direction) {
            currentAnchor++;
        } else {
            currentAnchor--;
        }

        scrollToId('#' + anchors[currentAnchor]);

        return currentAnchor;
    }
}

/**
 * Parse url anchor and scroll to it
 * @param anchors
 */
function parseUrlAnchor(anchors) {
    var anchor = window.location.hash.replace("#", "");
    var cid = anchors.indexOf(anchor);

    if (cid !== -1) {
        scrollToId('#' + anchors[cid]);

        return cid;
    } else {
        return false;
    }
}