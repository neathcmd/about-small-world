// Add this function for the Learn More button
function showImpactDetails() {
  // Create a Bootstrap modal dynamically
  const modalHtml = `
    <div class="modal fade" id="impactModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Our Impact in Detail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <h5><i class="fas fa-tree text-success"></i> Tree Planting Impact</h5>
                            <ul class="list-unstyled">
                                <li>• 500,000 native species planted</li>
                                <li>• 400,000 fruit-bearing trees</li>
                                <li>• 100,000 rare species preserved</li>
                            </ul>
                        </div>
                        <div class="col-md-6 mb-4">
                            <h5><i class="fas fa-globe-americas text-info"></i> Global Reach</h5>
                            <ul class="list-unstyled">
                                <li>• Active in 25 countries</li>
                                <li>• 50+ local partnerships</li>
                                <li>• 15 conservation zones</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <h5><i class="fas fa-mountain text-warning"></i> Protected Areas</h5>
                            <ul class="list-unstyled">
                                <li>• 30,000 acres of rainforest</li>
                                <li>• 15,000 acres of woodland</li>
                                <li>• 5,000 acres of wetlands</li>
                            </ul>
                        </div>
                        <div class="col-md-6 mb-4">
                            <h5><i class="fas fa-handshake text-primary"></i> Community Impact</h5>
                            <ul class="list-unstyled">
                                <li>• 1,000+ jobs created</li>
                                <li>• 50 educational programs</li>
                                <li>• 25 indigenous partnerships</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

  // Add modal to body if it doesn't exist
  if (!document.getElementById("impactModal")) {
    document.body.insertAdjacentHTML("beforeend", modalHtml);
  }

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById("impactModal"));
  modal.show();
}
// Initialize AOS
AOS.init();

// Counter Animation
const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
  const target = parseInt(counter.getAttribute("data-target"));
  const increment = target / 100;

  function updateCount() {
    const count = parseInt(counter.innerText);
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target.toLocaleString();
    }
  }

  // Start counter when element is in view
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      updateCount();
    }
  });

  observer.observe(counter);
});

// Progress Bar Animation
const progressBars = document.querySelectorAll(".progress-bar");
progressBars.forEach((bar) => {
  const target = bar.getAttribute("data-target");
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bar.style.width = target + "%";
      bar.innerText = target + "%";
    }
  });
  observer.observe(bar);
});

// Timeline Animation
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});

// Modal Functionality
function showDonateModal() {
  const modal = new bootstrap.Modal(document.getElementById("donateModal"));
  modal.show();
}

// Form Submission
document.getElementById("donateForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const amount = document.getElementById("donationAmount").value;
  alert(
    `Thank you for your donation of $${amount}! This will help us plant ${amount} trees.`
  );
  bootstrap.Modal.getInstance(document.getElementById("donateModal")).hide();
});

//donor-function
// Animation and Interaction Logic
document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations
  setupDonorWallAnimations();

  // Initialize interactive features
  setupInteractiveFeatures();

  // Update statistics
  updateDonorStats();
});

function setupDonorWallAnimations() {
  const cards = document.querySelectorAll(".donor-card");
  let delay = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("slide-in");
          }, delay);
          delay = 0;
        } else {
          entry.target.classList.remove("slide-in");
          entry.target.classList.add("slide-out");
          setTimeout(() => {
            entry.target.classList.remove("slide-out");
          }, 500);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  cards.forEach((card) => observer.observe(card));
}

function setupInteractiveFeatures() {
  // Search functionality
  const searchInput = document.getElementById("searchDonors");
  searchInput.addEventListener("input", filterDonors);

  // Sorting functionality
  const sortSelect = document.getElementById("sortDonors");
  sortSelect.addEventListener("change", sortDonors);

  // Filter buttons
  document.querySelectorAll(".filter-pill").forEach((button) => {
    button.addEventListener("click", (e) => {
      document
        .querySelectorAll(".filter-pill")
        .forEach((btn) => btn.classList.remove("btn-success", "text-white"));
      e.target.classList.add("btn-success", "text-white");
      filterDonors();
    });
  });

  // Card click handling
  document.querySelectorAll(".donor-card").forEach((card) => {
    card.addEventListener("click", () => showDonorDetails(card));
  });
}

function filterDonors() {
  const searchTerm = document
    .getElementById("searchDonors")
    .value.toLowerCase();
  const selectedFilter = document.querySelector(".filter-pill.btn-success")
    .dataset.filter;

  document.querySelectorAll(".donor-card").forEach((card) => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const donorType = card.dataset.donorType;

    const matchesSearch = name.includes(searchTerm);
    const matchesFilter =
      selectedFilter === "all" || donorType === selectedFilter;

    card.style.display = matchesSearch && matchesFilter ? "flex" : "none";
  });
}

function sortDonors() {
  const sortBy = document.getElementById("sortDonors").value;
  const cards = Array.from(document.querySelectorAll(".donor-card"));
  const grid = document.querySelector(".donor-grid");

  cards.sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      case "amount":
        return parseInt(b.dataset.amount) - parseInt(a.dataset.amount);
      case "name":
        return a
          .querySelector("h3")
          .textContent.localeCompare(b.querySelector("h3").textContent);
    }
  });

  cards.forEach((card) => grid.appendChild(card));
}

function updateDonorStats() {
  // Simulate loading stats
  const stats = {
    totalDonors: 4,
    totalAmount: 2500,
    avgDonation: 625,
    treesPlanted: 2500,
  };

  document.querySelector(".total-donors").textContent = stats.totalDonors;
  document.querySelector(".total-amount").textContent = `$${stats.totalAmount}`;
  document.querySelector(".avg-donation").textContent = `$${stats.avgDonation}`;
  document.querySelector(".trees-planted").textContent = stats.treesPlanted;
}

// Handle donation form submission
// document
//   .getElementById("donationForm")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();

//     // Show loading state
//     document.querySelector(".loading-spinner").style.display = "flex";

//     // Simulate processing
//     setTimeout(() => {
//       document.querySelector(".loading-spinner").style.display = "none";
//       bootstrap.Modal.getInstance(
//         document.getElementById("donationModal")
//       ).hide();

//       // Add new donor card with animation
//       addNewDonor({
//         name: this.querySelector('input[type="text"]').value,
//         location: this.querySelector('input[type="text"]:nth-of-type(2)').value,
//         amount: this.querySelector("select").value,
//         message: this.querySelector("textarea").value,
//       });
//     }, 1500);
//   });

// function addNewDonor(donor) {
//   const card = createDonorCard(donor);
//   document.querySelector(".donor-grid").prepend(card);
//   card.classList.add("new-donor", "slide-in");
//   updateDonorStats();
// }

// function createDonorCard(donor) {
//   const card = document.createElement("div");
//   card.className = "donor-card";
//   card.dataset.date = new Date().toISOString();
//   card.dataset.amount = donor.amount;
//   card.innerHTML = `
//     <h3>${donor.name}</h3>
//     <p>${donor.location}</p>
//     <p>$${donor.amount}</p>
//     <p>${donor.message}</p>
//   `;
//   return card;
// }
