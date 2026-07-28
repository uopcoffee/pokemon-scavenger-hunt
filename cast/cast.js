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

  function actionBar(backHref, backLabel) {
    return [
      '<nav class="cast-nav" aria-label="Cast Portal controls">',
      backHref ? '<a class="cast-button cast-button--quiet" href="' + backHref + '">← ' + escapeHtml(backLabel || "Cast overview") + "</a>" : "",
      '<div class="cast-actions">',
      '<button class="cast-button cast-button--quiet" type="button" data-copy-link>Copy link</button>',
      '<button class="cast-button cast-button--primary" type="button" data-print>Print / Save as PDF</button>',
      "</div>",
      "</nav>",
      '<p class="copy-status" role="status" aria-live="polite"></p>'
    ].join("");
  }

  function dialogue(lines) {
    return '<div class="friendly-lines">' + lines.map(function (entry) {
      return '<blockquote><strong>' + escapeHtml(entry.speaker) + '</strong><span>“' +
        escapeHtml(entry.line) + '”</span></blockquote>';
    }).join("") + "</div>";
  }

  function participantSection(title, body, className, eyebrow) {
    return [
      '<section class="participant-section ' + (className || "") + '">',
      eyebrow ? '<p class="participant-section__eyebrow">' + escapeHtml(eyebrow) + "</p>" : "",
      "<h2>" + escapeHtml(title) + "</h2>",
      body,
      "</section>"
    ].join("");
  }

  function renderParticipant(guide) {
    document.title = guide.eyebrow + " · Easy Cast Guide";
    var secondAppearance = guide.secondAppearance ? [
      '<section class="participant-section participant-section--second">',
      '<p class="participant-section__eyebrow">Your other appearance</p>',
      "<h2>" + escapeHtml(guide.secondAppearance.title) + "</h2>",
      "<p>" + escapeHtml(guide.secondAppearance.intro) + "</p>",
      guide.secondAppearance.lines ? dialogue(guide.secondAppearance.lines) : "",
      guide.secondAppearance.steps ? list(guide.secondAppearance.steps) : "",
      '<p class="friendly-note">' + escapeHtml(guide.secondAppearance.note) + "</p>",
      "</section>"
    ].join("") : "";

    app.innerHTML = [
      '<main class="cast-shell cast-shell--participant" data-participant-guide="' + escapeHtml(page) + '">',
      actionBar("../", "Cast overview"),
      '<header class="participant-hero">',
      '<p class="confidential-label">For adults · Do not show Luca</p>',
      '<p class="cast-kicker">' + escapeHtml(guide.eyebrow) + "</p>",
      "<h1>" + escapeHtml(guide.title) + "</h1>",
      '<p class="participant-hero__subtitle">' + escapeHtml(guide.subtitle) + "</p>",
      '<div class="reassurance-card"><strong>You can’t mess this up.</strong><p>' + escapeHtml(portal.reassurance) + "</p></div>",
      "</header>",
      participantSection("Your Part", [
        '<div class="start-facts">',
        '<div><span>Be ready</span><strong>' + escapeHtml(guide.ready) + "</strong></div>",
        '<div><span>About how long</span><strong>' + escapeHtml(guide.duration) + "</strong></div>",
        '<div><span>Your character</span><strong>' + escapeHtml(guide.character) + "</strong></div>",
        "</div>",
        '<div class="first-line-card"><span>Your first line</span><strong>“' + escapeHtml(guide.firstLine) + '”</strong></div>',
        list(guide.yourPart),
        '<div class="luca-action-card"><span>What Luca does</span><p>' + escapeHtml(guide.whatLucaDoes) + "</p></div>",
        '<div class="gift-card"><span>What you hand Luca</span><p>' + escapeHtml(guide.gift) + "</p></div>"
      ].join(""), "participant-section--start", "Start here"),
      participantSection("Before Luca Arrives", '<p class="arrival-line">' + escapeHtml(guide.arrival) + "</p>" + list(guide.before)),
      participantSection("When Luca Arrives", dialogue(guide.arrivalLines) + '<p class="improv-note">' + escapeHtml(portal.improvNote) + "</p>"),
      participantSection("What to Say and Do", list(guide.sayAndDo)),
      secondAppearance,
      participantSection("When Luca Succeeds", dialogue(guide.successLines) +
        '<p class="signal-note"><strong>Wait for Patrick’s signal.</strong> ' + escapeHtml(guide.successInstruction) + "</p>" +
        '<p class="final-line"><span>Your final line</span><strong>“' + escapeHtml(guide.finalLine) + '”</strong></p>'),
      participantSection("Easy Backup Plan", list(guide.backup) + '<p class="friendly-note">Shorter and easier is always fine. Luca still succeeds.</p>', "participant-section--backup"),
      participantSection("Optional Ways to Play Up the Part", '<p>' + escapeHtml(portal.costumeNote) + "</p>" + list(guide.optionalPlay), "participant-section--optional"),
      '<aside class="participant-closing"><strong>Most important:</strong> Have fun with it. Luca will be excited simply because you are participating.</aside>',
      '<footer class="participant-footer">',
      '<a href="../director/">Patrick’s detailed setup notes</a>',
      '<span>Participants do not need to read the Director view.</span>',
      "</footer>",
      "</main>"
    ].join("");
  }

  function renderOverview() {
    document.title = "Cast Portal · Creekside Region";
    var guideLinks = Object.keys(portal.guides).map(function (slug) {
      var guide = portal.guides[slug];
      return [
        '<a class="portal-link-card" href="' + slug + '/">',
        '<span class="portal-link-card__eyebrow">' + escapeHtml(guide.eyebrow) + "</span>",
        "<strong>" + escapeHtml(guide.title) + "</strong>",
        "<span>" + escapeHtml(guide.ready) + "</span>",
        '<span class="portal-link-card__action">Open my easy guide →</span>',
        "</a>"
      ].join("");
    }).join("");

    app.innerHTML = [
      '<main class="cast-shell cast-shell--overview">',
      '<header class="portal-hero portal-hero--friendly">',
      '<div><p class="confidential-label">For adults · Do not show Luca</p>',
      '<p class="cast-kicker">Luca’s Creekside Region</p>',
      "<h1>Pick your name</h1>",
      '<p>Each guide explains your whole part in a few minutes. No Pokémon knowledge, acting, memorizing, or costume required.</p></div>',
      '<img src="' + root + '/assets/pokemon/mega-icon-gold.png" alt="" width="140" height="140">',
      "</header>",
      '<aside class="overview-reassurance"><strong>This is easy.</strong><p>Patrick brings the supplies and keeps the adventure moving. Read from your phone, use your own words, give Luca lots of hints, and have fun.</p></aside>',
      '<section class="overview-section" aria-labelledby="cast-guides-heading">',
      '<p class="section-eyebrow">Friendly role guides</p>',
      '<h2 id="cast-guides-heading">Whose part are you playing?</h2>',
      '<div class="portal-link-grid">' + guideLinks + "</div>",
      "</section>",
      '<footer class="overview-director-link">',
      '<a href="director/">Patrick’s Director view →</a>',
      '<span>Detailed timeline, supplies, gifts, and setup notes</span>',
      "</footer>",
      "</main>"
    ].join("");
  }

  function directorCueCard(cue) {
    return [
      '<article class="director-cue">',
      '<p class="director-cue__eyebrow">' + escapeHtml(cue.characterName) + "</p>",
      "<h3>" + escapeHtml(cue.performerName) + "</h3>",
      '<p><strong>Entrance:</strong> ' + escapeHtml(cue.entranceCue) + "</p>",
      '<p><strong>Core challenge:</strong> ' + escapeHtml(cue.challengeSteps.join(" ")) + "</p>",
      '<p><strong>Success:</strong> ' + escapeHtml(cue.successCondition) + "</p>",
      '<p><strong>Gift ownership:</strong> ' + escapeHtml(cue.rewardPackages.map(function (packageName, index) {
        return packageName + " — " + (cue.rewardOwners[index] || cue.rewardOwners[0]);
      }).join("; ")) + "</p>",
      '<p><strong>Transition:</strong> ' + escapeHtml(cue.transitionDestination) + "</p>",
      "</article>"
    ].join("");
  }

  function renderDirector() {
    var director = portal.director;
    document.title = "Patrick’s Director View · Creekside Region";
    var timeline = director.timeline.map(function (item) {
      return [
        '<article class="timeline-item">',
        '<div class="timeline-time"><strong>' + escapeHtml(item.time) + "</strong><span>" + escapeHtml(item.window) + "</span></div>",
        '<div class="timeline-copy"><h3>' + escapeHtml(item.segment) + "</h3>",
        '<p><strong>Cast:</strong> ' + escapeHtml(item.cast) + "</p>",
        '<p><strong>Handoff:</strong> ' + escapeHtml(item.handoff) + "</p>",
        '<p><strong>Package:</strong> ' + escapeHtml(item.reward) + ' <span class="reward-owner">Owner: ' + escapeHtml(item.responsible) + "</span></p>",
        "</div></article>"
      ].join("");
    }).join("");

    var packages = director.packages.map(function (item) {
      return '<tr><td>' + escapeHtml(item.id) + "</td><td>" + escapeHtml(item.owner) + "</td><td>" + escapeHtml(item.moment) + "</td></tr>";
    }).join("");

    var operations = director.operations.map(function (operation) {
      return [
        '<details class="director-operation">',
        "<summary><strong>" + escapeHtml(operation.name) + "</strong><span>" + escapeHtml(operation.cueIds.join(" · ")) + "</span></summary>",
        '<div class="director-operation__body">',
        '<div><h3>Setup and props</h3>' + list(operation.setup) + "</div>",
        '<div><h3>Safety owner</h3><p>' + escapeHtml(operation.safety) + "</p></div>",
        '<div><h3>Fast fallback</h3><p>' + escapeHtml(operation.fallback) + "</p></div>",
        '<div><h3>Patrick to decide</h3>' + list(operation.decisions) + "</div>",
        '<section class="director-runtime"><h3>Runtime cue alignment</h3><div class="director-cue-grid">' +
          operation.runtimeCues.map(directorCueCard).join("") + "</div></section>",
        "</div></details>"
      ].join("");
    }).join("");

    app.innerHTML = [
      '<main class="cast-shell cast-shell--director">',
      actionBar("../", "Participant guides"),
      '<header class="director-hero">',
      '<p class="confidential-label">Director only · Do not show Luca</p>',
      '<p class="cast-kicker">Creekside Region operations</p>',
      "<h1>" + escapeHtml(director.title) + "</h1>",
      "<p>" + escapeHtml(director.intro) + "</p>",
      "</header>",
      '<section class="director-section"><p class="section-eyebrow">Operating defaults</p><h2>Patrick owns the logistics</h2>' + list(director.globalOperations) + "</section>",
      '<section class="director-section"><p class="section-eyebrow">Full timeline</p><h2>Run of show</h2><div class="timeline">' + timeline + "</div></section>",
      '<section class="director-section"><p class="section-eyebrow">Gift ownership</p><h2>Exact package IDs</h2>',
      '<div class="director-table-wrap"><table><thead><tr><th>Package</th><th>Owner</th><th>Moment</th></tr></thead><tbody>' + packages + "</tbody></table></div></section>",
      '<section class="director-section"><p class="section-eyebrow">Participant order</p><h2>Handoff sequence</h2>' + list(director.participantOrder, "order-list") + "</section>",
      '<section class="director-section"><p class="section-eyebrow">Detailed setup</p><h2>Role-by-role operations</h2><div class="director-operations">' + operations + "</div></section>",
      '<footer class="cast-footer"><p>Director view · Keep private story and setup notes away from Luca.</p></footer>',
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
  if (page === "overview") renderOverview();
  else if (page === "director") renderDirector();
  else if (portal.guides[page]) renderParticipant(portal.guides[page]);
  else app.innerHTML = '<main class="cast-shell"><h1>Cast guide not found</h1><p><a href="../">Return to the Cast Portal</a></p></main>';

  document.addEventListener("click", function (event) {
    var copyButton = event.target.closest("[data-copy-link]");
    var printButton = event.target.closest("[data-print]");
    if (copyButton) copyLink();
    if (printButton) window.print();
  });
}());
