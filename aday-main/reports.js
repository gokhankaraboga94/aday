function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function computeDecision(total, redFlag) {
  if (redFlag) return "Riskli";
  if (total >= 80) return "Direkt işe al";
  if (total >= 60) return "Eğitime al";
  if (total >= 40) return "Riskli";
  return "Ele";
}

function normalizeRow(r) {
  if (!r) return r;
  if (r.totalScore !== undefined && r.totalScore !== null && r.decision) return r;
  let interview = r.interview;
  if (!interview && r.interview_json) {
    try {
      interview = JSON.parse(r.interview_json);
    } catch (_) {
      interview = null;
    }
  }
  const choices = interview?.candidateChoices;
  if (!choices || typeof choices !== "object") return r;

  const labelToScore = {
    "Zayıf": 1,
    "Orta": 3,
    "İyi": 4,
    "Çok iyi": 5,
  };

  const totals = { A: 0, B: 0, C: 0, D: 0 };
  for (const k of Object.keys(choices)) {
    const picked = choices[k]?.key;
    if (!picked) continue;
    const score = labelToScore[picked] || 0;
    const section = String(k || "").split("_")[0];
    if (totals[section] === undefined) continue;
    totals[section] += score;
  }

  const totalScore = totals.A + totals.B + totals.C + totals.D;
  const redFlagBool = !!interview?.autoRedFlag;
  const decision = computeDecision(totalScore, redFlagBool);

  return {
    ...r,
    categoryTotals: r.categoryTotals || totals,
    totalScore: r.totalScore ?? totalScore,
    decision: r.decision || decision,
    redFlag: r.redFlag || (redFlagBool ? "Evet" : "Hayır"),
  };
}

function showStatus(type, message) {
  const node = document.getElementById("status");
  const cls = type === "ok" ? "text-emerald-700" : type === "warn" ? "text-amber-700" : "text-rose-700";
  node.className = `mt-2 ${cls}`;
  node.textContent = message;
}

function loadFromLocal() {
  try {
    return JSON.parse(localStorage.getItem('teknikServisDegerlendirme') || '[]');
  } catch (e) {
    console.error('Local storage load error:', e);
    return [];
  }
}

function clearLocalData() {
  localStorage.removeItem('teknikServisDegerlendirme');
}

function exportToLocalFile() {
  const data = loadFromLocal();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `degerlendirme_verileri_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function firestoreList() {
  const fb = window.TS_FIREBASE;
  if (!fb || !fb.db) {
    throw new Error("Firebase bağlantısı yok");
  }

  const snap = await fb.db
    .ref("evaluations")
    .orderByChild("createdAt")
    .limitToLast(2000)
    .once("value");

  const out = [];
  snap.forEach((child) => {
    const d = child.val() || {};
    out.push({ ...d, firestoreId: child.key });
  });

  out.sort((a, b) => {
    const aa = a.createdAt ? Date.parse(a.createdAt) : 0;
    const bb = b.createdAt ? Date.parse(b.createdAt) : 0;
    return bb - aa;
  });

  return out;
}

function toCsv(rows) {
  const header = [
    "createdAt",
    "candidateId",
    "fullName",
    "evaluator",
    "branch",
    "term",
    "totalScore",
    "decision",
    "redFlag",
    "generalNote",
  ];

  const esc = (s) => {
    const v = (s ?? "").toString();
    if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
    return v;
  };

  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(header.map((k) => esc(r[k])).join(","));
  }
  return lines.join("\n");
}

function download(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function renderRows(data) {
  const tbody = document.getElementById("rows");
  tbody.innerHTML = "";

  for (const rr of data) {
    const r = normalizeRow(rr) || rr;
    const tr = document.createElement("tr");
    const td = (v) => {
      const cell = document.createElement("td");
      cell.className = "px-3 py-2 whitespace-nowrap";
      cell.textContent = v ?? "";
      return cell;
    };

    const created = r.createdAt ? new Date(r.createdAt).toLocaleString("tr-TR") : "";

    tr.appendChild(td(created));
    tr.appendChild(td(r.candidateId));
    tr.appendChild(td(r.fullName));
    tr.appendChild(td(r.evaluator));
    tr.appendChild(td(r.branch));
    tr.appendChild(td(r.term));
    tr.appendChild(td(r.totalScore));
    tr.appendChild(td(r.decision));
    tr.appendChild(td(r.redFlag));

    const noteTd = document.createElement("td");
    noteTd.className = "px-3 py-2 min-w-[16rem]";
    noteTd.textContent = (r.generalNote || "").toString();
    tr.appendChild(noteTd);

    const detailTd = document.createElement("td");
    detailTd.className = "px-3 py-2 whitespace-nowrap";
    const btn = document.createElement("button");
    btn.className = "px-3 py-1.5 rounded-lg border hover:bg-slate-50";
    btn.textContent = "Gör";
    btn.addEventListener("click", () => openDetailModal(r));
    detailTd.appendChild(btn);
    tr.appendChild(detailTd);

    tbody.appendChild(tr);
  }
}

function openDetailModal(row) {
  const modal = document.getElementById("detailModal");
  const content = document.getElementById("detailContent");
  if (!modal || !content) return;

  const normalized = normalizeRow(row) || row;

  let parsed = null;
  try {
    parsed = row.interview_json ? JSON.parse(row.interview_json) : null;
  } catch (_) {
    parsed = null;
  }

  const view = {
    createdAt: normalized.createdAt,
    candidateId: normalized.candidateId,
    fullName: normalized.fullName,
    evaluator: normalized.evaluator,
    branch: normalized.branch,
    term: normalized.term,
    totalScore: normalized.totalScore,
    decision: normalized.decision,
    redFlag: normalized.redFlag,
    categoryTotals: normalized.categoryTotals,
    interview: parsed || normalized.interview || normalized.interview_json || "",
  };

  content.textContent = JSON.stringify(view, null, 2);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function applyFilters(all) {
  const q = document.getElementById("q").value.trim().toLowerCase();
  const decision = document.getElementById("decision").value.trim();
  const branch = (document.getElementById("branch").value || "").trim().toLowerCase();
  const term = (document.getElementById("term").value || "").trim().toLowerCase();
  const minScore = document.getElementById("minScore").value;
  const maxScore = document.getElementById("maxScore").value;
  const min = minScore === "" ? 0 : safeNumber(minScore, 0);
  const max = maxScore === "" ? 100 : safeNumber(maxScore, 100);

  const filtered = all.filter((r) => {
    const t = `${r.candidateId || ""} ${r.fullName || ""} ${r.evaluator || ""} ${r.branch || ""} ${r.term || ""} ${r.phase || ""}`.toLowerCase();
    if (q && !t.includes(q)) return false;
    if (decision && (r.decision || "") !== decision) return false;
    if (branch && String(r.branch || "").toLowerCase() !== branch) return false;
    if (term && String(r.term || "").toLowerCase() !== term) return false;
    const s = safeNumber(r.totalScore, 0);
    if (s < min || s > max) return false;
    return true;
  });

  const count = filtered.length;
  const avg = count ? Math.round((filtered.reduce((a, r) => a + safeNumber(r.totalScore, 0), 0) / count) * 10) / 10 : 0;
  const hire = filtered.filter((r) => r.decision === "Direkt işe al").length;
  const train = filtered.filter((r) => r.decision === "Eğitime al").length;

  document.getElementById("kpiCount").textContent = String(count);
  document.getElementById("kpiAvg").textContent = String(avg);
  document.getElementById("kpiHire").textContent = String(hire);
  document.getElementById("kpiTrain").textContent = String(train);

  renderRows(filtered);
  return filtered;
}

(function main() {
  let all = [];

  async function load() {
    try {
      showStatus("warn", "Veriler alınıyor...");
      all = await firestoreList();

      all = all.map((x) => normalizeRow(x) || x);
      showStatus("ok", `Yüklendi: ${all.length} kayıt`);
      applyFilters(all);
    } catch (e) {
      showStatus("err", `Hata: ${e.message}`);
    }
  }

  document.getElementById("btnLoad").addEventListener("click", load);

  document.getElementById("btnCloseModal").addEventListener("click", closeDetailModal);
  document.getElementById("detailModal").addEventListener("click", (e) => {
    if (e.target && e.target.id === "detailModal") closeDetailModal();
  });

  document.getElementById("btnPrint").addEventListener("click", () => {
    window.print();
  });

  const exportCsv = () => {
    const filtered = applyFilters(all);
    const csv = toCsv(filtered);
    const dt = new Date();
    const name = `rapor_${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}.csv`;
    download(name, csv, "text/csv;charset=utf-8");
  };

  document.getElementById("btnExport").addEventListener("click", exportCsv);
  const btnExportExcel = document.getElementById("btnExportExcel");
  if (btnExportExcel) btnExportExcel.addEventListener("click", exportCsv);

  // Local data buttons
  document.getElementById("btnLoadLocal").addEventListener("click", () => {
    try {
      const localData = loadFromLocal();
      if (localData.length === 0) {
        showStatus("warn", "Yerel veri bulunamadı.");
        return;
      }
      all = localData.map((x) => normalizeRow(x) || x);
      showStatus("ok", `${localData.length} kayıt yerelden yüklendi.`);
      applyFilters(all);
    } catch (e) {
      showStatus("err", "Yerel veri yüklenemedi: " + e.message);
    }
  });

  document.getElementById("btnExportLocal").addEventListener("click", () => {
    try {
      const data = loadFromLocal();
      if (data.length === 0) {
        showStatus("warn", "İndirilecek veri bulunamadı.");
        return;
      }
      exportToLocalFile();
      showStatus("ok", `${data.length} kayıt JSON olarak indirildi.`);
    } catch (e) {
      showStatus("err", "İndirme başarısız: " + e.message);
    }
  });

  document.getElementById("btnClearLocal").addEventListener("click", () => {
    if (confirm("Tüm yerel verileri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      clearLocalData();
      if (all.length > 0 && JSON.stringify(all) === JSON.stringify(loadFromLocal())) {
        all = [];
        applyFilters(all);
      }
      showStatus("ok", "Yerel veriler temizlendi.");
    }
  });

  for (const id of ["q", "decision", "branch", "term", "minScore", "maxScore"]) {
    document.getElementById(id).addEventListener("input", () => applyFilters(all));
    document.getElementById(id).addEventListener("change", () => applyFilters(all));
  }
})();
