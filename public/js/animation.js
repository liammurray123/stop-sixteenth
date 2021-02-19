// Homepage Animations
var homeTL = gsap.timeline();
homeTL.set("section#header div#title a#explorebutton", {bottom: 0});
homeTL.from("section#header div#title h1", {duration: 2, right: +5, opacity: 0});
homeTL.from("section#header div#title a#explorebutton", {duration: 2, bottom: +5, opacity: 0});
homeTL.to("section#header div#title", {scrollTrigger: {trigger: "section#header", start: "top top", end: "bottom top", scrub: true, markers: false, }, duration: 2, clipPath:"polygon(60% 0, 60% 0, 40% 100%, 40% 100%)"});

const exploreButton = document.getElementById('explorebutton');

exploreButton.onclick = () => {
  gsap.to(window, {duration: 2, scrollTo:"#newsection"});
};


const topButton = document.getElementById('backtotop');
topButton.onclick = () => {
  gsap.to(window, {duration: 2, scrollTo:"#header"});
};
// DOM Elements

const darkButton = document.getElementById('darkbutton');
const body = document.body;

// Apply the cached theme on reload
const theme = localStorage.getItem('theme');

if (theme == 'dark') {
    body.classList.replace('light', 'dark');
}



// Button Event Handlers


darkButton.onclick = () => {
  if (body.classList.contains('light')) {
    body.classList.replace('light', 'dark');
  localStorage.setItem('theme', 'dark');

  } else {
    body.classList.replace('dark', 'light');
  localStorage.setItem('theme', 'light');
  }
};
// 