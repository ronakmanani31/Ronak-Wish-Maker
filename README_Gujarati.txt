Ronak Wish Maker – 50 MB Video Update

1. GitHub પર હાલની index.html, style.css અને app.js ની backup copy રાખો.
2. ZIP extract કરો.
3. ZIP માંથી આ ત્રણેય ફાઇલો GitHub repository માં replace કરો.
4. Commit changes કરો અને GitHub Pages deploy થાય ત્યાં સુધી રાહ જુઓ.
5. Website ને refresh કરો; જરૂર પડે તો browser માં hard refresh કરો.

Video નિયમ:
- મહત્તમ file size: 50 MB
- ઓછામાં ઓછી duration: 30 seconds
- Video browser ના IndexedDB માં એ જ device/browser પર સેવ થાય છે.
- Audio 2 MB અને background image 4 MB ની હાલની limit યથાવત છે.

મહત્વપૂર્ણ:
આ update માં Video ને localStorage ના બદલે IndexedDB માં મૂક્યું છે, જેથી 50 MB video માટે localStorage quota નો પ્રશ્ન ઓછો થાય.
આ હજી cloud storage નથી. બીજા mobile/browser માં આ Wish અને Video જોવા માટે Firebase Storage/Database જેવા backend ની જરૂર પડશે.
JavaScript syntax check (Node.js --check) પાસ થયો છે; વાસ્તવિક Android browser માં end-to-end test હજી કરવાનું બાકી છે.
