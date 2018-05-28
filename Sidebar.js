(function() {
  // Cache references to the DOM to avoid checking later
  const container = document.getElementById('sidebar');
  const toggleButton = document.getElementById('toggle-sidebar');
  
  // Store sidebar state away from the DOM
  let visible = false;
  let lastFocusedElement;

  // Listen for clicks to open/close the sidebar
  container.addEventListener('click', hideSidebarCheck);
  toggleButton.addEventListener('click', toggleSidebar);

  // Make sure no users can interact with the menu when it's not visible
  makeLinksNonFocusable();
  
  // Check to see if the click registered should hide the sidebar or not
  function hideSidebarCheck(e) {
    if (e.target.id === 'sidebar' || e.target.nodeName == "A") {
      hideSidebar();
    }
  }

  // Toggle the visibility of the sidebar
  function toggleSidebar() {
    if (visible) {
      hideSidebar();
    } else {
      showSidebar();
    }
  }

  // Show the sidebar
  function showSidebar() {
    // Add a class to trigger the CSS animation in
    container.classList.add('sidebar--visible');

    // Allow the links to be clicked
    makeLinksFocusable();

    // Store the last focused element to return to once the the sidebar closes
    lastFocusedElement = document.activeElement;

    // Focus on the first element within the sidebar
    container.getElementsByTagName('a')[0].focus();

    // Keep internal state up to date
    visible = true;
  }

  // Hide the sidebsr
  function hideSidebar() {
    // Remove a class to trigger the CSS animation out    
    container.classList.remove('sidebar--visible');

    // Don't allow the links to be clicked
    makeLinksNonFocusable();

    // Return focus to the previous element
    lastFocusedElement.focus();
    lastFocusedElement = undefined;

    // Keep internal state up to date
    visible = false;
  }

  // Return all links to the tab order
  function makeLinksFocusable() {
    Array.from(container.getElementsByTagName('a')).forEach(link => {
      link.tabIndex = 0;
    });
  }

  // Remove links from the tab order
  function makeLinksNonFocusable() {
    Array.from(container.getElementsByTagName('a')).forEach(link => {
      link.tabIndex = -1;
    });
  }
})();