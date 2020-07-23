$(function() {
  $('form').submit(e => {
    e.preventDefault();
    let num1     = Number($('#numerator').val());
    let num2     = Number($('#denominator').val());
    let operator = $('#operator').find(':selected').val();
    let result   = $('h1')

    switch (operator) {
      case '+':
        result.text(num1 + num2);
        break;
      case '-':
        result.text(num1 - num2);
        break;
      case '*':
        result.text(num1 * num2);
        break;
      case '/':
        result.text(num1 / num2);
        break;
    }
  });
});