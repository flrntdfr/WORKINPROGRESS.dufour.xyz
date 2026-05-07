/* 
 * Test Apple Music Developer Token
 * This script makes a direct API call to verify the token works
 */

const APPLE_MUSIC_TOKEN = process.env.APPLE_MUSIC_TOKEN;

if (!APPLE_MUSIC_TOKEN) {
  console.error('Error: APPLE_MUSIC_TOKEN environment variable is not set.');
  process.exit(1);
}

console.log('\n🧪 Testing Apple Music Developer Token...\n');
console.log('═'.repeat(60));

/* Test 1: Call a public catalog endpoint */
async function testCatalogAccess() {
  console.log('\n📡 Test 1: Catalog API Access (Public)');
  console.log('   Endpoint: /v1/catalog/us/songs/203709340');
  
  try {
    const response = await fetch(
      'https://api.music.apple.com/v1/catalog/us/songs/203709340',
      {
        headers: {
          'Authorization': `Bearer ${APPLE_MUSIC_TOKEN}`
        }
      }
    );
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('   ✓ SUCCESS! Token is valid for catalog access');
      console.log(`   Song: "${data.data[0].attributes.name}" by ${data.data[0].attributes.artistName}`);
      return true;
    } else {
      const errorText = await response.text();
      console.log('   ❌ FAILED');
      console.log(`   Error: ${errorText}`);
      return false;
    }
  } catch (error) {
    console.log('   ❌ FAILED');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

/* Test 2: Call storefronts endpoint (requires valid token) */
async function testStorefronts() {
  console.log('\n📡 Test 2: Storefronts API (Token validation)');
  console.log('   Endpoint: /v1/storefronts');
  
  try {
    const response = await fetch(
      'https://api.music.apple.com/v1/storefronts',
      {
        headers: {
          'Authorization': `Bearer ${APPLE_MUSIC_TOKEN}`
        }
      }
    );
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('   ✓ SUCCESS! Token is properly signed');
      console.log(`   Available storefronts: ${data.data.length}`);
      return true;
    } else {
      const errorText = await response.text();
      console.log('   ❌ FAILED');
      console.log(`   Error: ${errorText}`);
      return false;
    }
  } catch (error) {
    console.log('   ❌ FAILED');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

/* Run tests */
async function runTests() {
  console.log('\nDeveloper Token (first 50 chars): ' + APPLE_MUSIC_TOKEN.substring(0, 50) + '...');
  console.log('Token length: ' + APPLE_MUSIC_TOKEN.length + ' characters\n');
  
  const test1 = await testCatalogAccess();
  const test2 = await testStorefronts();
  
  console.log('\n═'.repeat(60));
  console.log('\n📊 Results:');
  console.log(`   Catalog Access:   ${test1 ? '✓ PASS' : '❌ FAIL'}`);
  console.log(`   Token Validation: ${test2 ? '✓ PASS' : '❌ FAIL'}`);
  
  if (test1 && test2) {
    console.log('\n✅ Your Developer Token is VALID and works with Apple Music API!');
    console.log('\n💡 The "Unauthorized" error in MusicKit.js might be due to:');
    console.log('   1. Browser cache - try in an Incognito/Private window');
    console.log('   2. The MusicKit Identifier needs specific configuration');
    console.log('   3. Your key might need to be recreated with proper MusicKit setup');
    console.log('\n🔧 Next step: Try opening get-user-token.html in a private/incognito window');
  } else {
    console.log('\n❌ Your Developer Token is INVALID');
    console.log('\n🔧 Solutions:');
    console.log('   1. Verify Team ID and Key ID are correct');
    console.log('   2. Make sure you downloaded the correct .p8 private key file');
    console.log('   3. Regenerate the token: npm run generate-token');
  }
  
  console.log('\n');
}

runTests().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});
