function changeNavBar(namespace){
/* check if navbar exists (to avoid js console errors) */
let exists = $( ".navbar" ).length ? true : false;
/* if user scroll add active class */
if(namespace != "home"){
  $(window).on("scroll", function() {
    if(exists && $(window).scrollTop() > 0) {
      $(".navbar").addClass("active");
    } else if(exists) {
      /* remove active class */
      $(".navbar").removeClass("active");
    }
  });
}
}

function loadToolTip(){
/*
  console.log("hello tooltip");
  tippy('#mybutton', {
    theme: 'light',
    content: 'Back to main page',
    placement: 'left-start'
  })

  tippy('#swiper-custom-next', {
    theme: 'light',
    content: 'Next',
    placement: 'top'
  })

  tippy('#swiper-custom-prev', {
    theme: 'light',
    content: 'Prev',
    placement: 'top'
  })
  */
}

function loadSwiper(){
<!-- Swiper & Webflow CMS collection - Extra Step - add arrows and pagination html markup by code (Append) -->
var swiperNodes = "";
var pagination = '<div class=swiper-pagination></div>';
var swiperNodes = swiperNodes.concat(pagination);
/* loop throw all swipers on the page */
$('.swiper-container').each(function( index ) {
  $( this ).append(swiperNodes);
});

var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  spaceBetween: 30,
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  // Enable lazy loading
  navigation: {
    nextEl: '.swiper-custom-next',
    prevEl: '.swiper-custom-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  keyboard: {
    enabled: true,
  },
  on: {
    init: function () {
      var totalSlides = $(".swiper-pagination-bullet").length;
      console.log("swiper" + this.slides.length);
      document.querySelector('.total-slides').innerHTML = totalSlides;

    },
    slideChange: function(){
      var currentSlide = this.realIndex + 1;
      console.log("currentSlide" + currentSlide);
      document.querySelector('.current-slide').innerHTML = currentSlide;
    }
  }
})

}/* end function */


function accessibleTooltip(){
$(".dropdown-content").attr("aria-hidden","true");
$(".dropbtn").focus(function(){
  $(this).next(".dropdown-content").attr("aria-hidden","false");
  $(this).next(".dropdown-content").css({visibility: "visible", opacity: "1", display: "block" })
});

$(".dropbtn").focusout(function(){
  $(this).next(".dropdown-content").css({visibility: "hidden", opacity: "0", display: "none" })
});
/* close modal on esc key */
document.onkeydown = function(evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = (evt.key === "Escape" || evt.key === "Esc");
  } else {
    isEscape = (evt.keyCode === 27);
  }
  if (isEscape) {
    $(".dropdown-content").css({visibility: "hidden", opacity: "0", display: "none" })
    $(".dropdown-content").attr("aria-hidden","true");
  }
};
}

/* Change active state class navbar */
function setActiveState(namespace){
var links = document.querySelectorAll('.w-nav-link');
if(links.length > 0 ){
  [].forEach.call(links, function(link) {
    // do whatever
    link.classList.remove("w--current");
  });
  if(namespace !== "home"){
    var href = `a[href="/${namespace}"]`;
    var els = document.querySelectorAll(href);
    els[0].classList.add("w--current");
  }
}
if(namespace == "home"){
  console.log();
  $("[data-home]").addClass("w--current");
}
}

/* HOMEPAGE FUNCTIONS */
const leave_Home = (data) => {
console.log("leave_Home");
tl = gsap.timeline({ });
/* invert colors animation */
return tl
/* main trick */
  .to(".arrow-div-homepage", { width: "105%", duration: 0.8, ease:Quart.ease  }, 0) 
  .to(".video-wrapper", { opacity: 0, duration: 0.8 }, 0)
  .from(".arrow-icon-stroke", { rotate: "180",duration: 0.4, ease:Quart.ease }, 0.6) 
/* other animations */
//.to("[data-anime]", { y: -20, opacity: 0, stagger: 0.2, ease:Quart.easeIn }, 0)
  .to(".w-nav-button", { color: "#010E16"}, 0) 
  .to("a", { color: "#010E16"}, 0)
  .to(".logo_letter", { fill: "#010E16", stagger: 0.15}, 0) 
  .set("body", { color: "#010E16", backgroundColor: "white"});  
}

const enter_home_from_white = (data) => {
console.log("enter_home_from_white");
tl = gsap.timeline({});
return tl
  .from(".overlay-video", { opacity: 1, duration: 1}, 0)
  .from("[data-anime]", { y: 50, opacity: 0, ease:Quart.easeOut, stagger: 0.05 }, 0)
  .to("[data-anime]", {color: "white"}, 0)

}

const enter_white_from_home = (data) => {
/* Change navbar active Class */
console.log("enter_white_from_home");
tl = gsap.timeline({});
return tl  
  .to("body", { backgroundColor: "white"}, 0)
  .from(".background-image", { opacity: "0"}, 0)
  .from("[data-anime]", { y: 100, opacity: 0, ease:Quart.easeOut, stagger: 0.08 },0)
}



// Current page (white page) leave transition */
const leave_white_to_home = (data) => {
console.log("leave_white_to_home");
return tl = gsap.timeline({})
/* invert homepage colors to white, body to dark and resize the arrow div */
/* MAIN ANIMATION - הכניסה של הפס הכחול לתוך דף הבית */
  .to(".arrow-div-white-pages", { width: "115%", duration: 1, ease:Quart.easeIn}, 0)
  .to(".logo_letter", { fill: "white", stagger: 0.05}, .5) 
  .to(".w-nav-button", { color: "white", ease:Quart.easeIn}, 0) 
//.to("[data-anime]", { y: -50, opacity: 0, stagger: 0.2 }, 0)
  .to(".navbar a", { color: "white", stagger: 0.10, ease:Quart.easeIn}, 0.15);
}

/* GENERAL Functions */
const leave_white_to_white = (data) => {
console.log("leave_white_to_white");
tl = gsap.timeline({});
return tl
  .to("[data-anime]", { y: -50, opacity: 0, ease: Power2.out,  stagger: 0.025}, 0)
}

const enter_white_to_white = (data) => {
console.log("enter_white_to_white"); 
tl = gsap.timeline({});
return tl
  .from("[data-anime]", { y: 50, opacity: 0, ease: Power2.in, stagger: 0.025, }, 0)
}

if ('scrollRestoration' in history) {
history.scrollRestoration = 'manual';
}

const homeLoopAnimation = (data) =>
{

tl = gsap.timeline({});
return tl
  .to("[line-anim]", {duration: 1, width: "60px", background: "white", repeat: -1, yoyo: true})

}

const changeNavAndArrowOrder = (data) =>
{

}

/* Global hooks */
barba.hooks.before((data) => {
console.log("barba.hooks.before barba.hooks.before barba.hooks.before");
setActiveState(data.next.namespace);
changeNavAndArrowOrder();
changeNavBar(data.next.namespace);
});

barba.hooks.once((data) => {
console.log("barba.hooks.once((data) barba.hooks.once((data)");
changeNavBar(data.next.namespace);
changeNavAndArrowOrder();
accessibleTooltip();
loadToolTip();
});

function about_us_fixBugOfTeamCardOnVerySmallScreens(){
$( ".dropbtn" ).hover(
  function() {
    //$(".higher-z").css("z-index", 0)
    console.log("hoverrrrrrrrrrrrrrrrrrr in");
  }, function() {
    console.log("hoverrrrrrrrrrrrrrrrrrr out");
    //$(".higher-z").css("z-index", 2)
  }
);
}

barba.hooks.enter(() => {
window.scrollTo(0, 0);
accessibleTooltip();
loadToolTip();
changeNavBar();
});

/* Base hooks */
barba.init({
views: [
  {
    namespace: 'home',
    afterEnter(data){
      /*play HERO video */
      tl = gsap.timeline({});
      tl.set("body", { backgroundColor: "#010E16"}) 
      var myVideo = document.getElementsByTagName("video")[0];
      myVideo.play(); 
    }
  },
  {
    namespace: 'case-studies',
    beforeEnter(data){
      console.log("loadSwiper");   
      loadSwiper();
    }
  },
  {
    namespace: 'about-us',
    beforeEnter(data){
      console.log("loadSwiper");   
      about_us_fixBugOfTeamCardOnVerySmallScreens();
    }
  }   
],
transitions: [
  {
    name: 'white-to-white',
    sync: false,
    once: () => {
      tl = gsap.timeline({});
      tl.to(".logo_letter", { fill: "#010E16", stagger: 0.1}, 0) 
    },
    leave:(data) => {
      // Current page (not home) leave transition
      return leave_white_to_white();
    },
    enter() {
      // Next page (not homepage) enter transition	
      enter_white_to_white();
    }
  },
  /* HOME PAGE trantisions */
  {
    /* From Home to White 
                אנימציית עזיבה של בית
                אנימציית כניסה של לבן
                */
    name: 'homepage-to-white-transition',
    from: {
      namespace: [
        'home'
      ]
    },
    sync: false,
    once(data){
      console.log("once")
    },
    leave:(data) => {
      // Current page (home) leave transition
      return leave_Home();
    },
    enter() {
      // Next page (white page) enter transition	
      enter_white_from_home();
    }
  },
  {
    /* to Home to White 
                אנימציית עזיבה של לבן
                אנימציית כניסה של בית
                */
    name: 'white-to-home-transition',
    to: {
      namespace: [
        'home'
      ]
    },
    once: (data) => {
      homeLoopAnimation(data);
      tl = gsap.timeline({});
      tl.set("a", { color: "white", clearProps: "all"}, 0)
        .from("[data-anime]", { y: 100, opacity: 0, stagger: 0.1, ease: Power3.easeOut}, 0)
    },
    leave:(data) => {
      // Current page (white page) leave transition
      return leave_white_to_home();
    },
    enter: () => {
      // Next page (Home page) enter transition	    
      homeLoopAnimation();
      enter_home_from_white();
    }
  }
]
});
