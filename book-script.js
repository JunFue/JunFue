
/* -----------------------------------------------------------
   GRAB ELEMENTS
----------------------------------------------------------- */
const book       = document.getElementById('book');
const cover      = document.getElementById('cover-container');
const leaves     = document.querySelectorAll('[id^="leaf-"]'); // all pages
const fullscreen = document.getElementById('fullscreen');      // icon button

/* -----------------------------------------------------------
   STATE
----------------------------------------------------------- */
let clickCount   = 0;      // 0 = closed book
let isFullscreen = false;  // true ⇢ book is in fullscreen mode

/* -----------------------------------------------------------
   FULLSCREEN HELPERS
----------------------------------------------------------- */
function enterFullscreen () {
  book.classList.add('fullscreen');
  fullscreen.classList.replace('bx-fullscreen', 'bx-exit-fullscreen');
  isFullscreen = true;
}
function exitFullscreen () {
  book.classList.remove('fullscreen');
  fullscreen.classList.replace('bx-exit-fullscreen', 'bx-fullscreen');
  isFullscreen = false;
}

/* toggle on icon click */
fullscreen.addEventListener('click', () =>
  isFullscreen ? exitFullscreen() : enterFullscreen()
);

/* -----------------------------------------------------------
   PAGE‑FLIP HELPERS
----------------------------------------------------------- */
function flipCurrentLeaf () {
  const idx = clickCount - 4;             // first leaf corresponds to click 4
  if (idx >= 0 && idx < leaves.length) {
    leaves[idx].classList.add('flip');
  }
}
function unflipCurrentLeaf () {
  const idx = clickCount - 4;
  if (idx >= 0 && idx < leaves.length) {
    leaves[idx].classList.remove('flip');
  }
}

/* -----------------------------------------------------------
   BOOK NAVIGATION
----------------------------------------------------------- */
function nextStep () {
  clickCount++;
  switch (clickCount) {
    case 1:  // glow & tilt
      book.classList.add('bookAnimation1', 'glow-active');
      break;
    case 2:  // second tilt
      book.classList.add('bookAnimation2');

      break;
    case 3:  // open the cover

      cover.classList.add('coverFlip');
      book.classList.remove('glow-active');
      // ensure icon reflects current fullscreen state
      fullscreen.classList.add('bx-fullscreen')
      break;
    default: // page turns (clicks 4 – 14)
      if (clickCount >= 4 && clickCount <= 14) flipCurrentLeaf();
      else if (clickCount > 14) clickCount = 14; // cap at last page
  }
}

function previousStep () {
  if (clickCount >= 4 && clickCount <= 14) {
    unflipCurrentLeaf();                 // un‑turn current page
  } else {
    switch (clickCount) {
      case 3:  // close the cover
        cover.classList.remove('coverFlip');
        book.classList.add('glow-active');
        fullscreen.classList.remove("bx-fullscreen");
        fullscreen.classList.remove("bx-exit-fullscreen");
        book.classList.remove('fullscreen')
        break;
      case 2:
        book.classList.remove('bookAnimation2');
        break;
      case 1:
        book.classList.remove('bookAnimation1', 'glow-active');
        break;
    }
  }
  if (clickCount > 0) clickCount--;      // move the counter back
}

/* -----------------------------------------------------------
   KEYBOARD CONTROLS
----------------------------------------------------------- */
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowRight': nextStep();      break;
    case 'ArrowLeft' : previousStep();  break;
    case 'Escape'    : resetBook();     break;
  }
});

/* -----------------------------------------------------------
   MOUSE CONTROLS (left/right click on the book)
----------------------------------------------------------- */
book.addEventListener('mousedown', e => {
  if (e.button === 2) {                 // right‑click → previous
    e.preventDefault();
    previousStep();
  } else if (e.button === 0) {          // left‑click  → next
    nextStep();
  }
});
document.addEventListener('contextmenu', e => e.preventDefault()); // suppress menu

/* -----------------------------------------------------------
   RESET ALL (Esc key)
----------------------------------------------------------- */
function resetBook () {
  book.classList.remove(
    'fullscreen', 'bookAnimation1', 'bookAnimation2', 'glow-active'
  );
  cover.classList.remove('coverFlip');
  leaves.forEach(l => l.classList.remove('flip'));
  exitFullscreen();          // guarantees icon & state are normal
  clickCount = 0;
}