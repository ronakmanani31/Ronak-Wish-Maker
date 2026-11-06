const $ = id => document.getElementById(id);
const KEY = "ronakWishMaker_v1";
let wishes = JSON.parse(localStorage.getItem(KEY) || "[]");
let reactions = JSON.parse(localStorage.getItem(KEY+"_reactions") || "[]");
let visits = JSON.parse(localStorage.getItem(KEY+"_visits") || "[]");
let currentId = new URLSearchParams(location.search).get("wish");
let startedAt = Date.now();
let mediaUrls = {};

function persist(){ localStorage.setItem(KEY,JSON.stringify(wishes)); localStorage.setItem(KEY+"_reactions",JSON.stringify(reactions)); localStorage.setItem(KEY+"_visits",JSON.stringify(visits)); }
function makeId(){return "w"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function current(){return wishes.find(w=>w.id===currentId)}
function renderWish(){
  const w=current();
  if(!w){$("wishTitle").textContent="શુભ દિવાળી!";$("wishName").textContent="તમને અને તમારા પરિવારને";return}
  $("festivalLabel").textContent=w.festival.toUpperCase();
  $("wishTitle").textContent=w.title;
  $("wishName").textContent=w.person;
  $("wishMessage").textContent=w.message;
  if(w.audio){$("wishAudio").src=w.audio;$("wishAudio").hidden=false;$("playMusic").hidden=false}
  if(w.video){$("wishVideo").src=w.video;$("wishVideo").hidden=false;$("playVideo").hidden=false}
  if(w.image){$("wishView").style.backgroundImage=`linear-gradient(#160f0ddd,#160f0ddd),url("${w.image}")`;$("wishView").style.backgroundSize="cover"}
  visits.push({person:w.person, wish:w.title, at:new Date().toLocaleString(), opened:true});
  persist();
}
function renderAdmin(){
  $("wishList").innerHTML=wishes.map(w=>`<div class="item"><div><b>${escapeHtml(w.person)}</b><small>${escapeHtml(w.festival)} · ${escapeHtml(w.title)}</small></div><div><button data-copy="${w.id}">Copy link</button> <button class="outline" data-edit="${w.id}">Edit</button> <button class="outline" data-del="${w.id}">Delete</button></div></div>`).join("")||"<p>હજુ કોઈ Wish નથી.</p>";
  $("reactionList").innerHTML=reactions.map(r=>`<div class="item"><b>${escapeHtml(r.name)}</b><span>${r.emoji} · ${escapeHtml(r.person)} · ${r.at}</span></div>`).join("")||"<p>હજુ કોઈ reaction નથી.</p>";
  $("visitList").innerHTML=visits.slice().reverse().map(v=>`<div class="item"><b>${escapeHtml(v.person)}</b><small>${escapeHtml(v.wish)} · ${v.at}</small></div>`).join("")||"<p>હજુ કોઈ visit નથી.</p>";
}
function escapeHtml(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function readFile(input){return new Promise(resolve=>{const f=input.files[0];if(!f)return resolve("");const r=new FileReader();r.onload=()=>resolve(r.result);r.readAsDataURL(f)})}
$("adminToggle").onclick=()=>{$("adminView").hidden=false;renderAdmin();window.scrollTo(0,document.body.scrollHeight)};
$("closeAdmin").onclick=()=>{$("adminView").hidden=true};
$("saveWish").onclick=async()=>{
 const person=$("person").value.trim(); if(!person){alert("વ્યક્તિનું નામ લખો.");return}
 const id=$("editingId")?.value||makeId();
 const old=wishes.find(w=>w.id===id)||{};
 const audio=await readFile($("audioFile")),video=await readFile($("videoFile")),image=await readFile($("imageFile"));
 const w={id,person,festival:$("festival").value,title:$("titleInput").value||"શુભેચ્છાઓ!",message:$("messageInput").value,audio:audio||old.audio||"",video:video||old.video||"",image:image||old.image||""};
 wishes=wishes.filter(x=>x.id!==id);wishes.push(w);persist();currentId=id;alert("Wish save થઈ ગઈ. આ demo link આ જ browser માં કામ કરશે.");renderAdmin();renderWish();$("editingId")?.remove();
};
$("newWish").onclick=()=>{["person","titleInput","messageInput","audioFile","videoFile","imageFile"].forEach(id=>$(id).value="");$("festival").selectedIndex=0;$("editingId")?.remove()};
$("wishList").onclick=async e=>{
 const copy=e.target.dataset.copy,edit=e.target.dataset.edit,del=e.target.dataset.del;
 if(copy){const url=location.origin+location.pathname+"?wish="+copy;try{await navigator.clipboard.writeText(url);alert("Link copied: "+url)}catch{prompt("આ link copy કરો:",url)}}
 if(del){wishes=wishes.filter(w=>w.id!==del);persist();renderAdmin()}
 if(edit){const w=wishes.find(x=>x.id===edit);$("person").value=w.person;$("festival").value=w.festival;$("titleInput").value=w.title;$("messageInput").value=w.message;let h=document.createElement("input");h.type="hidden";h.id="editingId";h.value=w.id;$("saveWish").after(h)}
};
$("reactions").onclick=e=>{
 const emoji=e.target.dataset.emoji;if(!emoji)return;
 const name=$("visitorName").value.trim();if(!name){$("thanksStatus").textContent="પહેલાં તમારું નામ લખો.";return}
 const w=current();reactions.push({name,emoji,person:w?.person||"Demo Wish",at:new Date().toLocaleString()});persist();$("thanksStatus").textContent="તમારો આભાર! "+emoji;
};
$("playVideo").onclick=()=>$("wishVideo").play();
$("playMusic").onclick=()=>$("wishAudio").play();
window.addEventListener("beforeunload",()=>{const w=current();if(w){visits.push({person:w.person,wish:w.title,at:new Date().toLocaleString(),seconds:Math.round((Date.now()-startedAt)/1000)});persist()}});
renderWish();