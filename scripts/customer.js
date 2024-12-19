// Check authentication
if (!sessionStorage.getItem('isAuthenticated') || sessionStorage.getItem('userType') !== 'customer') {
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', async () => {
    const offersList = document.getElementById('offersList');
    const ledgerTable = document.getElementById('ledgerTable');
    const username = sessionStorage.getItem('username');

    try {
        // Load offers
        const offers = await window.getOffers();
        offers.forEach(offer => {
            const li = document.createElement('li');
            li.textContent = offer[0];
            offersList.appendChild(li);
        });

        // Load customer ledger
       // const ledger = await window.getCustomerLedger;
        const ledger = await window.getLedger();
        console.log(ledger);
        const userLedger = ledger.filter(row => row[0] === username);
        
        userLedger.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            ledgerTable.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading customer data:', error);
        alert('Error loading data. Please try again later.');
    }
});
