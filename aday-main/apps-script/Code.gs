function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "";

    var auth = checkAuth_(e && e.parameter ? e.parameter.token : "");
    if (!auth.ok) {
      return json_({ ok: false, error: auth.error });
    }

    if (action === "ping") {
      return json_({ ok: true, status: "ok" });
    }

    if (action === "list") {
      var sheet = getSheet_();
      var values = sheet.getDataRange().getValues();
      if (!values || values.length < 2) {
        return json_({ ok: true, data: [] });
      }

      var header = values[0];
      var data = [];
      for (var i = 1; i < values.length; i++) {
        var row = values[i];
        var obj = {};
        for (var c = 0; c < header.length; c++) {
          obj[String(header[c])] = row[c];
        }
        data.push(obj);
      }

      data.sort(function(a, b) {
        return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
      });

      return json_({ ok: true, data: data });
    }

    return json_({ ok: false, error: "Geçersiz action" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    var body = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    var req = JSON.parse(body);

    var auth = checkAuth_(req ? req.token : "");
    if (!auth.ok) {
      return json_({ ok: false, error: auth.error });
    }

    if (!req || req.action !== "save") {
      return json_({ ok: false, error: "Geçersiz istek" });
    }

    var payload = req.payload || {};
    var sheet = getSheet_();
    ensureHeader_(sheet);

    var row = flatten_(payload);
    var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    var values = [];
    for (var i = 0; i < header.length; i++) {
      var k = String(header[i]);
      values.push(row.hasOwnProperty(k) ? row[k] : "");
    }

    sheet.appendRow(values);
    return json_({ ok: true, rowId: sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "Evaluations";
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

function ensureHeader_(sheet) {
  var header = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).getValues()[0];
  var existing = {};
  for (var i = 0; i < header.length; i++) {
    existing[String(header[i])] = true;
  }

  var required = [
    "createdAt",
    "candidateId",
    "fullName",
    "age",
    "education",
    "technicalBackground",
    "evaluator",
    "branch",
    "term",
    "redFlag",
    "generalNote",
    "totalScore",
    "decision",
    "interview_json",
    "live_total",
    "live_t1",
    "live_t2",
    "live_t3",
    "live_t4",
    "category_A",
    "category_B",
    "category_C",
    "category_D"
  ];

  var scoreKeys = [
    "A1","A2","A3","A4","A5",
    "B1","B2","B3","B4","B5",
    "C1","C2","C3","C4","C5",
    "D1","D2","D3","D4","D5"
  ];

  for (var s = 0; s < scoreKeys.length; s++) {
    required.push(scoreKeys[s]);
    required.push(scoreKeys[s] + "_note");
  }

  var newHeader = header.filter(function(h) { return String(h).trim() !== ""; });
  for (var r = 0; r < required.length; r++) {
    if (!existing[required[r]]) newHeader.push(required[r]);
  }

  if (newHeader.length === 0) newHeader = required;

  sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
}

function flatten_(payload) {
  var row = {};

  row.createdAt = payload.createdAt || new Date().toISOString();
  row.candidateId = payload.candidateId || "";
  row.fullName = payload.fullName || "";
  row.age = payload.age || "";
  row.education = payload.education || "";
  row.technicalBackground = payload.technicalBackground || "";
  row.evaluator = payload.evaluator || "";
  row.branch = payload.branch || "";
  row.term = payload.term || "";
  row.redFlag = payload.redFlag || "Hayır";
  row.generalNote = payload.generalNote || "";
  row.totalScore = payload.totalScore || 0;
  row.decision = payload.decision || "";

  try {
    row.interview_json = payload.interview ? JSON.stringify(payload.interview) : "";
  } catch (e) {
    row.interview_json = "";
  }

  var live = payload.live || {};
  row.live_total = live.total || 0;
  row.live_t1 = live.t1 || 0;
  row.live_t2 = live.t2 || 0;
  row.live_t3 = live.t3 || 0;
  row.live_t4 = live.t4 || 0;

  var ct = payload.categoryTotals || {};
  row.category_A = ct.A || 0;
  row.category_B = ct.B || 0;
  row.category_C = ct.C || 0;
  row.category_D = ct.D || 0;

  var scores = payload.scores || {};
  var scoreNotes = payload.scoreNotes || {};

  for (var k in scores) {
    if (scores.hasOwnProperty(k)) row[k] = scores[k];
  }
  for (var n in scoreNotes) {
    if (scoreNotes.hasOwnProperty(n)) row[n + "_note"] = scoreNotes[n];
  }

  return row;
}

function json_(obj) {
  var out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}

function checkAuth_(token) {
  var expected = PropertiesService.getScriptProperties().getProperty('API_TOKEN');
  if (!expected) return { ok: true };
  if (String(token || '') === String(expected)) return { ok: true };
  return { ok: false, error: 'Yetkisiz (token gerekli)' };
}
