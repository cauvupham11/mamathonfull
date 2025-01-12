const axios = require('axios');

async function uploadPetInfo(petInfo) {
    try {
        const response = await axios.post(process.env.CELESTIA_API_URL, petInfo, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log('Pet info uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error uploading pet info:', error);
    }
}

const petInfo = {
    name: 'Buddy',
    age: 3,
    type: 'Dog',
    breed: 'Golden Retriever'
};

uploadPetInfo(petInfo);