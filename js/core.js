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
        var thisIndex = $(this).index();
        if ( $('.box:visible').find('.products-list').length ) {
            productsList[thisIndex].update();
        }
        if ( $('.box:visible').find('.similar-products-list').length ) {
            similarProducts[thisIndex].update();
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
            slidesPerView: 'auto',
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //favorite
    $(document).on('click', '.catalog-product-favorite, .product-favorite, .modal-favorite-product-toggle', function(event) {
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

    //product gallery
    var productGallery,
        productGalleryLength = $('.product-gallery').length;
    if ( productGalleryLength ) {
        productGallery = new Swiper ('.product-gallery', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            speed: 500,
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //countdown
    if ( $('.countdown').length ) {
        $('.countdown').downCount({
            date: '11/16/2020 12:00:00',
            offset: +3
        }, function () {
            //callback
        });
    }

    //------------------------------------------------------------------------//

    //drop
    activePop = null;
    dropClass = $('.drop-wrap');
    function closeInactivePop() {
        dropClass.each(function(index) {
            if ($(this).hasClass('drop-opened') && index!=activePop) {
                $(this).removeClass('drop-opened');
            }
        });
        return false;
    }
    $(document).on('mouseover', '.drop-wrap', function() {
        activePop = dropClass.index(this);
    });
    $(document).on('mouseout', '.drop-wrap', function() {
        activePop = null;
    });
    $(document.body).on('click', function(event) {
        closeInactivePop();
    });
    $(document).on('click', '.drop-toggle', function(event) {
        event.preventDefault();
        $(this).parent(dropClass).toggleClass('drop-opened');
    });

    //------------------------------------------------------------------------//

    //product select
    $(document).on('click', '.product-select-link', function(event) {
        event.preventDefault();
        var thisElement = $(this),
            thisElementHtml = thisElement.html(),
            thisParent = thisElement.parents('.product-select-block');
        thisElement.addClass('active').siblings().removeClass('active');
        thisParent.find('.product-select-toggle').html(thisElementHtml);
        activePop = null;
        closeInactivePop();
    });

    //------------------------------------------------------------------------//

    //popover
    if ( $('.popover-target').length ) {
        $('.popover-target').popover({
            trigger: 'hover',
            html: true
        });
    }

    //------------------------------------------------------------------------//

    //product specs
    $(document).on('click', '.product-specs-more-button', function(event) {
        event.preventDefault();
        $(this).parent('.product-specs-more').addClass('hidden');
        $(this).parents('.product-specs').find('.product-specs-list tr').removeClass('hidden');
    });

    //------------------------------------------------------------------------//

    //product features
    var productFeatures,
        productFeaturesLength = $('.product-features-list').length;
    if ( productFeaturesLength ) {
        productFeatures = new Swiper ('.product-features-list', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 2,
            slidesPerView: 'auto',
            watchOverflow: true,
            centerInsufficientSlides: true,
        });
    }

    //------------------------------------------------------------------------//

    //similar products
    var similarProducts,
        similarProductsLength = $('.similar-products-list').length;
    if ( similarProductsLength ) {
        similarProducts = new Swiper ('.similar-products-list', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //recently viewed
    var recentlyViewed,
        recentlyViewedLength = $('.recently-viewed-products').length;
    if ( recentlyViewedLength ) {
        recentlyViewed = new Swiper ('.recently-viewed-products', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
            centerInsufficientSlides: true,
        });
    }

    //------------------------------------------------------------------------//

    //product reviews
    $(document).on('click', '.product-reviews-more-button', function(event) {
        event.preventDefault();
        $(this).parent('.product-reviews-more').addClass('hidden');
        $(this).parents('.product-reviews').find('.product-review').removeClass('hidden');
    });

    //------------------------------------------------------------------------//

    //fancybox
    if ( $('[data-fancybox]').length ) {
        $('[data-fancybox]').fancybox({
            gutter: 0,
            loop: true,
            arrows: false,
            infobar: false,
            smallBtn: true,
            wheel: false,
            animationEffect: "fade"
        });
    }

    //------------------------------------------------------------------------//

    //modal
    if ( $('[data-fancymodal]').length ) {
        $('[data-fancymodal]').fancybox({
            gutter: 0,
            arrows: false,
            infobar: false,
            smallBtn: true,
            wheel: false,
            keyboard: false,
            animationEffect: "fade",
            touch: false,
            afterShow: function() {
                var modalCertificate,
                    modalCertificateLength = $('.modal-certificate').length;
                if ( modalCertificateLength ) {
                    modalCertificate = new Swiper ('.modal-certificate', {
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        speed: 500,
                        watchOverflow: true,
                    });
                }
                var modalFavorite,
                    modalFavoriteLength = $('.modal-favorite').length;
                if ( modalFavoriteLength ) {
                    modalFavorite = new Swiper ('.modal-favorite', {
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        speed: 500,
                        spaceBetween: 8,
                        slidesPerView: 'auto',
                        watchOverflow: true,
                        centerInsufficientSlides: true,
                    });
                }
            }
        });
    }

    //------------------------------------------------------------------------//

    //product discount
    var productDiscount,
        productDiscountLength = $('.product-discount-list').length;
    if ( productDiscountLength ) {
        productDiscount = new Swiper ('.product-discount-list', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            speed: 500,
            spaceBetween: 10,
            slidesPerView: 'auto',
            watchOverflow: true,
            centerInsufficientSlides: true,
        });
    }

    //------------------------------------------------------------------------//

    //product set
    $(document).on('keypress', '.product-set-number-text', function(event) {
        event = event || window.event;
        if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) ) return false;
    });

    $(document).on('change', '.product-set-number-text', function(event) {
        var thisParent = $(this).parents('.product-set-item');
        var quantityValue = $(this).val();
        if ( quantityValue == 0 ) {
            thisParent.find('.product-set-checkbox input').prop('checked', false);
        } else {
            thisParent.find('.product-set-checkbox input').prop('checked', true);
        }
    });

    $(document).on('click', '.product-set-number-minus', function(event) {
        event.preventDefault();
        var thisParent = $(this).parents('.product-set-item');
        var quantityInput = $(this).parent('.product-set-number').find('.product-set-number-text');
        var quantityValue = quantityInput.val();
        quantityValue = --quantityValue;
        if ( quantityValue < 0 ) { quantityValue = 0; }
        quantityInput.val(quantityValue);
        if ( quantityValue == 0 ) {
            thisParent.find('.product-set-checkbox input').prop('checked', false);
        }
    });

    $(document).on('click', '.product-set-number-plus', function(event) {
        event.preventDefault();
        var thisParent = $(this).parents('.product-set-item');
        var quantityInput = $(this).parent('.product-set-number').find('.product-set-number-text');
        var quantityValue = quantityInput.val();
        quantityInput.val(++quantityValue);
        thisParent.find('.product-set-checkbox input').prop('checked', true);
    });

    $(document).on('change', '.product-set-checkbox input', function(event) {
        var thisParent = $(this).parents('.product-set-item');
        if( $(this).is(':checked') ) {
            thisParent.find('.product-set-number-text').val('1');
        } else {
            thisParent.find('.product-set-number-text').val('0');
        }
    });

    //------------------------------------------------------------------------//

    //product set
    var productSet,
        productSetLength = $('.product-set-slider').length;
    if ( productSetLength ) {
        productSet = new Swiper ('.product-set-slider', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
            centerInsufficientSlides: true,
        });
    }

    //------------------------------------------------------------------------//

    //product customer photo
    var productCustomerPhoto,
        productCustomerPhotoLength = $('.product-customer-photo').length;
    if ( productCustomerPhotoLength ) {
        productCustomerPhoto = new Swiper ('.product-customer-photo', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //phone mask
    if ( $('.phone-mask').length ) {
        $('.phone-mask').mask('+7 (999) 999-99-99');
    }

    //------------------------------------------------------------------------//

});//document ready