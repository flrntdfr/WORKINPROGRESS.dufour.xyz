# Website

Personal website built with Jekyll.

## Apple Music Integration

This project includes scripts to fetch your Apple Music playlists and their tracks, which are then serialized to JSON for visualization on the website.

---

## 🔄 How to Renew Credentials (Every 6 Months)

Your Apple Music Developer Token expires after **180 days (6 months)**. Follow these steps to renew it:

### Quick Renewal Steps

```bash
# 1. Navigate to project directory
cd "/path/to/your/project"

# 2. Ensure environment variables are loaded
direnv allow  # if using direnv
# OR
source .env   # if using .env file

# 3. Verify your credentials are still set
echo "Team ID: $APPLE_TEAM_ID"
echo "Key ID: $APPLE_MUSIC_KEY_ID"
echo "Key Path: $APPLE_MUSIC_PRIVATE_KEY_PATH"

# 4. Regenerate the Developer Token
npm run generate-token

# 5. Copy the new token output and update your .envrc or .env file
# Replace the old APPLE_MUSIC_TOKEN with the new one

# 6. Reload environment
direnv allow  # if using direnv
# OR
source .env   # if using .env file

# 7. Test the new token
npm run test-token

# 8. Test playlist fetching
npm run fetch-playlists
```

### Detailed Renewal Process

#### Step 1: Check Token Expiration

Before renewing, verify your token has expired or is about to expire:

```bash
npm run verify-token
```

This will show when your current token expires.

#### Step 2: Verify Your Private Key File

Make sure your `.p8` private key file still exists in the correct location:

```bash
ls -la "$APPLE_MUSIC_PRIVATE_KEY_PATH"
```

If the file is missing, you'll need to download it again from Apple Developer Portal (see Step 3).

#### Step 3: Regenerate Developer Token

```bash
npm run generate-token
```

**Expected output:**
```
✓ Apple Music Developer Token generated successfully!

Add this to your .envrc or .env file:

export APPLE_MUSIC_TOKEN="eyJhbGci...NEW_TOKEN_HERE..."

This token is valid for 180 days (6 months).
```

#### Step 4: Update Environment File

Edit your `.envrc` or `.env` file and replace the old `APPLE_MUSIC_TOKEN` value with the new one:

```bash
# Open in your editor
nano .envrc
# OR
code .envrc

# Replace this line with the new token
export APPLE_MUSIC_TOKEN="eyJhbGci...NEW_TOKEN_HERE..."
```

#### Step 5: Reload Environment

```bash
direnv allow  # if using direnv
# OR
source .env   # if using .env file
```

Verify the new token is loaded:
```bash
echo "${APPLE_MUSIC_TOKEN:0:50}..."
```

#### Step 6: Test the New Token

```bash
npm run test-token
```

You should see:
```
✅ Your Developer Token is VALID and works with Apple Music API!
```

#### Step 7: (Optional) Get New Music User Token

**You usually DON'T need to do this** - the Music User Token typically remains valid for much longer than the Developer Token.

Only renew if you get authorization errors when fetching playlists:

```bash
# Start the authorization server
npm run authorize

# Open in browser: http://localhost:3000
# Paste your NEW Developer Token
# Complete authorization
# Copy the new MUSIC_USER_TOKEN to your .envrc or .env file
```

#### Step 8: Verify Everything Works

Test the complete workflow:

```bash
npm run fetch-playlists
```

If successful, you'll see your playlists being fetched with all tracks.

### What You DON'T Need to Renew

- ✅ **MusicKit Identifier** - Never expires, no renewal needed
- ✅ **MusicKit Key (`.p8` file)** - Never expires, no renewal needed
- ✅ **Team ID and Key ID** - Never change, no renewal needed
- ⚠️ **Music User Token** - Usually valid for years, rarely needs renewal

### What You DO Need to Renew

- ⏰ **Developer Token (JWT)** - Expires every 180 days, **MUST be renewed**

### Set a Reminder

Add a calendar reminder for **6 months from now** to regenerate your token before it expires.

**Token was generated on:** _(write the date here when you first create it)_  
**Token expires on:** _(6 months from generation date)_  
**Renewal reminder:** _(5.5 months from generation date)_

---

# 



- Node.js 18 or higher
- An **Apple Developer account** (either Individual or Organization)
  - Free Apple Developer membership is sufficient
  - Sign up at https://developer.apple.com if you don't have one
- An **active Apple Music subscription** (to access your library)

### Initial Setup

#### 1. Create Apple Music API Credentials

##### Step 1.1: Access Apple Developer Portal

1. Go to https://developer.apple.com and sign in with your Apple ID
2. Navigate to **Account** → **Certificates, Identifiers & Profiles**
3. Or directly visit: https://developer.apple.com/account/resources/authkeys/list

##### Step 1.2: Create a MusicKit Identifier (Required!)

**Important:** You must create a MusicKit Identifier before creating your key.

1. Go to **Identifiers**: https://developer.apple.com/account/resources/identifiers/list
2. Click the **"+" button**
3. Select **MusicKit Identifier** (scroll down to find it)
4. Click **Continue**
5. Fill in the details:
   - **Description:** Enter a name (e.g., "Playlist Fetcher MusicKit")
   - **Identifier (Bundle ID):** Enter something unique like `com.yourname.musickit.playlistfetcher`
6. Click **Continue** and then **Register**

##### Step 1.3: Create a MusicKit Key

1. Go to **Keys**: https://developer.apple.com/account/resources/authkeys/list
2. Click the **"+" button** (or "Create a key" if you have no keys)
3. On the "Register a New Key" page:
   - **Key Name:** Enter a descriptive name (e.g., "MusicKit API Key")
   - **Key Services:** Check the box next to **MusicKit**
   - Click **Configure** next to MusicKit
   - Select the MusicKit Identifier you just created
   - Click **Save**
4. Click **Continue**
5. Review the information and click **Register**

##### Step 1.4: Download Your Private Key

⚠️ **IMPORTANT:** You can only download this key file **once**. Store it securely!

1. After registration, you'll see a "Download Your Key" page
2. Click **Download** to save the `.p8` file (e.g., `AuthKey_ABC123XYZ.p8`)
3. Save this file to a secure location on your computer (e.g., `~/.apple-music-keys/`)
4. **Never commit this file to version control** or share it publicly

##### Step 1.5: Note Your Credentials

On the key details page, you'll see three important values:

1. **Key ID:** A 10-character alphanumeric string (e.g., `ABC123XYZ`)
   - Located right under your key name
   - Copy this value

2. **Team ID:** A 10-character alphanumeric string (e.g., `XYZ987ABC`)
   - Located in the top-right corner of the page
   - Or find it at: https://developer.apple.com/account (under "Membership Details")
   - Copy this value

3. **Private Key File:** The `.p8` file you downloaded
   - Note the full path where you saved it

**Example values (yours will be different):**
```
Key ID: ABC123XYZ
Team ID: XYZ987ABC
Private Key: /Users/yourname/.apple-music-keys/AuthKey_ABC123XYZ.p8
```

#### 2. Install Node Dependencies

```bash
npm install
```

This will install the required `jsonwebtoken` package.

#### 3. Configure Environment Variables

Add your credentials to `.envrc` (if using direnv) or create a `.env` file:

```bash
/* Token generation credentials */
export APPLE_TEAM_ID="XYZ987ABC"          # Your Team ID from step 1.5
export APPLE_MUSIC_KEY_ID="ABC123XYZ"           # Your Key ID from step 1.5
export APPLE_MUSIC_PRIVATE_KEY_PATH="/Users/yourname/.apple-music-keys/AuthKey_ABC123XYZ.p8"
```

**If using direnv:**
```bash
# After editing .envrc
direnv allow
```

**If using .env file:**
```bash
# Create .env file in project root
cat > .env << 'EOF'
export APPLE_TEAM_ID="XYZ987ABC"
export APPLE_MUSIC_KEY_ID="ABC123XYZ"
export APPLE_MUSIC_PRIVATE_KEY_PATH="/Users/yourname/.apple-music-keys/AuthKey_ABC123XYZ.p8"
EOF

# Then source it
source .env
```

#### 4. Generate Your Developer Token (JWT)

Run the token generator script:

```bash
npm run generate-token
```

**Expected output:**
```
✓ Apple Music Developer Token generated successfully!

Add this to your .envrc or .env file:

export APPLE_MUSIC_TOKEN="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFCQzEyM1hZWiIsImFsZyI6IkVTMjU2In0.eyJpYXQiOjE3MDU1ODc2MzAsImV4cCI6MTcyMTE5NzYzMCwiaXNzIjoiWFlaOTg3QUJDIn0.abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"

This token is valid for 180 days (6 months).
```

Copy the `export APPLE_MUSIC_TOKEN="..."` line and add it to your `.envrc` or `.env` file:

```bash
/* Add this to your .envrc or .env */
export APPLE_MUSIC_TOKEN="eyJhbGci...your-actual-token-here..."
```

**Important notes:**
- This Developer Token is a JWT that expires after 180 days
- You'll need to regenerate it every 6 months
- Mark your calendar to regenerate before expiration
- The token is safe to commit to **private** repositories (but not recommended)

#### 5. Get Your Music User Token

The Music User Token authenticates your personal Apple Music library access. This is a one-time setup (unless you revoke access).

##### Step 5.1: Start the Authorization Server

**Important:** MusicKit.js requires the page to be served over HTTP (not opened as a file).

```bash
npm run authorize
```

This will start a local server and display:
```
🌐 Authorization page server started!

   Open in your browser: http://localhost:3000

   Press Ctrl+C to stop the server
```

Open **http://localhost:3000** in your web browser (Chrome, Safari, Firefox, etc.)

##### Step 5.2: Authorize Access

1. **Paste Your Developer Token:**
   - In the "Developer Token (JWT)" field
   - Paste the token from step 4 (starts with `eyJhbGci...`)

2. **Click "Authorize with Apple Music"**
   - A popup will appear asking you to sign in

3. **Sign in with your Apple ID:**
   - Use the Apple ID associated with your Apple Music subscription
   - You may need to complete two-factor authentication

4. **Grant Permission:**
   - Apple Music will ask permission to access your library
   - Click **Allow** or **OK**

##### Step 5.3: Save Your User Token

1. After successful authorization, a green success message will appear
2. Your Music User Token will be displayed in a text box
3. Click the **"Copy to Clipboard"** button
4. Add it to your `.envrc` or `.env` file:

```bash
/* Add this to your .envrc or .env */
export MUSIC_USER_TOKEN="AqHMBAL+CMC4n2hA4g7ZpQ1234567890abcdefghijklmnopqrstuvwxyz..."
```

5. Reload your environment:
```bash
/* If using direnv */
direnv allow

/* If using .env */
source .env
```

**Important notes:**
- This token remains valid for an extended period (typically months to years)
- It's tied to your Apple ID and the specific Developer Token
- If you regenerate your Developer Token, you may need a new User Token
- The token grants read-only access to your library only
- **Never share this token** - it provides access to your personal music library

### Usage

#### Fetch Playlists Manually

To fetch your playlists and tracks:

```bash
npm run fetch-playlists
```

This will:
- Fetch all playlists from your Apple Music library
- Fetch all tracks for each playlist
- Save comprehensive metadata to `_data/playlists.json`

#### Automatic Fetch During Build

The script runs automatically during the website build process:

```bash
make build    # Runs fetch-playlists, then builds site
make serve    # Runs fetch-playlists, then serves site
```

### Output Format

The script generates `_data/playlists.json` with the following structure:

```json
[
  {
    "id": "p.abc123",
    "name": "My Playlist",
    "description": "Description text",
    "url": "https://music.apple.com/...",
    "canEdit": true,
    "isPublic": false,
    "artwork": {
      "url": "https://is1-ssl.mzstatic.com/image/...",
      "small": "...{w=200&h=200}...",
      "medium": "...{w=400&h=400}...",
      "large": "...{w=600&h=600}..."
    },
    "lastModified": "2026-01-18T10:30:00Z",
    "trackCount": 25,
    "tracks": [
      {
        "id": "i.xyz789",
        "type": "library-songs",
        "title": "Song Title",
        "artist": "Artist Name",
        "album": "Album Name",
        "duration": 245000,
        "trackNumber": 3,
        "discNumber": 1,
        "releaseDate": "2024-01-15",
        "genres": ["Pop", "Electronic"],
        "composer": "Composer Name",
        "isrc": "USABC1234567",
        "explicit": false,
        "hasLyrics": true,
        "url": "https://music.apple.com/...",
        "artwork": {
          "url": "https://is1-ssl.mzstatic.com/image/...",
          "small": "...",
          "medium": "...",
          "large": "..."
        }
      }
    ]
  }
]
```

### Troubleshooting

#### "Error: APPLE_MUSIC_TOKEN environment variable is not set"
- Make sure you've added the token to `.envrc` or `.env`
- Run `direnv allow` (if using direnv) or `source .env` (if using .env file)
- Verify: `echo $APPLE_MUSIC_TOKEN` should output your token

#### "Error: Missing required environment variables" (when generating token)
- Ensure `APPLE_TEAM_ID`, `APPLE_MUSIC_KEY_ID`, and `APPLE_MUSIC_PRIVATE_KEY_PATH` are set
- Check that the `.p8` file path is correct and the file exists
- Verify the file permissions allow reading: `ls -l /path/to/AuthKey_*.p8`

#### "API Error 401: Unauthorized"
- Your Developer Token may have expired (6 month limit)
- Run `npm run generate-token` to create a new one
- Update `APPLE_MUSIC_TOKEN` in your environment file

#### "Error: Unauthorized" during Step 5.2 (MusicKit Authorization)

This error occurs when MusicKit JS cannot validate your Developer Token. Common causes:

**1. MusicKit Identifier Not Created:**
- Go to https://developer.apple.com/account/resources/identifiers/list
- Click the "+" button to create a new identifier
- Select **MusicKit Identifier** (not App ID)
- Description: Enter a name (e.g., "MusicKit Playlist Fetcher")
- Bundle ID: Enter something like `com.yourname.musickit.playlistfetcher` (must be unique)
- Click **Continue** and **Register**

**2. Key Not Associated with MusicKit Identifier:**
- Go back to your Keys: https://developer.apple.com/account/resources/authkeys/list
- Click on your key (the one with MusicKit enabled)
- Under "Enabled Services", ensure MusicKit shows your identifier
- If not, you may need to create a new key and associate it with the identifier

**3. Token Issues:**
- Verify your token is correctly set: `echo $APPLE_MUSIC_TOKEN`
- The token should start with `eyJhbGci...`
- Try regenerating the token: `npm run generate-token`
- Make sure you're pasting the FULL token (they can be very long)

**4. Browser Console Errors:**
- Open browser Developer Tools (F12 or Cmd+Option+I)
- Go to the Console tab
- Look for specific error messages from MusicKit
- Common issues:
  - "Invalid token" - regenerate your Developer Token
  - "403" - MusicKit identifier not properly configured
  - CORS errors - try a different browser

**5. Apple Music Subscription:**
- Ensure the Apple ID you're using has an **active Apple Music subscription**
- Family sharing subscriptions work too
- Free trial subscriptions work

**Quick Fix Steps:**
```bash
# 1. Verify your credentials
echo "Team ID: $APPLE_TEAM_ID"
echo "Key ID: $APPLE_MUSIC_KEY_ID"
echo "Token: ${APPLE_MUSIC_TOKEN:0:50}..." # Shows first 50 chars

# 2. Regenerate token
npm run generate-token

# 3. Update .envrc with new token
# 4. Reload environment
direnv allow

# 5. Try authorization again
npm run authorize
# Then open http://localhost:3000 in your browser
```

#### "API Error 403: Forbidden"
- Your Music User Token may be invalid or expired
- Re-authorize: run `npm run authorize` and visit http://localhost:3000
- Make sure you're using the Apple ID with an active Apple Music subscription

#### "No playlists found"
- Ensure you have playlists in your Apple Music library
- Check that you're signed in to the correct Apple ID
- Verify both tokens are correctly set: `echo $MUSIC_USER_TOKEN`
- Try visiting https://music.apple.com to confirm your playlists exist

#### "MusicKit is not defined" or "Unauthorized" in authorization page
- Make sure you're accessing via `npm run authorize` and http://localhost:3000
- Don't open the HTML file directly (file:// doesn't work with MusicKit)
- Check your internet connection (MusicKit JS loads from Apple's CDN)
- Try a different browser or incognito/private mode
- Disable browser extensions that might block scripts

#### Network errors or timeouts
- The script has automatic retry logic with exponential backoff (3 attempts)
- Check your internet connection
- Apple Music API may be temporarily unavailable - try again later
- Check Apple's system status: https://www.apple.com/support/systemstatus/

#### Token generation fails with "invalid key" error
- Ensure you're using the correct `.p8` file downloaded from Apple Developer
- The file should start with `-----BEGIN PRIVATE KEY-----`
- Make sure the Key ID matches the key in your developer account
- Verify the Team ID is correct (check in Apple Developer portal)

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `APPLE_MUSIC_TOKEN` | Yes | JWT Developer Token (valid 180 days) |
| `MUSIC_USER_TOKEN` | Yes | User authorization token for your library |
| `APPLE_TEAM_ID` | For token gen | Your Apple Developer Team ID |
| `APPLE_MUSIC_KEY_ID` | For token gen | Your MusicKit Key ID |
| `APPLE_MUSIC_PRIVATE_KEY_PATH` | For token gen | Path to your `.p8` private key file |

### NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run fetch-playlists` | Fetch all playlists and tracks, save to JSON |
| `npm run generate-token` | Generate a new Developer Token (JWT) |
| `npm run authorize` | Start HTTP server for user authorization |
| `npm run test-token` | Test if your Developer Token works with Apple's API |
| `npm run verify-token` | Decode and verify token contents |

### Files

- **`scripts/Music Kit.js/fetch-playlists.js`** - Main script that fetches playlists and tracks
- **`scripts/Music Kit.js/generate-dev-token.js`** - Helper to generate JWT Developer Token
- **`scripts/Music Kit.js/get-user-token.html`** - Web page to obtain Music User Token
- **`scripts/Music Kit.js/serve-auth-page.js`** - HTTP server for authorization page
- **`scripts/Music Kit.js/test-token.js`** - Test script to verify token validity
- **`scripts/Music Kit.js/verify-token.js`** - Token decoder and validator
- **`_data/playlists.json`** - Generated JSON output (used by Jekyll)

### Additional Resources

- [Apple Music API Documentation](https://developer.apple.com/documentation/applemusicapi)
- [MusicKit Documentation](https://developer.apple.com/documentation/musickit)
- [Apple Developer Portal](https://developer.apple.com/account/)

## License

See [LICENSE.txt](LICENSE.txt)
