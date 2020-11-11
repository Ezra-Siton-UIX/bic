/*
    change 11-11-2020
    https://github.com/Ezra-Siton-UIX/bic/blob/main/main.js
    */
  $('.w-nav-menu').on('click', 'a', function() {
    /*
  if ($('.w--open').length === 1){ // detect whether menu is open in mobile view
    $('.w-nav-button').triggerHandler('tap');
  }
  */
  });


  function loadSwiper(){
    <!-- Swiper & Webflow CMS collection - Extra Step - add arrows and pagination html markup by code (Append) -->
      var swiperNodes = "";
    var pagination = '<div  class=swiper-pagination></div>';
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
        clickable: true,
      },
      keyboard: {
        enabled: true,
      },
      on: {
        slideChange: function(){
          var currentSlide = this.realIndex + 1;
          console.log("currentSlide" + currentSlide);
          document.querySelector('.current-slide').innerHTML = currentSlide;
        },
        paginationRender: function(){
          var totalSlides = $(".swiper-pagination-bullet").length;
          console.log("swiper paginationRender: " + totalSlides);
          document.querySelector('.total-slides').innerHTML = totalSlides;
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
    console.log("setActiveState");
    var links = document.querySelectorAll('.w-nav-link');
    if(links.length > 0 ){
      [].forEach.call(links, function(link) {
        // do whatever
        link.classList.remove("w--current");
      });
      if(namespace !== "home"){
        $(`.mobile-link`).removeClass("active");
        $(`.mobile-link[href="/${namespace}"]`).addClass("active");

        var href = `a[href="/${namespace}"]`;
        var els = document.querySelectorAll(href);
        els[0].classList.add("w--current");
      }
    }
    if(namespace == "home"){
      $(`.mobile-link`).removeClass("active");
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
      .from(".arrow-icon-stroke", { rotate: "180",duration: 0.4, ease:Quart.ease }, 0.4) 
    /* other animations */
      .to("[data-anime]", { opacity: 0, duration: 0.3, ease:Quart.easeIn }, 0)
    /* mobile tab menu */
      .to(".mobile-strip-menu", { background: "transparent", duration: 0.3, ease:Quart.easeOut}, 0.5)
      .to(".line-divder", { background: "#010E16", duration: 0.3, ease:Quart.easeOut}, 0)
      .to(".mobile-link", { color: "black", duration: 0.2}, 0.2)

      .to(".w-nav-button", { color: "#010E16"}, 0) 
      .to("a.w-nav-link", { color: "#010E16"}, 0)
      .to(".logo_letter", { fill: "#010E16", stagger: 0.15}, 0) 
      .set("body", { color: "#010E16", backgroundColor: "white"});  
  }

  const enter_home_from_white = (data) => {
    console.log("enter_home_from_white");
    tl = gsap.timeline({});
    return tl
      .from(".overlay-video", { opacity: 1, duration: 1}, 0)
      .from("[data-anime]", { y: 50, opacity: 0, ease:Quart.easeOut, stagger: 0.05 }, 0)
      .to("[data-anime]", {color: "white"}, 0);
  }

  const enter_white_from_home = (data) => {
    /* Change navbar active Class */
    console.log("enter_white_from_home");
    tl = gsap.timeline({});
    return tl  
    /* hide mobile strip menu */ 
    //.from(".mobile-strip-menu",{ opacity: 1, y: -100, duration: 1, ease:Quart.easeOut }, 0)
      .to(".line-divder", { background: "#010E16", duration: 0.1, ease:Quart.easeOut}, 0)
    /* .menu-button = כפתור המבורגר אין באתר */
    //.to(".menu-button", { color: "#010E16", ease:Quart.easeOut, duration: 0.2, clearProps: "all"}, 0)
      .to("body", { backgroundColor: "white", duration: 0.1 }, 0)
      .from(".background-image", { opacity: "0", ease:Quart.easeIn,duration: 0.4}, 0)
      .from("[data-anime]", { y: 70, opacity: 0, ease:Quart.easeOut, stagger: 0.08 },0);
  }

  // Current page (white page) leave transition */
  const leave_white_to_home = (data) => {
    console.log("leave_white_to_home");
    return tl = gsap.timeline({})
    /* invert homepage colors to white, body to dark and resize the arrow div */
    /* MAIN ANIMATION - הכניסה של הפס הכחול לתוך דף הבית */
      .to(".arrow-div-white-pages", { width: "115%", duration: 1, ease:Quart.easeIn}, 0.3)
      .to(".logo_letter", { fill: "white", stagger: 0.05}, .5)  
    /* .w-nav-button - התפריט המבורגר אין אותו באתר */
    // .to(".w-nav-button", { color: "white", stagger: 0.05, ease:Quart.easeIn }, 0.7) 
    //.to("[data-anime]", { y: -50, opacity: 0, stagger: 0.2 }, 0)
      .to(".navbar a.w-nav-link", { color: "white", stagger: 0.15, ease:Quart.easeIn}, 0.45)
    //   mobile strip menu */ 
      .to(".mobile-strip-menu",{ background: "transparent", color: "white", duration: 0.3, ease:Quart.easeIn }, 0)
      .to(".line-divder", { background: "white", duration: 0.3, ease:Quart.easeOut}, 0)
      .to(".mobile-link", { color: "white", duration: 0.3, ease:Quart.easeOut}, 0.4);
  }

  /* ########################
     GENERAL Functions 
###########################*/
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


  /*#####################
     Global hooks
######################*/
  /* analytics.js you can manually send a pageview  */
  barba.hooks.afterEnter(() => {
    console.log("ga");
    ga('set', 'page', window.location.pathname);
    ga('send', 'pageview');
  });

  barba.hooks.before((data) => {
    console.log("barba.hooks.before barba.hooks.before barba.hooks.before");
    setActiveState(data.next.namespace);
  });

  barba.hooks.once((data) => {
    setActiveState(data.next.namespace);
    console.log("global once;");
    ga('set', 'page', window.location.pathname);
    ga('send', 'pageview');
    accessibleTooltip();
  });


  /* scroll to top */
  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
    accessibleTooltip();
  });

  /* ########################
       Base hooks
###########################*/
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
        },
        once(data){
          tl.set(".line-divder", { background: "white"});   
        }
      },
      {
        namespace: 'case-studies',
        beforeEnter(data){  
          loadSwiper();
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
        /* to Home from White 
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
          tl.set("a.w-link", { color: "white", clearProps: "all"}, 0)
          tl.set(".line-divder", { background: "white"})
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
