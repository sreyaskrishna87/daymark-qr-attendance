const enc = new TextEncoder();

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0d3b2e">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="DoIt ERP">
<link rel="manifest" href="/manifest.json">
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="apple-touch-icon" href="/icon-192.png">
<title>DoIt Innovations · Enterprise Attendance ERP</title>
<style>
:root{
  --primary:#0d5c46;--primary-hover:#094333;--primary-light:#e8f4f0;
  --bg:#f4f6f3;--surface:#ffffff;--border:#e2e7e2;--ink:#12211c;--muted:#576961;
  --success-bg:#e6f6ec;--success-ink:#136237;--danger-bg:#fdeeed;--danger-ink:#a5241b;
  --warn-bg:#fef7e7;--warn-ink:#946300;--radius:14px;
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--ink);min-height:100vh;display:flex;flex-direction:column}
header{background:#0d3b2e;color:#fff;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 10px rgba(0,0,0,0.1)}
.brand{display:flex;align-items:center;gap:10px}
.brand strong{font-size:19px;letter-spacing:-0.2px}
.brand span{background:rgba(255,255,255,0.15);font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;letter-spacing:0.5px}
main{max-width:1120px;width:100%;margin:28px auto;padding:0 20px;flex:1}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;box-shadow:0 4px 20px rgba(13,60,46,0.04);margin-bottom:20px}
.narrow{max-width:440px;margin:8vh auto}
.grid-4{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:20px}
.grid-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-bottom:20px}
.row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.between{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
h1{font-size:26px;letter-spacing:-0.5px;margin-bottom:6px}
h2{font-size:18px;letter-spacing:-0.3px;margin-bottom:14px;color:var(--ink)}
p{color:var(--muted);font-size:14px;line-height:1.5}
.stat-box{background:#fff;border:1px solid var(--border);border-radius:12px;padding:18px}
.stat-box .title{font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px}
.stat-box .val{font-size:28px;font-weight:800;color:var(--ink);margin:8px 0 2px}
.stat-box .sub{font-size:12px;color:var(--muted)}
label{display:block;font-size:13px;font-weight:600;margin:12px 0 6px;color:#283c34}
input,select{width:100%;padding:11px 13px;border:1px solid #c8d4cd;border-radius:9px;font:inherit;background:#fff;outline:none}
input:focus,select:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(13,92,70,0.15)}
button,.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:9px;background:var(--primary);color:#fff;font:600 14px inherit;padding:11px 18px;cursor:pointer;text-decoration:none;transition:background .15s}
button:hover,.btn:hover{background:var(--primary-hover)}
button.secondary,.btn.secondary{background:var(--primary-light);color:var(--primary);border:1px solid #c2e2d6}
button.secondary:hover,.btn.secondary:hover{background:#d5ebe2}
button.danger{background:var(--danger-ink)}
.badge{display:inline-flex;align-items:center;gap:5px;border-radius:99px;padding:4px 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.3px}
.badge.present{background:var(--success-bg);color:var(--success-ink)}
.badge.absent{background:var(--danger-bg);color:var(--danger-ink)}
.badge.weekend{background:#edf0ee;color:#5a6862}
.badge.pending{background:var(--warn-bg);color:var(--warn-ink)}
.badge.in{background:#e7f4ff;color:#0353a4}
table{width:100%;border-collapse:collapse;margin-top:10px}
th,td{text-align:left;padding:12px 14px;border-bottom:1px solid var(--border);font-size:13px}
th{background:#f8faf8;font-weight:700;color:#354a41;text-transform:uppercase;font-size:11px;letter-spacing:0.5px}
tr:hover td{background:#fafcfa}
.hidden{display:none!important}
.notice{padding:12px 16px;border-radius:9px;background:#eef4f0;color:#2c4c3e;margin:14px 0;font-size:13px;line-height:1.45}
.notice.success{background:var(--success-bg);color:var(--success-ink)}
.notice.error{background:var(--danger-bg);color:var(--danger-ink)}
video{width:100%;max-height:45vh;border-radius:12px;background:#000;margin:12px 0}
.tabs{display:flex;gap:6px;border-bottom:1px solid var(--border);padding-bottom:8px;margin-bottom:16px}
.tab{background:transparent;color:var(--muted);border:0;padding:8px 14px;font-size:13px;font-weight:600;border-radius:7px;cursor:pointer}
.tab.active{background:var(--primary-light);color:var(--primary)}
.timeline{display:flex;flex-direction:column;gap:8px;margin-top:14px}
.timeline-item{display:flex;align-items:center;justify-content:space-between;padding:11px 15px;background:#f8faf9;border:1px solid var(--border);border-radius:10px;gap:12px;flex-wrap:wrap}
.timeline-badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;padding:4px 9px;border-radius:6px;letter-spacing:0.3px}
.timeline-badge.in{background:var(--success-bg);color:var(--success-ink)}
.timeline-badge.out{background:var(--danger-bg);color:var(--danger-ink)}
.punch-pills{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap}
.punch-pill{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:600;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}
.punch-pill.in{background:#e6f6ec;color:#136237;border:1px solid #c2e8cf}
.punch-pill.out{background:#fdeeed;color:#a5241b;border:1px solid #f8c9c6}
.flow-arrow{color:#9aa9a1;font-size:11px;font-weight:bold}
.details-toggle{background:#f1f5f3;border:1px solid #d2ded7;color:#284337;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer}
.details-toggle:hover{background:#e3ede7}
.breakdown-row{background:#fbfdfc!important}
.breakdown-box{padding:10px 14px;border:1px dashed #c8d8ce;border-radius:8px;background:#ffffff;margin:4px 0}
.modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,25,18,0.6);display:flex;align-items:center;justify-content:center;z-index:999;padding:16px}
.modal-box{background:#fff;border-radius:16px;max-width:850px;width:100%;max-height:88vh;overflow-y:auto;padding:24px;box-shadow:0 12px 40px rgba(0,0,0,0.2)}
.install-banner{background:#0d3b2e;color:#fff;border-radius:12px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;gap:14px;box-shadow:0 4px 16px rgba(13,59,46,0.18);border:1px solid rgba(255,255,255,0.12)}
.install-banner strong{color:#fff;font-size:14px}
.install-banner p{color:#c4ded3;font-size:12px;margin:2px 0 0}
.install-icon{font-size:22px;background:rgba(255,255,255,0.12);width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.btn-install{background:#10b981;color:#fff;font-weight:700;border:0;border-radius:8px;padding:8px 16px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background .15s}
.btn-install:hover{background:#059669}
.btn-dismiss{background:transparent;border:0;color:#c4ded3;font-size:16px;cursor:pointer;padding:4px 8px;border-radius:6px}
.btn-dismiss:hover{background:rgba(255,255,255,0.1)}
.install-steps{background:#f8faf8;border:1px solid var(--border);border-radius:12px;padding:16px;margin:12px 0}
.install-step-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;font-size:13px}
.step-num{background:var(--primary);color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;flex-shrink:0}
@media(max-width:768px){main{margin:16px auto;padding:0 14px}.card{padding:18px}h1{font-size:22px}}
</style>
</head>
<body>
<header>
  <div class="brand">
    <strong>◈ DoIt Innovations</strong>
    <span>ERP ATTENDANCE</span>
  </div>
  <div class="row" style="gap:10px">
    <button id="headerInstallBtn" onclick="triggerPwaInstall()" style="padding:6px 12px;font-size:12px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:5px">📲 Download App</button>
    <div id="headerAuth" class="row"></div>
  </div>
</header>
<main id="app"></main>

<script>
const app=document.querySelector('#app');
const headerAuth=document.querySelector('#headerAuth');
let adminPassword=sessionStorage.getItem('doit-admin')||'';
let stream=null;
let activeMonth=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit'}).format(new Date());

// PWA Service Worker & Install Prompt
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('/sw.js').catch(()=>{});
  });
}

let deferredInstallPrompt=null;
window.addEventListener('beforeinstallprompt', e=>{
  e.preventDefault();
  deferredInstallPrompt=e;
  const b=document.querySelector('#pwaInstallBanner');
  if(b)b.classList.remove('hidden');
});

window.addEventListener('appinstalled', ()=>{
  deferredInstallPrompt=null;
  document.querySelector('#pwaInstallBanner')?.remove();
  const btn=document.querySelector('#headerInstallBtn');
  if(btn)btn.style.display='none';
});

function installBannerHtml(){
  const isStandalone=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
  const dismissed=sessionStorage.getItem('pwa-dismissed')==='1';
  if(isStandalone||dismissed)return '';
  return \`
    <div id="pwaInstallBanner" class="install-banner">
      <div class="row" style="gap:12px">
        <div class="install-icon">📲</div>
        <div>
          <strong>Download to Home Screen (Chrome App)</strong>
          <p>Install DoIt ERP like an app for instant 1-tap QR attendance scanning.</p>
        </div>
      </div>
      <div class="row" style="gap:8px">
        <button class="btn-install" onclick="triggerPwaInstall()">Download to Home</button>
        <button class="btn-dismiss" onclick="dismissInstallBanner()" title="Dismiss">✕</button>
      </div>
    </div>
  \`;
}

window.dismissInstallBanner=function(){
  sessionStorage.setItem('pwa-dismissed','1');
  document.querySelector('#pwaInstallBanner')?.remove();
};

window.triggerPwaInstall=async function(){
  if(deferredInstallPrompt){
    deferredInstallPrompt.prompt();
    try{
      const choice=await deferredInstallPrompt.userChoice;
      if(choice.outcome==='accepted'){
        dismissInstallBanner();
      }
    }catch{}
    deferredInstallPrompt=null;
  }else{
    showInstallInstructionsModal();
  }
};

window.showInstallInstructionsModal=function(){
  document.querySelector('#pwaGuideModal')?.remove();
  const ua=navigator.userAgent||'';
  const isIos=/iphone|ipad|ipod/i.test(ua);
  const isAndroid=/android/i.test(ua);
  
  const modal=document.createElement('div');
  modal.className='modal-overlay';
  modal.id='pwaGuideModal';
  modal.innerHTML=\`
    <div class="modal-box" style="max-width:520px">
      <div class="between" style="margin-bottom:14px">
        <div class="row" style="gap:10px">
          <div class="install-icon" style="background:var(--primary-light);color:var(--primary)">📲</div>
          <div>
            <h2 style="margin:0;font-size:18px">Download to Home Screen</h2>
            <p style="margin:2px 0 0;font-size:12px">Install DoIt ERP as a Chrome App on your device</p>
          </div>
        </div>
        <button class="secondary" onclick="document.querySelector('#pwaGuideModal')?.remove()">✕ Close</button>
      </div>

      <div style="font-size:13px;line-height:1.6;color:var(--ink)">
        \${isIos ? \`
          <p style="margin-bottom:10px"><strong>For iPhone &amp; iPad (Safari):</strong></p>
          <div class="install-steps">
            <div class="install-step-item">
              <span class="step-num">1</span>
              <div>Tap the <strong>Share</strong> button at the bottom of Safari (<span style="font-size:16px">⎙</span> square with up arrow).</div>
            </div>
            <div class="install-step-item">
              <span class="step-num">2</span>
              <div>Scroll down the options list and tap <strong>"Add to Home Screen"</strong> (➕).</div>
            </div>
            <div class="install-step-item">
              <span class="step-num">3</span>
              <div>Tap <strong>Add</strong> in the top-right corner. The DoIt ERP app will be placed directly on your phone&#39;s Home screen!</div>
            </div>
          </div>
        \` : isAndroid ? \`
          <p style="margin-bottom:10px"><strong>For Android (Chrome Browser):</strong></p>
          <div class="install-steps">
            <div class="install-step-item">
              <span class="step-num">1</span>
              <div>Tap the <strong>three dots menu (⋮)</strong> in the top-right corner of Chrome.</div>
            </div>
            <div class="install-step-item">
              <span class="step-num">2</span>
              <div>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</div>
            </div>
            <div class="install-step-item">
              <span class="step-num">3</span>
              <div>Tap <strong>Install</strong>. DoIt ERP will download onto your Home screen as a standalone app!</div>
            </div>
          </div>
        \` : \`
          <p style="margin-bottom:10px"><strong>For Desktop (Google Chrome / Edge):</strong></p>
          <div class="install-steps">
            <div class="install-step-item">
              <span class="step-num">1</span>
              <div>Look at the right side of the address bar at the top (next to the bookmark star ⭐).</div>
            </div>
            <div class="install-step-item">
              <span class="step-num">2</span>
              <div>Click the <strong>Install DoIt ERP</strong> icon (<span style="font-size:15px">⊕</span> or computer icon).</div>
            </div>
            <div class="install-step-item">
              <span class="step-num">3</span>
              <div>Click <strong>Install</strong> to add DoIt ERP to your desktop apps and taskbar!</div>
            </div>
          </div>
        \`}
      </div>

      <div style="text-align:right;margin-top:16px">
        <button class="btn" onclick="document.querySelector('#pwaGuideModal')?.remove()">Got It!</button>
      </div>
    </div>
  \`;
  document.body.appendChild(modal);
};

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const timeStr=t=>t?new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:true}).format(new Date(t)):'—';
window.toggleDayBreakdown=function(dayNum){
  const el=document.querySelector('#breakdown-'+dayNum);
  if(el)el.classList.toggle('hidden');
};

async function api(path,opts={}){
  const r=await fetch(path,{...opts,headers:{'content-type':'application/json',...(opts.headers||{})}});
  let d={};
  try{d=await r.json()}catch{}
  if(!r.ok)throw Error(d.error||'Request failed');
  return d;
}
const post=(path,data)=>api(path,{method:'POST',body:JSON.stringify(data)});
function msg(id,s,cls=''){
  const n=document.querySelector(id);
  if(n){n.className='notice '+cls;n.textContent=s;n.classList.remove('hidden')}
}

// ---------------- LOGIN VIEW ----------------
function loginView(){
  headerAuth.innerHTML='<button class="secondary" id="adminHeaderBtn">Admin Portal</button>';
  document.querySelector('#adminHeaderBtn').onclick=promptAdmin;
  app.innerHTML=\`
    \${installBannerHtml()}
    <section class="card narrow">
      <div style="text-align:center;margin-bottom:16px">
        <span class="badge present">DOIT INNOVATIONS ERP</span>
        <h1 style="margin-top:12px">Employee Sign In</h1>
        <p>Access your monthly attendance record, check-in history, and punch log.</p>
      </div>
      <form id="loginForm">
        <label>Username or Employee ID</label>
        <input name="username" placeholder="e.g. rahul.sharma" autocomplete="username" required>
        <label>Password</label>
        <input name="password" type="password" placeholder="••••••••" autocomplete="current-password" required>
        <div id="loginMsg" class="notice hidden"></div>
        <button style="width:100%;margin-top:18px">Sign In to ERP</button>
      </form>
      <hr style="border:0;border-top:1px solid var(--border);margin:24px 0 16px">
      <div style="text-align:center">
        <a href="/register" class="btn secondary" style="width:100%;margin-bottom:14px">New Employee? Register Here →</a>
        <p class="muted" style="margin-bottom:10px">Need admin management access?</p>
        <button class="secondary" id="adminLoginBtn" style="width:100%">Sign In as Admin</button>
      </div>
    </section>
  \`;
  document.querySelector('#loginForm').onsubmit=async e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    try{
      await post('/api/login',{username:f.get('username'),password:f.get('password')});
      location.reload();
    }catch(err){
      msg('#loginMsg',err.message,'error');
    }
  };
  document.querySelector('#adminLoginBtn').onclick=promptAdmin;
}

function promptAdmin(){
  const pass=prompt('Enter DoIt Innovations Admin Password:');
  if(pass){
    adminPassword=pass;
    sessionStorage.setItem('doit-admin',pass);
    adminPortalView();
  }
}

// ---------------- REGISTER VIEW ----------------
function registerView(){
  headerAuth.innerHTML='<a href="/" class="btn secondary" style="padding:6px 12px;font-size:12px">Back to Sign In</a>';
  app.innerHTML=\`
    <section class="card narrow">
      <div style="text-align:center;margin-bottom:16px">
        <span class="badge present">DOIT INNOVATIONS ONBOARDING</span>
        <h1 style="margin-top:12px">Employee Registration</h1>
        <p>Create your attendance account and set your personal password.</p>
      </div>
      <form id="regForm">
        <label>Full Name</label>
        <input name="name" id="regName" placeholder="e.g. Rahul Verma" required>

        <div class="row">
          <div style="flex:1">
            <label>Department</label>
            <input name="department" placeholder="e.g. Operations" value="Operations" required>
          </div>
          <div style="flex:1">
            <label>Role / Job Title</label>
            <input name="role" placeholder="e.g. Associate" value="Associate" required>
          </div>
        </div>

        <label>Choose a Username</label>
        <input name="username" id="regUsername" placeholder="e.g. rahul.verma" autocomplete="username" required>

        <label>Create Password</label>
        <input name="password" type="password" placeholder="Min. 6 characters" minlength="6" autocomplete="new-password" required>

        <label>Confirm Password</label>
        <input name="confirmPassword" type="password" placeholder="Repeat your password" minlength="6" autocomplete="new-password" required>

        <div id="regMsg" class="notice hidden"></div>
        <button style="width:100%;margin-top:18px">Register & Set Password</button>
      </form>
      <div style="text-align:center;margin-top:16px">
        <p class="muted">Already registered? <a href="/" style="color:var(--primary);font-weight:600">Sign in here</a></p>
      </div>
    </section>
  \`;

  const nameInput=document.querySelector('#regName');
  const userInput=document.querySelector('#regUsername');
  nameInput.addEventListener('input',()=>{
    if(!userInput.dataset.manual){
      userInput.value=nameInput.value.toLowerCase().replace(/[^a-z0-9]+/g,'.').replace(/^\\.|\.$/g,'');
    }
  });
  userInput.addEventListener('input',()=>{userInput.dataset.manual='true'});

  document.querySelector('#regForm').onsubmit=async e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    const pass=f.get('password');
    const confirm=f.get('confirmPassword');
    if(pass!==confirm){
      msg('#regMsg','Passwords do not match. Please re-type.','error');
      return;
    }
    try{
      const res=await post('/api/register',{
        name:f.get('name'),
        department:f.get('department'),
        role:f.get('role'),
        username:f.get('username'),
        password:pass
      });
      alert('Registration Successful!\\n\\nWelcome to DoIt Innovations, '+res.name+'!\\nYour Employee ID is: '+res.emp_code);
      location.href='/';
    }catch(err){
      msg('#regMsg',err.message,'error');
    }
  };
}

// ---------------- EMPLOYEE ERP VIEW ----------------
async function employeeView(){
  let me;
  try{
    me=await api('/api/me?month='+encodeURIComponent(activeMonth));
  }catch{
    loginView();
    return;
  }

  headerAuth.innerHTML=\`
    <span style="color:#c0ded4;font-size:13px">\${esc(me.employee.name)} (\${esc(me.employee.emp_code||'EMP')})</span>
    <button class="secondary" id="logoutBtn" style="padding:6px 12px;font-size:12px">Sign Out</button>
  \`;
  document.querySelector('#logoutBtn').onclick=async()=>{
    await post('/api/logout',{});
    location.reload();
  };

  const isAtWork=me.todaySummary?.currentState==='in';
  const todayBadge=isAtWork?'<span class="badge present">● Currently At Work</span>':me.todaySummary?.punches?.length?'<span class="badge in">✓ Completed for Today</span>':'<span class="badge pending">○ Not Checked In Today</span>';

  app.innerHTML=\`
    \${installBannerHtml()}
    <div class="between" style="margin-bottom:18px">
      <div>
        <h1>Welcome, \${esc(me.employee.name)}</h1>
        <p>\${esc(me.employee.role)} · \${esc(me.employee.department)} Department · ID: <strong>\${esc(me.employee.emp_code||'EMP')}</strong></p>
      </div>
      <div>\${todayBadge}</div>
    </div>

    <!-- Quick Check-in Card -->
    <section class="card">
      <div class="between">
        <div>
          <h2>Today&#39;s Attendance Punch</h2>
          <p>Scan the office entrance QR poster to record arrival or departure with GPS verification.</p>
        </div>
        <button id="openScannerBtn" style="min-width:200px">
          \${isAtWork?'Check Out / Stepped Outside (Scan QR)':'Check In / Arrived (Scan QR)'}
        </button>
      </div>
      <div id="scannerBox" class="hidden" style="margin-top:16px">
        <video id="scannerVideo" playsinline autoplay muted></video>
        <div class="row">
          <button class="secondary" id="closeScannerBtn">Cancel Scanner</button>
          <span style="font-size:12px;color:var(--muted)">Ensure camera & location access are enabled.</span>
        </div>
      </div>
      <div id="scanMsg" class="notice hidden"></div>
      
      <div class="grid-4" style="margin-top:20px;margin-bottom:0">
        <div class="stat-box">
          <div class="title">First In (Arrival)</div>
          <div class="val" style="font-size:20px">\${timeStr(me.todaySummary?.firstIn)}</div>
          <div class="sub">Today&#39;s first entrance</div>
        </div>
        <div class="stat-box">
          <div class="title">Last Out (Departure)</div>
          <div class="val" style="font-size:20px">\${timeStr(me.todaySummary?.lastOut)}</div>
          <div class="sub">Today&#39;s latest exit</div>
        </div>
        <div class="stat-box">
          <div class="title">Time In Office</div>
          <div class="val" style="font-size:20px;color:var(--success-ink)">\${me.todaySummary?.hoursWorked||'0h 0m'}</div>
          <div class="sub">Active on-site duration</div>
        </div>
        <div class="stat-box">
          <div class="title">Outside / Breaks</div>
          <div class="val" style="font-size:20px;color:var(--muted)">\${me.todaySummary?.outsideDuration||'0m'}</div>
          <div class="sub">Time spent out of office</div>
        </div>
      </div>
    </section>

    <!-- Today's Movement & Punch Timeline -->
    <section class="card">
      <div class="between" style="margin-bottom:12px">
        <div>
          <h2>Today&#39;s Movement Timeline (When Came In / Went Outside)</h2>
          <p>Real-time log of every time you entered the office or stepped outside today.</p>
        </div>
        <div>
          <span class="badge \${isAtWork?'present':'absent'}">
            \${isAtWork?'🟢 Currently In Office':'🔴 Currently Outside / Away'}
          </span>
        </div>
      </div>

      \${me.todaySummary?.punches && me.todaySummary.punches.length > 0 ? \`
        <div class="timeline">
          \${me.todaySummary.punches.map((p, idx)=>\`
            <div class="timeline-item">
              <div class="row" style="gap:10px">
                <span class="timeline-badge \${p.kind}">
                  \${p.kind==='in'?'🟢 CAME IN':'🔴 WENT OUTSIDE'}
                </span>
                <strong style="font-size:15px;letter-spacing:0.3px">\${p.timeFormatted}</strong>
                <span style="font-size:12px;color:var(--muted)">Punch #\${idx + 1}</span>
              </div>
              <div style="font-size:13px;font-weight:600;color:\${p.kind==='in'?'var(--success-ink)':'var(--danger-ink)'}">
                \${esc(p.intervalText)}
              </div>
            </div>
          \`).join('')}
        </div>
        <div class="between" style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
          <div style="font-size:13px;color:var(--muted)">
            Total In Office: <strong style="color:var(--ink)">\${me.todaySummary.hoursWorked}</strong> · 
            Outside / Breaks: <strong style="color:var(--ink)">\${me.todaySummary.outsideDuration}</strong>
          </div>
          <div style="font-size:12px;color:var(--muted)">
            Total Punches Today: <strong>\${me.todaySummary.punches.length}</strong>
          </div>
        </div>
      \` : \`
        <div style="text-align:center;padding:22px 12px;color:var(--muted);font-size:14px">
          No punches recorded yet today. Scan the entrance poster to record your arrival.
        </div>
      \`}
    </section>

    <!-- Monthly ERP Sheet & History -->
    <section class="card">
      <div class="between" style="margin-bottom:14px">
        <div>
          <h2>Monthly Attendance Timesheet</h2>
          <p>Review complete day-by-day attendance records, present days, and absent days.</p>
        </div>
        <div class="row">
          <label style="margin:0;font-size:12px">Month:</label>
          <input type="month" id="monthPicker" value="\${activeMonth}" style="width:auto;padding:6px 10px;font-size:13px">
        </div>
      </div>

      <!-- Month Summary Metrics -->
      <div class="grid-4">
        <div class="stat-box">
          <div class="title">Days Present</div>
          <div class="val" style="color:var(--success-ink)">\${me.monthSummary.presentDays} <small style="font-size:14px;color:var(--muted)">days</small></div>
          <div class="sub">Attended on-site</div>
        </div>
        <div class="stat-box">
          <div class="title">Days Absent</div>
          <div class="val" style="color:var(--danger-ink)">\${me.monthSummary.absentDays} <small style="font-size:14px;color:var(--muted)">days</small></div>
          <div class="sub">Missed workdays</div>
        </div>
        <div class="stat-box">
          <div class="title">Total Hours Worked</div>
          <div class="val">\${me.monthSummary.totalHours} <small style="font-size:14px;color:var(--muted)">hrs</small></div>
          <div class="sub">In selected month</div>
        </div>
        <div class="stat-box">
          <div class="title">Attendance Rate</div>
          <div class="val">\${me.monthSummary.attendanceRate}%</div>
          <div class="sub">\${me.monthSummary.presentDays} of \${me.monthSummary.workingDaysSoFar} workdays</div>
        </div>
      </div>

      <!-- Day-by-Day Calendar Matrix -->
      <div style="overflow-x:auto">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Status</th>
              <th>Movements &amp; Punches (When Came / Went Out)</th>
              <th>In Office</th>
              <th>Outside</th>
              <th>Breakdown</th>
            </tr>
          </thead>
          <tbody>
            \${me.calendar.map(day=>\`
              <tr>
                <td><strong>\${esc(day.date)}</strong></td>
                <td>\${esc(day.dayOfWeek)}</td>
                <td>
                  <span class="badge \${day.status.toLowerCase()}">
                    \${day.status==='Present'?'✓ Present':day.status==='Absent'?'✕ Absent':day.status==='Weekend'?'Weekend':'—'}
                  </span>
                </td>
                <td>
                  \${day.punches && day.punches.length>0 ? \`
                    <div class="punch-pills">
                      \${day.punches.map(p=>\`
                        <span class="punch-pill \${p.kind}">
                          \${p.kind==='in'?'🟢 IN':'🔴 OUT'} \${p.timeFormatted}
                        </span>
                      \`).join('<span class="flow-arrow">➔</span>')}
                    </div>
                  \` : (day.status==='Absent'?'<span style="color:var(--danger-ink);font-size:12px">✕ No Punches</span>':(day.status==='Weekend'?'<span style="color:var(--muted);font-size:12px">Weekend</span>':'—'))}
                </td>
                <td style="font-weight:600">\${day.duration||'—'}</td>
                <td style="color:var(--muted)">\${day.outsideDuration||'0m'}</td>
                <td>
                  \${day.punches && day.punches.length>0 ? \`
                    <button class="details-toggle" onclick="toggleDayBreakdown('\${day.dayNumber}')">
                      👁 Details (\${day.punches.length})
                    </button>
                  \` : '—'}
                </td>
              </tr>
              \${day.punches && day.punches.length>0 ? \`
                <tr id="breakdown-\${day.dayNumber}" class="breakdown-row hidden">
                  <td colspan="7" style="padding:10px 16px">
                    <div class="breakdown-box">
                      <div class="between" style="margin-bottom:8px">
                        <strong style="font-size:13px">Exact Punch Log for \${esc(day.date)} (\${esc(day.dayOfWeek)})</strong>
                        <span style="font-size:12px;color:var(--muted)">In Office: <strong style="color:var(--ink)">\${day.duration}</strong> · Outside/Break: <strong style="color:var(--ink)">\${day.outsideDuration}</strong></span>
                      </div>
                      <div class="timeline" style="margin-top:6px;gap:6px">
                        \${day.punches.map((p, idx)=>\`
                          <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:#f4f7f5;border-radius:6px;font-size:12px">
                            <div class="row" style="gap:8px">
                              <span class="timeline-badge \${p.kind}" style="padding:2px 7px;font-size:11px">
                                \${p.kind==='in'?'🟢 CAME IN':'🔴 WENT OUTSIDE'}
                              </span>
                              <strong>\${p.timeFormatted}</strong>
                              <span style="color:var(--muted)">Punch #\${idx + 1}</span>
                            </div>
                            <div style="font-weight:600;color:\${p.kind==='in'?'var(--success-ink)':'var(--danger-ink)'}">
                              \${esc(p.intervalText)}
                            </div>
                          </div>
                        \`).join('')}
                      </div>
                    </div>
                  </td>
                </tr>
              \` : ''}
            \`).join('')}
          </tbody>
        </table>
      </div>
    </section>
  \`;

  document.querySelector('#openScannerBtn').onclick=startScanner;
  document.querySelector('#closeScannerBtn').onclick=stopScanner;
  document.querySelector('#monthPicker').onchange=e=>{
    activeMonth=e.target.value;
    employeeView();
  };
}

// ---------------- CAMERA SCANNER (UNIVERSAL IPHONE & ANDROID) ----------------
async function loadQrDetector(){
  if('BarcodeDetector' in window){
    return new BarcodeDetector({formats:['qr_code']});
  }
  if(!window.jsQR){
    await new Promise(res=>{
      const s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
      s.onload=res;
      s.onerror=res;
      document.head.appendChild(s);
    });
  }
  return null;
}

async function startScanner(){
  try{
    const detector=await loadQrDetector();
    stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false});
    const video=document.querySelector('#scannerVideo');
    video.setAttribute('playsinline','true');
    video.setAttribute('autoplay','true');
    video.setAttribute('muted','true');
    video.muted=true;
    video.srcObject=stream;
    await video.play();
    document.querySelector('#scannerBox').classList.remove('hidden');

    let canvas=null;
    let ctx=null;

    const tick=async()=>{
      if(!stream)return;
      try{
        let rawCode=null;
        if(detector){
          const codes=await detector.detect(video);
          if(codes.length)rawCode=codes[0].rawValue;
        }else if(window.jsQR && video.videoWidth>0){
          if(!canvas){
            canvas=document.createElement('canvas');
            ctx=canvas.getContext('2d',{willReadFrequently:true});
          }
          canvas.width=video.videoWidth;
          canvas.height=video.videoHeight;
          ctx.drawImage(video,0,0,canvas.width,canvas.height);
          const imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
          const qr=window.jsQR(imgData.data,imgData.width,imgData.height,{inversionAttempts:'dontInvert'});
          if(qr && qr.data)rawCode=qr.data;
        }

        if(rawCode){
          stopScanner();
          msg('#scanMsg','Verifying office GPS presence...','');
          const loc=await new Promise((resolve,reject)=>navigator.geolocation.getCurrentPosition(
            p=>resolve({latitude:p.coords.latitude,longitude:p.coords.longitude,accuracy:p.coords.accuracy}),
            err=>reject(Error('GPS permission required: '+err.message)),
            {enableHighAccuracy:true,timeout:12000}
          ));
          const res=await post('/api/scan',{qrCode:rawCode,location:loc});
          msg('#scanMsg',res.message,'success');
          setTimeout(()=>location.reload(),1400);
          return;
        }
      }catch(err){
        msg('#scanMsg',err.message,'error');
      }
      requestAnimationFrame(tick);
    };
    tick();
  }catch(err){
    msg('#scanMsg',err.message,'error');
  }
}

function stopScanner(){
  if(stream){
    stream.getTracks().forEach(t=>t.stop());
    stream=null;
  }
  const box=document.querySelector('#scannerBox');
  if(box)box.classList.add('hidden');
}

// ---------------- ADMIN ERP PORTAL VIEW ----------------
async function adminPortalView(){
  if(!adminPassword){
    promptAdmin();
    return;
  }

  try{
    const [d,s]=await Promise.all([
      api('/api/admin/dashboard?month='+encodeURIComponent(activeMonth),{headers:{authorization:'Basic '+btoa('admin:'+adminPassword)}}),
      api('/api/admin/settings',{headers:{authorization:'Basic '+btoa('admin:'+adminPassword)}})
    ]);

    headerAuth.innerHTML=\`
      <span style="color:#c0ded4;font-size:13px">Admin Mode</span>
      <button class="secondary" id="employeeViewBtn" style="padding:6px 12px;font-size:12px">Employee View</button>
      <button class="danger" id="adminLogoutBtn" style="padding:6px 12px;font-size:12px">Sign Out</button>
    \`;
    document.querySelector('#employeeViewBtn').onclick=()=>{
      adminPassword='';
      sessionStorage.removeItem('doit-admin');
      employeeView();
    };
    document.querySelector('#adminLogoutBtn').onclick=()=>{
      adminPassword='';
      sessionStorage.removeItem('doit-admin');
      loginView();
    };

    app.innerHTML=\`
      <div class="between" style="margin-bottom:18px">
        <div>
          <h1>Enterprise HR & Attendance ERP</h1>
          <p>Company-wide attendance management, employee roster, monthly timesheets, and entrance geofencing.</p>
        </div>
        <div class="row">
          <a href="/poster" target="_blank" class="btn secondary">Print Office Poster ↗</a>
        </div>
      </div>

      <!-- General Registration Link Banner -->
      <div class="card" style="background:#f0f7f4;border-color:#bde0d3;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px">
        <div>
          <strong style="color:var(--primary);font-size:14px">📢 General Employee Onboarding Link</strong>
          <p style="font-size:12px;color:var(--muted);margin-top:2px">Send this general link to all employees so they can self-register and set their own passwords:</p>
          <code style="background:#fff;padding:5px 9px;border-radius:6px;border:1px solid #c8e2d7;font-size:13px;margin-top:6px;display:inline-block;color:var(--primary);font-weight:700">https://doit-erp.pages.dev/register</code>
        </div>
        <button class="secondary" onclick="navigator.clipboard.writeText(location.origin+&#39;/register&#39;);alert(&#39;Copied registration link to clipboard: &#39;+location.origin+&#39;/register&#39;)">Copy Link</button>
      </div>

      <!-- Executive Overview -->
      <div class="grid-4">
        <div class="stat-box">
          <div class="title">Active Employees</div>
          <div class="val">\${d.totalEmployees}</div>
          <div class="sub">Total registered in ERP</div>
        </div>
        <div class="stat-box">
          <div class="title">Present Today</div>
          <div class="val" style="color:var(--success-ink)">\${d.checkedInToday}</div>
          <div class="sub">Currently on-site</div>
        </div>
        <div class="stat-box">
          <div class="title">Absent Today</div>
          <div class="val" style="color:var(--danger-ink)">\${d.absentToday}</div>
          <div class="sub">Not checked in</div>
        </div>
        <div class="stat-box">
          <div class="title">Today&#39;s Punches</div>
          <div class="val">\${d.todayPunchesCount}</div>
          <div class="sub">Total scans recorded</div>
        </div>
      </div>

      <!-- Add Employee & Office Settings Grid -->
      <div class="grid-2">
        <div class="card">
          <h2>Add New Employee</h2>
          <form id="addEmpForm">
            <label>Full Name</label>
            <input name="name" placeholder="e.g. Rahul Sharma" required>
            <div class="row">
              <div style="flex:1">
                <label>Department</label>
                <input name="department" placeholder="e.g. Engineering" value="Operations">
              </div>
              <div style="flex:1">
                <label>Role / Title</label>
                <input name="role" placeholder="e.g. Senior Specialist" value="Specialist">
              </div>
            </div>
            <button style="margin-top:16px;width:100%">Create Employee Account</button>
          </form>
          <div id="empCreds" class="notice hidden"></div>
          <div id="addEmpMsg" class="notice hidden"></div>
        </div>

        <div class="card">
          <h2>Office Geofence Settings</h2>
          <p>Configure the physical coordinates where employees are authorized to punch.</p>
          <form id="officeSettingsForm">
            <label>Office Name</label>
            <input name="officeName" value="\${esc(s.officeName)}">
            <div class="row">
              <div style="flex:1">
                <label>Latitude</label>
                <input name="officeLat" type="number" step="any" value="\${esc(s.officeLat??'')}" required>
              </div>
              <div style="flex:1">
                <label>Longitude</label>
                <input name="officeLng" type="number" step="any" value="\${esc(s.officeLng??'')}" required>
              </div>
            </div>
            <label>Allowed Radius (metres)</label>
            <input name="radius" type="number" value="\${esc(s.radius)}">
            <button style="margin-top:16px">Save Office Geofence</button>
          </form>
          <div id="settingsMsg" class="notice hidden"></div>
        </div>
      </div>

      <!-- Employee Directory & Monthly Performance -->
      <section class="card">
        <div class="between" style="margin-bottom:12px">
          <div>
            <h2>Employee Attendance Records (ERP Roster)</h2>
            <p>Monthly performance, days present, and today&#39;s real-time status.</p>
          </div>
          <div class="row">
            <label style="margin:0;font-size:12px">Month:</label>
            <input type="month" id="adminMonthPicker" value="\${activeMonth}" style="width:auto;padding:6px 10px;font-size:13px">
          </div>
        </div>

        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>Emp Code</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Role</th>
                <th>Today&#39;s Status</th>
                <th>Present (Month)</th>
                <th>Absent (Month)</th>
                <th>Hours (Month)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              \${d.employees.map(e=>\`
                <tr>
                  <td><code>\${esc(e.emp_code||'EMP')}</code></td>
                  <td><strong>\${esc(e.name)}</strong><br><small class="muted">@\${esc(e.username)}</small></td>
                  <td>\${esc(e.department||'General')}</td>
                  <td>\${esc(e.role||'Specialist')}</td>
                  <td>
                    <span class="badge \${e.todayState==='in'?'present':e.todayState==='out'?'in':'absent'}">
                      \${e.todayState==='in'?'At Work':e.todayState==='out'?'Checked Out':'Not In'}
                    </span>
                  </td>
                  <td style="color:var(--success-ink);font-weight:700">\${e.monthStats.presentDays} d</td>
                  <td style="color:var(--danger-ink);font-weight:700">\${e.monthStats.absentDays} d</td>
                  <td>\${e.monthStats.totalHours} hrs</td>
                  <td class="row" style="gap:6px">
                    <button class="secondary" style="padding:4px 9px;font-size:11px" onclick="viewEmpTimesheet('\${e.id}','\${esc(e.name)}')">📅 View Activity</button>
                    <button class="secondary" style="padding:4px 9px;font-size:11px" onclick="resetEmpPassword('\${e.id}','\${esc(e.name)}')">Reset Password</button>
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Recent Punch Feed -->
      <section class="card">
        <h2>Live Verification Feed</h2>
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Punch Time</th>
                <th>Type</th>
                <th>Distance to Geofence</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              \${d.recentPunches.map(p=>\`
                <tr>
                  <td><strong>\${esc(p.name)}</strong> (\${esc(p.emp_code||'EMP')})</td>
                  <td>\${new Date(p.time).toLocaleString()}</td>
                  <td><span class="badge \${p.kind==='in'?'present':'absent'}">\${p.kind==='in'?'🟢 CAME IN (Arrival)':'🔴 WENT OUTSIDE (Departure)'}</span></td>
                  <td>\${p.distance_meters!=null?p.distance_meters+' m':'—'}</td>
                  <td><span class="badge present">✓ \${esc(p.status)}</span></td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>
      </section>
    \`;

    document.querySelector('#adminMonthPicker').onchange=e=>{
      activeMonth=e.target.value;
      adminPortalView();
    };

    document.querySelector('#addEmpForm').onsubmit=async e=>{
      e.preventDefault();
      const f=new FormData(e.target);
      try{
        const res=await api('/api/admin/employees',{
          method:'POST',
          headers:{authorization:'Basic '+btoa('admin:'+adminPassword)},
          body:JSON.stringify({
            name:f.get('name'),
            department:f.get('department'),
            role:f.get('role')
          })
        });
        document.querySelector('#empCreds').innerHTML=\`
          <strong>Account Created Successfully! Give these credentials to \${esc(res.name)}:</strong><br>
          Employee ID: <code>\${esc(res.emp_code)}</code><br>
          Username: <code>\${esc(res.username)}</code><br>
          Temporary Password: <code>\${esc(res.password)}</code>
        \`;
        document.querySelector('#empCreds').classList.remove('hidden');
        e.target.reset();
        adminPortalView();
      }catch(err){
        msg('#addEmpMsg',err.message,'error');
      }
    };

    document.querySelector('#officeSettingsForm').onsubmit=async e=>{
      e.preventDefault();
      const f=new FormData(e.target);
      try{
        await api('/api/admin/settings',{
          method:'POST',
          headers:{authorization:'Basic '+btoa('admin:'+adminPassword)},
          body:JSON.stringify({
            officeName:f.get('officeName'),
            officeLat:f.get('officeLat'),
            officeLng:f.get('officeLng'),
            radius:f.get('radius')
          })
        });
        msg('#settingsMsg','Office geofence settings saved successfully.','success');
      }catch(err){
        msg('#settingsMsg',err.message,'error');
      }
    };

  }catch(err){
    adminPassword='';
    sessionStorage.removeItem('doit-admin');
    loginView();
    alert('Admin authentication failed: '+err.message);
  }
}

window.resetEmpPassword=async(empId,empName)=>{
  if(!confirm('Reset and generate a new password for '+empName+'?'))return;
  try{
    const res=await api('/api/admin/employees/reset-password',{
      method:'POST',
      headers:{authorization:'Basic '+btoa('admin:'+adminPassword)},
      body:JSON.stringify({employeeId:empId})
    });
    alert('Password Reset for '+res.name+' ('+res.emp_code+'):\\n\\nUsername: '+res.username+'\\nNew Password: '+res.newPassword+'\\n\\nPlease share this temporary password with the employee.');
  }catch(err){
    alert('Failed to reset password: '+err.message);
  }
};

window.viewEmpTimesheet=async(empId,empName)=>{
  try{
    const d=await api('/api/admin/employees/timesheet?employeeId='+encodeURIComponent(empId)+'&month='+encodeURIComponent(activeMonth),{
      headers:{authorization:'Basic '+btoa('admin:'+adminPassword)}
    });
    const modal=document.createElement('div');
    modal.className='modal-overlay';
    modal.id='empTimesheetModal';
    modal.innerHTML=\`
      <div class="modal-box">
        <div class="between" style="margin-bottom:14px">
          <div>
            <h2 style="margin:0">\${esc(d.employee.name)} (\${esc(d.employee.emp_code||'EMP')})</h2>
            <p style="margin:2px 0 0">\${esc(d.employee.role)} · \${esc(d.employee.department)} Department · Month: \${esc(d.timesheet.monthSummary.month)}</p>
          </div>
          <button class="secondary" onclick="document.querySelector('#empTimesheetModal')?.remove()">✕ Close</button>
        </div>
        <div class="grid-4" style="margin-bottom:16px">
          <div class="stat-box" style="padding:12px">
            <div class="title">Days Present</div>
            <div class="val" style="font-size:22px;color:var(--success-ink)">\${d.timesheet.monthSummary.presentDays} d</div>
          </div>
          <div class="stat-box" style="padding:12px">
            <div class="title">Days Absent</div>
            <div class="val" style="font-size:22px;color:var(--danger-ink)">\${d.timesheet.monthSummary.absentDays} d</div>
          </div>
          <div class="stat-box" style="padding:12px">
            <div class="title">Time In Office</div>
            <div class="val" style="font-size:22px">\${d.timesheet.monthSummary.totalHours} hrs</div>
          </div>
          <div class="stat-box" style="padding:12px">
            <div class="title">Attendance Rate</div>
            <div class="val" style="font-size:22px">\${d.timesheet.monthSummary.attendanceRate}%</div>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Status</th>
                <th>Movement &amp; Punches (When Came / Went Out)</th>
                <th>In Office</th>
                <th>Outside</th>
              </tr>
            </thead>
            <tbody>
              \${d.timesheet.calendar.map(day=>\`
                <tr>
                  <td><strong>\${esc(day.date)}</strong></td>
                  <td>\${esc(day.dayOfWeek)}</td>
                  <td>
                    <span class="badge \${day.status.toLowerCase()}">
                      \${day.status==='Present'?'✓ Present':day.status==='Absent'?'✕ Absent':day.status==='Weekend'?'Weekend':'—'}
                    </span>
                  </td>
                  <td>
                    \${day.punches && day.punches.length>0 ? \`
                      <div class="punch-pills">
                        \${day.punches.map(p=>\`
                          <span class="punch-pill \${p.kind}">
                            \${p.kind==='in'?'🟢 IN':'🔴 OUT'} \${p.timeFormatted}
                          </span>
                        \`).join('<span class="flow-arrow">➔</span>')}
                      </div>
                    \` : (day.status==='Absent'?'<span style="color:var(--danger-ink);font-size:12px">✕ No Punches</span>':(day.status==='Weekend'?'<span style="color:var(--muted);font-size:12px">Weekend</span>':'—'))}
                  </td>
                  <td style="font-weight:600">\${day.duration||'—'}</td>
                  <td style="color:var(--muted)">\${day.outsideDuration||'0m'}</td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    \`;
    document.body.appendChild(modal);
  }catch(err){
    alert('Failed to load timesheet: '+err.message);
  }
};

// ---------------- ROUTER ----------------
if(location.pathname==='/poster'){
  api('/api/poster').then(d=>{
    app.innerHTML=\`
      <section class="card narrow" style="text-align:center;padding:40px 24px">
        <span class="badge present">DOIT INNOVATIONS ERP</span>
        <h1 style="margin-top:14px;font-size:28px">\${esc(d.officeName)}</h1>
        <p style="margin-bottom:20px">Point your smartphone camera to check in or check out.</p>
        <img alt="Office attendance QR code" width="280" height="280" src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=\${encodeURIComponent(d.code)}" style="border:3px solid var(--primary);border-radius:18px;padding:12px;background:#fff">
        <p class="muted" style="margin-top:16px">Print and mount this poster at the office entrance.</p>
        <button onclick="window.print()" style="margin-top:16px">Print Office Poster</button>
      </section>
    \`;
  }).catch(e=>{app.innerHTML='<p>Error: '+esc(e.message)+'</p>'});
}else if(location.pathname==='/register'){
  registerView();
}else if(location.pathname==='/admin'||location.pathname==='/manager'){
  adminPortalView();
}else{
  employeeView();
}
</script>
</body>
</html>`;

// ---------------- SERVER HELPERS ----------------
const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers}});
const hex=b=>Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,'0')).join('');
async function digest(s){return hex(await crypto.subtle.digest('SHA-256',enc.encode(s)))}
async function passwordHash(password,salt){
  const key=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveBits']);
  return hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:enc.encode(salt),iterations:100000,hash:'SHA-256'},key,256));
}
async function sign(value,secret){
  const key=await crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  return hex(await crypto.subtle.sign('HMAC',key,enc.encode(value)));
}
function todayStr(){
  return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
}
function distance(a,b,c,d){
  const rad=x=>x*Math.PI/180,R=6371000,dl=rad(c-a),dn=rad(d-b),x=Math.sin(dl/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(dn/2)**2;
  return Math.round(R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x)));
}

async function getAuthEmployee(request,env){
  const cookie=request.headers.get('cookie')||'';
  const match=cookie.match(/(?:^|;\s*)doit_session=([^;]+)/)||cookie.match(/(?:^|;\s*)daymark_session=([^;]+)/);
  if(!match)throw Error('Sign in required');
  const tokenHash=await digest(match[1]);
  const session=await env.DB.prepare('SELECT employee_id,expires_at FROM sessions WHERE token_hash=?').bind(tokenHash).first();
  if(!session||session.expires_at<Date.now())throw Error('Session expired');
  const emp=await env.DB.prepare('SELECT id,emp_code,username,name,role,department,active FROM employees WHERE id=?').bind(session.employee_id).first();
  if(!emp||!emp.active)throw Error('Account inactive or disabled');
  return emp;
}

async function requireAdmin(request,env){
  const auth=request.headers.get('authorization')||'';
  if(!auth.startsWith('Basic '))throw Error('Admin authentication required');
  const decoded=atob(auth.slice(6));
  const colon=decoded.indexOf(':');
  const supplied=colon===-1?'':decoded.slice(colon+1);
  if(!env.ADMIN_PASSWORD||supplied!==env.ADMIN_PASSWORD)throw Error('Admin password incorrect');
}

function formatPunchTime(t){
  if(!t)return '—';
  return new Intl.DateTimeFormat('en-IN',{
    timeZone:'Asia/Kolkata',
    hour:'2-digit',
    minute:'2-digit',
    hour12:true
  }).format(new Date(t));
}

function processDayPunches(punches, dateStr, isToday){
  let onSiteMins=0;
  let outsideMins=0;
  const processed=[];

  let currentInTime=null;
  let lastOutTime=null;

  for(let i=0; i<punches.length; i++){
    const p=punches[i];
    let intervalText='';

    if(p.kind==='in'){
      currentInTime=p.time;
      if(lastOutTime && p.time>lastOutTime){
        const breakM=Math.round((p.time-lastOutTime)/60000);
        outsideMins+=breakM;
        const h=Math.floor(breakM/60);
        const m=breakM%60;
        intervalText=(h>0?h+'h ':'')+(m+'m')+' outside (break)';
      }else{
        intervalText=i===0?'Arrived / Started workday':'Came back in';
      }
    }else{
      lastOutTime=p.time;
      if(currentInTime && p.time>currentInTime){
        const stayM=Math.round((p.time-currentInTime)/60000);
        onSiteMins+=stayM;
        const h=Math.floor(stayM/60);
        const m=stayM%60;
        intervalText=(h>0?h+'h ':'')+(m+'m')+' on-site';
        currentInTime=null;
      }else{
        intervalText='Stepped outside';
      }
    }

    processed.push({
      id:p.id,
      kind:p.kind,
      label:p.kind==='in'?'Came In':'Went Outside',
      time:p.time,
      timeFormatted:formatPunchTime(p.time),
      intervalText
    });
  }

  let isInProgress=false;
  if(isToday && punches.length>0 && punches[punches.length-1].kind==='in'){
    isInProgress=true;
    const currentStayM=Math.max(0, Math.round((Date.now()-punches[punches.length-1].time)/60000));
    onSiteMins+=currentStayM;
  }

  const inPunches=punches.filter(p=>p.kind==='in');
  const outPunches=punches.filter(p=>p.kind==='out');
  const firstIn=inPunches.length?inPunches[0].time:(punches[0]?.time||null);
  const lastOut=outPunches.length?outPunches[outPunches.length-1].time:null;

  const onSiteH=Math.floor(onSiteMins/60);
  const onSiteRemM=onSiteMins%60;
  const onSiteDuration=(onSiteH>0?onSiteH+'h ':'')+(onSiteRemM+'m')+(isInProgress?' (in progress)':'');

  const outsideH=Math.floor(outsideMins/60);
  const outsideRemM=outsideMins%60;
  const outsideDuration=outsideMins>0?((outsideH>0?outsideH+'h ':'')+(outsideRemM+'m')):'0m';

  return {
    punches:processed,
    firstIn,
    lastOut,
    onSiteMins,
    outsideMins,
    onSiteDuration:onSiteMins>0?onSiteDuration:'—',
    outsideDuration,
    punchesCount:punches.length,
    currentState:punches.length>0?punches[punches.length-1].kind:'none'
  };
}

// Compute calendar & statistics for a given employee & month (e.g. '2026-11')
async function buildMonthlyTimesheet(env, employeeId, monthStr){
  const today=todayStr();
  const [yearStr, monthNumStr]=monthStr.split('-');
  const year=parseInt(yearStr,10);
  const monthIndex=parseInt(monthNumStr,10)-1; // 0-indexed
  const daysInMonth=new Date(year, monthIndex+1, 0).getDate();

  // Fetch all punches for this employee in this month
  const monthPattern=`${monthStr}-%`;
  const events=(await env.DB.prepare(
    'SELECT id,kind,time,day FROM attendance_events WHERE employee_id=? AND day LIKE ? ORDER BY time ASC'
  ).bind(employeeId, monthPattern).all()).results;

  // Group events by day
  const dayMap={};
  for(const e of events){
    if(!dayMap[e.day])dayMap[e.day]=[];
    dayMap[e.day].push(e);
  }

  const calendar=[];
  let presentDays=0;
  let absentDays=0;
  let totalMinutesWorked=0;
  let workingDaysSoFar=0;

  for(let d=1; d<=daysInMonth; d++){
    const dStr=String(d).padStart(2,'0');
    const dateStr=`${monthStr}-${dStr}`;
    const dt=new Date(year, monthIndex, d);
    const dayOfWeekStr=new Intl.DateTimeFormat('en-US',{weekday:'short'}).format(dt);
    const isWeekend=(dt.getDay()===0 || dt.getDay()===6); // Sun or Sat
    const isPastOrToday=(dateStr<=today);

    const punches=dayMap[dateStr]||[];
    let status='Upcoming';

    const dayStats=processDayPunches(punches, dateStr, dateStr===today);

    if(punches.length>0){
      status='Present';
      presentDays++;
      totalMinutesWorked+=dayStats.onSiteMins;
    }else{
      if(isWeekend){
        status='Weekend';
      }else if(isPastOrToday){
        status='Absent';
        absentDays++;
      }
    }

    if(!isWeekend && isPastOrToday){
      workingDaysSoFar++;
    }

    calendar.push({
      date:dateStr,
      dayNumber:d,
      dayOfWeek:dayOfWeekStr,
      isWeekend,
      status,
      firstIn:dayStats.firstIn,
      lastOut:dayStats.lastOut,
      duration:dayStats.onSiteDuration!=='—'?dayStats.onSiteDuration:(status==='Present'?'Present':'—'),
      outsideDuration:dayStats.outsideDuration,
      punchesCount:dayStats.punchesCount,
      punches:dayStats.punches
    });
  }

  const totalHours=(totalMinutesWorked/60).toFixed(1);
  const attendanceRate=workingDaysSoFar>0?Math.round((presentDays/workingDaysSoFar)*100):0;

  return {
    calendar,
    monthSummary:{
      month:monthStr,
      presentDays,
      absentDays,
      totalHours,
      workingDaysSoFar,
      attendanceRate
    }
  };
}

// ---------------- REQUEST HANDLER ----------------
const ICON_192_B64 = "iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAIAAADdvvtQAAAEnUlEQVR4nO3d220bQRBEUSVgQJEoAUensBSd/SFZD5oiKdZO13TXHdwAdroPBJhcwg+/fj8R3d2D/QmodQAiKQCRFIBICkAkBSCSAhBJAYikAERSACIpAJEUgEgKQCQFIJICEEkBiKQARFIAIikAkRSASApAJAUgkgIQSQGIpABEUgAiKQCRFIBICkBXenx5tj/DzgHoUo8vz6/Zn2TbAPRt73owdCEAne9ED4a+C0BnOqsHQ2cD0GkX9GDo/wD0pat6MHQSgD66UQ+GPgegt36kB0PvAejpPj0Yeg1A9+vBEIBUPRiKBnSInnBDuYAO1JNsKBTQ4XpiDSUCWqQn01AcoKV6Ag1lASrQk2YoCFCZnihDKYCK9eQYigBk0RNiaD4go54EQ8MB2fWMNzQZkN1NgqGxgOxiQgzNBGS3kmNoICC7kihD0wDZfaQZGgXILiPQ0BxAdhOZhoYAsmuINTQBkN1BsqH2gOwCwg31BmTfPYYaA7JvHUONAdn3jaHGgOybxlBjQPYdY6gxIPt2MdQYkH2vGGoMyL5RDDUGZN8lhhoDsm8RQ40B2fe3Q/YtdAVk39yff8f+JPZd9APkFXP5YGh3QHu6sUuy76UHoBZ0XIzs29kdUC86Fkb2He0LqK+eWEMbAequJ9PQLoBm6Ak0tAWgSXrSDPkBzdMTZcgMaKqeHENOQGXzHQ/IaMgGaLyeEEMeQJVjzQFkMWQAlKMnwVA1oOJpBgIqNlQKqH6UmYAqDdUBytTzegYbKgJkmWA4oBpDFYBc4wNQgaHlgIyzA1CBobWAvIMDUIGhhYDsU3Oz+XLs02gGyD4vANUY4i9Q0bFPo9lfIAx9PvY5rFsx/wqrOFP18DlQ0Zmqh0+ii85UPXwXVnSm6uHbePS0AsT7QMP08EbiQEDF2+SdaPQ0BMSvMmbo4Xdh6OkMiF+mdtfjBzTYUIKeLQCNNBSiZxdAwwzl6NkI0BhDUXr2AjTAUJqe7QC1NhSoZ0dAHT8fqnxg+3YaAGr0XUfxc9r30gbQ5u9+WJ7NvpFmgOzvU/O/9bQHtIOhHbJvoTEgDNnn3x5QsiH75IcAyjRkn/koQGmG7NMeCCjHkH3OYwElGLJPeDig2Ybss40ANNWQfapBgOYZss8zDtAkQ/ZJhgKaYcg+w2hA3Q3Zpwegxobsc9MbAqijIfvEDmkOoF6G7LM6qlGAuhiyT+nApgHa35B9Psc2ENDOhuyTObyZgPY0ZJ/JisYC2s2QfRqLmgxoH0P2OaxrOKAdDNknsLT5gLyG7HdfXQQglyH7rQtKAVRvyH7fmoIAVRqy37SsLEA1hux3rCwO0GpD9tsVlwhonSH7veoLBbTCkP1GlnIBHWvIfhdX0YCOMmS/hbF0QLoh+/N7A9CTYsj+5PYA9BZ67gtAH6HnjgD0JfT8NACdhp4fBaAzoef2AHQ+9NwYgL4NPbcEoEuh52oAuhJ6LgcgkgIQSQGIpABEUgAiKQCRFIBICkAkBSCSAhBJAYikAERSACIpAJEUgEgKQCQFIJICEEkBiKQARFIAIikAkRSASApAJAUgkgIQSQGIpABEUn8BGTD06tDanwcAAAAASUVORK5CYII=";
const ICON_512_B64 = "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";

async function handle(request,env){
  try{
    const url=new URL(request.url);
    const p=url.pathname;
    const method=request.method;

    // Health check & status API (for monitoring, external checkers, and tests)
    if((p==='/api/health'||p==='/health')&&method==='GET'){
      return json({
        status:'ok',
        app:'DoIt ERP Attendance',
        mode:'backend-connected',
        adminAuthRequired:true,
        officeId:env.OFFICE_ID||'DOIT-HQ',
        timestamp:Date.now()
      });
    }

    // Fixed Printable Poster QR challenge
    if((p==='/api/office/static-qr'||p==='/api/poster')&&method==='GET'){
      const office=env.OFFICE_ID||'DOIT-HQ';
      const payload='DOIT|STATIC|' + office;
      const signature=await sign(payload,env.SECRET_KEY);
      const settings=Object.fromEntries((await env.DB.prepare('SELECT key,value FROM settings').all()).results.map(x=>[x.key,x.value]));
      return json({
        code:payload + '|' + signature,
        officeId:office,
        type:'fixed-print',
        officeName:settings.officeName||'DoIt Innovations HQ'
      });
    }

    // Employee Self-Registration API
    if(p==='/api/register'&&method==='POST'){
      const b=await request.json();
      const name=String(b.name||'').trim();
      if(!name)return json({error:'Full name is required.'},400);

      const password=String(b.password||'').trim();
      if(password.length<6)return json({error:'Password must be at least 6 characters.'},400);

      const dept=String(b.department||'General').trim();
      const role=String(b.role||'Team Member').trim();

      let username=String(b.username||name.toLowerCase().replace(/[^a-z0-9]+/g,'.').replace(/^\\.|\.$/g,'')).toLowerCase().slice(0,24);
      if(!username)username='emp'+Date.now().toString().slice(-4);

      const existing=await env.DB.prepare('SELECT id FROM employees WHERE LOWER(username)=?').bind(username).first();
      if(existing)return json({error:'Username ' + username + ' is already taken. Please choose another.'},400);

      const totalCount=(await env.DB.prepare('SELECT COUNT(*) as count FROM employees').first())?.count||0;
      const empCode='DOIT-' + String(totalCount+101).padStart(4,'0');

      const salt=hex(crypto.getRandomValues(new Uint8Array(16)));
      const hash=await passwordHash(password,salt);
      const id=crypto.randomUUID();

      await env.DB.prepare(
        'INSERT INTO employees(id,emp_code,username,name,role,department,joining_date,password_salt,password_hash,created_at,active) VALUES(?,?,?,?,?,?,?,?,?,?,1)'
      ).bind(id,empCode,username,name,role,dept,todayStr(),salt,hash,Date.now()).run();

      const token=hex(crypto.getRandomValues(new Uint8Array(24)));
      const tokenHash=await digest(token);
      const expires=Date.now()+30*86400000;
      await env.DB.prepare(
        'INSERT INTO sessions(token_hash,employee_id,created_at,expires_at) VALUES(?,?,?,?)'
      ).bind(tokenHash,id,Date.now(),expires).run();

      return json({
        ok:true,
        id,
        emp_code:empCode,
        username,
        name,
        role,
        department:dept
      },201,{'set-cookie':'doit_session=' + token + '; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000'});
    }

    // Login API
    if(p==='/api/login'&&method==='POST'){
      const b=await request.json();
      const identifier=String(b.username||'').trim().toLowerCase();
      const emp=await env.DB.prepare(
        'SELECT id,emp_code,username,name,role,department,password_salt,password_hash,active FROM employees WHERE LOWER(username)=? OR LOWER(emp_code)=?'
      ).bind(identifier, identifier).first();

      if(!emp||!emp.active)return json({error:'Invalid credentials or account inactive.'},401);

      const hash=await passwordHash(String(b.password||''),emp.password_salt);
      if(hash!==emp.password_hash)return json({error:'Invalid credentials.'},401);

      const token=hex(crypto.getRandomValues(new Uint8Array(24)));
      const tokenHash=await digest(token);
      const expires=Date.now()+30*86400000; // 30 days session retention

      await env.DB.prepare(
        'INSERT INTO sessions(token_hash,employee_id,created_at,expires_at) VALUES(?,?,?,?)'
      ).bind(tokenHash,emp.id,Date.now(),expires).run();

      return json({
        ok:true,
        employee:{id:emp.id,emp_code:emp.emp_code,name:emp.name,role:emp.role}
      },200,{'set-cookie':`doit_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`});
    }

    // Logout API
    if(p==='/api/logout'&&method==='POST'){
      const cookie=request.headers.get('cookie')||'';
      const match=cookie.match(/(?:^|;\s*)doit_session=([^;]+)/)||cookie.match(/(?:^|;\s*)daymark_session=([^;]+)/);
      if(match){
        const tokenHash=await digest(match[1]);
        await env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(tokenHash).run();
      }
      return json({ok:true},200,{'set-cookie':'doit_session=; Path=/; HttpOnly; Max-Age=0'});
    }

    // Employee Profile & Monthly ERP Timesheet
    if(p==='/api/me'&&method==='GET'){
      const emp=await getAuthEmployee(request,env);
      const today=todayStr();
      const month=url.searchParams.get('month')||today.slice(0,7);

      // Today punches
      const todayPunches=(await env.DB.prepare(
        'SELECT id,kind,time,status FROM attendance_events WHERE employee_id=? AND day=? ORDER BY time ASC'
      ).bind(emp.id,today).all()).results;

      const todayStats=processDayPunches(todayPunches, today, true);
      const timesheet=await buildMonthlyTimesheet(env, emp.id, month);

      return json({
        employee:emp,
        todaySummary:{
          date:today,
          currentState:todayStats.currentState,
          firstIn:todayStats.firstIn,
          lastOut:todayStats.lastOut,
          hoursWorked:todayStats.onSiteDuration!=='—'?todayStats.onSiteDuration:'0h 0m',
          outsideDuration:todayStats.outsideDuration,
          punches:todayStats.punches
        },
        calendar:timesheet.calendar,
        monthSummary:timesheet.monthSummary
      });
    }

    // Entrance Poster QR Fetch
    if(p==='/api/poster'&&method==='GET'){
      const office=env.OFFICE_ID||'DOIT-HQ';
      const payload=`DOIT|STATIC|${office}`;
      const settings=Object.fromEntries((await env.DB.prepare('SELECT key,value FROM settings').all()).results.map(x=>[x.key,x.value]));
      return json({
        officeName:settings.officeName||'DoIt Innovations Head Office',
        code:`${payload}|${await sign(payload,env.SECRET_KEY)}`
      });
    }

    // Scan Attendance Punch
    if(p==='/api/scan'&&method==='POST'){
      const emp=await getAuthEmployee(request,env);
      const b=await request.json();
      const parts=String(b.qrCode||'').split('|');

      if(parts.length!==4||(parts[0]!=='DOIT'&&parts[0]!=='DAYMARK')||parts[1]!=='STATIC'){
        return json({error:'Invalid QR poster scanned. Please scan the official DoIt Innovations attendance poster.'},400);
      }
      const office=parts[2];
      const prefix=parts[0];
      const payload=`${prefix}|STATIC|${office}`;
      if(parts[3]!==await sign(payload,env.SECRET_KEY)){
        return json({error:'This QR code is invalid or signature does not match.'},400);
      }

      const settings=Object.fromEntries((await env.DB.prepare('SELECT key,value FROM settings').all()).results.map(x=>[x.key,x.value]));
      if(!settings.officeLat||!settings.officeLng){
        return json({error:'Office GPS coordinates must be configured by Admin in the portal first.'},503);
      }

      const loc=b.location;
      if(typeof loc?.latitude!=='number'||typeof loc?.longitude!=='number'){
        return json({error:'Location permission is required to verify physical office presence.'},400);
      }

      const dist=distance(+settings.officeLat,+settings.officeLng,loc.latitude,loc.longitude);
      const radius=Number(settings.radius)||150;
      if(dist>radius+(Number(loc.accuracy)||20)){
        return json({error:`Location check failed: You are approximately ${dist}m away from the office (allowed: ${radius}m).`},400);
      }

      const now=Date.now();
      const today=todayStr();

      // Anti-replay 45s cooldown
      const recent=await env.DB.prepare(
        'SELECT time FROM attendance_events WHERE employee_id=? ORDER BY time DESC LIMIT 1'
      ).bind(emp.id).first();
      if(recent && now-recent.time<45000){
        return json({error:'Please wait at least 45 seconds before punching again.'},429);
      }

      const last=await env.DB.prepare(
        'SELECT kind FROM attendance_events WHERE employee_id=? AND day=? ORDER BY time DESC LIMIT 1'
      ).bind(emp.id,today).first();

      const kind=last?.kind==='in'?'out':'in';

      await env.DB.prepare(
        'INSERT INTO attendance_events(id,employee_id,day,kind,time,latitude,longitude,accuracy,distance_meters,status) VALUES(?,?,?,?,?,?,?,?,?,?)'
      ).bind(crypto.randomUUID(),emp.id,today,kind,now,loc.latitude,loc.longitude,loc.accuracy||null,dist,'verified').run();

      return json({
        success:true,
        kind,
        message:kind==='in'?'Arrival recorded! Welcome to DoIt Innovations.':'Departure recorded! Have a great evening.'
      });
    }

    // ---------------- ADMIN API ROUTES ----------------
    if(p.startsWith('/api/admin/'))await requireAdmin(request,env);

    if(p==='/api/admin/settings'&&method==='GET'){
      const s=await env.DB.prepare('SELECT key,value FROM settings').all();
      const o=Object.fromEntries(s.results.map(x=>[x.key,x.value]));
      return json({
        officeName:o.officeName||'DoIt Innovations Head Office',
        officeLat:o.officeLat||'',
        officeLng:o.officeLng||'',
        radius:o.radius||'150'
      });
    }

    if(p==='/api/admin/settings'&&method==='POST'){
      const b=await request.json();
      for(const [k,v] of Object.entries({officeName:b.officeName,officeLat:b.officeLat,officeLng:b.officeLng,radius:b.radius})){
        await env.DB.prepare('INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').bind(k,String(v)).run();
      }
      return json({ok:true});
    }

    // Add Employee
    if((p==='/api/admin/employees'||p==='/api/admin/workers')&&method==='POST'){
      const b=await request.json();
      const name=String(b.name||'').trim();
      if(!name)return json({error:'Employee name is required.'},400);

      const dept=String(b.department||'Operations').trim();
      const role=String(b.role||'Specialist').trim();

      // Generate Clean Username & Employee Code
      let baseUser=name.toLowerCase().replace(/[^a-z0-9]+/g,'.').replace(/^\.|\.$/g,'').slice(0,20)||'emp';
      let username=baseUser;
      let counter=1;
      while(await env.DB.prepare('SELECT id FROM employees WHERE username=?').bind(username).first()){
        username=`${baseUser}${++counter}`;
      }

      const totalCount=(await env.DB.prepare('SELECT COUNT(*) as count FROM employees').first())?.count||0;
      const empCode=`DOIT-${String(totalCount+101).padStart(4,'0')}`;

      const tempPassword=hex(crypto.getRandomValues(new Uint8Array(5)));
      const salt=hex(crypto.getRandomValues(new Uint8Array(16)));
      const hash=await passwordHash(tempPassword,salt);
      const id=crypto.randomUUID();

      await env.DB.prepare(
        'INSERT INTO employees(id,emp_code,username,name,role,department,joining_date,password_salt,password_hash,created_at,active) VALUES(?,?,?,?,?,?,?,?,?,?,1)'
      ).bind(id,empCode,username,name,role,dept,todayStr(),salt,hash,Date.now()).run();

      return json({id,emp_code:empCode,username,password:tempPassword,name,role,department:dept},201);
    }

    // Reset Employee Password
    if(p==='/api/admin/employees/reset-password'&&method==='POST'){
      const b=await request.json();
      const empId=String(b.employeeId||'');
      const emp=await env.DB.prepare('SELECT id,username,name,emp_code FROM employees WHERE id=?').bind(empId).first();
      if(!emp)return json({error:'Employee not found.'},404);

      const newPassword=hex(crypto.getRandomValues(new Uint8Array(5)));
      const salt=hex(crypto.getRandomValues(new Uint8Array(16)));
      const hash=await passwordHash(newPassword,salt);

      await env.DB.prepare('UPDATE employees SET password_salt=?, password_hash=? WHERE id=?').bind(salt,hash,emp.id).run();
      return json({ok:true,id:emp.id,name:emp.name,emp_code:emp.emp_code,username:emp.username,newPassword});
    }

    // Admin Employee Monthly Timesheet & Punch Breakdown
    if(p==='/api/admin/employees/timesheet'&&method==='GET'){
      const empId=url.searchParams.get('employeeId');
      const month=url.searchParams.get('month')||todayStr().slice(0,7);
      const emp=await env.DB.prepare('SELECT id,emp_code,username,name,role,department FROM employees WHERE id=?').bind(empId).first();
      if(!emp)return json({error:'Employee not found.'},404);
      const timesheet=await buildMonthlyTimesheet(env, emp.id, month);
      return json({employee:emp, timesheet});
    }

    // Admin ERP Dashboard & Monthly Reports
    if(p==='/api/admin/dashboard'&&method==='GET'){
      const today=todayStr();
      const month=url.searchParams.get('month')||today.slice(0,7);

      const emps=(await env.DB.prepare('SELECT id,emp_code,username,name,role,department,active FROM employees ORDER BY created_at ASC').all()).results;

      const todayEvents=(await env.DB.prepare('SELECT employee_id,kind FROM attendance_events WHERE day=? ORDER BY time ASC').bind(today).all()).results;
      const todayMap={};
      for(const e of todayEvents)todayMap[e.employee_id]=e.kind;

      // Get monthly stats for each employee
      const employeeReports=await Promise.all(emps.map(async e=>{
        const ts=await buildMonthlyTimesheet(env, e.id, month);
        return {
          ...e,
          todayState:todayMap[e.id]||'none',
          monthStats:ts.monthSummary
        };
      }));

      const recentPunches=(await env.DB.prepare(
        'SELECT e.id,e.employee_id,e.kind,e.time,e.distance_meters,e.status,m.name,m.emp_code FROM attendance_events e JOIN employees m ON m.id=e.employee_id ORDER BY e.time DESC LIMIT 25'
      ).all()).results;

      const checkedInToday=Object.values(todayMap).filter(x=>x==='in').length;
      const absentToday=emps.length - checkedInToday;

      return json({
        employees:employeeReports,
        totalEmployees:emps.length,
        checkedInToday,
        absentToday,
        todayPunchesCount:todayEvents.length,
        recentPunches
      });
    }

    // PWA Manifest & Assets
    if(p==='/manifest.json'||p==='/manifest.webmanifest'){
      return new Response(JSON.stringify({
        name:'DoIt ERP Attendance',
        short_name:'DoIt ERP',
        description:'Enterprise QR Attendance & Timesheet System for DoIt Innovations',
        start_url:'/',
        scope:'/',
        display:'standalone',
        orientation:'portrait-primary',
        background_color:'#f4f6f3',
        theme_color:'#0d3b2e',
        icons:[
          {src:'/icon.svg',sizes:'any',type:'image/svg+xml',purpose:'any maskable'},
          {src:'/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any maskable'},
          {src:'/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}
        ]
      }),{headers:{'content-type':'application/manifest+json; charset=utf-8','cache-control':'public, max-age=86400'}});
    }

    if(p==='/sw.js'){
      const sw = "const CACHE_NAME='doit-erp-v1';self.addEventListener('install',e=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(clients.claim()));self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});";
      return new Response(sw,{headers:{'content-type':'application/javascript; charset=utf-8','cache-control':'no-cache'}});
    }

    if(p==='/icon.svg'){
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0d3b2e"/><stop offset="100%" stop-color="#06231b"/></linearGradient><linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#059669"/></linearGradient></defs><rect width="512" height="512" rx="128" fill="url(#g)"/><rect x="8" y="8" width="496" height="496" rx="120" fill="none" stroke="#10b981" stroke-width="8" stroke-opacity="0.3"/><polygon points="256,70 410,224 256,378 102,224" fill="url(#accent)" opacity="0.15"/><polygon points="256,90 390,224 256,358 122,224" fill="none" stroke="#10b981" stroke-width="12" stroke-linejoin="round"/><circle cx="256" cy="224" r="70" fill="#0d3b2e" stroke="#10b981" stroke-width="8"/><polyline points="230,224 250,244 285,204" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><text x="256" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="4">DOIT ERP</text><text x="256" y="475" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#10b981" text-anchor="middle" letter-spacing="3">ATTENDANCE</text></svg>';
      return new Response(svg,{headers:{'content-type':'image/svg+xml; charset=utf-8','cache-control':'public, max-age=604800'}});
    }

    if(p==='/icon-192.png'){
      const bin = Uint8Array.from(atob(ICON_192_B64), c => c.charCodeAt(0));
      return new Response(bin,{headers:{'content-type':'image/png','cache-control':'public, max-age=604800'}});
    }

    if(p==='/icon-512.png'){
      const bin = Uint8Array.from(atob(ICON_512_B64), c => c.charCodeAt(0));
      return new Response(bin,{headers:{'content-type':'image/png','cache-control':'public, max-age=604800'}});
    }

    // Serve HTML
    if(p==='/admin'||p==='/manager'||p==='/poster'||p==='/register'||p==='/') {
      return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
    }
    return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});

  }catch(err){
    const status=err.message.includes('Admin')?401:err.message.includes('Sign in')||err.message.includes('Session expired')?401:500;
    return json({error:err.message||'Server error'},status);
  }
}

export default {fetch(request,env){return handle(request,env)}};
