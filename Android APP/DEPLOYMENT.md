# Android App Deployment Guide

## Pre-Deployment Checklist

### 1. Code Quality & Testing
- [ ] All features working correctly
- [ ] No crashes or ANRs (Application Not Responding)
- [ ] Tested on multiple screen sizes (phone, tablet)
- [ ] Tested on different Android versions (API 24+)
- [ ] Memory leaks checked
- [ ] Performance optimized

### 2. Build Configuration
- [ ] Update `versionCode` in `app/build.gradle`
- [ ] Update `versionName` in `app/build.gradle`
- [ ] Release build configured with ProGuard
- [ ] Signed APK/AAB generated

### 3. Google Play Console Setup

#### App Information
- **App Name**: Pig Game
- **Package Name**: `com.piggame.android`
- **Category**: Games > Casual
- **Content Rating**: Everyone
- **Target Audience**: All ages (3+)

#### Store Listing
- **Short Description**: Classic dice game - race to 100 points!
- **Full Description**: 
```
Play the classic Pig dice game on your Android device! 

🎲 Simple and addictive gameplay
🎮 Roll the dice and accumulate points
🏆 First to 100 points wins
⚠️ But beware - roll a 1 and lose your turn!

Features:
• Modern Material Design 3 interface
• Smooth animations and effects
• Two-player local multiplayer
• No ads, no in-app purchases
• Works completely offline

Perfect for family game nights, travel, or quick entertainment. Based on the classic probability game used in mathematics education.

Download now and start rolling!
```

#### Required Assets
- **App Icon**: 512x512 PNG (high-resolution)
- **Feature Graphic**: 1024x500 PNG
- **Screenshots**: 
  - Phone: 2-8 screenshots (16:9 or 9:16 aspect ratio)
  - 7-inch tablet: 1-8 screenshots
  - 10-inch tablet: 1-8 screenshots
- **Privacy Policy**: Not required (no data collection)

### 4. Screenshots to Capture
1. **Game Setup Screen** - Player name entry
2. **Game in Progress** - Dice rolling, scores visible
3. **Active Turn** - Current player highlighted
4. **Winner Screen** - Victory celebration
5. **Score Comparison** - Close game scenario

### 5. Build Commands

#### Debug Build
```bash
./gradlew assembleDebug
```

#### Release Build
```bash
# Generate signed AAB (recommended)
./gradlew bundleRelease

# Or generate signed APK
./gradlew assembleRelease
```

### 6. Signing Configuration

Create `keystore.properties` file (keep private):
```properties
storePassword=your_store_password
keyPassword=your_key_password
keyAlias=your_key_alias
storeFile=path/to/your/keystore.jks
```

Add to `app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            // ... other config
        }
    }
}
```

### 7. Google Play Console Upload

1. **Create App**: Choose "App or Game"
2. **Upload AAB**: Use Android App Bundle (.aab) format
3. **Fill Store Listing**: Add descriptions, screenshots, etc.
4. **Content Rating**: Complete questionnaire (likely Everyone rating)
5. **Pricing**: Set as Free (no in-app purchases)
6. **App Content**: 
   - Ads: No
   - In-app purchases: No
   - User-generated content: No
   - Data collection: No
7. **Release**: 
   - Start with Internal Testing
   - Then Closed Testing (optional)
   - Finally Production release

### 8. Testing Track Progression

#### Internal Testing
- Upload AAB to Internal Testing track
- Add internal testers (up to 100)
- Quick approval (usually within hours)

#### Open Testing (Optional)
- Broader testing audience
- Can set maximum testers
- Useful for feedback before production

#### Production Release
- Full public release
- Review process (can take 1-3 days)
- Goes live on Google Play Store

### 9. Post-Launch Monitoring

#### Google Play Console Analytics
- Install metrics
- User ratings and reviews
- Crash reports (if any)
- Performance metrics

#### Version Updates
- Increment `versionCode` for each update
- Update `versionName` for user-visible changes
- Use staged rollouts for major updates

### 10. Marketing & ASO (App Store Optimization)

#### Keywords to Target
- "dice game"
- "pig game"
- "family game"
- "offline game"
- "casual game"
- "party game"

#### App Store Listing Optimization
- Use keywords in app description naturally
- Encourage positive reviews
- Respond to user feedback
- Regular updates to maintain ranking

---

## Quick Deployment Commands

```bash
# 1. Clean and build
./gradlew clean

# 2. Generate release bundle
./gradlew bundleRelease

# 3. Find generated AAB
# Location: app/build/outputs/bundle/release/app-release.aab

# 4. Upload to Google Play Console
# Manual upload through web interface
```

## Common Issues & Solutions

**Issue**: App signing errors
**Solution**: Ensure keystore.properties is correctly configured and keystore file exists

**Issue**: Build failures
**Solution**: Check Gradle and dependency versions, run `./gradlew clean`

**Issue**: Upload rejected
**Solution**: Check Google Play policy compliance, especially for games

**Issue**: Low visibility
**Solution**: Optimize store listing, encourage reviews, regular updates

---

**Ready for deployment!** 🚀

The Android app is fully configured and ready for Google Play Store release.