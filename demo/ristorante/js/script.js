function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


$(document).ready(function(){
const golden=$(".content-wrapper");
const sub=$(".sub");

var animation_elements = $.find('.golden');
var web_window = $(window);

//check to see if any animation containers are currently in view
function check_if_in_view() {
  //get current window information
  var window_height = web_window.height();
  var window_top_position = web_window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  //iterate through elements to see if its in view
  $.each(animation_elements, function() {

    //get the element sinformation
    var element = $(this);
    var element_height = $(element).outerHeight();
    var element_top_position = $(element).offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
    if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
      element.addClass('inView');
    } else {
      element.removeClass('inView');
    }
  });
  $.each(golden, function() {

        //get the element sinformation
        var element = $(this);
        var element_height = $(element).outerHeight();
        var element_top_position = $(element).offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
        if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
          element.addClass('faded');
        } else {
          element.removeClass('faded');
        }
      });
      $.each(sub, function() {

            //get the element sinformation
            var element = $(this);
            var element_height = $(element).outerHeight();
            var element_top_position = $(element).offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
            if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
              element.addClass('faded');
            } else {
              element.removeClass('faded');
            }
          });
}

//on or scroll, detect elements in view
$(window).on('scroll resize', function() {
    check_if_in_view()
  })
  //trigger our scroll event on initial load
$(window).trigger('scroll');
});

$(".arrow").click(function(){
  $('html, body').animate({ scrollTop: 0 }, 'slow');
});
