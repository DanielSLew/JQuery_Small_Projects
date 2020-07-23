$(function() {
  $('#team li > a').click(function(e) {
    e.preventDefault();
    let $ele = $(this);

    $ele.siblings(".modal").css({
      top: `${($(window).scrollTop() + 30)}px`
    });

    $ele.nextAll("div").fadeIn(400);
  });

  $(".modal-layer, a.close").click(function(e) {
    e.preventDefault();

    $(".modal-layer, .modal").filter(':visible').fadeOut(400);
  });
});