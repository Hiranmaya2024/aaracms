// Check authentication
if (!sessionStorage.getItem('isAuthenticated') || sessionStorage.getItem('userType') !== 'customer') 
{
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', async () => 
    {
    const ledgerTable = document.getElementById('ledgerTable');
    const username = sessionStorage.getItem('username');
     // Load customer ledger
        const ledger = await window.getLedger();
        console.log(ledger);
        const userLedger = ledger.filter(row => row[0] === username);
         userLedger.forEach(row => 
            {
            const tr = document.createElement('tr');
            row.forEach(cell => 
                {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
                });
            ledgerTable.appendChild(tr);
           });
    paginateTable('ledgerTable', 10); // Apply pagination
       });
