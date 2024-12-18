// Load environment variables from a secure source in production
const SHEET_ID = '1ebu403DhcfqRJ6oVTZJHWT98-wxElQ5nx9djk-JoMp0';
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values`;

// Function to get API key from a secure source
function getApiKey() {
    // In production, this should be loaded from environment variables or secure storage
    return sessionStorage.getItem('SHEETS_API_KEY');
}

// Fetch data from a specific sheet range
async function fetchSheetData(range) {
    const API_KEY = getApiKey();
    if (!API_KEY) {
        throw new Error('API key not found');
    }

    const url = `${BASE_URL}/${range}?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.values || [];
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        throw error;
    }
}

// Fetch login credentials
async function getLoginCredentials() {
    return await fetchSheetData('Login!A2:C');
}

// Fetch stock data
async function getStockData() {
    return await fetchSheetData('Stock!A2:C');
}

// Fetch customer ledger
async function getCustomerLedger() {
    return await fetchSheetData('CustomerLedger!A2:B');
}

// Fetch offers
async function getOffers() {
    return await fetchSheetData('Offers!A2:A');
}
