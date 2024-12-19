// Use configuration from config.js (config object is loaded from config.js script)
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${config.SHEET_ID}/values`;

// Function to get API key from config
function getApiKey() {
    if (!config.API_KEY) {
        throw new Error('API key not configured. Please set it in config.js');
    }
    return config.API_KEY;
}

// Fetch data from a specific sheet range
async function fetchSheetData(range) {
    const API_KEY = getApiKey();
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
