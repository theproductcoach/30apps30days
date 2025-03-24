async function testRateLimit() {
  console.log('Starting rate limit test...');
  
  // Make 12 requests (more than our limit of 10)
  for (let i = 0; i < 12; i++) {
    console.log(`\nRequest ${i + 1}:`);
    
    try {
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vibe: 1 }),
      });

      const headers = response.headers;
      console.log('Rate Limit Headers:');
      console.log('  Limit:', headers.get('x-ratelimit-limit'));
      console.log('  Remaining:', headers.get('x-ratelimit-remaining'));
      console.log('  Reset:', headers.get('x-ratelimit-reset'));
      
      const data = await response.json();
      
      if (response.status === 429) {
        console.log('Rate limit exceeded:', data.error);
      } else {
        console.log('Response:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Small delay between requests to make output more readable
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

testRateLimit(); 