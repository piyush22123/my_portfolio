function locomotive(){
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotive();

//cursor
var cursor = document.querySelector(".cursor");
main.addEventListener("mousemove", function(dets){
  gsap.to(".cursor", {
      left: dets.clientX + "px",
      top: dets.clientY + "px"
  })
})


//loader
function loader(){
gsap.to("#loader", {
    top:"-100vh",
    delay: 0.4,
    duration: 1.5,
})
}
loader();



//navigation
document.addEventListener("DOMContentLoaded", function () {
  // Initialize locomotive scroll
  const scroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
  });

  // Function to scroll to the specified section
  function scrollToSection(sectionId) {
      scroll.scrollTo(document.querySelector(sectionId));
  }

  // Add click event listeners for each navigation link
  document.getElementById("homeLink").addEventListener("click", function (event) {
      event.preventDefault();
      scrollToSection("#page1");
  });

  document.getElementById("skillsLink").addEventListener("click", function (event) {
      event.preventDefault();
      scrollToSection("#page2");
  });

  document.getElementById("projectsLink").addEventListener("click", function (event) {
      event.preventDefault();
      scrollToSection("#page3");
  });

  document.getElementById("contactLink").addEventListener("click", function (event) {
      event.preventDefault();
      scrollToSection("#page4");
  });
});


//side-nav
    const navigation = document.querySelector(".navigation")

    function opennav(){
        navigation.style.left = "0";
    }
    function closenav(){
        navigation.style.left = "-100%"
    }

    //function
    document.addEventListener("DOMContentLoaded", function () {
      // Initialize locomotive scroll
      const scroll = new LocomotiveScroll({
          el: document.querySelector("#main"),
          smooth: true,
      });
    
      // Function to scroll to the specified section
      function scrollToSection(sectionId) {
          scroll.scrollTo(document.querySelector(sectionId));
      }
    
      // Add click event listeners for each navigation link
      document.getElementById("homeLink").addEventListener("click", function (event) {
          event.preventDefault();
          scrollToSection("#page1");
      });
    
      document.getElementById("skillsLink").addEventListener("click", function (event) {
          event.preventDefault();
          scrollToSection("#page2");
      });
    
      document.getElementById("projectsLink").addEventListener("click", function (event) {
          event.preventDefault();
          scrollToSection("#page3");
      });
    
      document.getElementById("contactLink").addEventListener("click", function (event) {
          event.preventDefault();
          scrollToSection("#page4");
      });
    });



//page1 animation
function page1Anim(){
  gsap.from(".heading h4, .heading h1, .heading p" , {
    transform: "translateX(-100%)",
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    delay: 5
})
gsap.from(".heading .button" , {
  scale: 0,
  fontSize: 0,
  padding: 0,
  opacity: 0,
  duration: 1.5,
})
gsap.from(".page1 img" ,{
    transform: "translateX(100%)",
    // opacity: 0,
    scale: 0,
    duration: 2,
    stagger: 0.4,
    delay: 5
})
}
page1Anim();


//for marquee animation
// function horizontalLoop(items, config) {
//     items = gsap.utils.toArray(items);
//     config = config || {};
//     let tl = gsap.timeline({
//         repeat: config.repeat,
//         paused: config.paused,
//         defaults: { ease: "none" },
//         onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
//       }),
//       length = items.length,
//       startX = items[0].offsetLeft,
//       times = [],
//       widths = [],
//       xPercents = [],
//       curIndex = 0,
//       pixelsPerSecond = (config.speed || 1) * 100,
//       snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
//       totalWidth,
//       curX,
//       distanceToStart,
//       distanceToLoop,
//       item,
//       i;
//     gsap.set(items, {
//       // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
//       xPercent: (i, el) => {
//         let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
//         xPercents[i] = snap(
//           (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
//             gsap.getProperty(el, "xPercent")
//         );
//         return xPercents[i];
//       },
//     });
//     gsap.set(items, { x: 0 });
//     totalWidth =
//       items[length - 1].offsetLeft +
//       (xPercents[length - 1] / 100) * widths[length - 1] -
//       startX +
//       items[length - 1].offsetWidth *
//         gsap.getProperty(items[length - 1], "scaleX") +
//       (parseFloat(config.paddingRight) || 0);
//     for (i = 0; i < length; i++) {
//       item = items[i];
//       curX = (xPercents[i] / 100) * widths[i];
//       distanceToStart = item.offsetLeft + curX - startX;
//       distanceToLoop =
//         distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
//       tl.to(
//         item,
//         {
//           xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
//           duration: distanceToLoop / pixelsPerSecond,
//         },
//         0
//       )
//         .fromTo(
//           item,
//           {
//             xPercent: snap(
//               ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
//             ),
//           },
//           {
//             xPercent: xPercents[i],
//             duration:
//               (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
//             immediateRender: false,
//           },
//           distanceToLoop / pixelsPerSecond
//         )
//         .add("label" + i, distanceToStart / pixelsPerSecond);
//       times[i] = distanceToStart / pixelsPerSecond;
//     }
//     function toIndex(index, vars) {
//       vars = vars || {};
//       Math.abs(index - curIndex) > length / 2 &&
//         (index += index > curIndex ? -length : length); // always go in the shortest direction
//       let newIndex = gsap.utils.wrap(0, length, index),
//         time = times[newIndex];
//       if (time > tl.time() !== index > curIndex) {
//         // if we're wrapping the timeline's playhead, make the proper adjustments
//         vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
//         time += tl.duration() * (index > curIndex ? 1 : -1);
//       }
//       curIndex = newIndex;
//       vars.overwrite = true;
//       return tl.tweenTo(time, vars);
//     }
//     tl.next = (vars) => toIndex(curIndex + 1, vars);
//     tl.previous = (vars) => toIndex(curIndex - 1, vars);
//     tl.current = () => curIndex;
//     tl.toIndex = (index, vars) => toIndex(index, vars);
//     tl.times = times;
//     tl.progress(1, true).progress(0, true); // pre-render for performance
//     if (config.reversed) {
//       tl.vars.onReverseComplete();
//       tl.reverse();
//     }
//     return tl;
//   }

//   const elems = gsap.utils.toArray(".elem");
//   const loop = horizontalLoop(elems, { paused: false, repeat: -1});
 
//page2 animation

gsap.to(".page2", {
    backgroundColor: "black",
    duration: 2,
    scrollTrigger: {
        trigger: ".page2",
        scroller: "#main",
        // markers: true,
        start: "top 70%",
        end: "top 70%",
        scrub: 2
    }
})

function page2Anim(){
    // var tl1 = gsap.timeline();
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from(".page2 .info h1,.page2 .info p, .page2 .photo", {
      transform: "translateX(-100%)",
      opacity: 0,
      duration: 1,
      stagger: 0.4,
      scrollTrigger: {
        trigger: ".page2 .info h1,.page2 .info p, .page2 .photo",
        scroller: "#main",
        start: "top 90%",
        end: "top 90%",
      }
    })

    // Now you can use ScrollTrigger
    gsap.from(".page2 .skill",{
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: ".page2 .skill",
        scroller: "#main",
        // markers: true,
        start: "top 90%",
        end: "top 90%",
        // scrub: 2
      }
    });

// Hover Effect for Multiple Skill Elements
var skillElements = document.querySelectorAll(".page2 .skill");

skillElements.forEach(function(skillElement) {
  skillElement.addEventListener("mouseenter", function() {
    gsap.to(skillElement, {
    scale: 1.2,
    duration: 0.3

     });
  });

  skillElement.addEventListener("mouseleave", function() {
    gsap.to(skillElement, { 
      scale: 1,
      duration: 0.3
    
    });
  });
});
}
page2Anim();


// page3Anim();
function page3Anim(){
    gsap.from(".page3 h1, .page3 .projects .project",{
        transform: "translateY(-100%)",
        opacity: 0,
        // scale: 0,
        duration: 1.2,
        stagger: 0.5,
        scrollTrigger: {
            trigger: ".page3 h1, .page3 .projects .project",
            scroller: "#main",
            // markers: true,
            start: "top 20%",
            end: "top 20%",
        }
    })
}
page3Anim();


// page4Anim();
function page4Anim(){
  gsap.from(".page4 h1, .page4 .personal p, .page4 .social .soc",{
      transform: "translateX(-100%)",
      opacity: 0,
      // scale: 0,
      duration: 1.2,
      stagger: 0.5,
      scrollTrigger: {
          trigger: ".page4 h1, .page4 .personal p, .page4 .social .soc",
          scroller: "#main",
          // markers: true,
          start: "top 16%",
          end: "top 16%",
      }
  })
}
page4Anim();





//contact form
function contact(){
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyxOksoPcmA_XTYZT2YUbo6in45_42XyO17-ILNnmwnR5JHbO1hNKjQyz8Qf1GXJZIvtA/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.querySelector("#msg")
  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
          msg.innerHTML = "Message sent successfully"
          setTimeout(function(){
            msg.innerHTML = ""
          },5000)
          form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })
}
contact();