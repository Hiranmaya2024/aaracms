function paginateTable(tableId, rowsPerPage) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.rows);
  const paginationContainer = document.getElementById('paginationContainer');
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  function renderPage(page) {
    tbody.innerHTML = ''; // Clear the table
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    rows.slice(start, end).forEach(row => tbody.appendChild(row));

    // Update pagination
    Array.from(paginationContainer.children).forEach(btn =>
      btn.classList.remove('active')
    );
    document
      .querySelector(`.pagination-btn[data-page="${page}"]`)
      .classList.add('active');
  }

  function setupPagination() {
    paginationContainer.innerHTML = ''; // Clear previous buttons

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.classList.add('pagination-btn');
      button.textContent = i;
      button.dataset.page = i;
      button.onclick = () => renderPage(i);
      paginationContainer.appendChild(button);
    }

    renderPage(1); // Default to first page
  }

  setupPagination();
}
