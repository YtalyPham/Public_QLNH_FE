$(document).ready(function(){
    $('.backTop').hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.backTop').fadeIn(100);
        } else {
            $('.backTop').fadeOut();
        }
    });
    $('.backTop').on('click',function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    $('body').imagesLoaded(function(){
        $(this).removeClass('loading');
        $('.ell').ellipsis();
        $('.thumb img').each(function(){
            var src = $(this).attr('src');
            $(this).parent().css({'background-image':'url('+src+')'});
        });
    });
    $('.showInfo').on('click', function(){
        $(this).toggleClass('open');
        $('.infoLog').toggleClass('open');
    });
    $(window).load(function(){
        var headerFixed = $('.headerFixed').outerHeight();
        if ($(this).scrollTop() > headerFixed) {
            $('header').addClass('fixed');
        } else {
            $('header').removeClass('fixed');
        }
        $(window).scroll(function () {
            if ($(this).scrollTop() > headerFixed) {
                $('header').addClass('fixed');
            } else {
                $('header').removeClass('fixed');
            }
        });
        var slidePic = $('.slidePic .owl-carousel');
        if (slidePic.length) {
            slidePic.owlCarousel({
                rewind: false,
                center: true,
                items:1,
                nav: true,
                navText: ['<i class="ion-ios-arrow-thin-left"></i>','<i class="ion-ios-arrow-thin-right"></i>'],
                loop:true,
                dots:true,
                autoplay:true,
                autoplayTimeout:4000,
                autoplayHoverPause:false,
                smartSpeed: 600,
            });
            $('.slidePic .owl-nav,.slidePic .owl-dots').on('mouseover',function(){
                slidePic.trigger('stop.owl.autoplay');
            });
            $('.slidePic .owl-nav,.slidePic .owl-dots').on('mouseout',function(){
                slidePic.trigger('play.owl.autoplay',[4000]);
            });
        }
        /* add submenu */
        $('.menu > li > ul').each(function(){
            $(this).parents('li').addClass('sub');
            $(this).prev('a').append('<i class="btm bt-angle-down"></i>');
        });
        $('.menu > li > ul > li > ul').each(function(){
            $(this).parent('li').addClass('sub');
        });
        $('.menuBtn,.openMenu,.closeMenu,.over').on('click',function(){
            $('.menuLeftMain,.over,.wrapper,.openMenu,.topSocial,body').toggleClass('open');
        });
        $('.btnBook,.overBook,.closeBook').on('click',function(e){
            e.preventDefault();
            $('.wrapper,.openMenu,.topSocial').toggleClass('open');
            $('.overBook,.formBook').toggleClass('open');
            $('.menuLeftMain,.over,.topSocial').removeClass('open');
            $('body').addClass('open');
        });
        $('.overBook,.closeBook').on('click',function(e){
            e.preventDefault();
            $('body').removeClass('open');
        });
    });
    if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
        $('body').addClass('no_devices');
        $('.scrollPane').jScrollPane();
        $(window).resize(function(){
            $('.scrollPane').jScrollPane();
        });
        $('.btnBook').on('click',function(){
            $('.scrollPane').jScrollPane();
        });
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
    }else{
        $('body').addClass('mobile_viewer');
        $('.menu > li > ul').each(function(){
            $(this).prev('a').attr('href','javascript::;');
        });
    }
    /**/
    $(".menuLeft ul ul").each(function(){
        $(this).parents('li').addClass('sub');
        $(this).parents('li').append('<i class="btm bt-plus"></i>');
    });
    $('.menuLeft li.active').each(function(){
        $(this).children('i').addClass('active');
    });
    $('.menuLeft .sub > i').on('click', function(e){
        e.preventDefault();
        if($(this).is('.active')){
            $(this).removeClass('active');
            $(".menuLeft ul ul").slideUp(300);
            $(this).prev('ul').slideUp(300);
            $(this).parents('li').removeClass('active');
        }else{
            $('.menuLeft ul ul').slideUp(300);
            $('.menuLeft .sub > i').removeClass('active');
            $(this).addClass('active');
            $(this).prev('ul').slideDown(300);
        }
    });
    $('.menuLeft .sub > a').each(function(e){
        var href = $(this).attr('href');
        if(href=="javascript::;" || href=="#"){
            $(this).on('click',function(){
                $('.menuLeft ul ul').slideUp(300);
                $('.menuLeft .sub > i').removeClass('active');
                $(this).next('ul').next('i').addClass('active');
                $(this).next('ul').slideDown(300);
            });
        }
    });
    var urlEncode = function(str) {
        str = (str + "").toString();
        return encodeURIComponent(str).replace(/#!/g, "%23").replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+")
    }
    $("a.btn_facebook").on('click',function(e) {
        e.preventDefault();
        var href  = $(this).attr('href') != "undefined" ? $(this).attr('href') : "",
            title = $(this).attr('data-title-share') != "undefined" ? $(this).attr('data-title-share') : "",
            desc  = $(this).attr('data-desc') != "undefined" ? $(this).attr('data-desc') : "",
            image = $(this).attr('data-image') != "undefined" ? $(this).attr('data-image') : "";

        var url = "https://www.facebook.com/sharer/sharer.php?u=" + urlEncode(href) + "&p[title]=" + title + "&p[images][0]=" + image;
        var newwindow = window.open(url, "_blank", "menubar=no,toolbar=no,resizable=no,scrollbars=no,height=450,width=710");
        if (window.focus)newwindow.focus();
    });
    $("a.btn_google").click(function(e) {
        e.preventDefault();
        var href  = $(this).attr('href') != "undefined" ? $(this).attr('href') : "";

        var url = "https://plus.google.com/share?url=" + urlEncode(href);
        var newwindow = window.open(url, "_blank", "menubar=no,toolbar=no,resizable=no,scrollbars=no,height=450,width=520");
        if (window.focus)newwindow.focus();
    });
    $("a.btn_twitter").click(function(e) {
        e.preventDefault();
        var href  = $(this).attr('href') != "undefined" ? $(this).attr('href') : "",
            title = $(this).attr('data-title-share') != "undefined" ? $(this).attr('data-title-share') : "";

        var url = "https://twitter.com/intent/tweet?source=webclient&text=" + title + "+ " + urlEncode(href);
        var newwindow = window.open(url, "_blank", "menubar=no,toolbar=no,resizable=no,scrollbars=no,height=450,width=710");
        if (window.focus)newwindow.focus();
    })
});