$(document).ready(function(){
$("hr").addClass("seperator");

});


  var sliderIndex=1;
  function showDiv(n){
    var slideDiv=document.getElementsByClassName('slider-div');
    if (n>slideDiv.length) {
      sliderIndex=1;
    };
    if (n<1) {
      sliderIndex=slideDiv.length;
    };
    for (var i = 0; i < slideDiv.length; i++) {
      slideDiv[i].style.display="none";
    }
    slideDiv[sliderIndex-1].style.display="block";
  };
  autoSlide();
  function autoSlide(n){
    var slideDiv=document.getElementsByClassName('slider-div');

    for (var i = 0; i < slideDiv.length; i++) {
      slideDiv[i].style.display="none";
    }
    sliderIndex++;
    if (sliderIndex>slideDiv.length) {
      sliderIndex=1;
    };

    slideDiv[sliderIndex-1].style.display="block";
    setTimeout(autoSlide,4000);
  };

function navigate(n){
  showDiv(sliderIndex +=n);
};

