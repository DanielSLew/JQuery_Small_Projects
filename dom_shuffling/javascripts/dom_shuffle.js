$(function() {
  let $navHeader = $('main > h1');
  $('body > header').prepend($navHeader).insertBefore('main');

  let $figures = $('figure');
  $('article').append($figures);

  let [$img1, $img2] = $('img');
  let temp = {
    src: $imgs.eq(0).attr('src'),
    alt: $imgs.eq(0).attr('alt'),
  };

  $imgs.eq(0).attr({
    src: $imgs.eq(1).attr('src'),
    alt: $imgs.eq(1).attr('alt'),
  });

  $imgs.eq(1).attr(temp);

});