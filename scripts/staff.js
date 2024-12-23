document.addEventListener('DOMContentLoaded', async () => {
    const stockTable = document.getElementById('stockTable');
    const customerLedgerTable = document.getElementById('customerLedgerTable');

    // Check authentication
    if (!sessionStorage.getItem('isAuthenticated') || sessionStorage.getItem('userType') !== 'staff') {
        window.location.href = '../index.html';
        return; // Important: Exit the function early after redirection
    }

    try {
        // Load stock data
        const stockData = await window.getStockData();
        stockData.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            stockTable.appendChild(tr);
        });

        // Load all customer ledgers
        const customerLedger = await window.getCustomerLedger();
        customerLedger.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            customerLedgerTable.appendChild(tr);
        });


    } catch (error) {
        console.error('Error loading data:', error); 
        alert('Error loading data. Please try again later.');
    }
});
