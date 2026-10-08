/* ---------- Password checker ---------- */
var common=["password","123456","12345678","qwerty","abc123","password1","111111","iloveyou","admin","letmein","welcome"];
var pw=document.getElementById("pw"),fill=document.getElementById("fill"),label=document.getElementById("label");
document.getElementById("show").addEventListener("change",function(){pw.type=this.checked?"text":"password";});
pw.addEventListener("input",function(){
  var v=pw.value;
  var r={
    len:v.length>=12,
    low:/[a-z]/.test(v),
    up:/[A-Z]/.test(v),
    num:/\d/.test(v),
    sym:/[^A-Za-z0-9]/.test(v),
    common:v.length>0&&common.indexOf(v.toLowerCase())===-1
  };
  var score=0;
  document.querySelectorAll("#rules li").forEach(function(li){
    var ok=r[li.dataset.r];
    li.classList.toggle("ok",ok);
    if(ok)score++;
  });
  if(v.length>=16)score++;
  var pct=v?Math.round(score/7*100):0;
  var name="–",color="var(--bad)";
  if(v){
    if(pct<35){name="Very weak";}
    else if(pct<60){name="Weak";color="#ef8f1a";}
    else if(pct<85){name="Good";color="#d4b100";}
    else{name="Strong";color="var(--ok)";}
  }
  fill.style.width=pct+"%";fill.style.background=color;
  label.textContent="Strength: "+name;
});

/* ---------- Phishing quiz ---------- */
var Q=[
 {t:"Email from \"support@paypa1-security.com\": Your account is locked! Verify within 24 hours.",a:true,e:"Lookalike domain (paypa1), urgency and a threat are classic phishing signs."},
 {t:"A message from your college's official portal, reached by typing the website address yourself, asks you to update your timetable.",a:false,e:"You went to the site directly, so this is the safer path."},
 {t:"SMS: You won a free phone! Click http://bit.ly/claim-now to claim your prize.",a:true,e:"Unexpected prizes and shortened links are major red flags."},
 {t:"Your bank never asks for your PIN by email, but this email asks you to reply with your PIN to \"confirm identity\".",a:true,e:"Genuine banks never ask for PINs or passwords by email."},
 {t:"You requested a password reset and receive an email with a reset link a minute later.",a:false,e:"This is expected behaviour because you triggered it yourself."}
];
var qi=0,score=0,box=document.getElementById("qbox");
function showQ(){
  if(qi>=Q.length){
    box.innerHTML='<h3>Quiz complete!</h3><p>You scored <b>'+score+' / '+Q.length+'</b>.</p><button id="again">Try again</button>';
    document.getElementById("again").onclick=function(){qi=0;score=0;showQ();};
    return;
  }
  box.innerHTML='<p style="color:var(--muted);margin:0">Question '+(qi+1)+' of '+Q.length+'</p>'+
    '<p><b>'+Q[qi].t+'</b></p>'+
    '<div class="opts"><button id="yes">🎣 Phishing</button><button id="no" class="alt">✅ Legitimate</button></div>'+
    '<div class="msg" id="fb"></div>';
  document.getElementById("yes").onclick=function(){answer(true);};
  document.getElementById("no").onclick=function(){answer(false);};
}
function answer(g){
  var right=g===Q[qi].a;
  if(right)score++;
  var fb=document.getElementById("fb");
  fb.style.color=right?"var(--ok)":"var(--bad)";
  fb.textContent=(right?"Correct! ":"Not quite. ")+Q[qi].e;
  document.getElementById("yes").disabled=true;
  document.getElementById("no").disabled=true;
  var n=document.createElement("button");
  n.textContent=qi===Q.length-1?"See result":"Next";
  n.onclick=function(){qi++;showQ();};
  fb.after(n);
}
showQ();

/* ---------- Checklist ---------- */
var boxes=document.querySelectorAll("#checks input[type=checkbox]");
boxes.forEach(function(b){b.addEventListener("change",function(){
  var d=document.querySelectorAll("#checks input:checked").length;
  document.getElementById("cfill").style.width=(d/boxes.length*100)+"%";
  document.getElementById("cmsg").textContent=d+" of "+boxes.length+" habits done"+(d===boxes.length?" 🎉 Well protected!":"");
});});