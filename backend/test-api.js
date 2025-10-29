const axios = require('axios');

async function testAPI() {
    try {
        const testData = {
            studentName: "Test Student",
            courseCode: "TEST101", 
            comments: "This is a test feedback",
            rating: 5
        };

        console.log('Testing POST /api/feedback...');
        const response = await axios.post('http://localhost:5000/api/feedback', testData);
        console.log('✅ POST Success:', response.data);

    } catch (error) {
        console.error('❌ API Test Failed:');
        console.error('Error Message:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

testAPI();