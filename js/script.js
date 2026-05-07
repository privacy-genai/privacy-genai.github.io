// ============================================================
// script.js — Rendering logic for "Tracking Conversations"
// Reads all data from DATA (defined in data.js).
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  buildMatrix();
  buildSankey("normal");
  buildCaseStudies();
  buildPrivateMode();
  buildPolicyTable();
  initNavHighlight();
});

// ── Utility ───────────────────────────────────────────────────────────────────

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

// ── Tracking Matrix ───────────────────────────────────────────────────────────

function buildMatrix() {
  const table = document.getElementById("matrix-table");
  if (!table) return;

  const chatbots = DATA.chatbots;
  const rows = DATA.trackingMatrix.rows;

  // Uniform column widths via colgroup
  const colgroup = document.createElement("colgroup");
  const rowHeaderCol = document.createElement("col");
  rowHeaderCol.style.width = "148px";
  colgroup.appendChild(rowHeaderCol);
  chatbots.forEach(() => {
    const col = document.createElement("col");
    col.style.width = "44px";
    colgroup.appendChild(col);
  });
  table.appendChild(colgroup);

  // Build thead
  const thead = table.createTHead();
  const headerRow = thead.insertRow();

  // Corner cell
  const corner = el("th", "row-header", "Exposure Type");
  corner.style.cursor = "default";
  headerRow.appendChild(corner);

  chatbots.forEach(cb => {
    const th = el("th", "col-header");
    th.innerHTML = `${cb.name}${cb.supportsPrivate ? '<span class="private-badge">★</span>' : ''}`;
    headerRow.appendChild(th);
  });

  // Build tbody
  const tbody = table.createTBody();

  rows.forEach(row => {
    // Data row
    const tr = tbody.insertRow();
    tr.dataset.rowId = row.id;

    const rowHeader = el("td", "row-header");
    rowHeader.innerHTML = `
      <span>${row.label}</span>
      <span class="row-category">${row.category}</span>
      <span class="row-expand-icon">›</span>
    `;
    tr.appendChild(rowHeader);

    chatbots.forEach(cb => {
      const cell = row.cells[cb.id];
      const td = tr.insertCell();
      td.className = `matrix-cell scope-${cell ? cell.scope : 'none'}`;

      if (cell && cell.channels && cell.channels.length > 0) {
        // Paper-style: plain colored letters, no badge boxes
        const channelDiv = el("div", "cell-channels");
        cell.channels.forEach(ch => {
          channelDiv.appendChild(el("span", `ch-letter ch-${ch}`, ch));
        });
        td.appendChild(channelDiv);
      } else {
        // ✗ for not observed (paper scheme)
        td.appendChild(el("span", "xmark", "✗"));
      }

      if (cell && cell.note) {
        td.title = cell.note;
        td.style.cursor = "help";
      }
    });

    // Expand row
    const expandTr = tbody.insertRow();
    expandTr.className = "expand-row";
    expandTr.dataset.for = row.id;
    const expandTd = expandTr.insertCell();
    expandTd.colSpan = chatbots.length + 1;
    expandTd.style.padding = "0";

    const expandContent = el("div", "expand-content");
    expandContent.innerHTML = `<strong>${row.label}</strong> — ${row.description}`;

    // Collect notable findings for this row
    const findings = [];
    chatbots.forEach(cb => {
      const cell = row.cells[cb.id];
      if (cell && cell.note) {
        findings.push(`<strong>${cb.name}:</strong> ${cell.note}`);
      }
    });
    if (findings.length > 0) {
      expandContent.innerHTML += `<ul style="margin-top:8px;padding-left:18px;">${findings.map(f => `<li style="margin-bottom:4px;">${f}</li>`).join("")}</ul>`;
    }

    expandTd.appendChild(expandContent);
    expandTr.appendChild(expandTd);

    // Toggle expand
    rowHeader.addEventListener("click", () => {
      const isOpen = rowHeader.classList.contains("open");
      rowHeader.classList.toggle("open", !isOpen);
      expandTr.classList.toggle("open", !isOpen);
    });
  });
}

// ── Sankey Diagram ────────────────────────────────────────────────────────────

let currentSankeyMode = "normal";

function buildSankey(mode) {
  currentSankeyMode = mode;

  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach(btn => {
    const active = btn.dataset.mode === mode;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", String(active));
  });

  const container = document.getElementById("sankey-container");
  if (!container) return;

  const data = DATA.sankeyData[mode];
  container.innerHTML = "";

  const rightNodes = data.nodes.filter(n => n.type !== "chatbot").length;
  const leftNodes  = data.nodes.filter(n => n.type === "chatbot").length;
  const tallestSide = Math.max(rightNodes, leftNodes);

  const W = Math.max(container.clientWidth || 860, 860);
  // Give each domain node ~28px of space; min 600px
  const H = Math.max(600, rightNodes * 28 + leftNodes * 40 + 80);
  const margin = { top: 28, right: 220, bottom: 28, left: 160 };

  // Size the container to exactly match the SVG height
  container.style.height = H + "px";

  const svg = d3.select(container)
    .append("svg")
    .attr("id", "sankey-svg")
    .attr("viewBox", `0 0 ${W} ${H}`)
    .attr("width", "100%")
    .attr("height", H);

  // Sort domain nodes by type (advertising → analytics → other); chatbots keep insertion order
  const typeOrder = { advertising: 0, analytics: 1, other: 2, chatbot: -1 };

  const sankey = d3.sankey()
    .nodeId(d => d.id)
    .nodeWidth(14)
    .nodePadding(mode === "normal" ? 10 : 16)
    .nodeSort((a, b) => (typeOrder[a.type] ?? 3) - (typeOrder[b.type] ?? 3))
    .extent([[margin.left, margin.top], [W - margin.right, H - margin.bottom]]);

  const { nodes, links } = sankey({
    nodes: data.nodes.map(d => Object.assign({}, d)),
    links: data.links.map(d => Object.assign({}, d, { value: 1 })),
  });

  // Repack left-side (chatbot) nodes preserving natural heights (proportional to connections)
  const chatbotNodes = nodes.filter(n => n.x0 < W / 2).sort((a, b) => a.y0 - b.y0);
  const chatbotGap = 6; // px between chatbot nodes
  const totalChatbotH = chatbotNodes.reduce((s, n) => s + (n.y1 - n.y0), 0);
  const totalGaps = chatbotGap * (chatbotNodes.length - 1);
  const chatbotStart = margin.top + ((H - margin.top - margin.bottom) - totalChatbotH - totalGaps) / 2;
  let cy = chatbotStart;
  chatbotNodes.forEach(n => {
    const h = n.y1 - n.y0;
    const dy = cy - n.y0;
    n.y0 = cy;
    n.y1 = cy + h;
    n.sourceLinks.forEach(l => { l.y0 += dy; });
    cy += h + chatbotGap;
  });

  const colorMap = {
    chatbot:     "#475569",
    advertising: "#f43f5e",
    analytics:   "#6366f1",
    other:       "#64748b",
  };

  function nodeColor(d) {
    return colorMap[d.type] || "#aaa";
  }

  function linkColor(d) {
    return colorMap[d.target.type] || "#aaa";
  }

  // Draw links
  svg.append("g")
    .attr("fill", "none")
    .selectAll("path")
    .data(links)
    .join("path")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", d => linkColor(d))
    .attr("stroke-width", 2)
    .attr("stroke-opacity", 0.18)
    .on("mouseover", function(event, d) {
      d3.select(this).attr("stroke-opacity", 0.55);
      showTooltip(event, `${d.source.name} → ${d.target.name}`);
    })
    .on("mousemove", moveTooltip)
    .on("mouseleave", function() {
      d3.select(this).attr("stroke-opacity", 0.18);
      hideTooltip();
    });

  // Draw nodes
  const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g");

  node.append("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("height", d => Math.max(2, d.y1 - d.y0))
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", d => nodeColor(d))
    .attr("rx", 2)
    .on("mouseover", (event, d) => showTooltip(event, d.name))
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);

  // Labels — right-side nodes get slightly smaller font when there are many
  const baseLabelSize = mode === "normal" ? 11 : 13;
  const rightLabelSize = Math.min(baseLabelSize, Math.max(9, Math.floor(H / rightNodes * 0.5)));
  const leftLabelSize  = Math.min(baseLabelSize, Math.max(10, Math.floor(H / leftNodes  * 0.5)));

  node.append("text")
    // Chatbot labels go to the LEFT of their bar; domain labels to the RIGHT
    .attr("x", d => d.x0 < W / 2 ? d.x0 - 8 : d.x1 + 8)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < W / 2 ? "end" : "start")
    .style("font-size", d => `${d.x0 < W / 2 ? leftLabelSize : rightLabelSize}px`)
    .style("font-family", "var(--sans)")
    .style("fill", "#cbd5e1")
    .text(d => d.name);

}

// Sankey tab switching
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => buildSankey(btn.dataset.mode));
  });
});

// Tooltip helpers
const tooltip = (() => {
  const div = document.createElement("div");
  div.className = "sankey-tooltip";
  document.body.appendChild(div);
  return div;
})();

function showTooltip(event, text) {
  tooltip.textContent = text;
  tooltip.style.opacity = "1";
  moveTooltip(event);
}

function moveTooltip(event) {
  tooltip.style.left = (event.clientX + 14) + "px";
  tooltip.style.top  = (event.clientY - 28) + "px";
}

function hideTooltip() {
  tooltip.style.opacity = "0";
}

// ── Case Studies ──────────────────────────────────────────────────────────────

function buildCaseStudies() {
  const container = document.getElementById("case-studies-list");
  if (!container) return;

  DATA.caseStudies.forEach(cs => {
    const div = el("div", "case-study");
    div.id = `case-${cs.id}`;

    const header = el("button", "case-study-header");
    header.setAttribute("type", "button");
    header.setAttribute("aria-expanded", "false");
    header.setAttribute("aria-controls", `case-body-${cs.id}`);
    header.innerHTML = `
      <span class="severity-dot ${cs.severity}" aria-hidden="true"></span>
      <span class="severity-label ${cs.severity}">${cs.severity}</span>
      <div class="case-study-title-group">
        <div class="case-study-title">${cs.title}</div>
        <div class="case-study-subtitle">${cs.subtitle}</div>
      </div>
      <span class="case-toggle-icon" aria-hidden="true">▾</span>
    `;

    const body = el("div", "case-study-body");
    body.id = `case-body-${cs.id}`;

    // Chatbot tags
    const tagsHtml = cs.chatbots.map(c => `<span class="chatbot-tag">${c}</span>`).join("");

    let payloadHtml = "";
    if (cs.payload) {
      payloadHtml = `
        <button class="case-payload-toggle" data-csid="${cs.id}">▸ Show captured payload</button>
        <div class="payload-block" id="payload-${cs.id}">
          <div class="payload-label">${cs.payloadLabel || "Payload"}</div>
          <pre class="payload-code">${escapeHtml(cs.payload)}</pre>
        </div>
      `;
    } else {
      payloadHtml = "";
    }

    body.innerHTML = `
      <p class="case-description">${cs.description}</p>
      <div class="tag-row">${tagsHtml}</div>
      <p class="case-expanded-detail">${cs.expandedDetail}</p>
      ${payloadHtml}
    `;

    div.appendChild(header);
    div.appendChild(body);
    container.appendChild(div);

    // Toggle open/close
    header.addEventListener("click", () => {
      const isOpen = div.classList.toggle("open");
      header.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // Payload toggles
  container.addEventListener("click", e => {
    const btn = e.target.closest(".case-payload-toggle");
    if (!btn) return;
    const id = btn.dataset.csid;
    const block = document.getElementById(`payload-${id}`);
    if (!block) return;
    block.classList.toggle("open");
    btn.textContent = block.classList.contains("open")
      ? "▾ Hide captured payload"
      : "▸ Show captured payload";
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Private Mode ──────────────────────────────────────────────────────────────

function buildPrivateMode() {
  const grid = document.getElementById("chatbot-pill-grid");
  if (!grid) return;

  DATA.chatbots.forEach(cb => {
    const pill = el("span", `chatbot-pill ${cb.supportsPrivate ? "supports" : "no-support"}`);
    pill.innerHTML = `<span class="pill-icon">${cb.supportsPrivate ? "★" : ""}</span>${cb.name}`;
    grid.appendChild(pill);
  });
}

// ── Privacy Policy Table ──────────────────────────────────────────────────────

function buildPolicyTable() {
  const tbody = document.querySelector("#policy-table tbody");
  if (!tbody) return;

  DATA.privacyPolicies.forEach(row => {
    const tr = tbody.insertRow();
    tr.innerHTML = `
      <td>${row.chatbot}</td>
      <td>${row.namesRecipients
        ? '<span class="policy-check">✓ Yes</span>'
        : '<span class="policy-x">✗ No</span>'}</td>
      <td class="policy-gap">${row.notesGap || "—"}</td>
    `;
  });
}

// ── Nav Highlight ─────────────────────────────────────────────────────────────

function initNavHighlight() {
  const sections = document.querySelectorAll("section[id], div[id='hero']");
  const navLinks = document.querySelectorAll("#site-nav nav a");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(s => observer.observe(s));
}

// ── BibTeX Toggle ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("bibtex-toggle");
  const block = document.getElementById("bibtex-block");
  if (!btn || !block) return;

  btn.addEventListener("click", () => {
    const open = block.style.display !== "none";
    block.style.display = open ? "none" : "block";
    btn.textContent = open ? "▸ Show BibTeX" : "▾ Hide BibTeX";
    btn.setAttribute("aria-expanded", String(!open));
  });
});
