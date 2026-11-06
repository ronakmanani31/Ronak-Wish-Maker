const $ = id => document.getElementById(id);
const KEY = "ronakWishMaker_v1";
const FESTIVAL_KEY = "ronakWishMaker_hinduFestivals_v1";
const defaultFestivals = [
"Diwali","Dhanteras","Naraka Chaturdashi (Choti Diwali)","Govardhan Puja","Bhai Dooj","Gujarati New Year (Bestu Varas)","Labh Pancham",
"Sharad Navratri","Chaitra Navratri","Durga Ashtami","Maha Navami","Vijayadashami (Dussehra)","Durga Puja",
"Holi","Dhuleti (Rangwali Holi)","Rang Panchami","Makar Sankranti","Uttarayan","Vasant Panchami",
"Janmashtami","Radhashtami","Ganesh Chaturthi","Anant Chaturdashi","Ram Navami","Hanuman Jayanti","Maha Shivratri",
"Shravan Somvar","Pradosh Vrat","Vaikuntha Ekadashi","Devshayani Ekadashi","Dev Uthani Ekadashi","Nirjala Ekadashi",
"Akshaya Tritiya","Parashurama Jayanti","Narasimha Jayanti","Vamana Jayanti","Guru Purnima","Nag Panchami",
"Raksha Bandhan","Hartalika Teej","Ganesh Visarjan","Pitru Paksha","Sharad Purnima","Karwa Chauth",
"Ahoi Ashtami","Tulsi Vivah","Kartik Purnima","Dev Diwali","Chhath Puja","Gita Jayanti",
"Rath Yatra","Jaya Parvati Vrat","Gauri Vrat","Sheetala Satam","Randal Maa Vrat","Vat Savitri Vrat",
"Vat Purnima","Rishi Panchami","Paryushan (Jain observance)","Samvatsari (Jain observance)"
];
const translations = {
 en:{language:"Language",admin:"Admin",festiveGreetings:"FESTIVE GREETINGS",familyGreeting:"To you and your family",playVideo:"▶ Play Video",playMusic:"♫ Play Music",likeWish:"Did you like this wish?",enterName:"Enter your name",dashboard:"Admin Dashboard",close:"Close",localNotice:"Starter build: data is stored only in this browser. Cloud sync, cross-device links and reliable visitor analytics need a secure backend.",createWish:"Create New Wish",personName:"Person's name",festival:"Festival",wishTitle:"Wish title",wishMessage:"Wish message",songMp3:"Song (MP3)",videoFile:"Video",backgroundImage:"Background image",saveWish:"Save / Create Wish",new:"New",yourWishes:"Your Wishes",festivalManager:"Festival Manager",festivalManagerHelp:"The list includes major Hindu festivals and observances. Add regional festivals whenever you need.",festivalName:"Festival name",addFestival:"Add Festival",thankYouReactions:"Thank You Reactions",visitorActivity:"Visitor Activity (this device only)",analyticsNotice:"This demo does not secretly track visitors. Accurate cross-device analytics requires a consent-aware backend.",enterPerson:"Enter a person's name.",saved:"Wish saved. This demo link works only in this browser.",emptyWishes:"No wishes yet.",emptyReactions:"No reactions yet.",emptyVisits:"No visits yet.",copied:"Link copied.",copy:"Copy link",edit:"Edit",delete:"Delete",added:"Festival added.",duplicate:"That festival is already in the list.",enterFestival:"Enter a festival name.",removeFestival:"Remove",nameRequired:"Please enter your name first.",thanks:"Thank you!",family:"To you and your family",defaultTitle:"Happy Diwali!",defaultMessage:"May this festival bring happiness, peace and prosperity."},
 gu:{language:"ભાષા",admin:"એડમિન",festiveGreetings:"તહેવારની શુભેચ્છાઓ",familyGreeting:"તમને અને તમારા પરિવારને",playVideo:"▶ વીડિયો જુઓ",playMusic:"♫ ગીત સાંભળો",likeWish:"તમને આ શુભેચ્છા ગમી?",enterName:"તમારું નામ લખો",dashboard:"એડમિન ડેશબોર્ડ",close:"બંધ કરો",localNotice:"આ Starter Build માં ડેટા ફક્ત આ બ્રાઉઝરમાં સેવ થાય છે. Cloud Sync, બીજા મોબાઇલની લિંક્સ અને સાચા Visitor Analytics માટે સુરક્ષિત Backend જરૂરી છે.",createWish:"નવી શુભેચ્છા બનાવો",personName:"વ્યક્તિનું નામ",festival:"તહેવાર",wishTitle:"શુભેચ્છાનું શીર્ષક",wishMessage:"શુભેચ્છાનો મેસેજ",songMp3:"ગીત (MP3)",videoFile:"વિડિયો",backgroundImage:"બેકગ્રાઉન્ડ ફોટો",saveWish:"સેવ કરો / લિંક બનાવો",new:"નવું",yourWishes:"તમારી શુભેચ્છાઓ",festivalManager:"તહેવાર મેનેજર",festivalManagerHelp:"આ યાદીમાં મુખ્ય હિન્દુ તહેવારો અને વ્રતો છે. જરૂર મુજબ સ્થાનિક તહેવારો ઉમેરો.",festivalName:"તહેવારનું નામ",addFestival:"તહેવાર ઉમેરો",thankYouReactions:"આભારના પ્રતિભાવ",visitorActivity:"મુલાકાતીની પ્રવૃત્તિ (ફક્ત આ ડિવાઇસ)",analyticsNotice:"આ Demo છૂપી રીતે મુલાકાતીઓને ટ્રેક કરતું નથી. બીજા ડિવાઇસનું સાચું Analytics મેળવવા સંમતિ આધારિત Backend જરૂરી છે.",enterPerson:"વ્યક્તિનું નામ લખો.",saved:"શુભેચ્છા સેવ થઈ. આ Demo Link ફક્ત આ બ્રાઉઝરમાં કામ કરશે.",emptyWishes:"હજુ કોઈ શુભેચ્છા નથી.",emptyReactions:"હજુ કોઈ પ્રતિભાવ નથી.",emptyVisits:"હજુ કોઈ મુલાકાત નથી.",copied:"લિંક કોપી થઈ.",copy:"લિંક કોપી",edit:"ફેરફાર",delete:"ડિલીટ",added:"તહેવાર ઉમેરાયો.",duplicate:"આ તહેવાર પહેલેથી યાદીમાં છે.",enterFestival:"તહેવારનું નામ લખો.",removeFestival:"દૂર કરો",nameRequired:"પહેલાં તમારું નામ લખો.",thanks:"આભાર!",family:"તમને અને તમારા પરિવારને",defaultTitle:"શુભ દિવાળી!",defaultMessage:"આ તહેવાર તમારા જીવનમાં સુખ, શાંતિ અને સમૃદ્ધિ લાવે."}
};
let lang = localStorage.getItem("ronakWishMaker_language") || "en";
let wishes = JSON.parse(localStorage.getItem(KEY) || "[]");
let reactions = JSON.parse(localStorage.getItem(KEY+"_reactions") || "[]");
let visits = JSON.parse(localStorage.getItem(KEY+"_visits") || "[]");
let festivals = JSON.parse(localStorage.getItem(FESTIVAL_KEY) || "null") || [...defaultFestivals];
let currentId = new URLSearchParams(location.search).get("wish");
let startedAt = Date.now();
function t(k){return translations[lang][k] || translations.en[k] || k}
function persist(){localStorage.setItem(KEY,JSON.stringify(wishes));localStorage.setItem(KEY+"_reactions",JSON.stringify(reactions));localStorage.setItem(KEY+"_visits",JSON.stringify(visits));localStorage.setItem(FESTIVAL_KEY,JSON.stringify(festivals));}
function makeId(){return "w"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function current(){return wishes.find(w=>w.id===currentId)}
function escapeHtml(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function applyLanguage(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;el.textContent=t(k)});
 document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
 $("languageSelect").value=lang;
 if(!$("titleInput").dataset.edited) $("titleInput").value=lang==="gu"?t("defaultTitle"):"Happy Diwali!";
 if(!$("messageInput").dataset.edited) $("messageInput").value=t("defaultMessage");
 renderFestivalOptions();renderAdmin();
 const w=current(); if(!w){$("wishName").textContent=t("family");$("wishTitle").textContent=t("defaultTitle");$("wishMessage").textContent=t("defaultMessage");}
}
function renderFestivalOptions(selected){
 $("festival").innerHTML=festivals.map(f=>`<option value="${escapeHtml(f)}">${escapeHtml(f)}</option>`).join("");
 if(selected && festivals.includes(selected)) $("festival").value=selected;
}
function renderWish(){
 const w=current();
 if(!w){$("festivalLabel").textContent=t("festiveGreetings").toUpperCase();$("wishTitle").textContent=t("defaultTitle");$("wishName").textContent=t("family");$("wishMessage").textContent=t("defaultMessage");return}
 $("festivalLabel").textContent=w.festival.toUpperCase();$("wishTitle").textContent=w.title;$("wishName").textContent=w.person;$("wishMessage").textContent=w.message;
 $("wishAudio").hidden=!w.audio;$("playMusic").hidden=!w.audio;if(w.audio)$("wishAudio").src=w.audio;
 $("wishVideo").hidden=!w.video;$("playVideo").hidden=!w.video;if(w.video)$("wishVideo").src=w.video;
 if(w.image){$("wishView").style.backgroundImage=`linear-gradient(#160f0ddd,#160f0ddd),url("${w.image}")`;$("wishView").style.backgroundSize="cover"}
 visits.push({person:w.person,wish:w.title,at:new Date().toLocaleString()});persist();
}
function renderAdmin(){
 $("wishList").innerHTML=wishes.map(w=>`<div class="item"><div><b>${escapeHtml(w.person)}</b><small>${escapeHtml(w.festival)} · ${escapeHtml(w.title)}</small></div><div><button data-copy="${w.id}">${t("copy")}</button> <button class="outline" data-edit="${w.id}">${t("edit")}</button> <button class="outline" data-del="${w.id}">${t("delete")}</button></div></div>`).join("")||`<p>${t("emptyWishes")}</p>`;
 $("reactionList").innerHTML=reactions.map(r=>`<div class="item"><b>${escapeHtml(r.name)}</b><span>${r.emoji} · ${escapeHtml(r.person)} · ${escapeHtml(r.at)}</span></div>`).join("")||`<p>${t("emptyReactions")}</p>`;
 $("visitList").innerHTML=visits.slice().reverse().map(v=>`<div class="item"><b>${escapeHtml(v.person)}</b><small>${escapeHtml(v.wish)} · ${escapeHtml(v.at)}</small></div>`).join("")||`<p>${t("emptyVisits")}</p>`;
 $("festivalList").innerHTML=festivals.map((f,i)=>`<div class="item"><b>${escapeHtml(f)}</b><button class="outline" data-festival-del="${i}">${t("removeFestival")}</button></div>`).join("");
 renderFestivalOptions($("festival").value);
}
function readFile(input){return new Promise(resolve=>{const f=input.files[0];if(!f)return resolve("");const r=new FileReader();r.onload=()=>resolve(r.result);r.readAsDataURL(f)})}
$("languageSelect").onchange=e=>{lang=e.target.value;localStorage.setItem("ronakWishMaker_language",lang);applyLanguage();renderWish()};
$("adminToggle").onclick=()=>{$("adminView").hidden=false;renderAdmin();window.scrollTo(0,document.body.scrollHeight)};
$("closeAdmin").onclick=()=>{$("adminView").hidden=true};
$("titleInput").oninput=()=>{$("titleInput").dataset.edited="1"};
$("messageInput").oninput=()=>{$("messageInput").dataset.edited="1"};
$("saveWish").onclick=async()=>{
 const person=$("person").value.trim();if(!person){alert(t("enterPerson"));return}
 const id=$("editingId")?.value||makeId(),old=wishes.find(w=>w.id===id)||{};
 const audio=await readFile($("audioFile")),video=await readFile($("videoFile")),image=await readFile($("imageFile"));
 const w={id,person,festival:$("festival").value,title:$("titleInput").value||t("defaultTitle"),message:$("messageInput").value,audio:audio||old.audio||"",video:video||old.video||"",image:image||old.image||""};
 wishes=wishes.filter(x=>x.id!==id);wishes.push(w);persist();currentId=id;alert(t("saved"));renderAdmin();renderWish();$("editingId")?.remove();
};
$("newWish").onclick=()=>{["person","titleInput","messageInput","audioFile","videoFile","imageFile"].forEach(id=>$(id).value="");$("festival").selectedIndex=0;$("editingId")?.remove();delete $("titleInput").dataset.edited;delete $("messageInput").dataset.edited;};
$("wishList").onclick=async e=>{
 const copy=e.target.dataset.copy,edit=e.target.dataset.edit,del=e.target.dataset.del;
 if(copy){const url=location.origin+location.pathname+"?wish="+copy;try{await navigator.clipboard.writeText(url);alert(t("copied"))}catch{prompt(t("copy")+":",url)}}
 if(del){wishes=wishes.filter(w=>w.id!==del);persist();renderAdmin()}
 if(edit){const w=wishes.find(x=>x.id===edit);$("person").value=w.person;renderFestivalOptions(w.festival);$("titleInput").value=w.title;$("messageInput").value=w.message;let h=document.createElement("input");h.type="hidden";h.id="editingId";h.value=w.id;$("saveWish").after(h)}
};
$("addFestival").onclick=()=>{const name=$("newFestival").value.trim();if(!name){alert(t("enterFestival"));return}if(festivals.some(f=>f.toLowerCase()===name.toLowerCase())){alert(t("duplicate"));return}festivals.push(name);persist();$("newFestival").value="";renderAdmin();alert(t("added"))};
$("festivalList").onclick=e=>{const i=e.target.dataset.festivalDel;if(i===undefined)return;const name=festivals[Number(i)];if(!confirm(`${t("removeFestival")}: ${name}?`))return;festivals.splice(Number(i),1);persist();renderAdmin()};
$("reactions").onclick=e=>{const emoji=e.target.dataset.emoji;if(!emoji)return;const name=$("visitorName").value.trim();if(!name){$("thanksStatus").textContent=t("nameRequired");return}const w=current();reactions.push({name,emoji,person:w?.person||"Demo Wish",at:new Date().toLocaleString()});persist();$("thanksStatus").textContent=t("thanks")+" "+emoji};
$("playVideo").onclick=()=>$("wishVideo").play();
$("playMusic").onclick=()=>$("wishAudio").play();
window.addEventListener("beforeunload",()=>{const w=current();if(w){visits.push({person:w.person,wish:w.title,at:new Date().toLocaleString(),seconds:Math.round((Date.now()-startedAt)/1000)});persist()}});
applyLanguage();renderWish();
