$(function() {
  $('form').submit(e => {
    e.preventDefault();
    let quantity = $('#quantity').val() || '1';
    let name = $('#name').val();

    let $newItem = $(document.createElement('li')).text(quantity + ' ' + name);
    $('ul').append($newItem);
    $('form').get(0).reset();
  });
});

console.table({
  hi: 'hello',
  bye: 'cya',
})