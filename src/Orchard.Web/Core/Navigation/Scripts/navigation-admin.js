﻿
(function ($) {

    var populate = function (el, prefix) {
        var pos = 1;

        // direct children
        var children = $(el).children('li').each(function (i, child) {
            if (!prefix) prefix = '';
            child = $(child);

            // apply positions to all siblings
            child.find('.navigation-position > input').attr('value', prefix + pos);

            // recurse position for children
            child.children('ol').each(function (i, item) { populate(item, prefix + pos.toString() + '.') });

            pos++;

        });
    };

    $('.navigation-menu > ol').nestedSortable({
        disableNesting: 'no-nest',
        forcePlaceholderSize: true,
        handle: 'div',
        helper: 'clone',
        items: 'li',
        maxLevels: 6,
        opacity: 1,
        placeholder: 'navigation-placeholder',
        revert: 50,
        tabSize: 30,
        rtl: window.isRTL,
        tolerance: 'pointer',
        toleranceElement: '> div',

        stop: function (event, ui) {
            // update all positions whenever a menu item was moved
            populate(this, '');
            $('#save-message').show();

            // display a message on leave if changes have been made
            window.onbeforeunload = function (e) {
                return $("<div/>").html(leaveConfirmation).text();
            };

            // cancel leaving message on save
            $('#saveButton').click(function (e) {
                window.onbeforeunload = function () { };
            });
        }
    });

    $(function () {
        $(".navigation-menu-item > div").on("click", function () {
            if ($(".navigation-menu-item > div.menu-item-selected").length) {
                if ($(this).hasClass("menu-item-selected")) {
                    $(this).removeClass("menu-item-selected");
                }
                else {
                    $(".navigation-menu-item > div").removeClass("menu-item-selected");
                    $(this).addClass("menu-item-selected")
                }
            }
            else {
                $(this).addClass("menu-item-selected");
            }
        });

        $(".menu-item-actions > .button").on("click", function (e) {
            if ($(".navigation-menu-item > div.menu-item-selected").length) {
                e.originalEvent.currentTarget.href = $(this).attr("href") + "&parentMenuItemPosition=" + $(".navigation-menu-item > div.menu-item-selected > .navigation-position > input").val();
            }
        });
    });

})(jQuery);
