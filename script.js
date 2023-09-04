import sublinks from "./data.js";

const linkBtns = document.querySelectorAll('.link-btn');
const sublinkContainer = document.querySelector('.sublinks');
const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarContainer = document.querySelector('.sidebar-container')

// hide/show sideabar
toggleBtn.addEventListener('click', () => {
  sidebarContainer.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  console.log('Close button clicked');
  sidebarContainer.classList.remove('show');
});

//POINTER FUNCTIONALITY
// Display the sublinks container
sublinkContainer.style.display = 'block';

// Display the pointer element
const pointer = sublinkContainer.querySelector('.pointer');
if (pointer) {
  pointer.style.display = 'block';
}
// Clear the existing sublinks
sublinkContainer.innerHTML = '';

// Hide the sublinks container
sublinkContainer.style.display = 'none';

// Hide the pointer element
if (pointer) {
  pointer.style.display = 'none';
}

linkBtns.forEach((btn) => {
    btn.addEventListener('mouseover', function () {
      // Clear the existing sublinks
      sublinkContainer.innerHTML = '';

      // Get the text content of the clicked button and normalize it
      const buttonText = btn.textContent.trim().toLowerCase();
  
      // Find the sublinks data with a case-insensitive comparison
      const selectedSublinks = sublinks.find(
        (sublink) => sublink.page.toLowerCase() === buttonText
      );
  
      if (selectedSublinks) {
        // Generate HTML for the selected sublinks
        const sublinkHTML = `
        <div class="submenu">
        <div class="pointer"></div>
          <h2>${selectedSublinks.page}</h2>
          <ul class="links">
            ${selectedSublinks.links.map((link) => `
              <li><a href="${link.url}"><i class="${link.icon}"></i>${link.label}</a></li>
            `).join('')}
          </ul>
        </div>
      `;

      // Set the innerHTML of the container
      sublinkContainer.innerHTML = sublinkHTML;

      // Get the dimensions of the button that was clicked
      const buttonRect = btn.getBoundingClientRect();

      // Position the sublinks container based on the button's dimensions
      sublinkContainer.style.top = `${buttonRect.bottom}px`;
      sublinkContainer.style.left = `${buttonRect.left}px`;

      // Display the sublinks container
      sublinkContainer.style.display = 'block';
    }
  });
});


const sidebarWrapper = document.querySelector('.sidebar-links'); // Sidebar wrapper
const sidebarHTML = sublinks.map((item) => {
  const { links, page } = item;
  return `<article>
    <h4>${page}</h4>
    <ul class="sidebar-sublinks">
      ${links.map((link) => {
          return `<a href="${link.url}"><i class="${link.icon}"></i>${link.label}</a>`;
        })
        .join('')}
    </ul>
  </article>`;
});

sidebarWrapper.innerHTML = sidebarHTML.join('');