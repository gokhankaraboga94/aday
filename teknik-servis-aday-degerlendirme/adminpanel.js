function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function showStatus(type, message) {
  const node = document.getElementById("status");
  if (!node) return;
  const cls = type === "ok" ? "text-emerald-700" : type === "warn" ? "text-amber-700" : "text-rose-700";
  node.className = `mt-3 text-sm ${cls}`;
  node.textContent = message;
}

function showSaveStatus(type, message) {
  const node = document.getElementById("saveStatus");
  if (!node) return;
  const cls = type === "ok" ? "text-emerald-700" : type === "warn" ? "text-amber-700" : "text-rose-700";
  node.className = `text-sm ${cls}`;
  node.textContent = message;
}

const ADMIN_ALLOWED_EMAILS = ["admin@servis.com"];

function showLoginStatus(type, message) {
  const node = document.getElementById("loginStatus");
  if (!node) return;
  const cls = type === "ok" ? "text-emerald-300" : type === "warn" ? "text-amber-300" : "text-rose-300";
  node.className = `text-sm ${cls}`;
  node.textContent = message;
}

function setAuthedUI(isAuthed) {
  const login = document.getElementById("loginScreen");
  const app = document.getElementById("authedApp");
  const btnLogout = document.getElementById("btnLogout");
  if (login) login.classList.toggle("hidden", !!isAuthed);
  if (app) app.classList.toggle("hidden", !isAuthed);
  if (btnLogout) btnLogout.classList.toggle("hidden", !isAuthed);
}

async function signInFromUI() {
  try {
    const fb = window.TS_FIREBASE;
    if (!fb?.auth) {
      showLoginStatus("err", "Auth modülü yüklenmedi.");
      return;
    }

    const email = (document.getElementById("loginEmail")?.value || "").toString().trim();
    const password = (document.getElementById("loginPassword")?.value || "").toString();
    if (!email || !password) {
      showLoginStatus("warn", "E-posta ve şifre gir.");
      return;
    }

    showLoginStatus("warn", "Giriş yapılıyor...");
    await fb.auth.signInWithEmailAndPassword(email, password);
  } catch (e) {
    showLoginStatus("err", `Hata: ${e?.message || "Giriş başarısız"}`);
  }
}

async function signOutFromUI() {
  try {
    const fb = window.TS_FIREBASE;
    if (!fb?.auth) return;
    await fb.auth.signOut();
  } catch (e) {
    showStatus("err", `Çıkış hatası: ${e?.message || e}`);
  }
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildCertificateHtml(doc) {
  const fullName = escapeHtml(doc?.fullName || "-");
  const candidateId = escapeHtml(doc?.candidateId || "-");
  const branch = escapeHtml(doc?.branch || "-");
  const createdAt = doc?.createdAt ? escapeHtml(String(doc.createdAt).slice(0, 10)) : "-";
  const updatedAt = doc?.updatedAt ? escapeHtml(String(doc.updatedAt).slice(0, 10)) : "-";

  const prePercent = safeNumber(doc?.preScorePercent, 0);
  const rubricTotal = safeNumber(doc?.totalScore, 0);
  const liveTotal = safeNumber(doc?.live?.total, 0);
  const finalScore = Number.isFinite(Number(doc?.finalScore))
    ? safeNumber(doc.finalScore, 0)
    : computeFinalScore0to100(prePercent, rubricTotal, liveTotal);

  const logo = "https://cdn.myikas.com/images/theme-images/fae434c3-6474-4815-8172-28d84d3fb58c/image_360.webp";

  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mobilfon Akademi — Sertifika</title>
    <style>
      *{box-sizing:border-box}
      body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#0b1220;color:#0f172a}
      .page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:28px}
      .card{width:900px;max-width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 25px 70px rgba(0,0,0,.35)}
      .top{padding:22px 26px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e5e7eb}
      .brand{display:flex;gap:14px;align-items:center}
      .brand img{height:42px;width:auto}
      .brand .t1{font-weight:800;letter-spacing:.2px;font-size:16px;color:#0f172a}
      .brand .t2{font-size:12px;color:#475569;margin-top:2px}
      .badge{font-size:12px;color:#0f172a;background:#eef2ff;border:1px solid #c7d2fe;padding:8px 10px;border-radius:999px;font-weight:700}
      .content{padding:30px 34px}
      .title{font-size:34px;font-weight:900;color:#0f172a;margin:0}
      .subtitle{margin:8px 0 0;color:#334155;font-size:14px;line-height:1.6}
      .name{margin:22px 0 0;font-size:26px;font-weight:900;color:#111827}
      .desc{margin:10px 0 0;color:#334155;font-size:14px;line-height:1.7}
      .grid{margin-top:22px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
      .box{border:1px solid #e5e7eb;border-radius:14px;padding:14px 14px}
      .k{font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
      .v{margin-top:6px;font-size:14px;color:#0f172a;font-weight:800}
      .score{margin-top:18px;border-radius:16px;background:linear-gradient(90deg,#2563eb,#7c3aed,#10b981);padding:18px;color:#fff}
      .score .s1{font-size:12px;opacity:.9;font-weight:700}
      .score .s2{margin-top:4px;font-size:36px;font-weight:900;letter-spacing:.2px}
      .score .s3{margin-top:4px;font-size:12px;opacity:.95}
      .foot{padding:16px 26px;border-top:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;color:#64748b;font-size:11px}
      @media print{
        body{background:#fff}
        .page{padding:0}
        .card{box-shadow:none;border-radius:0;width:100%}
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="card">
        <div class="top">
          <div class="brand">
            <img src="${logo}" alt="Mobilfon" />
            <div>
              <div class="t1">Mobilfon Akademi</div>
              <div class="t2">Teknik Servis &amp; Cihaz Yenileme — Değerlendirme</div>
            </div>
          </div>
          <div class="badge">Sertifika / Rapor</div>
        </div>

        <div class="content">
          <h1 class="title">Başarı Sertifikası</h1>
          <p class="subtitle">Bu belge, Mobilfon Akademi değerlendirme süreci kapsamında oluşturulmuştur.</p>

          <div class="name">${fullName}</div>
          <p class="desc"><b>${fullName}</b>, Mobilfon Akademi ön değerlendirme ve mülakat aşamalarını <b>başarı ile tamamlamıştır</b>.</p>

          <div class="grid">
            <div class="box"><div class="k">Aday ID</div><div class="v">${candidateId}</div></div>
            <div class="box"><div class="k">Şube</div><div class="v">${branch}</div></div>
            <div class="box"><div class="k">Başvuru Tarihi</div><div class="v">${createdAt}</div></div>
            <div class="box"><div class="k">Değerlendirme Tarihi</div><div class="v">${updatedAt}</div></div>
            <div class="box"><div class="k">Ön Başvuru</div><div class="v">%${Math.round(prePercent)}</div></div>
            <div class="box"><div class="k">Rubrik / Canlı</div><div class="v">${Math.round(rubricTotal)}/100 · ${Math.round(liveTotal)}/35</div></div>
          </div>

          <div class="score">
            <div class="s1">Final Skor (0–100)</div>
            <div class="s2">${finalScore}</div>
            <div class="s3">Ağırlıklar: Ön Başvuru %30 · Rubrik %50 · Canlı Test %20</div>
          </div>
        </div>

        <div class="foot">
          <div>© 2026 Mobilfon — Sistem tarafından otomatik üretilmiştir.</div>
          <div>mobilfon.com</div>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

async function downloadCertificateFor(id) {
  try {
    const doc = await firestoreGetDoc(id);
    if (!doc) {
      showStatus("err", "Kayıt bulunamadı.");
      return;
    }
    const html = buildCertificateHtml(doc);

    const w = window.open("", "_blank");
    if (!w) {
      showStatus("err", "Popup engellendi. Tarayıcı ayarlarından izin ver.");
      return;
    }

    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => {
      try {
        w.print();
      } catch (_) {
      }
    }, 250);
  } catch (e) {
    showStatus("err", `Rapor hatası: ${e?.message || e}`);
  }
}

const LABEL_TO_SCORE = {
  "Zayıf": 1,
  "Orta": 3,
  "İyi": 4,
  "Çok iyi": 5,
};

const INTERVIEW_FLOW = [
  {
    stepKey: "A",
    title: "Motivasyon & Karakter",
    questions: [
      { id: "A_q1", title: "İş istikrarı ve devam niyeti" },
      { id: "A_q2", title: "Hata sahiplenme" },
      { id: "A_q3", title: "Stres altında tutum" },
      { id: "A_q4", title: "İletişim" },
      { id: "A_q5", title: "Dürüstlük / şeffaflık" },
    ],
  },
  {
    stepKey: "B",
    title: "Teknik Yatkınlık",
    questions: [
      { id: "B_q0", title: "El becerisi & ince motor" },
      { id: "B_q1", title: "Düzen / parça yönetimi" },
      { id: "B_q2", title: "Araç kullanımı" },
      { id: "B_q3", title: "Mekanik mantık" },
      { id: "B_q4", title: "Risk farkındalığı" },
    ],
  },
  {
    stepKey: "C",
    title: "Öğrenme & Gelişim",
    questions: [
      { id: "C_q1", title: "Talimatı anlama" },
      { id: "C_q2", title: "Geri bildirimle düzeltme" },
      { id: "C_q3", title: "Not alma" },
      { id: "C_q4", title: "Problem yaklaşımı" },
      { id: "C_q5", title: "Merak ve öğrenme isteği" },
    ],
  },
  {
    stepKey: "D",
    title: "Disiplin & İş Ahlakı",
    questions: [
      { id: "D_q0", title: "Zaman yönetimi & dakiklik" },
      { id: "D_q1", title: "Gizlilik" },
      { id: "D_q2", title: "Kural ve güvenlik" },
      { id: "D_q3", title: "Kalite kontrol" },
      { id: "D_q4", title: "İş takibi" },
    ],
  },
];

const RUBRIC = [
  {
    key: "A",
    title: "Motivasyon & Karakter",
    items: [
      { key: "A1", title: "A1 — İstikrar/Devam niyeti" },
      { key: "A2", title: "A2 — Müşteri ve ekip iletişimi" },
      { key: "A3", title: "A3 — Sorumluluk alma ve hata sahiplenme" },
      { key: "A4", title: "A4 — Stres altında tutum" },
      { key: "A5", title: "A5 — Dürüstlük/şeffaflık" },
    ],
  },
  {
    key: "B",
    title: "Teknik Yatkınlık",
    items: [
      { key: "B1", title: "B1 — El becerisi & ince motor" },
      { key: "B2", title: "B2 — Dikkat/temizlik/düzen" },
      { key: "B3", title: "B3 — Mekanik mantık (sök-tak)" },
      { key: "B4", title: "B4 — Araç-gereç kullanım özeni" },
      { key: "B5", title: "B5 — Risk farkındalığı (ESD/batarya)" },
    ],
  },
  {
    key: "C",
    title: "Öğrenme & Gelişim",
    items: [
      { key: "C1", title: "C1 — Talimatı anlama (tek seferde)" },
      { key: "C2", title: "C2 — Geri bildirimle düzeltme hızı" },
      { key: "C3", title: "C3 — Not alma / adım adım çalışma" },
      { key: "C4", title: "C4 — Problem çözme yaklaşımı" },
      { key: "C5", title: "C5 — Merak ve öğrenme isteği" },
    ],
  },
  {
    key: "D",
    title: "Disiplin & İş Ahlakı",
    items: [
      { key: "D1", title: "D1 — Zaman yönetimi & dakiklik" },
      { key: "D2", title: "D2 — İş güvenliği & kurala uyum" },
      { key: "D3", title: "D3 — Kalite standardı (tekrar kontrol)" },
      { key: "D4", title: "D4 — Gizlilik ve müşteri cihazına saygı" },
      { key: "D5", title: "D5 — İş bitirme takibi" },
    ],
  },
];

function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (typeof text === "string") e.textContent = text;
  return e;
}

function computePreScoreFromChoices(choices) {
  const totals = { A: 0, B: 0, C: 0, D: 0 };
  const keys = Object.keys(choices || {});
  for (const k of keys) {
    const picked = choices?.[k]?.key;
    if (!picked) continue;
    const score = LABEL_TO_SCORE[picked] || 0;
    const section = String(k || "").split("_")[0];
    if (totals[section] === undefined) continue;
    totals[section] += score;
  }
  const total = totals.A + totals.B + totals.C + totals.D;
  const max = keys.length * 5;
  const percent = max ? Math.round((total / max) * 1000) / 10 : 0;
  return { totals, total, max, percent };
}

function computeFinalScore0to100(prePercent, rubricTotal, liveTotal) {
  const p = Math.max(0, Math.min(100, safeNumber(prePercent, 0)));
  const r = Math.max(0, Math.min(100, safeNumber(rubricTotal, 0)));
  const l = Math.max(0, Math.min(35, safeNumber(liveTotal, 0)));
  const livePercent = 35 ? Math.round((l / 35) * 1000) / 10 : 0;

  const WEIGHTS = { pre: 0.3, rubric: 0.5, live: 0.2 };
  const score = p * WEIGHTS.pre + r * WEIGHTS.rubric + livePercent * WEIGHTS.live;
  return Math.round(Math.max(0, Math.min(100, score)) * 10) / 10;
}

function buildRubricUI() {
  const container = document.getElementById("rubric");
  container.innerHTML = "";

  for (const section of RUBRIC) {
    const card = el("div", "border border-amber-600/20 rounded-xl p-4 bg-dark-800/50");
    const header = el("div", "flex items-center justify-between gap-3 mb-3");
    header.appendChild(el("div", "font-semibold text-slate-200", section.title));
    const subtotal = el("div", "text-sm text-slate-400", "Alt toplam: ");
    const span = el("span", "font-bold text-slate-100", "0");
    span.id = `sub_${section.key}`;
    subtotal.appendChild(span);
    subtotal.appendChild(document.createTextNode(" / 25"));
    header.appendChild(subtotal);
    card.appendChild(header);

    const grid = el("div", "grid md:grid-cols-2 gap-3");
    for (const item of section.items) {
      const row = el("div", "border border-dark-600 rounded-xl p-3 bg-dark-800");
      row.appendChild(el("div", "text-sm text-slate-200 font-medium", item.title));

      const input = el(
        "input",
        "mt-2 w-full px-3 py-2 rounded-lg border border-dark-600 bg-dark-900 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition"
      );
      input.type = "number";
      input.min = "0";
      input.max = "5";
      input.value = "0";
      input.name = item.key;
      input.addEventListener("input", () => recomputeTotals());

      const note = el(
        "input",
        "mt-2 w-full px-3 py-2 rounded-lg border border-dark-600 bg-dark-900 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition"
      );
      note.type = "text";
      note.placeholder = "Kanıt/Not (1 cümle)";
      note.name = `${item.key}_note`;

      row.appendChild(input);
      row.appendChild(note);
      grid.appendChild(row);
    }

    card.appendChild(grid);
    container.appendChild(card);
  }
}

function recomputeTotals() {
  const sub = { A: 0, B: 0, C: 0, D: 0 };
  for (const section of RUBRIC) {
    for (const item of section.items) {
      const v = safeNumber(document.querySelector(`[name="${item.key}"]`)?.value, 0);
      sub[section.key] += Math.max(0, Math.min(5, v));
    }
    const node = document.getElementById(`sub_${section.key}`);
    if (node) node.textContent = String(sub[section.key]);
  }
  const rubricTotal = sub.A + sub.B + sub.C + sub.D;
  const rubricTotalNode = document.getElementById("rubricTotal");
  if (rubricTotalNode) rubricTotalNode.textContent = String(rubricTotal);

  const t1 = safeNumber(document.querySelector('[name="live_t1"]')?.value, 0);
  const t2 = safeNumber(document.querySelector('[name="live_t2"]')?.value, 0);
  const t3 = safeNumber(document.querySelector('[name="live_t3"]')?.value, 0);
  const t4 = safeNumber(document.querySelector('[name="live_t4"]')?.value, 0);
  const liveTotal = Math.max(0, Math.min(10, t1)) + Math.max(0, Math.min(10, t2)) + Math.max(0, Math.min(10, t3)) + Math.max(0, Math.min(5, t4));
  const liveNode = document.getElementById("liveTotal");
  if (liveNode) liveNode.textContent = String(liveTotal);

  const infoRubric = document.getElementById("rubricScore");
  if (infoRubric) infoRubric.textContent = String(rubricTotal);
  const infoLive = document.getElementById("liveScore");
  if (infoLive) infoLive.textContent = String(liveTotal);

  const prePercent = window.TS_SELECTED?.preScorePercent ? safeNumber(window.TS_SELECTED.preScorePercent, 0) : 0;
  const final = computeFinalScore0to100(prePercent, rubricTotal, liveTotal);
  const infoFinal = document.getElementById("finalScore");
  if (infoFinal) infoFinal.textContent = String(final);

  return { rubricTotal, liveTotal, final };
}

async function firestoreList() {
  const fb = window.TS_FIREBASE;
  if (!fb || !fb.db) throw new Error("Firebase bağlantısı yok");
  const snap = await fb.db
    .ref("evaluations")
    .orderByChild("createdAt")
    .limitToLast(2000)
    .once("value");

  const out = [];
  snap.forEach((child) => {
    out.push({ firestoreId: child.key, ...(child.val() || {}) });
  });

  out.sort((a, b) => {
    const aa = a.createdAt ? Date.parse(a.createdAt) : 0;
    const bb = b.createdAt ? Date.parse(b.createdAt) : 0;
    return bb - aa;
  });
  return out;
}

async function firestoreGetDoc(id) {
  const fb = window.TS_FIREBASE;
  if (!fb || !fb.db) throw new Error("Firebase bağlantısı yok");
  const snap = await fb.db.ref(`evaluations/${id}`).once("value");
  if (!snap.exists()) return null;
  return { firestoreId: id, ...(snap.val() || {}) };
}

async function firestoreUpdateDoc(id, patch) {
  const fb = window.TS_FIREBASE;
  if (!fb || !fb.db) throw new Error("Firebase bağlantısı yok");
  await fb.db.ref(`evaluations/${id}`).update(patch);
}

function renderList(containerId, items) {
  const list = document.getElementById(containerId);
  if (!list) return;
  list.innerHTML = "";

  for (const r of items) {
    if (containerId === "listDone") {
      const row = el("div", "flex items-stretch gap-2 px-3 py-3 hover:bg-dark-800/40 transition");

      const btn = el("button", "flex-1 text-left px-2 py-1.5 rounded-lg hover:bg-dark-800/60 transition");
      btn.type = "button";
      btn.addEventListener("click", () => selectRow(r.firestoreId));

      const top = el("div", "flex items-center justify-between gap-3");
      top.appendChild(el("div", "text-sm font-semibold text-slate-200", r.fullName || "-"));
      top.appendChild(el("div", "text-xs text-slate-500", (r.phase || "-").toString()));
      btn.appendChild(top);
      btn.appendChild(el("div", "text-xs text-slate-500 mt-1", `${r.candidateId || "-"} · ${r.branch || "-"} · ${r.createdAt ? String(r.createdAt).slice(0, 10) : "-"}`));

      const dl = el(
        "button",
        "shrink-0 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 text-white text-xs font-semibold hover:from-violet-700 hover:to-violet-600 transition"
      );
      dl.type = "button";
      dl.textContent = "Rapor indir";
      dl.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        downloadCertificateFor(r.firestoreId);
      });

      row.appendChild(btn);
      row.appendChild(dl);
      list.appendChild(row);
    } else {
      const btn = el("button", "w-full text-left px-5 py-3 hover:bg-dark-800/60 transition");
      btn.type = "button";
      btn.addEventListener("click", () => selectRow(r.firestoreId));

      const top = el("div", "flex items-center justify-between gap-3");
      top.appendChild(el("div", "text-sm font-semibold text-slate-200", r.fullName || "-"));
      top.appendChild(el("div", "text-xs text-slate-500", (r.phase || "-").toString()));
      btn.appendChild(top);

      btn.appendChild(el("div", "text-xs text-slate-500 mt-1", `${r.candidateId || "-"} · ${r.branch || "-"} · ${r.createdAt ? String(r.createdAt).slice(0, 10) : "-"}`));
      list.appendChild(btn);
    }
  }
}

function renderListsFromAll() {
  const filtered = applyFilters(window.TS_ALL || []);
  const pre = filtered.filter((r) => (r.phase || "pre_application") !== "interview");
  const done = filtered.filter((r) => (r.phase || "") === "interview");

  const countAll = document.getElementById("countAll");
  if (countAll) countAll.textContent = String(filtered.length);
  const countPre = document.getElementById("countPre");
  if (countPre) countPre.textContent = String(pre.length);
  const countDone = document.getElementById("countDone");
  if (countDone) countDone.textContent = String(done.length);

  renderList("listPre", pre);
  renderList("listDone", done);
}

function renderAnswers(doc) {
  const wrap = document.getElementById("answers");
  wrap.innerHTML = "";

  let choices = doc?.interview?.candidateChoices || {};
  if ((!choices || typeof choices !== "object") && doc?.interview_json) {
    try {
      const x = JSON.parse(doc.interview_json);
      choices = x?.candidateChoices || {};
    } catch (_) {
      choices = {};
    }
  }

  const computed = computePreScoreFromChoices(choices);
  const preRaw = doc?.preScoreRaw ?? computed.total;
  const preMax = doc?.preMaxScore ?? computed.max;
  const prePercent = doc?.preScorePercent ?? computed.percent;
  const preRaw100 = preMax ? Math.round((safeNumber(preRaw, 0) / safeNumber(preMax, 1)) * 1000) / 10 : 0;
  const preText = preMax ? `${preRaw100} / 100 (%${prePercent})` : "-";
  const preNode = document.getElementById("preScore");
  if (preNode) preNode.textContent = preText;

  window.TS_SELECTED = {
    firestoreId: doc.firestoreId,
    candidateId: doc.candidateId,
    preScoreRaw: preRaw,
    preScoreMax: preMax,
    preScorePercent: prePercent,
  };

  for (const step of INTERVIEW_FLOW) {
    const card = el("div", "border border-violet-600/20 rounded-xl p-4 bg-dark-800/50");
    card.appendChild(el("div", "text-sm font-semibold text-slate-200", step.title));

    for (const q of step.questions) {
      const picked = choices?.[q.id]?.key || "";
      const score = picked ? (LABEL_TO_SCORE[picked] || 0) : 0;
      const row = el("div", "mt-2 text-sm text-slate-300");
      const title = el("div", "text-xs text-slate-500", q.title);
      const ans = el("div", "", picked ? `${picked} (${score})` : "-" );
      row.appendChild(title);
      row.appendChild(ans);
      card.appendChild(row);
    }

    wrap.appendChild(card);
  }

  const selTitle = document.getElementById("selTitle");
  const selMeta = document.getElementById("selMeta");
  if (selTitle) selTitle.textContent = doc.fullName || "Seçili Aday";
  if (selMeta) selMeta.textContent = `${doc.candidateId || "-"} · ${doc.branch || "-"} · ${doc.createdAt ? String(doc.createdAt).slice(0, 19).replace("T", " ") : "-"}`;

  applyExistingInterviewData(doc);
}

function applyExistingInterviewData(doc) {
  const scores = doc?.scores || {};
  const notes = doc?.scoreNotes || {};

  for (const section of RUBRIC) {
    for (const item of section.items) {
      const scoreNode = document.querySelector(`[name="${item.key}"]`);
      if (scoreNode) scoreNode.value = String(scores[item.key] ?? 0);
      const noteNode = document.querySelector(`[name="${item.key}_note"]`);
      if (noteNode) noteNode.value = String(notes[`${item.key}_note`] ?? notes[item.key] ?? "");
    }
  }

  const live = doc?.live || {};
  const t1 = document.querySelector('[name="live_t1"]');
  const t2 = document.querySelector('[name="live_t2"]');
  const t3 = document.querySelector('[name="live_t3"]');
  const t4 = document.querySelector('[name="live_t4"]');
  if (t1) t1.value = String(live.t1 ?? 0);
  if (t2) t2.value = String(live.t2 ?? 0);
  if (t3) t3.value = String(live.t3 ?? 0);
  if (t4) t4.value = String(live.t4 ?? 0);

  const red = document.querySelector('[name="redFlag"]');
  if (red) red.value = String(doc.redFlag ?? "Hayır");
  const note = document.querySelector('[name="generalNote"]');
  if (note) note.value = String(doc.generalNote ?? "");

  recomputeTotals();
}

async function selectRow(id) {
  try {
    showStatus("warn", "Kayıt yükleniyor...");
    const doc = await firestoreGetDoc(id);
    if (!doc) {
      showStatus("err", "Kayıt bulunamadı.");
      return;
    }
    showStatus("ok", "Yüklendi.");
    renderAnswers(doc);
    showSaveStatus("ok", "");
  } catch (e) {
    showStatus("err", `Hata: ${e.message}`);
  }
}

function applyFilters(all) {
  const q = (document.getElementById("q").value || "").trim().toLowerCase();
  const phase = (document.getElementById("phase").value || "").trim();
  return all.filter((r) => {
    const t = `${r.fullName || ""} ${r.candidateId || ""} ${r.branch || ""}`.toLowerCase();
    if (q && !t.includes(q)) return false;
    if (phase && (r.phase || "") !== phase) return false;
    return true;
  });
}

async function refresh() {
  try {
    showStatus("warn", "Veriler alınıyor...");
    const all = await firestoreList();
    window.TS_ALL = all;
    renderListsFromAll();
    showStatus("ok", `Yüklendi: ${(applyFilters(all) || []).length} kayıt`);
  } catch (e) {
    showStatus("err", `Hata: ${e.message}`);
  }
}

async function saveInterview() {
  const sel = window.TS_SELECTED;
  if (!sel?.firestoreId) {
    showSaveStatus("warn", "Önce bir kayıt seç.");
    return;
  }

  const scores = {};
  const scoreNotes = {};
  const subs = { A: 0, B: 0, C: 0, D: 0 };

  for (const section of RUBRIC) {
    for (const item of section.items) {
      const v = safeNumber(document.querySelector(`[name="${item.key}"]`)?.value, 0);
      const score = Math.max(0, Math.min(5, v));
      scores[item.key] = score;
      subs[section.key] += score;

      const noteVal = (document.querySelector(`[name="${item.key}_note"]`)?.value || "").toString().trim();
      scoreNotes[item.key] = noteVal;
    }
  }

  const rubricTotal = subs.A + subs.B + subs.C + subs.D;

  const t1 = safeNumber(document.querySelector('[name="live_t1"]')?.value, 0);
  const t2 = safeNumber(document.querySelector('[name="live_t2"]')?.value, 0);
  const t3 = safeNumber(document.querySelector('[name="live_t3"]')?.value, 0);
  const t4 = safeNumber(document.querySelector('[name="live_t4"]')?.value, 0);
  const live = {
    t1: Math.max(0, Math.min(10, t1)),
    t2: Math.max(0, Math.min(10, t2)),
    t3: Math.max(0, Math.min(10, t3)),
    t4: Math.max(0, Math.min(5, t4)),
  };
  live.total = live.t1 + live.t2 + live.t3 + live.t4;

  const redFlag = (document.querySelector('[name="redFlag"]')?.value || "Hayır").toString();
  const generalNote = (document.querySelector('[name="generalNote"]')?.value || "").toString().trim();

  const preRaw = safeNumber(sel.preScoreRaw, 0);
  const preMax = safeNumber(sel.preScoreMax, 0);
  const prePercent = safeNumber(sel.preScorePercent, 0);
  const finalScore = computeFinalScore0to100(prePercent, rubricTotal, live.total);

  const patch = {
    phase: "interview",
    preScoreRaw: preRaw,
    preMaxScore: preMax,
    preScorePercent: prePercent,
    scores,
    scoreNotes,
    categoryTotals: subs,
    totalScore: rubricTotal,
    live,
    redFlag,
    generalNote,
    finalScore,
    updatedAt: new Date().toISOString(),
  };

  try {
    showSaveStatus("warn", "Kaydediliyor...");
    await firestoreUpdateDoc(sel.firestoreId, patch);
    showSaveStatus("ok", "Kaydedildi.");
    await refresh();
  } catch (e) {
    showSaveStatus("err", `Hata: ${e.message}`);
  }
}

(function main() {
  buildRubricUI();
  recomputeTotals();

  setAuthedUI(false);

  document.getElementById("btnLogin")?.addEventListener("click", signInFromUI);
  document.getElementById("btnLogout")?.addEventListener("click", signOutFromUI);
  document.getElementById("loginPassword")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") signInFromUI();
  });

  document.getElementById("btnRefresh").addEventListener("click", refresh);
  document.getElementById("q").addEventListener("input", () => {
    renderListsFromAll();
  });
  document.getElementById("phase").addEventListener("change", () => {
    renderListsFromAll();
  });

  document.getElementById("btnSave").addEventListener("click", saveInterview);

  document.getElementById("interviewForm").addEventListener("input", () => {
    recomputeTotals();
  });

  const fb = window.TS_FIREBASE;
  if (!fb?.auth) {
    setAuthedUI(true);
    showStatus("warn", "Uyarı: Auth yok, panel açık.");
    refresh();
    return;
  }

  fb.auth.onAuthStateChanged((user) => {
    if (user) {
      const email = (user.email || "").toString().trim().toLowerCase();
      const allowed = ADMIN_ALLOWED_EMAILS.map((x) => x.toLowerCase()).includes(email);
      if (!allowed) {
        showLoginStatus("err", "Bu hesap admin panel için yetkili değil.");
        signOutFromUI();
        return;
      }

      showLoginStatus("ok", "");
      setAuthedUI(true);
      refresh();
    } else {
      setAuthedUI(false);
      showLoginStatus("warn", "Devam etmek için giriş yap." );
    }
  });
})();
