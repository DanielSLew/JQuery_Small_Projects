// Get the canvas

// Create a child of $canvas
// This child will have class of inputs['shape_type']
// Data-id is 1
// increment id += 1
// Set its top property to start_y
// set its left property to start_x


// animate is called on all objects when it is called
// When animating the objects, we will find the object
// using data id and then access its end coordinates (end_y, end_x)

$(function() {
  let $canvas    = $('#canvas');
  let $form      = $('form');

  function createShape(data) {
    let $shape = $("<div />", {
      class: data.shape_type,
      data: data,
    });

    setInitialPosition($shape);
    $shape.appendTo($canvas);
  }

  function setInitialPosition($shape) {
    $shape.css({
      top: $shape.data('start_y') + 'px',
      left: $shape.data('start_x') + 'px',
    });
  }

  function animateShape() {
    $shape = $(this);
    setInitialPosition($shape);

    $shape.stop().animate({
      top: $shape.data('end_y'),
      left: $shape.data('end_x'),
    }, 1000);
  }

  $form.submit(function(e) {
    e.preventDefault();
    let inputs = $form.serializeArray().reduce((fields, field) => {
      return { ...fields, [field.name]: field.value }
    }, {});

    createShape(inputs);
  });

  $('#animate').click(function(e) {
    $shapes = $canvas.find('div');
    e.preventDefault();

    $shapes.each(animateShape);
  });

  $('#stop').click(function(e) {
    e.preventDefault();
    $canvas.find('div').stop();
  });
});