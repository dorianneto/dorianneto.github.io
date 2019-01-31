$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
        $('.anchor-top').show().removeClass('flipOutY').addClass('flipInY');
    } else {
        $('.anchor-top').removeClass('flipInY').addClass('flipOutY');
    }
});

$('.anchor-top').click(function(e) {
    e.preventDefault();

    $('body,html').animate({
        scrollTop : 0
    }, 800);
});
