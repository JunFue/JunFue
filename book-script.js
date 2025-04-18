const book = document.getElementById('book');
const cover = document.getElementById('cover-container');
// Select all leaf elements whose id begins with 'leaf-'
const leaf = document.querySelectorAll('[id^="leaf-"]');
let clickCount = 0;


function flipCurrentLeaf() {
  // The first leaf corresponds to clickCount === 4
  let leafIndex = clickCount - 4;

  if (leafIndex >= 0 && leafIndex < leaf.length) {
    leaf[leafIndex].classList.add('flip');
  } else if (leafIndex >= leaf.length){
    leafIndex = leaf.length + 1;
    clickCount = 15
  }
}


function unflipCurrentLeaf() {
  const leafIndex = clickCount - 4;
  if (leafIndex >= 0 && leafIndex < leaf.length) {
    leaf[leafIndex].classList.remove('flip');
   
  }
}


function nextStep() {
  clickCount++;
  if (clickCount === 1) {
    book.classList.add('bookAnimation1', 'glow-active');
  } else if (clickCount === 2) {
    book.classList.add('bookAnimation2');
  } else if (clickCount === 3) {
    cover.classList.add('coverFlip');
    book.classList.remove('glow-active');
  } else if (clickCount >= 4 && clickCount <= 14) {
    flipCurrentLeaf();
  }
  if (clickCount > 14) {
    clickCount = 14;
  }
}


function previousStep() {
  if (clickCount >= 4 && clickCount <= 14) {
    unflipCurrentLeaf();
  } else if (clickCount === 3) {
    cover.classList.remove('coverFlip');
    // Restore glow if needed for step 1
    book.classList.add('glow-active');
  } else if (clickCount === 2) {
    book.classList.remove('bookAnimation2');
  } else if (clickCount === 1) {
    book.classList.remove('bookAnimation1', 'glow-active');
  }
  if (clickCount > 0) {
    clickCount--;
  }
}


document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case "ArrowRight":
      nextStep();
      break;
    case "ArrowLeft":
      previousStep();
      break;
    case "Escape":
      // Reset everything
      book.classList.remove('bookAnimation1', 'bookAnimation2', 'glow-active');
      cover.classList.remove('coverFlip');
      // Remove 'flip' from all leaves
      leaf.forEach(leaf => leaf.classList.remove('flip'));
      clickCount = 0;
      break;
    default:
      break;
  }
});


// Also advance step on clicking the book.
book.addEventListener('mousedown', (e) => {
  if (e.button === 2){
    e.preventDefault();
    previousStep();
  } else if (e.button === 0){
    nextStep();
  }
});
