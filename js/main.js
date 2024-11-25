(() => {
  console.log("IIFE Fired");
  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  //console.log(hotspots);

  //array
  const annotation = [
    {
      name: "Charging Light",
      description: "LED charging lights on the buds indicate the charge % of each earbud when you put them in the case."
    },
    {
      name: "Comfort Fitment Piece",
      description: "Ensure perfect ear fitment with 3 different sized Comfort Pieces."
    },
    {
      name: "Charging Points",
      description: "Up to 12 hours of battery life in 30 minutes with our new fast-charge technology."
    },
    {
      name: "Mesh Speakers",
      description: "High quality fine carbon-fibre mesh speakers will give you a premium listening experience you can't find anywhere else."
    },
    {
      name: "Loop",
      description: "The loop. It's what sets the Loop Pods apart. Hear or filter out your environment with varial decibel control.The loop also ensures zero discomfort and all- day wearability.This is where our innovative Lossless Hi-Fi audio drivers are kept."
    },
    {
      name: "Battery Housing",
      description: "The battery housing is made of premium recycled plastic with a nice smooth gloss finish."
    }
  ];

  //functions

  //fill hotspots with array content
  hotspots.forEach((hotspot, index) => {
    const annotationContent = annotation[index];
    if (annotationContent) {
      const title = hotspot.querySelector("h2");
      const description = hotspot.querySelector("p");

      title.textContent = annotationContent.name;
      description.textContent = annotationContent.description;
    }
  });

  function showInfo(e) {
    //console.log("showInfo called")
    //console.log(e.currentTarget.slot);
    let selected = document.querySelector(`button[slot="${e.currentTarget.slot}"] > div`);
    //console.log(selected)
    gsap.to(selected, 1, { autoAlpha: 1 })
  }

  function hideInfo(e) {
    //console.log("hideInfo called");
    let selected = document.querySelector(`button[slot="${e.currentTarget.slot}"] > div`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //eventListeners
  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo)
  });


  /*green sock hotspot animation (NOT WORKING, WILL DEVELOP)
  const startAnim = gsap.to(".hotspot", {
    rotation: "+=360",
    ease: "power1.in",
    duration: 3,
    onComplete: () => loopAnim.play()
  });*/
})();



// X-ray
(() => {
  (function () {
    "use strict";


    var imageCon = document.querySelector('#imageCon'),
      drag = document.querySelector('.image-drag'),
      left = document.querySelector('.image-left'),
      dragging = false,
      min = 0,
      max = imageCon.offsetWidth;
    //The HTMLElement.offsetWidth read-only property returns the layout width of an element. 

    function onDown() {
      dragging = true;
    }

    function onUp() {
      dragging = false;
    }

    function onMove(event) {
      if (dragging === true) {
        var x = event.clientX - imageCon.getBoundingClientRect().left;
        //The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred
        //The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
        //X-coordinate, relative to the viewport origin, of the left of the rectangle box. Read only
        console.log(event.clientX);
        console.log(imageCon.getBoundingClientRect().left);
        //need logic to keep slider in box
        if (x < min) { //if x less than 0
          x = min;    //set x = 0
        }
        else if (x > max) { //otherwise if x is greater than 900
          x = max - 4; //set x to equal the max width minus 2 (width of slider)
        }
        drag.style.left = x + 'px';
        left.style.width = x + 'px';
      }
    }

    drag.addEventListener('mousedown', onDown, false);
    //add listener to actual drag div, if user clicks on it
    //drag.addEventListener('touchstart', onDown);
    document.body.addEventListener('mouseup', onUp, false);
    //document.body.addEventListener('mo', onUp);
    document.body.addEventListener('mousemove', onMove, false);
    //document.body.addEventListener('touchmove', onMove);

  })();


  /*231-187.5 = 43.5.  43.5 is how much of the car is left showing*/

  /*
  The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred (as opposed to the coordinates within the page). For example, clicking in the top-left corner of the client area will always result in a mouse event with a clientX value of 0, regardless of whether the page is scrolled horizontally.
  */


})();

//earbuds scrolling animatiom

//VIDEO SCROLLING ANIMATION
//Source https://codepen.io/wisearts/pen/ExZGrbZ
gsap.registerPlugin(ScrollTrigger);

const coolVideo = document.querySelector("video");

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "video",
    pin: true,
    start: "top top",
    scrub: true,
    markers: false
  }
});

coolVideo.onloadedmetadata = function () {
  tl.to(coolVideo, { currentTime: coolVideo.duration });
};

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
if (isTouchDevice()) {
  coolVideo.play();
  coolVideo.pause();
}

/* CANVAS SCROLLING ANIMATION

(() => {
  gsap.registerPlugin(ScrollTrigger)

  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  const frameCount = 401; //how many still frames do we have?

  const images = []; // array to hold all of our images

  // object literal, that has a property of frame to hold the current frame 
  const buds = {
    frame: 0
  }

  // run a for loop to populate our images array
  for (let i = 0; i < frameCount; i++) {
    // console.log(i);
    const img = new Image();
    // string i am trying to create: images/explode_0013.webp
    img.src = `images/sequence/earbuds-frame${(i + 1).toString().padStart(4, '0')}.png`;
    images.push(img);
  }

  // console.table(images);

  // we are not actually animating a DOM element, but rather than object
  //which contains a frame count, as the user scrolls we increase the value by 1 
  // We tell greensock there is a total of 449 frames to cycle through, so it knows when to stop
  // Greensock scrolling uses decimals so we use "snap" to give whole numbers. 
  gsap.to(buds, {
    frame: 400,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 2,
      markers: false,
      start: "top, top",
    },
    onUpdate: render
  })

  images[0].addEventListener("load", render);

  function render() {
    // console.log(buds.frame);
    // console.log(images[buds.frame])
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
  }

})();

*/

//Smooth scroll
gsap.registerPlugin(ScrollSmoother)

ScrollSmoother.create({
  smooth: 1,
  effects: true,
});