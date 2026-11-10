const enc = new TextEncoder();

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#002046">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="DoIt Attendance">
<link rel="manifest" href="/manifest.json">
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="apple-touch-icon" href="/icon-192.png">
<title>DoIt Attendance · DoIt Innovations</title>
<style>
:root{
  color-scheme:light;
  --primary:#086b9b;--primary-hover:#07577f;--primary-light:#e7f4fb;
  --bg:#f4f7fa;--surface:#ffffff;--border:#e0e7ed;--ink:#172630;--muted:#647581;
  --success-bg:#e6f6ec;--success-ink:#136237;--danger-bg:#fdeeed;--danger-ink:#a5241b;
  --warn-bg:#fef7e7;--warn-ink:#946300;--radius:18px;
  --shadow:0 16px 44px rgba(18,54,42,.07);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:88px}
body{background:radial-gradient(ellipse at 50% -24%,#e5f0eb 0,transparent 48%),var(--bg);color:var(--ink);min-height:100vh;display:flex;flex-direction:column;-webkit-font-smoothing:antialiased}
header{position:sticky;top:0;z-index:50;background:#002046;color:#fff;padding:10px max(18px,calc((100vw - 1200px)/2));padding-top:max(10px,env(safe-area-inset-top));display:flex;align-items:center;justify-content:space-between;gap:16px;box-shadow:0 6px 24px rgba(9,35,29,.12);backdrop-filter:blur(16px)}
.brand{display:flex;align-items:center;gap:11px;min-width:0}
.brand-logo{width:135px;height:72px;display:block;flex:none;object-fit:contain;mix-blend-mode:normal}
.brand-copy{display:grid;gap:2px;min-width:0}
.brand strong{font-size:17px;letter-spacing:-.2px;white-space:nowrap}
.brand-product{color:#91d9ff;font-size:10px;font-weight:750;letter-spacing:1.1px}
main{max-width:1200px;width:100%;margin:32px auto;padding:0 24px 40px;flex:1}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:26px;box-shadow:var(--shadow);margin-bottom:20px}
.narrow{max-width:460px;margin:7vh auto}
.grid-4{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:20px}
.grid-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:18px;margin-bottom:20px}
.row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;min-width:0}
.between{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;min-width:0}
h1{font-size:clamp(24px,3vw,32px);line-height:1.16;letter-spacing:-.8px;margin-bottom:8px;text-wrap:balance}
h2{font-size:19px;line-height:1.3;letter-spacing:-.35px;margin-bottom:12px;color:var(--ink);text-wrap:balance}
p{color:var(--muted);font-size:14px;line-height:1.5}
.stat-box{background:#fff;border:1px solid var(--border);border-radius:12px;padding:18px}
.stat-box .title{font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px}
.stat-box .val{font-size:28px;font-weight:800;color:var(--ink);margin:8px 0 2px}
.stat-box .sub{font-size:12px;color:var(--muted)}
label{display:block;font-size:13px;font-weight:650;margin:14px 0 7px;color:#30463d}
input,select{width:100%;min-width:0;padding:12px 14px;border:1px solid #cbd8d1;border-radius:11px;font:inherit;background:#fff;color:var(--ink);outline:none;transition:border-color .16s,box-shadow .16s}
input:focus,select:focus{border-color:var(--primary);box-shadow:0 0 0 4px rgba(23,100,81,.13)}
button,.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid transparent;border-radius:11px;background:var(--primary);color:#fff;font:inherit;font-size:14px;font-weight:650;line-height:1.2;padding:12px 18px;cursor:pointer;text-decoration:none;touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:background .16s,border-color .16s,box-shadow .16s,transform .16s}
button:hover,.btn:hover{background:var(--primary-hover);box-shadow:0 5px 14px rgba(16,77,63,.15)}
button:active,.btn:active{transform:translateY(1px)}
button:disabled{opacity:.62;cursor:wait;box-shadow:none;transform:none}
button:focus-visible,.btn:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #87d3b0;outline-offset:2px}
button.secondary,.btn.secondary{background:var(--primary-light);color:var(--primary);border:1px solid #c2e2d6}
button.secondary:hover,.btn.secondary:hover{background:#d5ebe2}
button.danger{background:var(--danger-ink)}
.badge{display:inline-flex;align-items:center;gap:5px;border-radius:99px;padding:4px 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.3px}
.badge.present{background:var(--success-bg);color:var(--success-ink)}
.badge.absent{background:var(--danger-bg);color:var(--danger-ink)}
.badge.weekend{background:#edf0ee;color:#5a6862}
.badge.holiday{background:#fff1dc;color:#8a4b08}
.badge.pending{background:var(--warn-bg);color:var(--warn-ink)}
.badge.in{background:#e7f4ff;color:#0353a4}
table{width:100%;min-width:680px;border-collapse:collapse;margin-top:10px;font-variant-numeric:tabular-nums}
th,td{text-align:left;padding:13px 14px;border-bottom:1px solid var(--border);font-size:13px;white-space:nowrap}
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
.modal-overlay{position:fixed;inset:0;background:rgba(10,25,18,.62);display:flex;align-items:center;justify-content:center;z-index:999;padding:16px;overscroll-behavior:contain}
.modal-box{background:#fff;border:1px solid var(--border);border-radius:20px;max-width:850px;width:100%;max-height:88vh;overflow-y:auto;overscroll-behavior:contain;padding:26px;box-shadow:0 20px 70px rgba(0,0,0,.24)}
.install-banner{background:#002046;color:#fff;border-radius:12px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;gap:14px;box-shadow:0 4px 16px rgba(0,32,70,0.18);border:1px solid rgba(255,255,255,0.12)}
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
@media(max-width:768px){main{margin:20px auto;padding:0 16px 28px}.card{padding:20px}.grid-4{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.stat-box{padding:14px}.stat-box .val{font-size:24px}.narrow{margin:6vh auto}header{padding-left:16px;padding-right:16px}}
@media(max-width:520px){header{gap:8px;padding-left:12px;padding-right:12px}.brand{gap:8px}.brand-mark{width:34px;height:34px;border-radius:10px}.brand strong{font-size:14px}.brand-product{font-size:9px}.brand-copy{gap:1px}header #headerInstallBtn{padding:8px 10px!important;font-size:11px!important;white-space:nowrap}header #headerAuth{gap:6px}header #headerAuth button,header #headerAuth a{padding:8px 10px!important;font-size:12px!important;white-space:nowrap}main{padding:0 12px 24px;margin:16px auto}.card{padding:17px;border-radius:16px}.narrow{margin:5vh auto}.grid-4{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.grid-2{grid-template-columns:minmax(0,1fr);gap:12px}.stat-box{padding:12px}.stat-box .title{font-size:10px;letter-spacing:.35px}.stat-box .val{font-size:22px;margin:7px 0 2px}.stat-box .sub{font-size:11px}h2{font-size:17px}.between>*{min-width:0}.between>div:first-child{flex:1 1 100%}.between button,.between .btn{width:100%}.row>div{min-width:0}input,select{font-size:16px}form .row{align-items:stretch}form .row>div{flex:1 1 100%!important}video{max-height:38vh}.modal-overlay{align-items:flex-end;padding:0}.modal-box{max-height:92dvh;border-radius:20px 20px 0 0;padding:20px 16px calc(20px + env(safe-area-inset-bottom))}.install-banner{align-items:flex-start;padding:14px}.install-banner>.row:last-child{width:100%;justify-content:flex-end}.btn-install{padding:10px 12px}}
@media(max-width:360px){.grid-4{grid-template-columns:minmax(0,1fr)}.brand-product{letter-spacing:.7px}.brand strong{font-size:13px}header #headerInstallBtn{font-size:10px!important;padding:7px 8px!important}}
@media(max-width:520px){
  html,body{width:100%;overflow-x:hidden}
  header{min-height:60px;flex-wrap:nowrap;padding-left:max(12px,env(safe-area-inset-left));padding-right:max(12px,env(safe-area-inset-right));gap:8px}
  header>.row{flex:0 0 auto;gap:6px!important}
  .brand{flex:1;min-width:0;gap:8px}
  .brand-logo{width:104px;height:56px}
  .brand strong{font-size:14px}
  header #headerInstallBtn{display:none!important}
  header #headerAuth{flex-wrap:nowrap;min-width:0}
  header #headerAuth button,header #headerAuth a{font-size:11px!important;padding:8px 9px!important}
  main{width:100%;min-width:0}
  .card{min-width:0;overflow-wrap:anywhere}
  .attendance-actions{display:grid;grid-template-columns:minmax(0,1fr);gap:9px;width:100%}
  .attendance-actions button{width:100%;min-height:48px}
  #openScannerBtn{width:100%;min-height:48px}
  #workSummary{min-height:150px;font-size:16px}
  .timeline-item{align-items:flex-start}
  .timeline-item>.row{min-width:0}
  .table-scroll,section.card>div[style*="overflow-x:auto"]{max-width:100%;overscroll-behavior-inline:contain;-webkit-overflow-scrolling:touch}
  .install-banner{width:100%;flex-wrap:wrap}
  .install-banner .row{min-width:0}
}
@media(max-width:380px){
  .brand-logo{width:88px;height:48px}
  .brand strong{font-size:13px}
  .brand-product{font-size:8px;letter-spacing:.6px}
  header #headerAuth button,header #headerAuth a{font-size:10px!important;padding:8px 7px!important}
  main{padding-left:10px;padding-right:10px}
  .card{padding:15px}
}
/* Branded office poster */
.poster-sheet{max-width:780px;margin:12px auto 18px;background:#fff;border:1px solid var(--border);border-radius:24px;overflow:hidden;box-shadow:var(--shadow)}
.poster-top{background:#002046;color:#fff;padding:22px 28px;display:flex;align-items:center;justify-content:space-between;gap:18px;border-bottom:5px solid #0eAAF5}
.poster-logo{display:block;width:170px;height:82px;object-fit:contain}
.poster-label{font-size:11px;letter-spacing:1.7px;font-weight:800;color:#91d9ff;text-align:right}
.poster-content{padding:26px clamp(20px,5vw,52px) 30px;text-align:center}
.poster-eyebrow{font-size:11px;letter-spacing:1.6px;font-weight:800;color:#087fb8;text-transform:uppercase}
.poster-content h1{font-size:clamp(27px,4.5vw,42px);margin:9px 0 10px;color:#002046}
.poster-lead{max-width:520px;margin:0 auto;color:#526879;font-size:15px}
.poster-qr-frame{display:inline-block;margin:22px auto 18px;padding:14px;border:2px solid #d5eaf5;border-radius:22px;background:linear-gradient(135deg,#f2faff,#fff);box-shadow:0 12px 30px rgba(0,32,70,.1)}
.poster-qr{display:block;width:min(66vw,390px);height:auto;aspect-ratio:1;object-fit:contain;background:#fff;border-radius:10px}
.poster-instructions{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:left;margin:4px 0 18px}
.poster-step{background:#f4f8fb;border:1px solid #dfeaf1;border-radius:13px;padding:13px;font-size:12px;line-height:1.4;color:#526879}
.poster-step strong{display:block;color:#002046;font-size:13px;margin-bottom:4px}
.poster-foot{border-top:1px solid #e3ebf0;padding-top:14px;color:#647581;font-size:11px}
.poster-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:0 auto 30px}
@media(max-width:520px){.poster-top{padding:16px 18px}.poster-logo{width:128px;height:64px}.poster-label{font-size:9px}.poster-instructions{grid-template-columns:1fr;text-align:center}.poster-step{padding:11px}}
@media print{
  @page{size:A4 portrait;margin:0}
  html,body{width:210mm!important;height:297mm!important;min-height:297mm!important;margin:0!important;background:#fff!important;overflow:visible!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  header,.poster-actions{display:none!important}
  main#app{width:210mm!important;height:297mm!important;max-width:none!important;margin:0!important;padding:10mm!important;display:block!important}
  .poster-sheet{width:190mm;height:277mm;max-width:none;margin:0;border:1px solid #d8e2e9;border-radius:0;box-shadow:none;display:flex;flex-direction:column}
  .poster-top{padding:8mm 10mm}
  .poster-logo{width:48mm;height:24mm}
  .poster-content{padding:9mm 10mm 7mm;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center}
  .poster-content h1{font-size:30pt}
  .poster-lead{font-size:12pt}
  .poster-qr-frame{margin:6mm auto 5mm;padding:4mm}
  .poster-qr{width:96mm;height:96mm}
  .poster-instructions{gap:3mm;margin:2mm 0 5mm}
  .poster-step{padding:3.5mm;font-size:9pt}
  .poster-step strong{font-size:10pt}
  .poster-foot{font-size:8pt}
}
/* Matched CR80 employee badge, personalized only by its serial and QR. */
.id-card-preview{display:flex;justify-content:center;align-items:flex-start;gap:20px;flex-wrap:wrap;margin:24px auto}
.id-card-sheet{page:idcard;width:342px;height:216px;max-width:100%;position:relative;overflow:hidden;border:1px solid #d3dee8;border-radius:16px;box-shadow:0 18px 42px rgba(0,32,70,.17);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.id-card-front{background:#f1eee8;color:#1d2a31;display:grid;grid-template-rows:12mm 1fr 14mm;padding:0}
.id-card-front:before{content:"";position:absolute;inset:0 0 auto;height:12mm;background:#183b3a}
.id-card-front:after{content:"";position:absolute;right:-12mm;top:4mm;width:45mm;height:45mm;border:1px solid rgba(24,59,58,.12);border-radius:50%;box-shadow:0 0 0 3mm rgba(24,59,58,.035),0 0 0 6mm rgba(24,59,58,.025)}
.id-card-front-head{position:relative;z-index:1;display:flex;align-items:center;gap:3mm;padding:2mm 4mm}
.id-card-logo{width:27mm;height:9mm;object-fit:contain;object-position:left center}
.id-card-front-title{display:grid;gap:.6mm;border-left:1px solid rgba(255,255,255,.4);padding-left:3mm;color:#fff}
.id-card-front-title strong{font-size:6.5pt;line-height:1.05;letter-spacing:1px;color:#fff}
.id-card-front-title small{font-size:4.3pt;letter-spacing:1.1px;color:#c5dfd6;font-weight:800}
.id-card-front-bottom{position:relative;z-index:1;display:flex;align-items:end;justify-content:space-between;gap:3mm;padding:1mm 4mm 3mm;background:#e4dfd6}
.id-card-barcode-wrap{flex:1;background:#fff;border-radius:1mm;padding:1mm 1.5mm;min-width:0;align-self:end}
.id-card-barcode{display:block;width:100%;height:8mm;object-fit:fill}
.id-card-serial-block{width:32mm;display:grid;gap:.8mm;padding:0}
.id-card-serial-block small{font-size:4.5pt;letter-spacing:.9px;color:#52615f;font-weight:800;text-transform:uppercase}
.id-card-serial{font:700 6.3pt ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.55px;color:#1d2a31;white-space:nowrap}
.id-card-back{background:#ebe9e2;color:#182523;padding:0;border:0;display:grid;grid-template-rows:10mm 1fr 8mm}
.id-card-back:before{content:"";position:absolute;inset:0 0 auto;height:10mm;background:#183b3a}
.id-card-back-head{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:3mm;padding:1mm 4mm;border:0}
.id-card-back-logo{width:24mm;height:8mm;object-fit:contain;object-position:left center;background:transparent;border-radius:0;padding:0}
.id-card-back-brand{font-size:4.5pt;line-height:1.35;letter-spacing:1px;font-weight:850;color:#d7e1db;text-align:right}
.id-card-back-main{display:flex;align-items:center;justify-content:flex-start;gap:4mm;flex:1;padding:2mm 4mm}
.id-card-qr{width:25mm;height:25mm;flex:none;object-fit:contain;padding:1mm;background:#fff;border:1px solid #c5c8bd;border-radius:1mm}
.id-card-back-copy{max-width:none;display:grid;gap:2mm}
.id-card-back-copy strong{font-size:6pt;line-height:1.3;letter-spacing:1px;color:#183b3a}
.id-card-back-copy p{font-size:5.3pt;line-height:1.4;color:#515d57;max-width:38mm}
.id-card-back-note{border-top:1px solid #c5c8bd;padding:1.5mm 4mm;font-size:4.5pt;line-height:1.35;color:#515d57;text-align:left}
.id-card-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:0 auto 28px}
.id-profile{max-width:600px;margin:32px auto;background:#fff;border:1px solid var(--border);border-radius:20px;padding:26px;box-shadow:var(--shadow)}
.id-profile-logo{width:150px;height:70px;object-fit:contain;background:#002046;border-radius:12px;padding:6px}
.id-profile h1{margin:18px 0 4px;color:#002046}
.id-profile-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:20px}
.id-profile-field{background:#f4f8fb;border:1px solid #e0eaf1;border-radius:12px;padding:13px}
.id-profile-field small{display:block;color:var(--muted);font-size:10px;font-weight:750;text-transform:uppercase;letter-spacing:.7px;margin-bottom:5px}
.id-profile-field strong{color:#002046;font-size:14px;overflow-wrap:anywhere}
@page idcard{size:85.6mm 54mm;margin:0}
@media(max-width:420px){.id-profile{margin:18px 0;padding:19px}.id-profile-grid{grid-template-columns:1fr}}
@media print{
  body.id-card-print-mode{display:block!important;width:85.6mm!important;height:54mm!important;min-height:54mm!important;margin:0!important;background:#fff!important}
  body.id-card-print-mode header,body.id-card-print-mode .id-card-actions{display:none!important}
  body.id-card-print-mode main#app{display:block!important;width:85.6mm!important;height:54mm!important;max-width:none!important;margin:0!important;padding:0!important}
  body.id-card-print-mode main#app{height:auto!important}
  body.id-card-print-mode .id-card-preview{display:block;margin:0}
  body.id-card-print-mode .id-card-sheet{width:85.6mm!important;height:54mm!important;max-width:none!important;margin:0!important;padding:3.5mm!important;border-radius:0!important;box-shadow:none!important;border:0!important;break-after:page;page-break-after:always}
  body.id-card-print-mode .id-card-sheet:last-child{break-after:auto;page-break-after:auto}
  body.id-card-print-mode .id-card-front{padding:0;grid-template-rows:12mm 1fr 14mm}
  body.id-card-print-mode .id-card-front:before{height:12mm}
  body.id-card-print-mode .id-card-front:after{right:-12mm;top:4mm;width:45mm;height:45mm}
  body.id-card-print-mode .id-card-front-head{gap:3mm;padding:1.5mm 4mm}
  body.id-card-print-mode .id-card-logo{width:27mm;height:9mm}
  body.id-card-print-mode .id-card-front-title{gap:.6mm;padding-left:3mm}
  body.id-card-print-mode .id-card-front-title strong{font-size:6.5pt;letter-spacing:1px}
  body.id-card-print-mode .id-card-front-title small{font-size:4.3pt;letter-spacing:1.1px}
  body.id-card-print-mode .id-card-front-bottom{gap:3mm;padding:1mm 4mm 3mm}
  body.id-card-print-mode .id-card-barcode-wrap{padding:1mm 1.5mm}
  body.id-card-print-mode .id-card-barcode{height:8mm}
  body.id-card-print-mode .id-card-serial-block{width:32mm;gap:.8mm}
  body.id-card-print-mode .id-card-serial-block small{font-size:4.5pt;letter-spacing:.9px}
  body.id-card-print-mode .id-card-serial{font-size:6.3pt;letter-spacing:.55px}
  body.id-card-print-mode .id-card-back{padding:0;grid-template-rows:10mm 1fr 8mm}
  body.id-card-print-mode .id-card-back:before{height:10mm}
  body.id-card-print-mode .id-card-back-head{gap:3mm;padding:1mm 4mm}
  body.id-card-print-mode .id-card-back-logo{width:24mm;height:8mm;padding:0}
  body.id-card-print-mode .id-card-back-brand{font-size:4.5pt;letter-spacing:1px}
  body.id-card-print-mode .id-card-back-main{gap:4mm;padding:2mm 4mm}
  body.id-card-print-mode .id-card-back-copy{max-width:none;gap:2mm}
  body.id-card-print-mode .id-card-back-copy strong{font-size:6pt;letter-spacing:1px}
  body.id-card-print-mode .id-card-back-copy p{font-size:5.3pt}
  body.id-card-print-mode .id-card-back-note{padding:1.5mm 4mm;font-size:4.5pt}
  body.id-card-print-mode .id-card-qr{width:25mm;height:25mm;padding:1mm}
}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}

/* DoIt identity system */
:root{--primary:#006da3;--primary-hover:#005783;--primary-light:#e8f6ff;--bg:#f2f6fb;--ink:#102b49;--border:#dce6f0;--shadow:0 12px 32px #00204609}
body{background:radial-gradient(ellipse at 90% 0,#dcefff,transparent 45%),#f2f6fb}
header{border-bottom:3px solid #09aaeb;box-shadow:0 6px 28px #00204620}
.brand-logo{width:112px;height:58px}.brand-product{letter-spacing:1.6px}
.card{border-radius:20px;padding:28px}.narrow{border-top:4px solid #0aaceb;box-shadow:0 24px 70px #00204615}
h1,h2{color:#002046}label{color:#29445f}input,select,textarea{border-color:#cedce8;border-radius:10px}input:focus,select:focus,textarea:focus{box-shadow:0 0 0 4px #0aaceb20;border-color:#069bd7}
button,.btn{min-height:44px;border-radius:10px;box-shadow:0 3px 8px #0020460a}button.secondary,.btn.secondary{border-color:#cce5f4;background:#edf8ff;color:#006395}button.secondary:hover,.btn.secondary:hover{background:#ddf1ff}
button:focus-visible,.btn:focus-visible,a:focus-visible{outline-color:#0aaceb}
.stat-box{border-radius:16px;border-top:3px solid #0aaceb;padding:22px;background:linear-gradient(145deg,#fff,#f7fbff)}.stat-box .val{font-size:34px;letter-spacing:-1px;color:#002046}.stat-box .title{letter-spacing:1px;font-size:10px}
th{background:#edf4fa;color:#38536c}tr:hover td{background:#f3faff}.tabs{gap:8px;overflow-x:auto}.tab{min-height:44px;white-space:nowrap}.tab.active{background:#002046;color:white}.timeline-item{background:#f7faff}.notice{background:#ecf5fc;color:#2c506e}
@media(max-width:600px){main{margin:20px auto;padding:0 14px 28px}.card{padding:20px;border-radius:16px}.brand-logo{width:85px;height:46px}.brand strong{font-size:15px}.brand-product{font-size:8px}.grid-4{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.stat-box{padding:15px}.stat-box .val{font-size:28px}.narrow{margin:5vh auto}.row{gap:10px}input,select,textarea{font-size:16px}header{gap:8px}}
.id-card-sheet{width:54mm;height:85.6mm;border:0;border-radius:3mm;flex:none;padding:0!important}
.id-card-front{display:flex;flex-direction:column;background:#002046;color:white;justify-content:space-between}
.id-card-front:before{display:none}.id-card-front:after{width:59mm;height:59mm;border:9mm solid #0aaceb;border-bottom-color:transparent;border-radius:50%;right:-23mm;top:23mm;box-shadow:none;transform:rotate(-12deg)}
.id-card-front-head{padding:7mm 6mm;display:flex;flex-direction:column;align-items:flex-start;gap:1mm}.id-card-logo{width:36mm;height:18mm;object-fit:contain}.id-card-front-title{border:0;padding:0}.id-card-front-title small{font-size:5pt;letter-spacing:2px;color:#fff}.id-card-front-title strong{display:none}
.id-card-front-bottom{display:flex;flex-direction:column;align-items:flex-start;background:none;padding:0 6mm 6mm;gap:7mm}.id-card-front-bottom:before{content:'EMPLOYEE';font-size:18pt;letter-spacing:1px;font-weight:800;color:white}.id-card-barcode-wrap{display:none}.id-card-serial-block{width:auto;gap:1.5mm}.id-card-serial-block small{color:#8ddaff;font-size:5pt;letter-spacing:1.5px}.id-card-serial{color:#fff;font-size:7pt;letter-spacing:1px}
.id-card-back{background:#fff;display:flex;flex-direction:column;justify-content:space-between}.id-card-back:before{display:none}.id-card-back-head{background:#002046;padding:3mm 5mm;display:block}.id-card-back-logo{width:29mm;height:12mm}.id-card-back-brand{display:none}.id-card-back-main{padding:3mm 5mm;display:flex;flex-direction:column;gap:3mm;text-align:center}.id-card-qr{width:33mm;height:33mm;border:0;border-radius:0;padding:1mm}.id-card-back-copy{gap:2mm}.id-card-back-copy strong{color:#002046;font-size:7pt;letter-spacing:1px}.id-card-back-copy p{font-size:5.5pt;color:#52677d}.id-card-back-note{background:#002046;color:white;border-bottom:1.5mm solid #0aaceb;border-top:0;padding:4mm 5mm;font-size:5.5pt;line-height:1.6;text-align:center}
@page idcard{size:54mm 85.6mm;margin:0}
@media print{body.id-card-print-mode,body.id-card-print-mode main#app{width:54mm!important;height:auto!important;min-height:85.6mm!important}body.id-card-print-mode .id-card-sheet{width:54mm!important;height:85.6mm!important;padding:0!important}body.id-card-print-mode .id-card-front{display:flex}body.id-card-print-mode .id-card-front:after{width:59mm;height:59mm;right:-23mm;top:23mm}body.id-card-print-mode .id-card-front-head{padding:7mm 6mm}body.id-card-print-mode .id-card-logo{width:36mm;height:18mm}body.id-card-print-mode .id-card-front-bottom{padding:0 6mm 6mm;gap:7mm}body.id-card-print-mode .id-card-serial-block{width:auto}body.id-card-print-mode .id-card-back{display:flex}body.id-card-print-mode .id-card-back-head{padding:3mm 5mm}body.id-card-print-mode .id-card-back-logo{width:29mm;height:12mm}body.id-card-print-mode .id-card-back-main{padding:3mm 5mm;gap:3mm}body.id-card-print-mode .id-card-qr{width:33mm;height:33mm}body.id-card-print-mode .id-card-back-note{padding:4mm 5mm;font-size:5.5pt}}


.final-card{width:54mm!important;height:85.6mm!important;padding:0!important;position:relative;background-image:url('/card-artwork.png');background-size:200% 100%;background-repeat:no-repeat;flex:none;overflow:hidden}
.final-front{background-position:left center}.final-back{background-position:right center}
.final-front-serial{position:absolute;right:3.8mm;top:74.8mm;font:600 6.8pt monospace;color:white;letter-spacing:.25px}
.final-qr{position:absolute;top:25mm;left:12mm;width:30mm;height:30mm;background:#e8f2f6}
.final-qr>img{display:block;width:100%;height:100%}.final-profile-icon{position:absolute;left:43%;top:43%;width:14%;height:14%}
.final-back-serial{position:absolute;top:58.2mm;left:2mm;right:2mm;text-align:center;color:white;font:600 9pt monospace;letter-spacing:.35px}
.final-scan-label{position:absolute;top:63mm;left:0;right:0;text-align:center;color:white;font-size:7pt;letter-spacing:.3px}
@media print{html:has(body.id-card-print-mode){width:54mm!important;height:auto!important}body.id-card-print-mode .final-card{width:54mm!important;height:85.6mm!important;padding:0!important;background-size:200% 100%!important}}
body.profile-only #headerInstallBtn,body.profile-only .install-banner{display:none!important}
</style>
</head>
<body>
<header>
  <div class="brand">
    <img class="brand-logo" src="/doit-logo.png" alt="DoIt official logo">
    <div class="brand-copy"><strong>Attendance</strong><span class="brand-product">DOIT INNOVATIONS</span></div>
  </div>
  <div class="row" style="gap:10px">
    <button id="headerInstallBtn" aria-label="Install attendance app" onclick="triggerPwaInstall()" style="padding:6px 12px;font-size:12px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:5px">📲 Download App</button>
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
if('serviceWorker' in navigator && !location.pathname.startsWith('/profile/')){
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
          <strong>Add Attendance to Your Home Screen</strong>
          <p>Install DoIt like an app for instant 1-tap QR attendance scanning.</p>
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
            <p style="margin:2px 0 0;font-size:12px">Install DoIt as a Chrome App on your device</p>
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
              <div>Tap <strong>Add</strong> in the top-right corner. The DoIt app will be placed directly on your phone&#39;s Home screen!</div>
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
              <div>Tap <strong>Install</strong>. DoIt will download onto your Home screen as a standalone app!</div>
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
              <div>Click the <strong>Install DoIt</strong> icon (<span style="font-size:15px">⊕</span> or computer icon).</div>
            </div>
            <div class="install-step-item">
              <span class="step-num">3</span>
              <div>Click <strong>Install</strong> to add DoIt to your desktop apps and taskbar!</div>
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
  headerAuth.innerHTML='<a class="btn secondary" href="/admin" id="adminHeaderBtn">Management Sign In</a>';
  app.innerHTML=\`
    \${installBannerHtml()}
    <section class="card narrow">
      <div style="text-align:center;margin-bottom:16px">
        <span class="badge present">DOIT INNOVATIONS</span>
        <h1 style="margin-top:12px">Staff Sign In</h1>
        <p>View your attendance history and record your arrival or departure.</p>
      </div>
      <form id="loginForm">
        <label for="loginUsername">Username or Staff ID</label>
        <input id="loginUsername" name="username" placeholder="e.g. alex.morgan" autocomplete="username" spellcheck="false" required>
        <label for="loginPassword">Password</label>
        <input id="loginPassword" name="password" type="password" placeholder="Enter your password" autocomplete="current-password" required>
        <div id="loginMsg" class="notice hidden" aria-live="polite"></div>
        <button style="width:100%;margin-top:18px">Sign In</button>
      </form>
      <hr style="border:0;border-top:1px solid var(--border);margin:24px 0 16px">
      <div style="text-align:center">
        <a href="/register" class="btn secondary" style="width:100%;margin-bottom:14px">Create a Staff Account →</a>
        <p class="muted" style="margin-bottom:10px">For authorized management access</p>
        <a class="btn secondary" href="/admin" id="adminLoginBtn" style="width:100%">Management Sign In</a>
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
}

// ---------------- ADMIN LOGIN VIEW (INLINE FORM) ----------------
function adminLoginView(initialError=''){
  headerAuth.innerHTML='<a href="/" class="btn secondary" style="padding:8px 12px;font-size:12px">Team Sign In</a>';
  app.innerHTML=\`
    <section class="card narrow">
      <div style="text-align:center;margin-bottom:16px">
        <span class="badge present">MANAGEMENT PORTAL</span>
        <h1 style="margin-top:12px">Management Sign In</h1>
        <p>Manage team access, review attendance, and update office settings.</p>
      </div>
      <form id="adminLoginForm">
        <label for="adminPassInput">Management Password</label>
        <input name="adminPassword" id="adminPassInput" type="password" placeholder="Enter management password" autocomplete="current-password" required>
        <div id="adminLoginMsg" class="notice \${initialError ? 'error' : 'hidden'}" aria-live="polite">\${esc(initialError)}</div>
        <button id="adminSubmitBtn" style="width:100%;margin-top:18px">Open Management Dashboard</button>
      </form>
      <hr style="border:0;border-top:1px solid var(--border);margin:24px 0 16px">
      <div style="text-align:center">
        <a href="/" id="backToEmpBtn" class="btn secondary" style="width:100%">← Back to Team Sign In</a>
      </div>
    </section>
  \`;

  document.querySelector('#backToEmpBtn').onclick=e=>{
    e.preventDefault();
    history.pushState(null,'','/');
    employeeView();
  };

  document.querySelector('#adminLoginForm').onsubmit=async e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    const pass=f.get('adminPassword');
    const btn=document.querySelector('#adminSubmitBtn');
    if(btn)btn.disabled=true;
    try{
      await api('/api/admin/settings',{headers:{authorization:'Basic '+btoa('admin:'+pass)}});
      adminPassword=pass;
      sessionStorage.setItem('doit-admin',pass);
      adminPortalView();
    }catch(err){
      if(btn)btn.disabled=false;
      msg('#adminLoginMsg','Authentication failed: '+(err.message||'Incorrect admin password.'),'error');
    }
  };
}

// ---------------- REGISTER VIEW ----------------
function registerView(){
  headerAuth.innerHTML='<a href="/" class="btn secondary" style="padding:8px 12px;font-size:12px">Back to Sign In</a>';
  app.innerHTML=\`
    <section class="card narrow">
      <div style="text-align:center;margin-bottom:16px">
        <span class="badge present">TEAM ONBOARDING</span>
        <h1 style="margin-top:12px">Create Your Account</h1>
        <p>Create an account to access your attendance and daily work summaries.</p>
      </div>
      <form id="regForm">
        <label for="regName">Full Name</label>
        <input name="name" id="regName" placeholder="e.g. Rahul Verma" required autofocus>

        <label for="regUsername">Choose a Username</label>
        <input name="username" id="regUsername" placeholder="e.g. alex.morgan" autocomplete="username" spellcheck="false" required>

        <label for="regPassword">Create Password</label>
        <input id="regPassword" name="password" type="password" placeholder="At least 10 characters" minlength="10" autocomplete="new-password" required>

        <label for="regConfirmPassword">Confirm Password</label>
        <input id="regConfirmPassword" name="confirmPassword" type="password" placeholder="Enter your password again" minlength="10" autocomplete="new-password" required>

        <div id="regMsg" class="notice hidden" aria-live="polite"></div>
        <button id="regSubmitBtn" style="width:100%;margin-top:18px">Create Account</button>
      </form>
      <div style="text-align:center;margin-top:16px">
        <p class="muted">Already registered? <a href="/" style="color:var(--primary);font-weight:650">Sign in here</a></p>
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
    const btn=document.querySelector('#regSubmitBtn');
    if(btn)btn.disabled=true;
    try{
      const res=await post('/api/register',{
        name:f.get('name'),
        username:f.get('username'),
        password:pass,
        department:'Operations',
        role:'Associate',
      });
      // Show rich in-page confirmation screen
      app.innerHTML=\`
        <section class="card narrow" style="text-align:center;padding:36px 20px">
          <div style="font-size:44px;margin-bottom:12px">🎉</div>
          <span class="badge present">ACCOUNT READY</span>
          <h1 style="margin-top:12px">Your Account Is Ready</h1>
          <p style="margin-bottom:16px">Keep these sign-in details somewhere safe.</p>
          <div style="background:#f0f7f4;border:1px solid #c8e2d7;border-radius:12px;padding:16px;margin:20px 0;text-align:left">
            <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px dashed #d1e7dd">
              <span class="muted">Name:</span>
              <strong>\${esc(res.name)}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px dashed #d1e7dd">
              <span class="muted">Staff ID:</span>
              <strong style="color:var(--primary)">\${esc(res.emp_code)}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding:6px 0">
              <span class="muted">Username:</span>
              <strong>\${esc(res.username)}</strong>
            </div>
          </div>
          <a href="/" class="btn" style="width:100%;text-align:center;display:block">Open Attendance →</a>
        </section>
      \`;
    }catch(err){
      if(btn)btn.disabled=false;
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
  const isDayEnded=!!me.todaySummary?.dayEnded;
  const todayBadge=isAtWork?'<span class="badge present">● Checked In</span>':isDayEnded?'<span class="badge in">✓ Day Complete</span>':me.todaySummary?.punches?.length?'<span class="badge pending">○ On Break</span>':'<span class="badge pending">○ Not Checked In Today</span>';

  app.innerHTML=\`
    \${installBannerHtml()}
    <div class="between" style="margin-bottom:18px">
      <div>
        <h1>Welcome, \${esc(me.employee.name)}</h1>
        <p>Staff ID: <strong>\${esc(me.employee.emp_code||'EMP')}</strong></p>
      </div>
      <div>\${todayBadge}</div>
    </div>

    <!-- Quick Check-in Card -->
    <section class="card">
      <div class="between">
        <div>
          <h2>Record Attendance</h2>
          <p>Scan the office entrance QR poster to record arrival or departure with GPS verification.</p>
        </div>
        \${isAtWork?'<div class="attendance-actions"><button id="breakScannerBtn" class="secondary">Start Break · Scan QR</button><button id="endDayScannerBtn">End My Day · Scan QR</button></div>':isDayEnded?'<button id="openScannerBtn" disabled>Day Complete</button>':'<button id="openScannerBtn" style="min-width:200px">'+(me.todaySummary?.punches?.length?'Return from Break · Scan QR':'Check In · Scan QR')+'</button>'}
      </div>
      <div id="scannerBox" class="hidden" style="margin-top:16px">
        <video id="scannerVideo" playsinline autoplay muted></video>
        <div class="row">
          <button class="secondary" id="closeScannerBtn">Cancel Scanner</button>
          <span style="font-size:12px;color:var(--muted)">Ensure camera & location access are enabled.</span>
        </div>
      </div>
      <div id="scanMsg" class="notice hidden"></div>
      <div id="workReportArea"></div>
      
      <div class="grid-4" style="margin-top:20px;margin-bottom:0">
        <div class="stat-box">
          <div class="title">First In (Arrival)</div>
          <div class="val" style="font-size:20px">\${timeStr(me.todaySummary?.firstIn)}</div>
          <div class="sub">First arrival today</div>
        </div>
        <div class="stat-box">
          <div class="title">Last Out (Departure)</div>
          <div class="val" style="font-size:20px">\${timeStr(me.todaySummary?.lastOut)}</div>
          <div class="sub">Last departure today</div>
        </div>
        <div class="stat-box">
          <div class="title">Time In Office</div>
          <div class="val" style="font-size:20px;color:var(--success-ink)">\${me.todaySummary?.hoursWorked||'0h 0m'}</div>
          <div class="sub">Active on-site duration</div>
        </div>
        <div class="stat-box">
          <div class="title">Time Away from Office</div>
          <div class="val" style="font-size:20px;color:var(--muted)">\${me.todaySummary?.outsideDuration||'0m'}</div>
          <div class="sub">Time spent out of office</div>
        </div>
      </div>
    </section>

    <!-- Today's Movement & Timeline -->
    <section class="card">
      <div class="between" style="margin-bottom:12px">
        <div>
          <h2>Today&#39;s Attendance Activity</h2>
          <p>A record of each office arrival and departure today.</p>
        </div>
        <div>
          <span class="badge \${isAtWork?'present':'absent'}">
          \${isAtWork?'🟢 Checked In':isDayEnded?'✓ Day Complete':me.todaySummary?.punches?.length?'◷ On Break':'○ Not Checked In'}
          </span>
        </div>
      </div>

      \${me.todaySummary?.punches && me.todaySummary.punches.length > 0 ? \`
        <div class="timeline">
          \${me.todaySummary.punches.map((p, idx)=>\`
            <div class="timeline-item">
              <div class="row" style="gap:10px">
                <span class="timeline-badge \${p.kind}">
                  \${p.kind==='in'?'🟢 CHECKED IN':p.eventType==='day_end'?'✓ DAY ENDED':'◷ BREAK STARTED'}
                </span>
                <strong style="font-size:15px;letter-spacing:0.3px">\${p.timeFormatted}</strong>
                <span style="font-size:12px;color:var(--muted)">Entry #\${idx + 1}</span>
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
            Time Away from Office: <strong style="color:var(--ink)">\${me.todaySummary.outsideDuration}</strong>
          </div>
          <div style="font-size:12px;color:var(--muted)">
            Total Entries Today: <strong>\${me.todaySummary.punches.length}</strong>
          </div>
        </div>
      \` : \`
        <div style="text-align:center;padding:22px 12px;color:var(--muted);font-size:14px">
          No attendance entries recorded yet today. Scan the entrance poster to record your arrival.
        </div>
      \`}
    </section>

    <!-- Monthly Attendance History -->
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
          <div class="title">Days Without Scans</div>
          <div class="val">\${me.monthSummary.noScanDays} <small style="font-size:14px;color:var(--muted)">days</small></div>
          <div class="sub">No attendance entries</div>
        </div>
        <div class="stat-box">
          <div class="title">Total Hours Worked</div>
          <div class="val">\${me.monthSummary.totalHours} <small style="font-size:14px;color:var(--muted)">hrs</small></div>
          <div class="sub">In selected month</div>
        </div>
        <div class="stat-box">
          <div class="title">Public Holidays</div>
          <div class="val">\${me.monthSummary.holidayDays} <small style="font-size:14px;color:var(--muted)">days</small></div>
          <div class="sub">Added by management</div>
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
              <th>Attendance Activity</th>
              <th>In Office</th>
              <th>Time Away</th>
              <th>Breakdown</th>
            </tr>
          </thead>
          <tbody>
            \${me.calendar.map(day=>\`
              <tr>
                <td><strong>\${esc(day.date)}</strong>\${day.isHoliday?'<br><small style="color:#8a4b08">'+esc(day.holidayName)+'</small>':''}</td>
                <td>\${esc(day.dayOfWeek)}</td>
                <td>
                  <span class="badge \${day.status.toLowerCase()}">
                    \${day.status==='Present'?'✓ Present':day.status==='Holiday'?'Holiday':day.status==='No Activity'?'No Activity':day.status==='Absent'?'✕ Absent':day.status==='Weekend'?'Weekend':'—'}
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
                  \` : (day.status==='Holiday'?'<span style="color:#8a4b08;font-size:12px">Holiday · no scan</span>':day.status==='Absent'?'<span style="color:var(--danger-ink);font-size:12px">✕ No Entries</span>':(day.status==='Weekend'?'<span style="color:var(--muted);font-size:12px">Weekend</span>':'—'))}
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
                        <strong style="font-size:13px">Attendance Details for \${esc(day.date)} (\${esc(day.dayOfWeek)})</strong>
                        <span style="font-size:12px;color:var(--muted)">In Office: <strong style="color:var(--ink)">\${day.duration}</strong> · Time Away: <strong style="color:var(--ink)">\${day.outsideDuration}</strong></span>
                      </div>
                      <div class="timeline" style="margin-top:6px;gap:6px">
                        \${day.punches.map((p, idx)=>\`
                          <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:#f4f7f5;border-radius:6px;font-size:12px">
                            <div class="row" style="gap:8px">
                              <span class="timeline-badge \${p.kind}" style="padding:2px 7px;font-size:11px">
                                \${p.kind==='in'?'🟢 CHECKED IN':'🔴 CHECKED OUT'}
                              </span>
                              <strong>\${p.timeFormatted}</strong>
                              <span style="color:var(--muted)">Entry #\${idx + 1}</span>
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

  document.querySelector('#openScannerBtn')?.addEventListener('click',()=>startScanner('arrival'));
  document.querySelector('#breakScannerBtn')?.addEventListener('click',()=>startScanner('break'));
  document.querySelector('#endDayScannerBtn')?.addEventListener('click',()=>startScanner('end'));
  document.querySelector('#closeScannerBtn').onclick=stopScanner;
  if(isDayEnded&&!me.todaySummary?.workReport)showWorkReportForm();
  else if(me.todaySummary?.workReport)showWorkReportSaved(me.todaySummary.workReport.summary);
  bindWorkReportForm();
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

function showWorkReportForm(){
  const area=document.querySelector('#workReportArea');
  if(!area)return;
  area.innerHTML=\`<section class="card" style="margin:18px 0 0;background:#f8fbf9;border-color:#cfe3d9"><span class="badge present">DAY ENDED</span><h2 style="margin-top:12px">What did you work on today?</h2><p>Your end-of-day summary is requested after your final departure scan.</p><form id="workReportForm"><label for="workSummary">Work completed</label><textarea id="workSummary" name="summary" rows="5" maxlength="4000" placeholder="Summarize tasks completed, progress made, or anything to follow up…" required style="width:100%;min-width:0;padding:12px 14px;border:1px solid #cbd8d1;border-radius:11px;font:inherit;resize:vertical"></textarea><div id="workReportMsg" class="notice hidden" aria-live="polite"></div><button id="workReportSubmit" style="width:100%;margin-top:14px">Submit Work Summary</button></form></section>\`;
  bindWorkReportForm();
  area.scrollIntoView({behavior:'smooth',block:'center'});
}

function showWorkReportSaved(summary){
  const area=document.querySelector('#workReportArea');
  if(!area)return;
  area.innerHTML=\`<section class="card" style="margin:18px 0 0;background:#f8fbf9;border-color:#cfe3d9"><span class="badge present">SUMMARY SUBMITTED</span><h2 style="margin-top:12px">Today&#39;s Work Summary</h2><p style="white-space:pre-wrap;color:var(--ink)">\${esc(summary)}</p></section>\`;
}

function bindWorkReportForm(){
  const form=document.querySelector('#workReportForm');
  if(!form)return;
  form.onsubmit=async e=>{
    e.preventDefault();
    const submit=document.querySelector('#workReportSubmit');
    submit.disabled=true;
    try{
      const summary=new FormData(form).get('summary');
      const result=await post('/api/work-report',{summary});
      showWorkReportSaved(summary);
      msg('#scanMsg',result.message,'success');
    }catch(err){
      submit.disabled=false;
      msg('#workReportMsg',err.message,'error');
    }
  };
}

async function startScanner(scanAction='arrival'){
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
            {enableHighAccuracy:true,timeout:20000,maximumAge:0}
          ));
          const res=await post('/api/scan',{qrCode:rawCode,location:loc,action:scanAction});
          msg('#scanMsg',res.message,'success');
          if(res.needsWorkReport){
            showWorkReportForm();
            return;
          }
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
    adminLoginView();
    return;
  }

  try{
    const [d,s]=await Promise.all([
      api('/api/admin/dashboard?month='+encodeURIComponent(activeMonth),{headers:{authorization:'Basic '+btoa('admin:'+adminPassword)}}),
      api('/api/admin/settings',{headers:{authorization:'Basic '+btoa('admin:'+adminPassword)}})
    ]);

    headerAuth.innerHTML=\`
      <span style="color:#c0ded4;font-size:13px">Management</span>
      <button class="secondary" id="employeeViewBtn" style="padding:6px 12px;font-size:12px">Team View</button>
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
      adminLoginView();
    };

    app.innerHTML=\`
      <div class="between" style="margin-bottom:18px">
        <div>
          <h1>Attendance Overview</h1>
          <p>Manage team access, review attendance, and maintain office check-in settings.</p>
        </div>
        <div class="row">
          <a href="/poster" target="_blank" class="btn secondary">Print Office Poster ↗</a>
        </div>
      </div>

      <!-- General Registration Link Banner -->
      <div class="card" style="background:#f0f7f4;border-color:#bde0d3;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px">
        <div>
          <strong style="color:var(--primary);font-size:14px">Team Member Sign-Up</strong>
          <p style="font-size:12px;color:var(--muted);margin-top:2px">Share this link to let people create an account. No invitation code is needed.</p>
          <code id="regLinkDisplay" style="background:#fff;padding:5px 9px;border-radius:6px;border:1px solid #c8e2d7;font-size:13px;margin-top:6px;display:inline-block;color:var(--primary);font-weight:700">\${location.origin}/register</code>
        </div>
        <button class="secondary" id="copyRegLinkBtn" type="button">Copy Invite Link</button>
      </div>

      <!-- Executive Overview -->
      <div class="grid-4">
        <div class="stat-box">
          <div class="title">Team Members</div>
          <div class="val">\${d.totalEmployees}</div>
          <div class="sub">Accounts in your organization</div>
        </div>
        <div class="stat-box">
          <div class="title">Present Today</div>
          <div class="val" style="color:var(--success-ink)">\${d.checkedInToday}</div>
          <div class="sub">Currently on-site</div>
        </div>
        <div class="stat-box">
          <div class="title">No Scan Today</div>
          <div class="val">\${d.absentToday}</div>
          <div class="sub">No attendance recorded</div>
        </div>
        <div class="stat-box">
          <div class="title">Today&#39;s Scans</div>
          <div class="val">\${d.todayPunchesCount}</div>
          <div class="sub">Total scans recorded</div>
        </div>
      </div>

      <!-- Add team member and office settings -->
      <div class="grid-2">
        <div class="card">
          <h2>Add Staff</h2>
          <form id="addEmpForm">
            <label>Full Name</label>
            <input name="name" placeholder="e.g. Rahul Sharma" required>
            <button style="margin-top:16px;width:100%">Create Staff Account</button>
          </form>
          <div id="empCreds" class="notice hidden"></div>
          <div id="addEmpMsg" class="notice hidden"></div>
        </div>

        <div class="card">
          <h2>Office Check-In Settings</h2>
          <p>Set the office location and check-in radius for attendance scans.</p>
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
            <button style="margin-top:16px">Save Office & Security Settings</button>
          </form>
          <div id="settingsMsg" class="notice hidden"></div>
        </div>
      </div>

      <section class="card">
        <h2>Public Holidays</h2>
        <p>Add official holidays by date. Team members may still check in and out on any holiday.</p>
        <form id="holidayForm" class="row" style="align-items:end;margin-top:12px">
          <div style="flex:1;min-width:160px"><label for="holidayDate">Holiday date</label><input id="holidayDate" name="date" type="date" required></div>
          <div style="flex:2;min-width:180px"><label for="holidayName">Holiday name</label><input id="holidayName" name="name" maxlength="100" placeholder="e.g. Independence Day" required></div>
          <button type="submit">Add Holiday</button>
        </form>
        <div id="holidayMsg" class="notice hidden" aria-live="polite"></div>
        <div style="overflow-x:auto;margin-top:12px">
          <table style="min-width:420px"><thead><tr><th>Date</th><th>Holiday</th><th>Action</th></tr></thead><tbody id="holidayRows">
            \${s.publicHolidays.length?s.publicHolidays.map(h=>'<tr><td>'+esc(h.date)+'</td><td>'+esc(h.name)+'</td><td><button type="button" class="danger" style="padding:6px 10px;font-size:12px" data-date="'+esc(h.date)+'" onclick="removePublicHoliday(this.dataset.date)">Remove</button></td></tr>').join(''):'<tr><td colspan="3" class="muted">No additional public holidays added.</td></tr>'}
          </tbody></table>
        </div>
      </section>

      <section class="card" id="idCardInventory">
        <div class="between" style="margin-bottom:12px">
          <div><h2>ID Card Inventory</h2><p>Create generic cards before assigning them to people. Their QR links to the profile connected to that serial later.</p></div>
          \${d.idCards.some(c=>!c.employee_id)?'<button class="secondary" type="button" id="printAllCardsBtn">Print unassigned cards</button>':''}
        </div>
        <form id="generateCardsForm" class="row" style="align-items:end;margin-bottom:12px">
          <div style="width:150px"><label for="cardBatchCount">Number of cards</label><input id="cardBatchCount" name="count" type="number" min="1" max="100" value="10" required></div>
          <button type="submit">Generate blank cards</button>
        </form>
        <div id="idCardsMsg" class="notice hidden" aria-live="polite"></div>
        <div style="overflow-x:auto">
          <table style="min-width:780px"><thead><tr><th>Card serial</th><th>RFID UID</th><th>Linked profile</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>
              \${d.idCards.length?d.idCards.map(c=>\`
                <tr>
                  <td><code>\${esc(c.card_serial)}</code></td>
                  <td><code>\${esc(c.rfid_uid||'Not linked')}</code></td>
                  <td>
                    <select id="cardOwner-\${esc(c.card_serial)}" aria-label="Profile linked to \${esc(c.card_serial)}" style="min-width:210px;padding:7px 9px">
                      <option value="">Unassigned</option>
                      \${d.employees.map(e=>\`<option value="\${esc(e.id)}" \${c.employee_id===e.id?'selected':''}>\${esc(e.name)} · \${esc(e.emp_code||'')}</option>\`).join('')}
                    </select>
                  </td>
                  <td>\${new Date(c.created_at).toLocaleDateString('en-IN',{timeZone:'Asia/Kolkata'})}</td>
                  <td class="row" style="gap:5px">
                    <button type="button" class="secondary" style="padding:5px 8px;font-size:11px" onclick="saveCardProfile('\${esc(c.card_serial)}')">Save link</button>
                    <button type="button" class="secondary" style="padding:5px 8px;font-size:11px" onclick="assignCardRfid('\${esc(c.card_serial)}')">RFID</button>
                    <a class="btn secondary" style="padding:5px 8px;font-size:11px" href="/card/\${encodeURIComponent(c.card_serial)}" target="_blank">Print</a>
                    <button type="button" class="danger" style="padding:5px 8px;font-size:11px" onclick="deleteIdCard('\${esc(c.card_serial)}',this)">Delete</button>
                  </td>
                </tr>
              \`).join(''):'<tr><td colspan="5" class="muted">No cards issued yet. Generate a batch to create printable, unassigned cards.</td></tr>'}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Team directory and monthly attendance -->
      <section class="card">
        <div class="between" style="margin-bottom:12px">
          <div>
            <h2>Team Attendance</h2>
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
                <th>Staff ID</th>
                <th>Staff</th>
                <th>Today&#39;s Status</th>
                <th>Present (Month)</th>
                <th>No Scan Days (Month)</th>
                <th>Hours (Month)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              \${d.employees.map(e=>\`
                <tr>
                  <td><code>\${esc(e.emp_code||'EMP')}</code></td>
                  <td><strong>\${esc(e.name)}</strong><br><small class="muted">@\${esc(e.username)}</small></td>
                  <td>
                    <span class="badge \${e.todayState==='in'?'present':e.todayState==='out'?'in':'absent'}">
                      \${e.todayState==='in'?'At Work':e.todayEventType==='break_start'?'On Break':e.todayState==='out'?'Day Complete':'Not In'}
                    </span>
                  </td>
                  <td style="color:var(--success-ink);font-weight:700">\${e.monthStats.presentDays} d</td>
                  <td style="font-weight:700">\${e.monthStats.noScanDays} d</td>
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

      <!-- Recent attendance activity -->
      <section class="card">
        <h2>Recent Attendance Activity</h2>
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>Team Member</th>
                <th>Time</th>
                <th>Type</th>
                <th>Distance from Office</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              \${d.recentPunches.map(p=>\`
                <tr>
                  <td><strong>\${esc(p.name)}</strong> (\${esc(p.emp_code||'EMP')})</td>
                  <td>\${new Date(p.time).toLocaleString()}</td>
                  <td><span class="badge \${p.kind==='in'?'present':'absent'}">\${p.kind==='in'?(p.event_type==='break_end'?'🟢 RETURNED FROM BREAK':'🟢 ARRIVAL'):p.event_type==='day_end'?'✓ END OF DAY':'◷ BREAK'}</span></td>
                  <td>\${p.distance_meters!=null?p.distance_meters+' m':'—'}</td>
                  <td><span class="badge present">✓ \${esc(p.status)}</span></td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <section class="card">
        <h2>Daily Work Summaries</h2>
        <p>Summaries submitted after staff end their day.</p>
        <div style="overflow-x:auto">
          <table>
            <thead><tr><th>Date</th><th>Staff</th><th>Staff ID</th><th>Work Completed</th><th>Submitted</th></tr></thead>
            <tbody>
              \${d.recentWorkReports.length?d.recentWorkReports.map(r=>\`<tr><td>\${esc(r.day)}</td><td><strong>\${esc(r.name)}</strong></td><td>\${esc(r.emp_code||'—')}</td><td style="white-space:normal;min-width:260px;max-width:520px"><div style="white-space:pre-wrap">\${esc(r.summary)}</div></td><td>\${new Date(r.submitted_at).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}</td></tr>\`).join(''):'<tr><td colspan="5" class="muted">No work summaries submitted yet.</td></tr>'}
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
          Staff ID: <code>\${esc(res.emp_code)}</code><br>
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

    const copyBtn=document.querySelector('#copyRegLinkBtn');
    if(copyBtn){
      copyBtn.onclick=()=>{
        const link=document.querySelector('#regLinkDisplay')?.textContent||location.origin+'/register';
        navigator.clipboard.writeText(link).then(()=>{
          copyBtn.textContent='✓ Link Copied';
          setTimeout(()=>{copyBtn.textContent='Copy Invite Link';},2500);
        }).catch(()=>msg('#settingsMsg','Unable to copy automatically. Select and copy the invitation link above.','error'));
      };
    }

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
            radius:f.get('radius'),
          })
        });
        msg('#settingsMsg','Office & security settings saved successfully.','success');
        const linkDisplay=document.querySelector('#regLinkDisplay');
        if(linkDisplay)linkDisplay.textContent=location.origin+'/register';
      }catch(err){
        msg('#settingsMsg',err.message,'error');
      }
    };

    document.querySelector('#holidayForm').onsubmit=async e=>{
      e.preventDefault();
      const f=new FormData(e.target);
      const button=e.target.querySelector('button[type="submit"]');
      button.disabled=true;
      try{
        await api('/api/admin/holidays',{method:'POST',headers:{authorization:'Basic '+btoa('admin:'+adminPassword)},body:JSON.stringify({date:f.get('date'),name:f.get('name')})});
        await adminPortalView();
        msg('#holidayMsg','Public holiday saved. Attendance scans remain enabled for this date.','success');
      }catch(err){
        button.disabled=false;
        msg('#holidayMsg',err.message,'error');
      }
    };

    document.querySelector('#generateCardsForm').onsubmit=async e=>{
      e.preventDefault();
      const count=Number(new FormData(e.target).get('count'));
      const button=e.target.querySelector('button[type="submit"]');
      button.disabled=true;
      try{
        const result=await api('/api/admin/id-cards/generate',{method:'POST',headers:{authorization:'Basic '+btoa('admin:'+adminPassword)},body:JSON.stringify({count})});
        await adminPortalView();
        msg('#idCardsMsg',result.serials.length+' blank card'+(result.serials.length===1?'':'s')+' generated. They are ready to print or link later.','success');
      }catch(err){
        button.disabled=false;
        msg('#idCardsMsg',err.message,'error');
      }
    };

    const printAllCardsBtn=document.querySelector('#printAllCardsBtn');
    if(printAllCardsBtn)printAllCardsBtn.onclick=()=>{
      const serials=d.idCards.filter(c=>!c.employee_id).map(c=>c.card_serial).join(',');
      if(serials)window.open('/cards/print?serials='+encodeURIComponent(serials),'_blank','noopener');
    };

  }catch(err){
    adminPassword='';
    sessionStorage.removeItem('doit-admin');
    adminLoginView('Admin authentication failed: '+(err.message||'Please sign in again.'));
  }
}

window.removePublicHoliday=async date=>{
  if(!confirm('Remove this public holiday?'))return;
  try{
    await api('/api/admin/holidays',{method:'DELETE',headers:{authorization:'Basic '+btoa('admin:'+adminPassword)},body:JSON.stringify({date})});
    adminPortalView();
  }catch(err){alert(err.message);}
};

window.deleteIdCard=async(cardSerial,button)=>{
  if(!confirm('Delete card '+cardSerial+'? Its QR and RFID association will stop working. The person and attendance records will be kept. This cannot be undone.'))return;
  button.disabled=true;
  try{
    await api('/api/admin/id-cards',{method:'DELETE',headers:{authorization:'Basic '+btoa('admin:'+adminPassword)},body:JSON.stringify({cardSerial})});
    await adminPortalView();
    msg('#idCardsMsg','Card '+cardSerial+' deleted.','success');
    document.querySelector('#idCardInventory')?.scrollIntoView({block:'start'});
  }catch(err){button.disabled=false;alert(err.message);}
};

window.saveCardProfile=async cardSerial=>{
  const select=document.querySelector('#cardOwner-'+cardSerial);
  if(!select)return;
  try{
    await api('/api/admin/id-cards/link',{method:'POST',headers:{authorization:'Basic '+btoa('admin:'+adminPassword)},body:JSON.stringify({cardSerial,employeeId:select.value||null})});
    await adminPortalView();
    msg('#idCardsMsg','Card '+cardSerial+' profile link saved. Its QR now follows that profile.','success');
  }catch(err){alert(err.message);}
};

window.assignCardRfid=async cardSerial=>{
  const uid=prompt('Enter the RFID card UID read from your compatible reader. Leave blank to unlink it:');
  if(uid===null)return;
  try{
    await api('/api/admin/id-cards/rfid',{method:'POST',headers:{authorization:'Basic '+btoa('admin:'+adminPassword)},body:JSON.stringify({cardSerial,rfidUid:uid})});
    await adminPortalView();
    msg('#idCardsMsg',uid.trim()?'RFID UID saved for '+cardSerial+'.':'RFID UID removed from '+cardSerial+'.','success');
  }catch(err){alert(err.message);}
};

window.resetEmpPassword=async(empId,empName)=>{
  const modal=document.createElement('div');
  modal.className='modal-overlay';
  modal.id='confirmResetModal';
  modal.innerHTML=\`
    <div class="modal-box" style="max-width:440px;text-align:center">
      <div style="font-size:36px;margin-bottom:8px">🔑</div>
      <h2>Reset Password</h2>
      <p style="margin:10px 0 20px">Are you sure you want to generate a new password for <strong>\${esc(empName)}</strong>?</p>
      <div class="row" style="justify-content:center;gap:10px">
        <button class="secondary" id="cancelResetBtn">Cancel</button>
        <button class="danger" id="confirmResetBtn">Generate New Password</button>
      </div>
      <div id="resetModalMsg" class="notice hidden" style="margin-top:14px"></div>
    </div>
  \`;
  document.body.appendChild(modal);
  document.querySelector('#cancelResetBtn').onclick=()=>modal.remove();
  document.querySelector('#confirmResetBtn').onclick=async()=>{
    const btn=document.querySelector('#confirmResetBtn');
    btn.disabled=true;
    try{
      const res=await api('/api/admin/employees/reset-password',{
        method:'POST',
        headers:{authorization:'Basic '+btoa('admin:'+adminPassword)},
        body:JSON.stringify({employeeId:empId})
      });
      modal.innerHTML=\`
        <div class="modal-box" style="max-width:460px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">✅</div>
          <h2>Password Reset Complete</h2>
          <p>Share these credentials with the employee:</p>
          <div style="background:#f0f7f4;border:1px solid #c8e2d7;border-radius:10px;padding:14px;margin:16px 0;text-align:left">
            <div><span class="muted">Staff:</span> <strong>\${esc(res.name)} (\${esc(res.emp_code)})</strong></div>
            <div style="margin-top:6px"><span class="muted">Username:</span> <code>\${esc(res.username)}</code></div>
            <div style="margin-top:6px"><span class="muted">New Password:</span> <code style="font-size:15px;color:var(--primary);font-weight:700">\${esc(res.newPassword)}</code></div>
          </div>
          <button style="width:100%" onclick="document.querySelector('#confirmResetModal')?.remove()">Done</button>
        </div>
      \`;
    }catch(err){
      btn.disabled=false;
      msg('#resetModalMsg',err.message,'error');
    }
  };
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
            <p style="margin:2px 0 0">Month: \${esc(d.timesheet.monthSummary.month)}</p>
          </div>
          <button class="secondary" onclick="document.querySelector('#empTimesheetModal')?.remove()">✕ Close</button>
        </div>
        <div class="grid-4" style="margin-bottom:16px">
          <div class="stat-box" style="padding:12px">
            <div class="title">Days Present</div>
            <div class="val" style="font-size:22px;color:var(--success-ink)">\${d.timesheet.monthSummary.presentDays} d</div>
          </div>
          <div class="stat-box" style="padding:12px">
            <div class="title">Days Without Scans</div>
            <div class="val" style="font-size:22px">\${d.timesheet.monthSummary.noScanDays} d</div>
          </div>
          <div class="stat-box" style="padding:12px">
            <div class="title">Time In Office</div>
            <div class="val" style="font-size:22px">\${d.timesheet.monthSummary.totalHours} hrs</div>
          </div>
          <div class="stat-box" style="padding:12px">
            <div class="title">Public Holidays</div>
            <div class="val" style="font-size:22px">\${d.timesheet.monthSummary.holidayDays} d</div>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Status</th>
                <th>Attendance Activity</th>
                <th>In Office</th>
                <th>Time Away</th>
              </tr>
            </thead>
            <tbody>
              \${d.timesheet.calendar.map(day=>\`
                <tr>
                  <td><strong>\${esc(day.date)}</strong>\${day.isHoliday?'<br><small style="color:#8a4b08">'+esc(day.holidayName)+'</small>':''}</td>
                  <td>\${esc(day.dayOfWeek)}</td>
                  <td>
                    <span class="badge \${day.status.toLowerCase()}">
                      \${day.status==='Present'?'✓ Present':day.status==='Holiday'?'Holiday':day.status==='No Activity'?'No Activity':day.status==='Absent'?'✕ Absent':day.status==='Weekend'?'Weekend':'—'}
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
                    \` : (day.status==='Holiday'?'<span style="color:#8a4b08;font-size:12px">Holiday · no scan</span>':day.status==='Absent'?'<span style="color:var(--danger-ink);font-size:12px">✕ No Entries</span>':(day.status==='Weekend'?'<span style="color:var(--muted);font-size:12px">Weekend</span>':'—'))}
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
    const modal=document.createElement('div');
    modal.className='modal-overlay';
    modal.innerHTML=\`
      <div class="modal-box" style="max-width:400px;text-align:center">
        <h2>Timesheet Unavailable</h2>
        <p class="notice error">\${esc(err.message)}</p>
        <button style="margin-top:14px" onclick="this.closest('.modal-overlay').remove()">Close</button>
      </div>
    \`;
    document.body.appendChild(modal);
  }
};

function idCardFaces(cardSerial){
  const profileUrl='https://doit-erp.pages.dev/profile/'+encodeURIComponent(cardSerial);
  const qrUrl='https://api.qrserver.com/v1/create-qr-code/?size=800x800&ecc=H&margin=0&qzone=4&color=071d2c&bgcolor=e8f2f6&data='+encodeURIComponent(profileUrl);
  return \`<article class="id-card-sheet final-card final-front" aria-label="Staff ID front"><span class="final-front-serial">\${esc(cardSerial)}</span></article><article class="id-card-sheet final-card final-back" aria-label="Staff ID back"><div class="final-qr"><img src="\${qrUrl}" alt="Scan to view profile"><svg class="final-profile-icon" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" fill="#e8f2f6"/><circle cx="20" cy="12" r="7" fill="#102d43"/><path d="M7 36v-6c0-14 26-14 26 0v6z" fill="#102d43"/></svg></div><div class="final-back-serial">\${esc(cardSerial)}</div><div class="final-scan-label">Scan to view profile</div></article>\`;
}

async function showIdCard(serial,printCard){
  if(!printCard){
    document.body.classList.add('profile-only');
    document.title='Staff Profile · DoIt Innovations';
    document.querySelector('.brand-copy strong').textContent='Staff Profile';
    headerAuth.innerHTML='';
  }else{
    headerAuth.innerHTML='<a href="/manager" class="btn secondary">Management</a>';
  }
  app.innerHTML='<section class="card narrow">Loading ID card…</section>';
  try{
    const result=await api('/api/public/id-cards/'+encodeURIComponent(serial));
    const cardSerial=result.cardSerial;
    if(printCard){
      document.body.classList.add('id-card-print-mode');
      app.innerHTML=\`
        <div class="id-card-preview">
          \${idCardFaces(cardSerial)}
        </div>
        <div class="id-card-actions"><button onclick="window.print()">Print Front &amp; Back</button><a class="btn secondary" href="/manager">Back to Management</a></div>
      \`;
    }else if(result.status==='unassigned'){
      document.body.classList.remove('id-card-print-mode');
      app.innerHTML=\`
        <section class="id-profile" style="text-align:center">
          <img class="id-profile-logo" src="/doit-logo.png" alt="DoIt Innovations">
          <p class="poster-eyebrow" style="margin-top:18px">DOIT INNOVATIONS</p>
          <h1>Card not assigned</h1>
          <p>This identity card is awaiting assignment. Please contact the issuing office.</p>
          <div class="id-profile-field" style="margin-top:18px"><small>Card serial</small><strong>\${esc(cardSerial)}</strong></div>
        </section>
      \`;
    }else{
      document.body.classList.remove('id-card-print-mode');
      const profile=result.profile;
      app.innerHTML=\`
        <section class="id-profile">
          <img class="id-profile-logo" src="/doit-logo.png" alt="DoIt Innovations">
          <p class="poster-eyebrow" style="margin-top:18px">Staff Profile</p>
          <h1>\${esc(profile.name)}</h1>
          <p>\${esc(profile.name)}</p>
          <div class="id-profile-grid">
            <div class="id-profile-field"><small>Staff ID</small><strong>\${esc(profile.staffId||'—')}</strong></div>
            <div class="id-profile-field"><small>Card Serial</small><strong>\${esc(cardSerial)}</strong></div>
          </div>
        </section>
      \`;
    }
  }catch(err){
    app.innerHTML='<section class="card narrow"><h1>ID card unavailable</h1><p>'+esc(err.message)+'</p></section>';
  }
}

async function showIdCardBatch(serials){
  headerAuth.innerHTML='<a href="/manager" class="btn secondary" style="padding:8px 12px;font-size:12px">Back to Management</a>';
  document.body.classList.add('id-card-print-mode');
  app.innerHTML='<section class="card narrow">Preparing cards…</section>';
  try{
    const unique=[...new Set(serials.filter(s=>/^DIC-[A-F0-9]{10}$/i.test(s)).map(s=>s.toUpperCase()))].slice(0,100);
    if(!unique.length)throw new Error('No valid card serials were selected.');
    const records=await Promise.all(unique.map(serial=>api('/api/public/id-cards/'+encodeURIComponent(serial))));
    app.innerHTML=\`<div class="id-card-preview">\${records.map(card=>idCardFaces(card.cardSerial)).join('')}</div><div class="id-card-actions"><button onclick="window.print()">Print \${records.length} Cards · Front &amp; Back</button><a class="btn secondary" href="/manager">Back to Management</a></div>\`;
  }catch(err){
    document.body.classList.remove('id-card-print-mode');
    app.innerHTML='<section class="card narrow"><h1>Card print unavailable</h1><p>'+esc(err.message)+'</p></section>';
  }
}

// ---------------- ROUTER ----------------
if(location.pathname==='/cards/print'){
  showIdCardBatch((new URLSearchParams(location.search).get('serials')||'').split(','));
}else if(location.pathname.startsWith('/card/')){
  showIdCard(decodeURIComponent(location.pathname.split('/').at(-1)||''),true);
}else if(location.pathname.startsWith('/profile/')){
  showIdCard(decodeURIComponent(location.pathname.split('/').at(-1)||''),false);
}else if(location.pathname==='/poster'){
  api('/api/poster').then(d=>{
    const qrImageUrl='https://api.qrserver.com/v1/create-qr-code/?size=900x900&color=002046&bgcolor=ffffff&qzone=2&data='+encodeURIComponent(d.code);
    app.innerHTML=\`
      <article class="poster-sheet">
        <div class="poster-top"><img class="poster-logo" src="/doit-logo.png" alt="DoIt official logo"><div class="poster-label">OFFICIAL<br>OFFICE ATTENDANCE</div></div>
        <div class="poster-content">
          <p class="poster-eyebrow">\${esc(d.officeName)}</p>
          <h1>Scan when you arrive.<br>Scan when you leave.</h1>
          <p class="poster-lead">Use your personal DoIt Attendance account and scan this code from the office.</p>
          <div class="poster-qr-frame"><img class="poster-qr" alt="Official office attendance QR code" src="\${qrImageUrl}"></div>
          <div class="poster-instructions">
            <div class="poster-step"><strong>01 · Sign in</strong>Open DoIt Attendance on your phone.</div>
            <div class="poster-step"><strong>02 · Scan on arrival</strong>Use Open Scanner when you reach the office.</div>
            <div class="poster-step"><strong>03 · Scan at day end</strong>Record your final departure before leaving.</div>
          </div>
          <p class="poster-foot">For attendance, scan while at the office with location access enabled. Breaks can be recorded separately.</p>
        </div>
      </article>
      <div class="poster-actions"><button onclick="window.print()">Print A4 Poster</button><a class="btn secondary" href="\${qrImageUrl}" target="_blank" rel="noopener">Open QR Image</a><a class="btn secondary" href="/">Back to Sign In</a></div>
    \`;
  }).catch(e=>{app.innerHTML='<p>Error: '+esc(e.message)+'</p>'});
}else if(location.pathname==='/register'){
  registerView();
}else if(location.pathname==='/admin'||location.pathname==='/manager'){
  if(adminPassword){
    adminPortalView();
  }else{
    adminLoginView();
  }
}else{
  employeeView();
}
window.onpopstate=()=>{
  if(location.pathname==='/register')registerView();
  else if(location.pathname==='/admin'||location.pathname==='/manager'){
    if(adminPassword)adminPortalView();else adminLoginView();
  }else if(location.pathname==='/poster'){
    location.reload();
  }else employeeView();
};
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
      eventType:p.event_type||'regular',
      label:p.kind==='in'?'Checked In':p.event_type==='day_end'?'Day End':'Break Started',
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
  const employee=await env.DB.prepare('SELECT created_at FROM employees WHERE id=?').bind(employeeId).first();
  const resetSetting=await env.DB.prepare("SELECT value FROM settings WHERE key='attendanceStartDate'").first();
  const createdDate=employee?.created_at?new Date(employee.created_at+19800000).toISOString().slice(0,10):'';
  const accountStartDate=[createdDate,resetSetting?.value||''].sort().at(-1);
  const holidaySetting=await env.DB.prepare("SELECT value FROM settings WHERE key='publicHolidays'").first();
  let holidayItems=[];
  try{holidayItems=JSON.parse(holidaySetting?.value||'[]');}catch{}
  const namedHolidays=Object.fromEntries((Array.isArray(holidayItems)?holidayItems:[]).filter(h=>/^\d{4}-\d{2}-\d{2}$/.test(h?.date||'')).map(h=>[h.date,String(h.name||'Public holiday')]));
  const [yearStr, monthNumStr]=monthStr.split('-');
  const year=parseInt(yearStr,10);
  const monthIndex=parseInt(monthNumStr,10)-1; // 0-indexed
  const daysInMonth=new Date(year, monthIndex+1, 0).getDate();

  // Fetch all punches for this employee in this month
  const monthPattern=`${monthStr}-%`;
  const events=(await env.DB.prepare(
    "SELECT e.id,e.kind,COALESCE(t.event_type,'regular') AS event_type,e.time,e.day FROM attendance_events e LEFT JOIN attendance_event_types t ON t.event_id=e.id WHERE e.employee_id=? AND e.day LIKE ? ORDER BY e.time ASC"
  ).bind(employeeId, monthPattern).all()).results;

  // Group events by day
  const dayMap={};
  for(const e of events){
    if(!dayMap[e.day])dayMap[e.day]=[];
    dayMap[e.day].push(e);
  }

  const calendar=[];
  let presentDays=0;
  let noScanDays=0;
  let totalMinutesWorked=0;
  let workingDaysSoFar=0;
  let holidayDays=0;

  for(let d=1; d<=daysInMonth; d++){
    const dStr=String(d).padStart(2,'0');
    const dateStr=`${monthStr}-${dStr}`;
    // A person's attendance timeline begins with their account, never before it.
    if(accountStartDate && dateStr<accountStartDate)continue;
    const dt=new Date(year, monthIndex, d);
    const dayOfWeekStr=new Intl.DateTimeFormat('en-US',{weekday:'short'}).format(dt);
    const isHoliday=Object.hasOwn(namedHolidays,dateStr);
    const holidayName=namedHolidays[dateStr]||'';
    if(isHoliday)holidayDays++;
    const isPastOrToday=(dateStr<=today);

    const punches=dayMap[dateStr]||[];
    let status='Upcoming';

    const dayStats=processDayPunches(punches, dateStr, dateStr===today);

    if(punches.length>0){
      status='Present';
      presentDays++;
      totalMinutesWorked+=dayStats.onSiteMins;
    }else{
      if(isHoliday){
        status='Holiday';
      }else if(isPastOrToday){
        status='No Activity';
        noScanDays++;
      }
    }

    if(!isHoliday && isPastOrToday){
      workingDaysSoFar++;
    }

    calendar.push({
      date:dateStr,
      dayNumber:d,
      dayOfWeek:dayOfWeekStr,
      isWeekend:isHoliday,
      isHoliday,
      holidayName,
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
  return {
    calendar,
    monthSummary:{
      month:monthStr,
      presentDays,
      noScanDays,
      holidayDays,
      totalHours,
      workingDaysSoFar
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
        app:'DoIt Attendance',
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
      if(password.length<10)return json({error:'Password must be at least 10 characters.'},400);

      const dept=String(b.department||'Operations').trim();
      const role=String(b.role||'Associate').trim();

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
        "SELECT e.id,e.kind,COALESCE(t.event_type,'regular') AS event_type,e.time,e.status FROM attendance_events e LEFT JOIN attendance_event_types t ON t.event_id=e.id WHERE e.employee_id=? AND e.day=? ORDER BY e.time ASC"
      ).bind(emp.id,today).all()).results;

      const todayStats=processDayPunches(todayPunches, today, true);
      const timesheet=await buildMonthlyTimesheet(env, emp.id, month);
      const todayReport=await env.DB.prepare('SELECT summary,submitted_at FROM daily_work_reports WHERE employee_id=? AND day=?').bind(emp.id,today).first();

      return json({
        employee:emp,
        todaySummary:{
          date:today,
          currentState:todayStats.currentState,
          dayEnded:todayPunches.at(-1)?.event_type==='day_end',
          workReport:todayReport||null,
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

    // Scan Record Attendance
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
        return json({error:'Office location must be configured in Management settings first.'},503);
      }

      const loc=b.location;
      if(!Number.isFinite(loc?.latitude)||!Number.isFinite(loc?.longitude)||Math.abs(loc.latitude)>90||Math.abs(loc.longitude)>180){
        return json({error:'Location permission is required to verify physical office presence.'},400);
      }

      const dist=distance(+settings.officeLat,+settings.officeLng,loc.latitude,loc.longitude);
      const radius=Number(settings.radius)||150;
      if(!Number.isFinite(loc.accuracy)||loc.accuracy<=0||loc.accuracy>100)return json({error:'Location is not accurate enough. Enable precise location and retry. No attendance was recorded.'},400);
      if(dist>radius){
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

      const action=String(b.action||'');
      const lastEvent=await env.DB.prepare(
        "SELECT e.kind,COALESCE(t.event_type,'regular') AS event_type FROM attendance_events e LEFT JOIN attendance_event_types t ON t.event_id=e.id WHERE e.employee_id=? AND e.day=? ORDER BY e.time DESC LIMIT 1"
      ).bind(emp.id,today).first();
      let kind,eventType;
      if(!['arrival','break','end'].includes(action))return json({error:'Invalid attendance action.'},400);
      if(!lastEvent){
        if(action!=='arrival')return json({error:'Please check in first. Refresh your attendance page.'},409);
        kind='in';eventType='arrival';
      }else if(lastEvent.kind==='in'){
        if(action!=='break'&&action!=='end')return json({error:'Choose whether you are taking a break or ending your day.'},400);
        kind='out';eventType=action==='end'?'day_end':'break_start';
      }else{
        if(action!=='arrival')return json({error:'You are already checked out. Refresh your attendance page.'},409);
        if(lastEvent.event_type==='day_end')return json({error:'Your day is already complete.'},409);
        kind='in';eventType='break_end';
      }

      const eventId=crypto.randomUUID();
      await env.DB.batch([
        env.DB.prepare('INSERT INTO attendance_events(id,employee_id,day,kind,time,latitude,longitude,accuracy,distance_meters,status) VALUES(?,?,?,?,?,?,?,?,?,?)').bind(eventId,emp.id,today,kind,now,loc.latitude,loc.longitude,loc.accuracy||null,dist,'verified'),
        env.DB.prepare('INSERT INTO attendance_event_types(event_id,event_type) VALUES(?,?)').bind(eventId,eventType)
      ]);

      return json({
        success:true,
        kind,
        eventType,
        needsWorkReport:eventType==='day_end',
        message:eventType==='day_end'?'Departure recorded. Please add your work summary for today.':kind==='in'?'Arrival recorded. Welcome to DoIt Innovations.':'Break started. Scan again when you return.'
      });
    }

    if(p==='/api/work-report'&&method==='POST'){
      const emp=await getAuthEmployee(request,env);
      const b=await request.json();
      const summary=String(b.summary||'').trim();
      if(summary.length<5)return json({error:'Please add at least a short description of the work completed.'},400);
      if(summary.length>4000)return json({error:'Please keep the work summary under 4,000 characters.'},400);
      const today=todayStr();
      const dayEnd=await env.DB.prepare("SELECT e.id FROM attendance_events e JOIN attendance_event_types t ON t.event_id=e.id WHERE e.employee_id=? AND e.day=? AND t.event_type='day_end' ORDER BY e.time DESC LIMIT 1").bind(emp.id,today).first();
      if(!dayEnd)return json({error:'A work summary is available after you scan to end your day.'},409);
      await env.DB.prepare('INSERT INTO daily_work_reports(id,employee_id,day,summary,submitted_at) VALUES(?,?,?,?,?) ON CONFLICT(employee_id,day) DO UPDATE SET summary=excluded.summary,submitted_at=excluded.submitted_at').bind(crypto.randomUUID(),emp.id,today,summary,Date.now()).run();
      return json({success:true,message:'Work summary saved.'});
    }

    const publicCardMatch=p.match(/^\/api\/public\/id-cards\/(DIC-[A-F0-9]{10})$/i);
    if(publicCardMatch&&method==='GET'){
      const serial=publicCardMatch[1].toUpperCase();
      const card=await env.DB.prepare('SELECT c.card_serial,c.employee_id,e.emp_code,e.name,e.role,e.department,e.active FROM id_cards c LEFT JOIN employees e ON e.id=c.employee_id WHERE c.card_serial=?').bind(serial).first();
      if(!card)return json({error:'This ID card was not found.'},404);
      if(!card.employee_id||!card.active)return json({status:'unassigned',cardSerial:card.card_serial});
      return json({status:'linked',cardSerial:card.card_serial,profile:{staffId:card.emp_code,name:card.name,role:card.role,department:card.department}});
    }

    // ---------------- ADMIN API ROUTES ----------------
    if(p.startsWith('/api/admin/'))await requireAdmin(request,env);

    if(p==='/api/admin/id-cards'&&method==='DELETE'){
      const body=await request.json();
      const serial=String(body.cardSerial||'').trim().toUpperCase();
      if(!/^DIC-[A-F0-9]{10}$/.test(serial))return json({error:'Invalid card serial.'},400);
      const result=await env.DB.prepare('DELETE FROM id_cards WHERE card_serial=?').bind(serial).run();
      if(!result.meta.changes)return json({error:'Card was not found.'},404);
      return json({ok:true,cardSerial:serial});
    }

    if(p==='/api/admin/id-cards/generate'&&method==='POST'){
      const body=await request.json();
      const count=Number(body.count);
      if(!Number.isInteger(count)||count<1||count>100)return json({error:'Choose between 1 and 100 cards per batch.'},400);
      const serials=[];
      for(let i=0;i<count;i++){
        let serial='';
        for(let attempt=0;attempt<8;attempt++){
          const candidate='DIC-'+hex(crypto.getRandomValues(new Uint8Array(5))).toUpperCase();
          if(!serials.includes(candidate)&&!await env.DB.prepare('SELECT card_serial FROM id_cards WHERE card_serial=?').bind(candidate).first()){
            serial=candidate;
            break;
          }
        }
        if(!serial)return json({error:'Could not generate a unique card serial. Please try again.'},503);
        serials.push(serial);
      }
      await env.DB.batch(serials.map(serial=>env.DB.prepare('INSERT INTO id_cards(card_serial,created_at) VALUES(?,?)').bind(serial,Date.now())));
      return json({ok:true,serials},201);
    }

    if(p==='/api/admin/id-cards/link'&&method==='POST'){
      const body=await request.json();
      const serial=String(body.cardSerial||'').toUpperCase();
      const employeeId=String(body.employeeId||'');
      if(!/^DIC-[A-F0-9]{10}$/.test(serial))return json({error:'Invalid card serial.'},400);
      const card=await env.DB.prepare('SELECT card_serial FROM id_cards WHERE card_serial=?').bind(serial).first();
      if(!card)return json({error:'Card was not found.'},404);
      if(employeeId&&!await env.DB.prepare('SELECT id FROM employees WHERE id=? AND active=1').bind(employeeId).first())return json({error:'Active staff not found.'},404);
      await env.DB.prepare('UPDATE id_cards SET employee_id=? WHERE card_serial=?').bind(employeeId||null,serial).run();
      return json({ok:true,linked:!!employeeId,cardSerial:serial});
    }

    if(p==='/api/admin/id-cards/rfid'&&method==='POST'){
      const body=await request.json();
      const serial=String(body.cardSerial||'').toUpperCase();
      if(!/^DIC-[A-F0-9]{10}$/.test(serial))return json({error:'Invalid card serial.'},400);
      const card=await env.DB.prepare('SELECT card_serial FROM id_cards WHERE card_serial=?').bind(serial).first();
      if(!card)return json({error:'Card was not found.'},404);
      const uid=String(body.rfidUid||'').trim().replace(/\s+/g,'').toUpperCase();
      if(uid&&!/^[A-Z0-9:-]{4,40}$/.test(uid))return json({error:'Enter a valid RFID UID using letters, numbers, colons, or hyphens.'},400);
      if(uid){
        const duplicate=await env.DB.prepare('SELECT card_serial FROM id_cards WHERE rfid_uid=? AND card_serial<>?').bind(uid,serial).first();
        if(duplicate)return json({error:'This RFID UID is already assigned to another card.'},409);
      }
      await env.DB.prepare('UPDATE id_cards SET rfid_uid=? WHERE card_serial=?').bind(uid||null,serial).run();
      return json({ok:true,linked:!!uid,cardSerial:serial});
    }

    if(p==='/api/admin/settings'&&method==='GET'){
      const s=await env.DB.prepare('SELECT key,value FROM settings').all();
      const o=Object.fromEntries(s.results.map(x=>[x.key,x.value]));
      let publicHolidays=[];
      try{publicHolidays=JSON.parse(o.publicHolidays||'[]');}catch{}
      return json({
        officeName:o.officeName||'DoIt Innovations Head Office',
        officeLat:o.officeLat||'',
        officeLng:o.officeLng||'',
        radius:o.radius||'150',
        publicHolidays:Array.isArray(publicHolidays)?publicHolidays:[],
      });
    }

    if(p==='/api/admin/settings'&&method==='POST'){
      const b=await request.json();
      const fields={
        officeName:b.officeName,
        officeLat:b.officeLat,
        officeLng:b.officeLng,
        radius:b.radius,
      };
      for(const [k,v] of Object.entries(fields)){
        if(v!==undefined&&v!==null){
          await env.DB.prepare('INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').bind(k,String(v)).run();
        }
      }
      return json({ok:true});
    }

    if(p==='/api/admin/holidays'&&(method==='POST'||method==='DELETE')){
      const body=await request.json();
      const date=String(body.date||'');
      const parsedDate=Date.parse(date+'T00:00:00Z');
      if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(parsedDate)||new Date(parsedDate).toISOString().slice(0,10)!==date)return json({error:'Enter a valid holiday date.'},400);
      let publicHolidays=[];
      const stored=await env.DB.prepare("SELECT value FROM settings WHERE key='publicHolidays'").first();
      try{publicHolidays=JSON.parse(stored?.value||'[]');}catch{}
      if(!Array.isArray(publicHolidays))publicHolidays=[];
      if(method==='POST'){
        const name=String(body.name||'').trim().slice(0,100);
        if(!name)return json({error:'Enter a holiday name.'},400);
        publicHolidays=publicHolidays.filter(h=>h?.date!==date);
        publicHolidays.push({date,name});
        publicHolidays.sort((a,b)=>a.date.localeCompare(b.date));
      }else publicHolidays=publicHolidays.filter(h=>h?.date!==date);
      await env.DB.prepare('INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').bind('publicHolidays',JSON.stringify(publicHolidays)).run();
      return json({ok:true,publicHolidays});
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
      const idCards=(await env.DB.prepare('SELECT c.card_serial,c.employee_id,c.rfid_uid,c.created_at,e.name,e.emp_code FROM id_cards c LEFT JOIN employees e ON e.id=c.employee_id ORDER BY c.created_at DESC').all()).results;

      const todayEvents=(await env.DB.prepare("SELECT e.employee_id,e.kind,COALESCE(t.event_type,'regular') AS event_type FROM attendance_events e LEFT JOIN attendance_event_types t ON t.event_id=e.id WHERE e.day=? ORDER BY e.time ASC").bind(today).all()).results;
      const todayMap={};
      for(const e of todayEvents)todayMap[e.employee_id]=e;

      // Get monthly stats for each employee
      const employeeReports=await Promise.all(emps.map(async e=>{
        const ts=await buildMonthlyTimesheet(env, e.id, month);
        return {
          ...e,
          todayState:todayMap[e.id]?.kind||'none',
          todayEventType:todayMap[e.id]?.event_type||'regular',
          monthStats:ts.monthSummary
        };
      }));

      const recentPunches=(await env.DB.prepare(
        "SELECT e.id,e.employee_id,e.kind,COALESCE(t.event_type,'regular') AS event_type,e.time,e.distance_meters,e.status,m.name,m.emp_code FROM attendance_events e JOIN employees m ON m.id=e.employee_id LEFT JOIN attendance_event_types t ON t.event_id=e.id ORDER BY e.time DESC LIMIT 25"
      ).all()).results;
      const recentWorkReports=(await env.DB.prepare(
        'SELECT r.id,r.day,r.summary,r.submitted_at,m.name,m.emp_code FROM daily_work_reports r JOIN employees m ON m.id=r.employee_id ORDER BY r.day DESC,r.submitted_at DESC LIMIT 50'
      ).all()).results;

      const checkedInToday=Object.values(todayMap).filter(x=>x.kind==='in').length;
      const absentToday=emps.length - Object.keys(todayMap).length;

      return json({
        employees:employeeReports,
        idCards,
        totalEmployees:emps.length,
        checkedInToday,
        absentToday,
        todayPunchesCount:todayEvents.length,
        recentPunches,
        recentWorkReports
      });
    }

    // PWA Manifest & Assets
    if(p==='/manifest.json'||p==='/manifest.webmanifest'){
      return new Response(JSON.stringify({
        name:'DoIt Attendance',
        short_name:'DoIt',
        description:'Attendance and timesheet management for DoIt Innovations',
        start_url:'/',
        scope:'/',
        display:'standalone',
        orientation:'portrait-primary',
        background_color:'#f4f6f3',
        theme_color:'#002046',
        icons:[
          {src:'/icon.svg',sizes:'any',type:'image/svg+xml',purpose:'any maskable'},
          {src:'/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any maskable'},
          {src:'/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}
        ]
      }),{headers:{'content-type':'application/manifest+json; charset=utf-8','cache-control':'public, max-age=86400'}});
    }

    if(p==='/sw.js'){
      const sw = "const CACHE_NAME='doit-attendance-v2';self.addEventListener('install',e=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(clients.claim()));self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});";
      return new Response(sw,{headers:{'content-type':'application/javascript; charset=utf-8','cache-control':'no-cache'}});
    }

    if(p==='/icon.svg'){
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#002046"/><stop offset="100%" stop-color="#00152e"/></linearGradient><linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0eAAF5"/><stop offset="100%" stop-color="#087fb8"/></linearGradient></defs><rect width="512" height="512" rx="128" fill="url(#g)"/><rect x="8" y="8" width="496" height="496" rx="120" fill="none" stroke="#0eAAF5" stroke-width="8" stroke-opacity="0.3"/><polygon points="256,70 410,224 256,378 102,224" fill="url(#accent)" opacity="0.15"/><polygon points="256,90 390,224 256,358 122,224" fill="none" stroke="#0eAAF5" stroke-width="12" stroke-linejoin="round"/><circle cx="256" cy="224" r="70" fill="#002046" stroke="#0eAAF5" stroke-width="8"/><polyline points="230,224 250,244 285,204" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><text x="256" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="4">DoIt Attendance</text><text x="256" y="475" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#0eAAF5" text-anchor="middle" letter-spacing="3">ATTENDANCE</text></svg>';
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

    if(p==='/doit-logo.png'||p==='/card-artwork.png')return env.ASSETS.fetch(request);

    // Serve HTML
    if(p==='/admin'||p==='/manager'||p==='/poster'||p==='/register'||p==='/') {
      return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
    }
    return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});

  }catch(err){
    if(String(err.message).includes('duplicate_attendance'))return json({error:'Attendance already recorded or another scan is being processed. Refresh your attendance page.'},409);
    const status=err.message.includes('Admin')?401:err.message.includes('Sign in')||err.message.includes('Session expired')?401:500;
    return json({error:err.message||'Server error'},status);
  }
}

export default {fetch(request,env){return handle(request,env)}};
