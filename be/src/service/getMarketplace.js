const axios = require('axios');

async function getMarketplace() {
    try {
        const response = await axios.get('https://api.example.com/marketplace');
        return response;
    } catch (error) {
        console.error('Error fetching marketplace data:', error);
        throw error;
    }
}

module.exports = getMarketplace;