(function () {
  "use strict";

  // ---------- search (main page) ----------
  var search = document.getElementById("search");
  if (search) {
    var rows = Array.prototype.slice.call(document.querySelectorAll("#song-list li"));
    var noResults = document.getElementById("no-results");
    var noResultsTerm = document.getElementById("no-results-term");

    // Ignore case and punctuation, so "dont" finds "Don't".
    function normalize(s) {
      return s.toLowerCase().replace(/[’'‘`]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
    }
    rows.forEach(function (li) {
      li._raw = li.getAttribute("data-search") || "";
      li._norm = normalize(li._raw);
      li._title = normalize(li.querySelector(".song-title").textContent);
    });

    function snippet(raw, word) {
      var i = raw.indexOf(word);
      if (i < 0) return "";
      var start = Math.max(0, raw.lastIndexOf(" ", Math.max(0, i - 12)));
      var end = raw.indexOf(" ", Math.min(raw.length, i + word.length + 30));
      if (end < 0) end = raw.length;
      return (start > 0 ? "…" : "") + raw.slice(start, end).trim() + (end < raw.length ? "…" : "");
    }

    function filter() {
      var q = normalize(search.value);
      var words = q ? q.split(" ") : [];
      var shown = 0;
      rows.forEach(function (li) {
        var hit = words.every(function (w) { return li._norm.indexOf(w) >= 0; });
        li.hidden = !hit;
        if (hit) shown++;
        // If the match is in the lyrics (not the title), show where.
        var m = li.querySelector(".match");
        var inTitle = words.every(function (w) { return li._title.indexOf(w) >= 0; });
        if (hit && words.length && !inTitle) {
          m.textContent = snippet(li._raw, search.value.trim().toLowerCase().split(/\s+/)[0]) || "";
          m.hidden = !m.textContent;
        } else {
          m.hidden = true;
        }
      });
      noResults.hidden = shown > 0;
      noResultsTerm.textContent = search.value.trim();
    }
    search.addEventListener("input", filter);
    // Pressing Go/Enter opens the song if only one matches.
    search.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var visible = rows.filter(function (li) { return !li.hidden; });
      if (visible.length === 1) visible[0].querySelector("a").click();
    });
    filter();
  }

  // ---------- text size on song pages (remembered on this device) ----------
  var KEY_SIZE = "songbook.size";
  var MIN = -2, MAX = 4;
  var size = 0;
  try { size = parseInt(localStorage.getItem(KEY_SIZE), 10) || 0; } catch (e) {}

  function applySize() {
    document.documentElement.style.setProperty("--lyric-scale", String(1 + size * 0.12));
  }
  applySize();

  document.querySelectorAll("[data-size]").forEach(function (b) {
    b.addEventListener("click", function () {
      size = Math.max(MIN, Math.min(MAX, size + parseInt(b.getAttribute("data-size"), 10)));
      try { localStorage.setItem(KEY_SIZE, String(size)); } catch (e) {}
      applySize();
    });
  });

  // ---------- keep the screen on while a song is open ----------
  // Works on iPhone (iOS 16.4+) and most modern browsers; ignored elsewhere.
  if (!document.querySelector(".lyrics") || !("wakeLock" in navigator)) return;
  var lock = null;
  function requestLock() {
    if (document.visibilityState !== "visible") return;
    navigator.wakeLock.request("screen").then(function (l) { lock = l; }).catch(function () {});
  }
  requestLock();
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && (!lock || lock.released)) requestLock();
  });
})();
