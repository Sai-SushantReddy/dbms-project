// Hamburger Menu Toggle Logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Helper function to debounce rapid clicks
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

// Slider Logic (Reusable for multiple carousels)
const initializeSlider = (containerId, nextBtnId, prevBtnId) => {
  const postsWrapper = document.getElementById(containerId);
  const nextBtn = document.getElementById(nextBtnId);
  const prevBtn = document.getElementById(prevBtnId);
  const posts = postsWrapper.querySelectorAll('.post');

  // Calculate post width with padding/gap
  let postWidth = posts[0].getBoundingClientRect().width + 20;
  let currentPosition = 0;

  // Recalculate max scroll on window resize
  const updateScrollLimits = () => {
    postWidth = posts[0].getBoundingClientRect().width + 20;
    maxScrollPosition = postWidth * (posts.length - Math.floor(postsWrapper.parentElement.clientWidth / postWidth));
    // Reset position if needed to avoid overflow
    currentPosition = Math.min(currentPosition, maxScrollPosition);
    postsWrapper.style.transform = `translateX(-${currentPosition}px)`;
  };

  // Calculate the maximum scrollable distance
  let maxScrollPosition = postWidth * (posts.length - Math.floor(postsWrapper.parentElement.clientWidth / postWidth));

  // Scroll next
  nextBtn.addEventListener('click', debounce(() => {
    if (currentPosition < maxScrollPosition) {
      currentPosition += postWidth;
      postsWrapper.style.transform = `translateX(-${currentPosition}px)`;
    }
  }, 300));

  // Scroll previous
  prevBtn.addEventListener('click', debounce(() => {
    if (currentPosition > 0) {
      currentPosition -= postWidth;
      postsWrapper.style.transform = `translateX(-${currentPosition}px)`;
    }
  }, 300));

  // Update on window resize
  window.addEventListener('resize', updateScrollLimits);
};

// Initialize sliders (can be extended to multiple carousels)
initializeSlider('top-picks', 'nextBtnTop', 'prevBtnTop');
initializeSlider('latest-entertainment', 'nextBtnEnt', 'prevBtnEnt');
initializeSlider('latest-business', 'nextBtnBus', 'prevBtnBus');
initializeSlider('latest-world', 'nextBtnWld', 'prevBtnWld');
initializeSlider('latest-sports', 'nextBtnSpr', 'prevBtnSpr');