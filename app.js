(() => {
"use strict";
const $ = id => document.getElementById(id);
const KEYS = {wishes:"rwm_wishes_v2", reactions:"rwm_reactions_v2", visits:"rwm_visits_v2", festivals:"rwm_custom_festivals_v2"};
const baseFestivals = [
"Diwali","Dhanteras","Kali Chaudas","Gujarati New Year","Bhai Dooj","Holi","Dhuleti","Navratri","Durga Puja","Dussehra","Maha Shivratri","Ram Navami","Janmashtami","Ganesh Chaturthi","Hanuman Jayanti","Raksha Bandhan","Bhai Beej","Makar Sankranti","Uttarayan","Vasant Panchami","Saraswati Puja","Akshaya Tritiya","Guru Purnima","Nag Panchami","Rath Yatra","Onam","Pongal","Lohri","Chhath Puja","Karwa Chauth","Ahoi Ashtami","Hartalika Teej","Teej","Gudi Padwa","Ugadi","Vishu","Baisakhi","Bhai Phonta","Kartik Purnima","Dev Uthani Ekadashi","Tulsi Vivah","Prabodhini Ekadashi","Janai Purnima","Ganga Dussehra","Sheetala Saptami","Vat Savitri Vrat","Pradosh Vrat","Ekadashi","Purnima","Amavasya"
];
const translations = {
gu:{admin:"Admin",wishLike:"તમને આ Wish ગમી?",dashboard:"Admin Dashboard",close:"બંધ કરો",localNotice:"આ build માં માહિતી આ જ browser/device માં સેવ થાય છે. બીજા device પર share અને સાચી Admin સુરક્ષા માટે Firebase/backend setup જરૂરી છે.",createWish:"નવી Wish બનાવો",personName:"વ્યક્તિનું નામ",festival:"Festival",wishTitle:"Wish Title",wishMessage:"Wish Message",template:"Design Theme",customFestival:"Custom Festival ઉમેરો",music:"ગીત (Audio)",video:"વિડિયો (Video)",background:"Background Image",saveWish:"Save / Create Wish",new:"નવી",yourWishes:"તમારી Wishes",reactions:"Thank You Reactions",visitorActivity:"Visitor Activity",analyticsNotice:"Visitor સમય browser અંદાજ છે. સાચા multi-device analytics અને consent management માટે backend જરૂરી છે.",clearData:"Local Data સાફ કરો"},
en:{admin:"Admin",wishLike:"Did you like this wish?",dashboard:"Admin Dashboard",close:"Close",localNotice:"This build stores data only in this browser/device. Firebase/backend is required for sharing across devices and real admin security.",createWish:"Create New Wish",personName:"Person's name",festival:"Festival",wishTitle:"Wish title",wishMessage:"Wish message",template:"Design theme",customFestival:"Add custom festival",music:"Music (Audio)",video:"Video clip",background:"Background image",saveWish:"Save / Create Wish",new:"New",yourWishes:"Your Wishes",reactions:"Thank You Reactions",visitorActivity:"Visitor Activity",analyticsNotice:"Visitor time is an approximate browser measurement. Backend is required for multi-device analytics and consent management.",clearData:"Clear local data"}
};
let language = safeGet("rwm_language") || "gu";
let wishes = safeRead(KEYS.wishes, []);
let reactions = safeRead(KEYS.reactions, []);
let visits = safeRead(KEYS.visits, []);
let customFestivals = safeRead(KEYS.festivals, []);
let currentId = new URLSearchParams(location.search).get("wish");
let startedAt = Date.now(), visibleSince = document.visibilityState === "visible" ? Date.now() : null;
let activeSeconds = 0, completionRecorded = false;

function safeGet(key){try{return localStorage.getItem(key)}catch(err){console.warn("Storage read unavailable",err);return null}}
function safeSet(key,value){try{localStorage.setItem(key,value);return true}catch(err){console.error(err);return false}}
function safeRead(key, fallback){try{const value=JSON.parse(safeGet(key));return Array.isArray(value)?value:fallback}catch{return fallback}}
function persist(){
  try{
    const snapshot = [
      [KEYS.wishes, wishes], [KEYS.reactions, reactions],
      [KEYS.visits, visits], [KEYS.festivals, customFestivals]
    ];
    for (const [key,value] of snapshot) {
      if (!safeSet(key, JSON.stringify(value))) throw new Error("Browser storage ઉપલબ્ધ નથી અથવા ભરાઈ ગયું છે. મોટા media files દૂર કરીને ફરી પ્રયાસ કરો.");
    }
    return true;
  }catch(err){console.error(err);setStatus("Storage ભરાઈ ગયું છે. નાની media file પસંદ કરો અથવા જૂની entries દૂર કરો.");return false}
}
function setStatus(message){const el=$("adminStatus");if(el)el.textContent=message}
function makeId(){return "w"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function allFestivals(){return [...new Set([...baseFestivals,...customFestivals])].sort((a,b)=>a.localeCompare(b))}
function fillFestivalList(filter=""){
  const select=$("festival"), previous=select.value;
  const list=allFestivals().filter(name=>name.toLowerCase().includes(filter.toLowerCase()));
  select.replaceChildren();
  list.forEach(name=>{const option=document.createElement("option");option.value=name;option.textContent=name;select.append(option)});
  if(list.includes(previous))select.value=previous;
  else if(list.length)select.selectedIndex=0;
}
function translate(){
  document.documentElement.lang=language;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(translations[language][key])el.textContent=translations[language][key]});
  $("languageToggle").textContent=language==="gu"?"English":"ગુજરાતી";
  $("person").placeholder=language==="gu"?"જેમ કે Rahul":"e.g. Rahul";
  $("festivalSearch").placeholder=language==="gu"?"Festival શોધો...":"Search festivals...";
  $("customFestivalName").placeholder=language==="gu"?"નવા Festival નું નામ":"New festival name";
  $("visitorName").placeholder=language==="gu"?"તમારું નામ લખો":"Enter your name";
}
function applyTheme(theme){
  const hero=$("wishView");hero.classList.remove("theme-festive","theme-minimal","theme-dark");
  if(theme==="festive")hero.classList.add("theme-festive");
  if(theme==="minimal")hero.classList.add("theme-minimal");
  if(theme==="dark")hero.classList.add("theme-dark");
  $("templateLabel").textContent=({royal:"Royal Gold",festive:"Colorful Festival",minimal:"Modern Minimal",dark:"Premium Dark"})[theme]||"Royal Gold";
}
function currentWish(){return wishes.find(w=>w.id===currentId)}
function renderWish(){
  const wish=currentWish();
  if(!wish){
    $("festivalLabel").textContent="FESTIVE GREETINGS";
    $("wishTitle").textContent="શુભ દિવાળી!";
    $("wishName").textContent="તમને અને તમારા પરિવારને";
    $("wishMessage").textContent="આ તહેવાર તમારા જીવનમાં સુખ, શાંતિ અને સમૃદ્ધિ લાવે.";
    $("wishAudio").hidden=true;$("wishVideo").hidden=true;
    $("wishAudio").removeAttribute("src");$("wishVideo").removeAttribute("src");
    $("wishView").style.backgroundImage="";
    applyTheme("royal");
    return;
  }
  $("festivalLabel").textContent=wish.festival.toUpperCase();
  $("wishTitle").textContent=wish.title;$("wishName").textContent=wish.person;$("wishMessage").textContent=wish.message;
  $("wishAudio").hidden=!wish.audio;$("wishVideo").hidden=!wish.video;
  $("wishAudio").src=wish.audio||"";$("wishVideo").src=wish.video||"";
  if(wish.image){$("wishView").style.backgroundImage=`linear-gradient(#160f0d99,#160f0d99),url("${wish.image}")`;$("wishView").style.backgroundSize="cover";$("wishView").style.backgroundPosition="center"}
  else $("wishView").style.backgroundImage="";
  applyTheme(wish.theme||"royal");
  if(!completionRecorded){recordVisit("open");completionRecorded=true}
}
function recordVisit(type){
  const wish=currentWish();if(!wish)return;
  const existing=visits.find(v=>v.session===sessionId);
  if(type==="open"&&!existing){visits.push({session:sessionId,person:wish.person,title:wish.title,at:new Date().toLocaleString(),seconds:0,completed:false})}
  const entry=visits.find(v=>v.session===sessionId);
  if(entry){entry.seconds=activeSeconds;entry.completed=entry.completed||type==="complete";persist()}
}
const sessionId=makeId();
function renderAdmin(){
  $("wishList").innerHTML=wishes.map(w=>`<div class="item"><div><b>${escapeHtml(w.person)}</b><small>${escapeHtml(w.festival)} · ${escapeHtml(w.title)}</small></div><div class="item-actions"><button type="button" data-copy="${escapeHtml(w.id)}">Copy link</button><button type="button" class="outline" data-edit="${escapeHtml(w.id)}">Edit</button><button type="button" class="outline" data-del="${escapeHtml(w.id)}">Delete</button></div></div>`).join("")||"<p>હજુ કોઈ Wish નથી.</p>";
  $("reactionList").innerHTML=reactions.slice().reverse().map(r=>`<div class="item"><b>${escapeHtml(r.name)}</b><span>${escapeHtml(r.emoji)} · ${escapeHtml(r.person)} · ${escapeHtml(r.at)}</span></div>`).join("")||"<p>હજુ કોઈ reaction નથી.</p>";
  $("visitList").innerHTML=visits.slice().reverse().map(v=>`<div class="item"><div><b>${escapeHtml(v.person)}</b><small>${escapeHtml(v.title)} · ${escapeHtml(v.at)}</small></div><span>${Math.max(0,Number(v.seconds)||0)} sec · ${v.completed?"Completed":"Opened"}</span></div>`).join("")||"<p>હજુ કોઈ visit નથી.</p>";
}
function fileAsDataUrl(file,maxBytes,label){
  return new Promise((resolve,reject)=>{
    if(!file)return resolve("");
    if(file.size>maxBytes){reject(new Error(`${label} file limit ${Math.round(maxBytes/1024/1024)} MB છે.`));return}
    const reader=new FileReader();reader.onerror=()=>reject(new Error(`${label} વાંચી શકાયી નથી.`));reader.onload=()=>resolve(String(reader.result));reader.readAsDataURL(file);
  });
}
async function saveWish(){
  const person=$("person").value.trim();
  if(!person){setStatus("પહેલાં વ્યક્તિનું નામ લખો.");$("person").focus();return}
  const festival=$("festival").value;if(!festival){setStatus("Festival પસંદ કરો.");return}
  const button=$("saveWish");button.disabled=true;setStatus("Wish સેવ થઈ રહી છે...");
  try{
    const editId=$("editingId")?.value;const id=editId||makeId();const old=wishes.find(w=>w.id===id)||{};
    const [audio,video,image]=await Promise.all([
      fileAsDataUrl($("audioFile").files[0],2*1024*1024,"Audio"),
      fileAsDataUrl($("videoFile").files[0],8*1024*1024,"Video"),
      fileAsDataUrl($("imageFile").files[0],4*1024*1024,"Image")
    ]);
    const wish={id,person,festival,title:$("titleInput").value.trim()||"શુભેચ્છાઓ!",message:$("messageInput").value.trim(),audio:audio||old.audio||"",video:video||old.video||"",image:image||old.image||"",theme:$("templateSelect").value,updatedAt:new Date().toISOString()};
    wishes=wishes.filter(w=>w.id!==id);wishes.unshift(wish);
    if(!persist()){wishes=wishes.filter(w=>w.id!==id);if(old.id)wishes.push(old);return}
    currentId=id;history.replaceState(null,"",location.pathname+"?wish="+encodeURIComponent(id));
    $("editingId")?.remove();renderWish();renderAdmin();setStatus("Wish સફળતાપૂર્વક સેવ થઈ ગઈ. આ demo માં link આ જ browser/device ના data પર આધારિત છે.");
  }catch(err){console.error(err);setStatus(err.message||"Wish સેવ કરતી વખતે ભૂલ આવી. ફરી પ્રયાસ કરો.")}
  finally{button.disabled=false}
}
function resetForm(){
  ["person","titleInput","messageInput","audioFile","videoFile","imageFile"].forEach(id=>$(id).value="");
  $("titleInput").value="શુભેચ્છાઓ!";$("festivalSearch").value="";fillFestivalList();$("templateSelect").value="royal";$("editingId")?.remove();setStatus("નવી Wish માટે ફોર્મ તૈયાર છે.");
}
$("adminToggle").addEventListener("click",()=>{$("adminView").hidden=false;renderAdmin();$("adminView").scrollIntoView({behavior:"smooth",block:"start"})});
$("closeAdmin").addEventListener("click",()=>{$("adminView").hidden=true});
$("saveWish").addEventListener("click",saveWish);
$("newWish").addEventListener("click",resetForm);
$("festivalSearch").addEventListener("input",e=>fillFestivalList(e.target.value));
$("addFestival").addEventListener("click",()=>{
  const name=$("customFestivalName").value.trim();if(!name){setStatus("Custom Festival નું નામ લખો.");return}
  if(allFestivals().some(x=>x.toLowerCase()===name.toLowerCase())){setStatus("આ Festival પહેલેથી યાદીમાં છે.");return}
  customFestivals.push(name);if(!persist())return;$("customFestivalName").value="";$("festivalSearch").value="";fillFestivalList();$("festival").value=name;setStatus("Custom Festival ઉમેરાયો.");
});
$("wishList").addEventListener("click",async e=>{
  const button=e.target.closest("button");if(!button)return;
  const id=button.dataset.copy||button.dataset.edit||button.dataset.del;if(!id)return;
  const wish=wishes.find(w=>w.id===id);if(!wish)return;
  if(button.dataset.copy!==undefined){
    const url=location.origin+location.pathname+"?wish="+encodeURIComponent(id);
    try{await navigator.clipboard.writeText(url);setStatus("Wish link copy થઈ ગઈ. નોંધ: અન્ય device પર જોવા માટે cloud backend જરૂરી છે.")}
    catch{window.prompt("આ link copy કરો:",url)}return;
  }
  if(button.dataset.del!==undefined){if(!confirm("આ Wish delete કરવી છે?"))return;wishes=wishes.filter(w=>w.id!==id);persist();renderAdmin();setStatus("Wish delete થઈ ગઈ.");return}
  if(button.dataset.edit!==undefined){
    $("person").value=wish.person;$("festivalSearch").value="";fillFestivalList();$("festival").value=wish.festival;
    $("titleInput").value=wish.title;$("messageInput").value=wish.message;$("templateSelect").value=wish.theme||"royal";
    $("editingId")?.remove();const hidden=document.createElement("input");hidden.type="hidden";hidden.id="editingId";hidden.value=wish.id;$("saveWish").after(hidden);
    $("adminView").scrollIntoView({behavior:"smooth",block:"start"});setStatus("Wish edit કરવા માટે તૈયાર છે.");
  }
});
$("reactions").addEventListener("click",e=>{
  const button=e.target.closest("button[data-emoji]");if(!button)return;
  const name=$("visitorName").value.trim();if(!name){$("thanksStatus").textContent=language==="gu"?"પહેલાં તમારું નામ લખો.":"Please enter your name first."; $("visitorName").focus();return}
  const wish=currentWish();reactions.push({name,emoji:button.dataset.emoji,person:wish?.person||"Demo Wish",at:new Date().toLocaleString()});persist();
  $("thanksStatus").textContent=(language==="gu"?"તમારો આભાર! ":"Thank you! ")+button.dataset.emoji;
});
$("languageToggle").addEventListener("click",()=>{language=language==="gu"?"en":"gu";safeSet("rwm_language",language);translate()});
$("templateSelect").addEventListener("change",e=>applyTheme(e.target.value));
$("clearLocalData").addEventListener("click",()=>{
  if(!confirm("બધી Wishes, Reactions, Visits અને Custom Festivals આ browser માંથી delete કરવી છે?"))return;
  wishes=[];reactions=[];visits=[];customFestivals=[];persist();currentId=null;history.replaceState(null,"",location.pathname);renderWish();renderAdmin();resetForm();setStatus("Local data સાફ થઈ ગયો.");
});
document.addEventListener("visibilitychange",()=>{
  if(document.visibilityState==="hidden"){if(visibleSince){activeSeconds+=Math.round((Date.now()-visibleSince)/1000);visibleSince=null}recordVisit("update")}
  else visibleSince=Date.now();
});
window.addEventListener("pagehide",()=>{if(visibleSince){activeSeconds+=Math.round((Date.now()-visibleSince)/1000);visibleSince=null}recordVisit("update")});
window.addEventListener("scroll",()=>{
  if(completionRecorded&&window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-40)recordVisit("complete");
},{passive:true});

fillFestivalList();translate();renderWish();
})();
