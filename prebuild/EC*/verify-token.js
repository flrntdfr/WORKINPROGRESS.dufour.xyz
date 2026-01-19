import jwt from 'jsonwebtoken';

/* 
 * Verify and decode Apple Music Developer Token
 * This script helps debug token issues by showing what's inside your JWT
 */

const token = process.env.APPLE_MUSIC_TOKEN;

if (!token) {
  console.error('Error: APPLE_MUSIC_TOKEN environment variable is not set.');
  process.exit(1);
}

console.log('\n🔍 Analyzing Developer Token...\n');
console.log('═'.repeat(60));

/* Decode without verification (just to see what's inside) */
try {
  const decoded = jwt.decode(token, { complete: true });
  
  if (!decoded) {
    console.error('❌ Token is malformed or not a valid JWT');
    process.exit(1);
  }
  
  console.log('\n📋 Token Header:');
  console.log(JSON.stringify(decoded.header, null, 2));
  
  console.log('\n📋 Token Payload:');
  console.log(JSON.stringify(decoded.payload, null, 2));
  
  /* Check expiration */
  const now = Math.floor(Date.now() / 1000);
  const exp = decoded.payload.exp;
  const iat = decoded.payload.iat;
  
  console.log('\n⏰ Token Timing:');
  console.log(`  Issued at (iat):  ${new Date(iat * 1000).toISOString()}`);
  console.log(`  Expires at (exp): ${new Date(exp * 1000).toISOString()}`);
  console.log(`  Current time:     ${new Date(now * 1000).toISOString()}`);
  
  if (exp < now) {
    console.log('  Status: ❌ EXPIRED');
  } else {
    const daysLeft = Math.floor((exp - now) / 86400);
    console.log(`  Status: ✓ Valid (expires in ${daysLeft} days)`);
  }
  
  /* Verify required fields */
  console.log('\n✅ Required Fields Check:');
  console.log(`  Algorithm (alg):  ${decoded.header.alg === 'ES256' ? '✓' : '❌'} ${decoded.header.alg}`);
  console.log(`  Key ID (kid):     ${decoded.header.kid ? '✓' : '❌'} ${decoded.header.kid || 'MISSING'}`);
  console.log(`  Issuer (iss):     ${decoded.payload.iss ? '✓' : '❌'} ${decoded.payload.iss || 'MISSING'}`);
  console.log(`  Issued At (iat):  ${decoded.payload.iat ? '✓' : '❌'} ${decoded.payload.iat || 'MISSING'}`);
  console.log(`  Expires (exp):    ${decoded.payload.exp ? '✓' : '❌'} ${decoded.payload.exp || 'MISSING'}`);
  
  /* Compare with environment variables */
  console.log('\n🔑 Environment Variables Check:');
  const envTeamId = process.env.APPLE_TEAM_ID;
  const envKeyId = process.env.APPLE_MUSIC_KEY_ID;
  
  if (envTeamId) {
    console.log(`  APPLE_TEAM_ID:        ${envTeamId}`);
    console.log(`  Token Issuer (iss):   ${decoded.payload.iss}`);
    console.log(`  Match: ${envTeamId === decoded.payload.iss ? '✓' : '❌ MISMATCH!'}`);
  }
  
  if (envKeyId) {
    console.log(`  APPLE_MUSIC_KEY_ID:   ${envKeyId}`);
    console.log(`  Token Key ID (kid):   ${decoded.header.kid}`);
    console.log(`  Match: ${envKeyId === decoded.header.kid ? '✓' : '❌ MISMATCH!'}`);
  }
  
  /* Summary */
  console.log('\n═'.repeat(60));
  console.log('\n💡 Troubleshooting Tips:');
  
  if (decoded.header.alg !== 'ES256') {
    console.log('  ❌ Algorithm must be ES256');
  }
  
  if (!decoded.header.kid) {
    console.log('  ❌ Token is missing Key ID (kid) in header');
  }
  
  if (!decoded.payload.iss) {
    console.log('  ❌ Token is missing Issuer (iss) - should be your Team ID');
  }
  
  if (envTeamId && decoded.payload.iss !== envTeamId) {
    console.log('  ❌ Team ID mismatch! Regenerate token with correct APPLE_TEAM_ID');
  }
  
  if (envKeyId && decoded.header.kid !== envKeyId) {
    console.log('  ❌ Key ID mismatch! Regenerate token with correct APPLE_MUSIC_KEY_ID');
  }
  
  if (exp < now) {
    console.log('  ❌ Token has expired! Regenerate with: npm run generate-token');
  }
  
  console.log('\n');
  
} catch (error) {
  console.error('❌ Error decoding token:', error.message);
  process.exit(1);
}
