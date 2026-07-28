(function () {
  "use strict";

  var portal = window.CAST_PORTAL;
  var root = document.body.getAttribute("data-root") || "..";
  var page = document.body.getAttribute("data-cast-page") || "overview";
  var app = document.getElementById("cast-app");

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function list(items, className) {
    return '<ul class="' + (className || "") + '">' +
      items.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") +
      "</ul>";
  }

  function actionBar(backHref) {
    return [
      '<nav class="cast-nav" aria-label="Cast Portal controls">',
      backHref ? '<a class="cast-button cast-button--quiet" href="' + backHref + '">← Cast overview</a>' : "",
      '<div class="cast-actions">',
      '<button class="cast-button cast-button--quiet" type="button" data-copy-link>Copy link</button>',
      '<button class="cast-button cast-button--primary" type="button" data-print>Print / Save as PDF</button>',
      "</div>",
      "</nav>",
      '<p class="copy-status" role="status" aria-live="polite"></p>'
    ].join("");
  }

  function guideCard(title, number, body, className) {
    return [
      '<section class="guide-card ' + (className || "") + '">',
      '<div class="guide-card__heading"><span>' + escapeHtml(number) + '</span><h2>' + escapeHtml(title) + "</h2></div>",
      body,
      "</section>"
    ].join("");
  }

  function dialogue(lines) {
    return '<div class="script-lines">' + lines.map(function (entry) {
      return '<blockquote><strong>' + escapeHtml(entry.speaker) + ':</strong> “' +
        escapeHtml(entry.line) + '”</blockquote>';
    }).join("") + "</div>";
  }

  function runtimeCueAlignment(cues) {
    if (!Array.isArray(cues) || !cues.length) return "";
    return [
      '<section class="runtime-alignment" aria-labelledby="runtime-cue-heading">',
      '<p class="quick-card__eyebrow">Shared day-of source</p>',
      '<h2 id="runtime-cue-heading">Live relay cue alignment</h2>',
      '<p class="runtime-alignment__intro">These concise fields also power the private cast screen inside the live adventure.</p>',
      '<div class="runtime-alignment__grid">',
      cues.map(function (cue) {
        return [
          '<article>',
          '<span>' + escapeHtml(cue.characterName) + "</span>",
          "<h3>" + escapeHtml(cue.performerName) + "</h3>",
          '<p><strong>Core challenge:</strong> ' + escapeHtml(cue.challengeSteps[0]) + "</p>",
          '<p><strong>Reward owner:</strong> ' + escapeHtml(cue.rewardPackages.map(function (packageName, index) {
            return packageName + " — " + (cue.rewardOwners[index] || cue.rewardOwners[0]);
          }).join("; ")) + "</p>",
          '<p><strong>Transition:</strong> ' + escapeHtml(cue.transitionDestination) + "</p>",
          "</article>"
        ].join("");
      }).join(""),
      "</div></section>"
    ].join("");
  }

  function renderGuide(guide) {
    document.title = guide.eyebrow + " Cast Guide · Creekside Region";
    app.innerHTML = [
      '<main class="cast-shell cast-shell--guide">',
      actionBar("../"),
      '<header class="guide-hero">',
      '<div><p class="confidential-label">Adult Cast Guide — Do Not Show Luca</p>',
      '<p class="cast-kicker">' + escapeHtml(guide.eyebrow) + "</p>",
      "<h1>" + escapeHtml(guide.title) + "</h1>",
      '<p class="guide-hero__lead">' + escapeHtml(guide.mainJob) + "</p></div>",
      '<img src="' + root + '/assets/pokemon/pokeball.png" alt="" width="112" height="112">',
      "</header>",
      '<section class="quick-card" aria-labelledby="quick-card-title">',
      '<p class="quick-card__eyebrow">One-minute Quick Card</p>',
      '<h2 id="quick-card-title">Know these five things</h2>',
      '<dl class="quick-grid">',
      '<div><dt>Character & role</dt><dd>' + guide.participants.map(function (p) {
        return escapeHtml(p.name + " — " + p.role);
      }).join("<br>") + "</dd></div>",
      '<div><dt>Estimated duration</dt><dd>' + escapeHtml(guide.duration) + "</dd></div>",
      '<div><dt>Arrival window</dt><dd>' + escapeHtml(guide.arrival) + "</dd></div>",
      '<div><dt>Main job</dt><dd>' + escapeHtml(guide.mainJob) + "</dd></div>",
      '<div><dt>Do not reveal</dt><dd>' + escapeHtml(guide.doNotReveal.join("; ")) + "</dd></div>",
      "</dl></section>",
      runtimeCueAlignment(guide.runtimeCues),
      '<div class="guide-grid">',
      guideCard("Your Role", "01", "<p>" + escapeHtml(guide.mainJob) + "</p>"),
      guideCard("What Luca Knows", "02", "<p>" + escapeHtml(guide.lucaKnows) + "</p>"),
      guideCard("Entrance Cue", "03", dialogue(guide.entranceCue)),
      guideCard("Short Spoken Script", "04", dialogue(guide.script), "guide-card--wide"),
      guideCard("Challenge Instructions", "05", list(guide.challenge)),
      guideCard("Forgiving Success Condition", "06", '<p class="success-rule">' + escapeHtml(guide.success) + "</p>"),
      guideCard("Reward Handoff", "07", list(guide.rewardPackages, "package-list") + "<p>" + escapeHtml(guide.rewardHandoff) + "</p>"),
      guideCard("Transition to the Next Chapter", "08", "<p>" + escapeHtml(guide.transition) + "</p>"),
      guideCard("Costume & Prop Checklist", "09", list(guide.checklist, "check-list")),
      guideCard("Fallback Plan", "10", "<p>" + escapeHtml(guide.fallback) + "</p>"),
      guideCard("One-minute Emergency Version", "11", '<p class="emergency-copy">' + escapeHtml(guide.emergency) + "</p>"),
      guideCard("What Not to Reveal", "12", list(guide.doNotReveal), "guide-card--warning"),
      guideCard("Patrick to Confirm", "13", list(guide.placeholders), "guide-card--placeholder"),
      "</div>",
      '<section class="ack-card">',
      '<label><input type="checkbox" data-acknowledgment> <span>' + escapeHtml(portal.acknowledgment) + "</span></label>",
      '<p>Your checkmark is saved only on this device.</p>',
      "</section>",
      '<footer class="cast-footer"><p>Creekside Region Cast Portal · Keep this guide away from Luca.</p></footer>',
      "</main>"
    ].join("");

    var acknowledgment = document.querySelector("[data-acknowledgment]");
    var storageKey = "creekside-cast-ack-" + page;
    try {
      acknowledgment.checked = window.localStorage.getItem(storageKey) === "yes";
      acknowledgment.addEventListener("change", function () {
        window.localStorage.setItem(storageKey, acknowledgment.checked ? "yes" : "no");
      });
    } catch (error) {
      // The checklist still works for the current page if browser storage is unavailable.
    }
  }

  function renderOverview() {
    document.title = "Cast Portal · Creekside Region";
    var guideLinks = Object.keys(portal.guides).map(function (slug) {
      var guide = portal.guides[slug];
      return [
        '<a class="portal-link-card" href="' + slug + '/">',
        '<span class="portal-link-card__eyebrow">' + escapeHtml(guide.eyebrow) + "</span>",
        "<strong>" + escapeHtml(guide.title) + "</strong>",
        "<span>" + escapeHtml(guide.arrival) + "</span>",
        '<span class="portal-link-card__action">Open cast guide →</span>',
        "</a>"
      ].join("");
    }).join("");

    var timeline = portal.timeline.map(function (item) {
      var content = [
        '<article class="timeline-item">',
        '<div class="timeline-time"><strong>' + escapeHtml(item.time) + "</strong><span>" + escapeHtml(item.window) + "</span></div>",
        '<div class="timeline-copy"><h3>' + escapeHtml(item.segment) + "</h3>",
        '<p><strong>Cast:</strong> ' + escapeHtml(item.cast) + "</p>",
        '<p><strong>Handoff:</strong> ' + escapeHtml(item.handoff) + "</p>",
        '<p><strong>Reward:</strong> ' + escapeHtml(item.reward) + ' <span class="reward-owner">Owner: ' + escapeHtml(item.responsible) + "</span></p>",
        item.href ? '<a href="' + item.href + '">Open guide →</a>' : "",
        "</div></article>"
      ];
      return content.join("");
    }).join("");

    app.innerHTML = [
      '<main class="cast-shell">',
      actionBar(""),
      '<header class="portal-hero">',
      '<div><p class="confidential-label">Adult Cast Portal — Do Not Show Luca</p>',
      '<p class="cast-kicker">Luca’s Creekside Region</p>',
      "<h1>Cast Portal</h1>",
      '<p>Quick rehearsal guides, day-of cues, reward ownership, and handoffs for every adult performer.</p></div>',
      '<img src="' + root + '/assets/pokemon/mega-icon-gold.png" alt="" width="150" height="150">',
      "</header>",
      '<aside class="spoiler-alert"><strong>Protect the surprise.</strong> Do not show these pages to Luca, forward the overview, discuss locked chapters in front of him, or put private fragment information online. This portal contains no entry-code digits.</aside>',
      '<section class="overview-section" aria-labelledby="cast-guides-heading"><p class="section-eyebrow">Individual links</p><h2 id="cast-guides-heading">Participant guides</h2><div class="portal-link-grid">' + guideLinks + "</div></section>",
      '<section class="overview-section" aria-labelledby="participant-order-heading"><p class="section-eyebrow">Handoff sequence</p><h2 id="participant-order-heading">Participant order</h2>' + list(portal.participantOrder, "order-list") + "</section>",
      '<section class="overview-section" aria-labelledby="timeline-heading"><p class="section-eyebrow">Complete event timeline</p><h2 id="timeline-heading">Run of show, arrivals, and rewards</h2><div class="timeline">' + timeline + "</div></section>",
      '<section class="overview-section callout-card"><h2>Day-of rule</h2><p>Adults may paraphrase. Luca always succeeds. Use hints early, shorten optional dialogue when behind, and never rush water safety or the adult-accompanied Ranger Vault entry.</p></section>',
      '<footer class="cast-footer"><p>Creekside Region Cast Portal · Role-based locations only · No private entry information.</p></footer>',
      "</main>"
    ].join("");
  }

  function copyLink() {
    var status = document.querySelector(".copy-status");
    var value = window.location.href;
    function done() {
      status.textContent = "Link copied.";
      window.setTimeout(function () { status.textContent = ""; }, 2400);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(done, function () {
        fallbackCopy(value, done);
      });
    } else {
      fallbackCopy(value, done);
    }
  }

  function fallbackCopy(value, done) {
    var textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      done();
    } catch (error) {
      document.querySelector(".copy-status").textContent = "Copy unavailable. Select the address bar to copy this link.";
    }
    textarea.remove();
  }

  if (!portal || !app) return;
  if (page === "overview") {
    renderOverview();
  } else if (portal.guides[page]) {
    renderGuide(portal.guides[page]);
  } else {
    app.innerHTML = '<main class="cast-shell"><h1>Cast guide not found</h1><p><a href="../">Return to the Cast Portal</a></p></main>';
  }

  document.addEventListener("click", function (event) {
    var copyButton = event.target.closest("[data-copy-link]");
    var printButton = event.target.closest("[data-print]");
    if (copyButton) copyLink();
    if (printButton) window.print();
  });
}());
