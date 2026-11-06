# Ronak Wish Maker — Starter Build

## આ build માં શું છે
- Diwali, Dhanteras અને Gujarati New Year માટે wish બનાવવાનું basic Admin panel
- વ્યક્તિના નામ સાથે wish create/edit/delete
- MP3, video અને background image પસંદ કરીને preview
- દરેક wish માટે query-string link
- Thank You emoji reaction
- આ browser માં જ basic activity log

## ખૂબ મહત્વની મર્યાદા
આ **starter/demo build** છે, production-ready cloud website નથી. હાલ wishes, reactions અને activity `localStorage` માં રહે છે. એટલે:
- બીજા mobile/browser પર એ જ data આપમેળે નહીં દેખાય.
- upload કરેલી media ફાઇલો cloud પર જતી નથી.
- link બીજા device પર ખોલશો તો data નહીં મળે.
- visitor tracking ચોક્કસ વ્યક્તિએ વાંચ્યું કે નહીં તેની ખાતરી આપી શકતું નથી.

આ સુવિધાઓ માટે Firebase Authentication, Firestore અને Firebase Storage જોડવાના બાકી છે. Firebase client config public web config હોઈ શકે છે, પરંતુ security rules યોગ્ય રીતે lock કરવી જરૂરી છે. ક્યારેય service-account private key અથવા password website code માં ન મૂકશો.

## GitHub Pages પર મૂકવું
1. ZIP extract કરો.
2. `index.html`, `style.css`, `app.js`, `README.md` ને repository ના root માં upload કરો.
3. Commit changes કરો.
4. Repository Settings → Pages માં Deploy from branch પસંદ કરીને `main` અને `/ (root)` પસંદ કરો.
5. Pages URL ખુલે છે તે ચકાસો.

## આગળના milestones
1. Firebase project અને secure rules.
2. Admin login (માત્ર owner).
3. Firestore માં wishes/reactions/events.
4. Storage માં MP3/video/image upload અને size limits.
5. દરેક wish માટે stable public link.
6. Consent-aware analytics અને retention controls.
7. Mobile અને cross-device testing.
