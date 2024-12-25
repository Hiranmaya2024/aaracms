function paginateTable(tableId, rowsPerPage) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.rows);
  const paginationContainer = document.getElementById(`paginationContainer${tableId.charAt(0).toUpperCase() + tableId.slice(1)}`); // Dynamic container ID
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  let currentPage = 1; // Track the current page

  // Function to render a specific page
  function renderPage(page) {
    tbody.innerHTML = ''; // Clear the table
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    rows.slice(start, end).forEach(row => tbody.appendChild(row));

    // Update the state of the navigation buttons
    document.getElementById('prevBtn').disabled = page === 1;
    document.getElementById('nextBtn').disabled = page === totalPages;
  }

  // Function to setup the pagination controls
  function setupPagination() {
    paginationContainer.innerHTML = ''; // Clear previous buttons

    // Create Previous Button
    const prevButton = document.createElement('button');
    prevButton.id = 'prevBtn';
    prevButton.textContent = 'Previous';
    prevButton.classList.add('btn', 'btn-secondary', 'me-2');
    prevButton.disabled = true; // Initially disabled
    prevButton.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    };
    paginationContainer.appendChild(prevButton);

    // Create Next Button
    const nextButton = document.createElement('button');
    nextButton.id = 'nextBtn';
    nextButton.textContent = 'Next';
    nextButton.classList.add('btn', 'btn-secondary', 'ms-2');
    nextButton.disabled = totalPages === 1; // Disable if only one page
    nextButton.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    };
    paginationContainer.appendChild(nextButton);

    renderPage(currentPage); // Render the first page
  }

  setupPagination();
}
