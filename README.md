# Ronak Wish Maker — Hindu Festivals bilingual starter

## Included in this update
- English / Gujarati interface switcher (English is the default).
- A starter library of major Hindu festivals, vrat and regional observances.
- Festival Manager: add and remove festival names.
- Create, edit and delete personal wishes.
- Per-wish MP3, video and background image selection.
- Thank-you emoji reactions and basic activity list on the current browser.

## Important limitations
This is still a browser-only starter build. Wishes, reactions, festival names and activity are stored in `localStorage` on the current browser. They do not automatically sync to other devices or visitors. A public wish link will not deliver its data to another phone until a secure backend is connected.

Media is stored as browser data URLs in local storage. Large videos may exceed browser storage limits. For production use, connect Firebase Authentication, Firestore and Storage with restrictive security rules, upload size limits and owner-only admin access.

The festival library is a broad starter list, not a claim that every regional Hindu observance is included. Festival dates vary by lunar calendar, region and tradition; a reliable date/calendar service or admin-maintained dates are needed for automatic upcoming-festival ordering.

## Deploy
Upload the four files (`index.html`, `style.css`, `app.js`, `README.md`) to the root of the `Ronak-Wish-Maker` repository, commit, and let GitHub Pages deploy. Keep a backup of the current version first.
