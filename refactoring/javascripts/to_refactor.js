const birthstones = {
  January: 'garnet',
  February: 'amethyst',
  March: 'aquamarine or bloodstone',
  April: 'diamond',
  May: 'emerald',
  June: 'pearl, moonstone, or alexandrite',
  July: 'ruby',
  August: 'peridot',
  September: 'sapphire',
  October: 'opal or tourmaline',
  November: 'topaz or citrine',
  December: 'turquoise, zircon, tanzanite', 
};

function validCreditCard(cc_number) {
  odd_total = 0;
  even_total = 0;
  cc_number = cc_number.split("").reverse();

  for (var i = 0, len = cc_number.length; i < len; i++) {
    if (i % 2 == 1) {
      cc_number[i] = (+cc_number[i] * 2) + "";
      if (cc_number[i].length > 1) {
        cc_number[i] = +cc_number[i][0] + +cc_number[i][1];
      }
      else {
        cc_number[i] = +cc_number[i];
      }
      odd_total += cc_number[i];
    }
    else {
      even_total += +cc_number[i];
    }
  }

  return (odd_total + even_total) % 10 == 0;
}

$(function() {
  $navBar = $("nav a");

  $('nav').on("mouseenter mouseleave", function() {
    $(this).find("ul ul").toggle();
  });

  $(".button, button").on("click", function(e) {
    e.preventDefault();

    $(this).addClass("clicked");
  });

  $(".toggle").on("click", function(e) {
    e.preventDefault();
    $(this).next(".accordion").toggle()
  });

  $("form").on("submit", function(e) {
    e.preventDefault();
    var cc_number = $(this).find("[type=text]").val();
    var $conditions = $(this).find(".success, .error").hide();
    var is_valid = cc_number && validCreditCard(cc_number)

    $conditions.eq(0).toggle(is_valid);
    $conditions.eq(1).toggle(!is_valid);
  });

  $("ul a").on("click", function(e) {
    e.preventDefault();

    var month = $(this).text(),
        $stone = $("#birthstone");

    $stone.text(`Your birthstone is ${birthstones[month]}`);
  });
});
