$(document).ready(function(){

    //ready

    //nojs
    $('body').removeClass('no-js');

    //------------------------------------------------------------------------//

    //fakelink
    $(document).on('click', 'a[href="#"]', function(event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    //tab
    $('.tabs').delegate('li:not(.active)', 'click', function() {
        $(this).addClass('active').siblings().removeClass('active').parents('.tab').find('.box').hide().eq($(this).index()).fadeIn(250);
        if ( productsListLength ) {
            for ( var i = 0; i < productsListLength; i++ ) {
                productsList[i].update();
            }
        }
    });

    //------------------------------------------------------------------------//

    //footer menu
    $(document).on('click', '.footer-menu-toggle', function(event) {
        event.preventDefault();
        $(this).parents('.footer-menu').toggleClass('active').find('.footer-menu-block').slideToggle(150);
    });

    //------------------------------------------------------------------------//

    //navigation
    $(document).on('click', '.navigation-toggle', function(event) {
        event.preventDefault();
        $('html').addClass('navigation-show');
    });

    $(document).on('click', '.navigation-close, .navigation-mask', function(event) {
        event.preventDefault();
        $('.navigation-panel').each(function(index, el) {
            $(el).removeClass('show');
        });
        $('html').removeClass('navigation-show');
    });

    //------------------------------------------------------------------------//

    //navigation panel
    $(document).on('click', '.navigation-menu-toggle', function(event) {
        event.preventDefault();
        var thisId = $(this).attr('href');
        thisId = thisId.substr(1);
        $('[data-panel="'+thisId+'"]').addClass('show');
    });

    $(document).on('click', '.navigation-panel-back', function(event) {
        event.preventDefault();
        $(this).parents('.navigation-panel').removeClass('show');
    });

    //------------------------------------------------------------------------//

    //navigation panel toggle
    $(document).on('click', '.navigation-panel-toggle', function(event) {
        event.preventDefault();
        $(this).parent('li').toggleClass('open').find('.navigation-panel-list-inner').slideToggle(150);
    });

    //------------------------------------------------------------------------//

    //products list
    var productsList,
        productsListLength = $('.products-list').length;
    if ( productsListLength ) {
        productsList = new Swiper ('.products-list', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto'
        });
    }

    //------------------------------------------------------------------------//

    //catalog favorite
    $(document).on('click', '.catalog-product-favorite', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //filter
    $(document).on('click', '.catalog-nav-filter', function(event) {
        event.preventDefault();
        $('html').addClass('filter-show');
    });

    $(document).on('click', '.filter-close, .filter-mask', function(event) {
        event.preventDefault();
        $('.filter-panel').each(function(index, el) {
            $(el).removeClass('show');
        });
        $('html').removeClass('filter-show');
    });

    //------------------------------------------------------------------------//

    //filter panel
    $(document).on('click', '.filter-panel-toggle', function(event) {
        event.preventDefault();
        var thisId = $(this).attr('href');
        thisId = thisId.substr(1);
        $('[data-filter="'+thisId+'"]').addClass('show');

        if ( $('[data-filter="'+thisId+'"]').find('.filter-range-slider').length ) {
            $('.filter-range-slider').each(function(index, el) {
                $(el).nstSlider('refresh');
            });
        }
    });

    $(document).on('click', '.filter-panel-back', function(event) {
        event.preventDefault();
        $(this).parents('.filter-panel').removeClass('show');
    });

    //------------------------------------------------------------------------//

    //filter toggle active
    $(document).on('click', '.filter-category-link, .filter-delivery-link', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //filter range
    if ( $('.filter-range-slider').length ) {
        $('.filter-range-slider').nstSlider({
            "rounding": {
                "10": "1"
            },
            "crossable_handles": false,
            "left_grip_selector": ".filter-range-handle-min",
            "right_grip_selector": ".filter-range-handle-max",
            "value_bar_selector": ".filter-range-bar",
            "value_changed_callback": function(cause, leftValue, rightValue) {
                $(this).parent().find('.filter-range-input-min').val(accounting.formatNumber(leftValue, 0, " "));
                $(this).parent().find('.filter-range-input-max').val(accounting.formatNumber(rightValue, 0, " "));
            }
        });
    }

    //------------------------------------------------------------------------//

});//document ready