import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

/* 
 * Generate Apple Music Developer Token (JWT)
 * 
 * Required environment variables:
 * - APPLE_TEAM_ID: Your Apple Developer Team ID
 * - APPLE_MUSIC_KEY_ID: Your MusicKit Key ID
 * - APPLE_MUSIC_PRIVATE_KEY_PATH: Path to your .p8 private key file
 */

const TEAM_ID = process.env.APPLE_TEAM_ID;
const KEY_ID = process.env.APPLE_MUSIC_KEY_ID;
const PRIVATE_KEY_PATH = process.env.APPLE_MUSIC_PRIVATE_KEY_PATH;

if (!TEAM_ID || !KEY_ID || !PRIVATE_KEY_PATH) {
  console.error('Error: Missing required environment variables.');
  console.error('Required: APPLE_TEAM_ID, APPLE_MUSIC_KEY_ID, APPLE_MUSIC_PRIVATE_KEY_PATH');
  process.exit(1);
}

try {
  /* Read the private key file */
  const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');

  /* Token valid for 6 months (maximum allowed by Apple) */
  const expiresIn = '180d';

  /* Generate JWT */
  const token = jwt.sign(
    {},
    privateKey,
    {
      algorithm: 'ES256',
      expiresIn: expiresIn,
      issuer: TEAM_ID,
      header: {
        alg: 'ES256',
        kid: KEY_ID
      }
    }
  );

  console.log('\n✓ Apple Music Developer Token generated successfully!\n');
  console.log('Add this to your .envrc or .env file:\n');
  console.log(`export APPLE_MUSIC_TOKEN="${token}"\n`);
  console.log('This token is valid for 180 days (6 months).\n');

} catch (error) {
  console.error('Error generating token:', error.message);
  process.exit(1);
}
