// find figure > img
// use replaceWith

// add a click listener to ul > li
  // remove selected class
  // Add a selected border on the current element
  // Fade out the main img
  // replaceWith(copy of current element)
  // Fade in the main img

$(function() {
  idx = 0;
  $main = $('figure');
  $thumbnails = $('li > img');

  $thumbnails.click(function(e) {
    $ele = $(this);
    $img = $main.find('img');
    $('.selected').removeClass('selected');

    $main.stop(true).fadeOut(300);
    setTimeout(() => {
      $img.replaceWith($ele.get(0).cloneNode());
      $ele.addClass('selected');
    }, 300);
    $main.fadeIn(300);
  });

  $(document).on('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      let idx = $thumbnails.index($('.selected'));
      idx += 1;
      if (idx === $thumbnails.length) idx = 0;
      $thumbnails.eq(idx).trigger('click');
    } else if (e.key === 'ArrowLeft') {
      let idx = $thumbnails.index($('.selected'));
      idx -= 1;
      if (idx === -1) idx = $thumbnails.length - 1;
      $thumbnails.eq(idx).trigger('click');      
    }
  });
});