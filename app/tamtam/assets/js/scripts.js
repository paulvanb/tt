/**
 * Common functions
 */

;(function($) {
    'use strict';
        // Menu
        // Global vars
        var $body = $('body'),
            $headerWrapper = $body.find('.menu'),
            $mobileMenuButton = $headerWrapper.find('.hamburger'),
            $mobileMenuHolder = $headerWrapper.find('.nav');

        // On click run mobileMenu function
        $mobileMenuButton.on('click', mobileMenu);

        // Toggle classes
        function mobileMenu() {
            $mobileMenuButton.toggleClass('is-active');
            $mobileMenuHolder.toggleClass('collapse');
        }

        // Instafeed
        var feed = new Instafeed({
            get: 'user',
            userId: '176412031',
            clientId: '48e48bb119ff4df881e8e2854bbe0ff2',
            resolution: 'standard_resolution',
            limit: 6,
            template: '<div class="insta-item"><div class="insta-image"><a href="{{link}}"><img src="{{image}}" /></a></div><div class="insta-caption">{{caption}}</div></div>'

        });

        function hideControls(event) {
            $('.owl-controls').hide();
        }

        function showControls(event) {
            $('.owl-controls').delay(1000).fadeIn();
        }

        // Slider
        if ($('.owl-carousel').length) {
            $('.owl-carousel').owlCarousel({
                nav: true,
                items:1,
                loop:true,
                navSpeed: 800,
                onChange: hideControls,
                onChanged: showControls
            });
        }

        if ($('#instafeed').length) {
            feed.run();
        }

        // page transtions
        $('.animsition').animsition({
            inClass: 'fade-in',
            outClass: 'fade-out',
            inDuration: 1500,
            outDuration: 800,
            linkElement: '.animsition-link',
            loading: true,
            loadingParentElement: 'body',
            loadingClass: 'animsition-loading',
            loadingInner: '',
            timeout: false,
            timeoutCountdown: 5000,
            onLoadEvent: true,
            browser: [ 'animation-duration', '-webkit-animation-duration'],
            overlay : false,
            overlayClass : 'animsition-overlay-slide',
            overlayParentElement : 'body',
            transition: function(url){ window.location.href = url; }
        });

        // Scroll to intro
        $('a[href*=#]').on('click', function(event){     
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
        });

        var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
        $(".nav li a").each(function(){
          if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
            $(this).addClass("active");
        })
    
})(jQuery);