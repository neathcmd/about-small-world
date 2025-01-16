// Adding active class on click to maintain the underline after clicking
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
  });
});

//form function
document.getElementById("user-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const number = document.getElementById("number").value.trim();
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();

  if (!email && !number && !firstName && !lastName) {
    alert("Please fill out your information");
  }
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email.");
    return;
  }
  //number validation
  if (number.length < 7 || number.length > 15) {
    alert("Please enter your phone number");
    return;
  }
  alert("Thank you so much");
});

//interactive donate button
// document.querySelectorAll(".btn-warning").forEach((button) => {
//   button.addEventListener("click", function (e) {
//     const rect = this.getBoundingClientRect();
//     const ripple = document.createElement("span");

//     // Set the ripple position and size
//     const size = Math.max(rect.width, rect.height);
//     ripple.style.width = ripple.style.height = `${size}px`;
//     ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
//     ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

//     ripple.classList.add("ripple");

//     // Append the ripple effect to the button
//     this.appendChild(ripple);

//     // Remove the ripple after the animation
//     ripple.addEventListener("animationend", () => {
//       ripple.remove();
//     });
//   });
// });

// interactive donate button in the form
// document.querySelectorAll(".btn-warning, .btn-primary").forEach((button) => {
//   button.addEventListener("click", function (e) {
//     const rect = this.getBoundingClientRect();
//     const ripple = document.createElement("span");

//     // Set the ripple position and size
//     const size = Math.max(rect.width, rect.height);
//     ripple.style.width = ripple.style.height = `${size}px`;
//     ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
//     ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

//     ripple.classList.add("ripple");

//     // Append the ripple effect to the button
//     this.appendChild(ripple);

//     // Remove the ripple after the animation
//     ripple.addEventListener("animationend", () => {
//       ripple.remove();
//     });
//   });
// });

// about section Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Function to toggle the 'visible' class based on viewport status
function handleScroll() {
  const elements = document.querySelectorAll(".animate-on-view");

  elements.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add("visible");
    } else {
      element.classList.remove("visible"); // Remove visible class when out of view
    }
  });
}

// Listen for scroll events
window.addEventListener("scroll", handleScroll);

// Initial check
handleScroll();

//Introduction-slide-in
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation class when the element is in view
        entry.target.classList.add("fade-in");
      } else {
        // Remove animation class when the element goes out of view
        entry.target.classList.remove("fade-in");
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach((element) => observer.observe(element));
});

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Function to set up a slideshow for a given container
  function setupSlideshow(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const images = container.querySelectorAll(".slideshow-image");
    if (images.length < 2) return; // No slideshow needed if there's only one image

    let currentImageIndex = 0;

    // Function to change the image
    function changeImage() {
      // Fade out the current image
      images[currentImageIndex].style.opacity = 0;

      // Increment the index and loop back to 0 if it exceeds the number of images
      currentImageIndex = (currentImageIndex + 1) % images.length;

      // Fade in the next image
      images[currentImageIndex].style.opacity = 1;
    }

    // Initialize the slideshow by showing the first image
    images[currentImageIndex].style.opacity = 1;

    // Change image every 2.7 seconds (2700 milliseconds)
    setInterval(changeImage, 2700);
  }

  // Set up slideshows for both sections
  setupSlideshow("#introduction .image-slide");
  setupSlideshow("#about .image-slide");
});

//home section image change animation
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".fade-slide");
  const images = [
    "https://whatcanyoudo.earth/wp-content/uploads/2023/04/Conservation-of-forest-and-wildlife-scaled.jpg",
    "https://montepress.com/wp-content/uploads/2021/09/forest-.jpg",
  ];

  // Set background images
  slides.forEach((slide, index) => {
    slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${images[index]}')`;
  });

  let currentIndex = 0;

  // Change slides
  setInterval(() => {
    slides.forEach((slide, index) => {
      slide.classList.remove("active");
      if (index === currentIndex) {
        slide.classList.add("active");
      }
    });

    currentIndex = (currentIndex + 1) % images.length;
  }, 2700);
});

// Select the FAQ section
const faqSection = document.querySelector("#faq");

// Create an Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the 'visible' class when in view
        faqSection.classList.add("visible");
      } else {
        // Remove the 'visible' class when out of view (optional)
        faqSection.classList.remove("visible");
      }
    });
  },
  { threshold: 0.1 }
);

// Observe the FAQ section
observer.observe(faqSection);

// Select the Vision section
const visionSection = document.querySelector("#vision");

// Create an Intersection Observer to fade in the background
const visionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the 'visible' class to make the background fade in
        visionSection.classList.add("visible");
      } else {
        // Remove 'visible' when out of view
        visionSection.classList.remove("visible");
      }
    });
  },
  { threshold: 0.2 } // Adjust the threshold if needed
);

// Observe the Vision section
visionObserver.observe(visionSection);

// Create an Intersection Observer to animate the text when in view
const textElements = document.querySelectorAll(".text-slide");
const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.2 }
);

// Observe all text elements
textElements.forEach((text) => {
  textObserver.observe(text);
});
