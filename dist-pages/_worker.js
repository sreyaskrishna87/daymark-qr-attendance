const enc = new TextEncoder();

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0d3b2e">
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
@media(max-width:768px){main{margin:16px auto;padding:0 14px}.card{padding:18px}h1{font-size:22px}}
</style>
</head>
<body>
<header>
  <div class="brand">
    <strong>◈ DoIt Innovations</strong>
    <span>ERP ATTENDANCE</span>
  </div>
  <div id="headerAuth" class="row"></div>
</header>
<main id="app"></main>

<script>
const app=document.querySelector('#app');
const headerAuth=document.querySelector('#headerAuth');
let adminPassword=sessionStorage.getItem('doit-admin')||'';
let stream=null;
let activeMonth=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit'}).format(new Date());

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
        <video id="scannerVideo" playsinline></video>
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

// ---------------- CAMERA SCANNER ----------------
async function startScanner(){
  try{
    if(!('BarcodeDetector' in window)){
      throw Error('Camera barcode detection is not supported in this browser. Please use Chrome or Edge on mobile.');
    }
    const detector=new BarcodeDetector({formats:['qr_code']});
    stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false});
    const video=document.querySelector('#scannerVideo');
    video.srcObject=stream;
    await video.play();
    document.querySelector('#scannerBox').classList.remove('hidden');

    const tick=async()=>{
      if(!stream)return;
      try{
        const codes=await detector.detect(video);
        if(codes.length){
          stopScanner();
          msg('#scanMsg','Verifying office GPS location...','');
          const loc=await new Promise((resolve,reject)=>navigator.geolocation.getCurrentPosition(
            p=>resolve({latitude:p.coords.latitude,longitude:p.coords.longitude,accuracy:p.coords.accuracy}),
            err=>reject(Error('Location access required: '+err.message)),
            {enableHighAccuracy:true,timeout:12000}
          ));
          const res=await post('/api/scan',{qrCode:codes[0].rawValue,location:loc});
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
async function handle(request,env){
  try{
    const url=new URL(request.url);
    const p=url.pathname;
    const method=request.method;

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
