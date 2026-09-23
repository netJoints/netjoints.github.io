(function () {
  "use strict";

  var projects = [
    {title:"AL Lab Access",slug:"al-lab-access",desc:"Secure lab access workspace with explicit boundaries for identity, evidence, and safe automation.",cats:["AI","AgenticOps","Security"],status:"Current"},
    {title:"AgenticOps Product Management Website",slug:"agenticops-prod-mgmt-website",desc:"A reusable product-operations layout for turning customer pain points into roadmaps, evidence, and action.",cats:["AI","AgenticOps","Leadership"],status:"Current"},
    {title:"AI RAG Search",slug:"ai-rag-search",desc:"Source-aware retrieval architecture for grounded answers, traceable citations, and operational search.",cats:["AI","RAG","Product"],status:"Current"},
    {title:"Codex CATC Compliance Skill",slug:"codex-catc-compliance-skil",desc:"Repeatable evidence-oriented compliance workflows for technical teams and AI-assisted operations.",cats:["AI","Automation","Networking"],status:"Current"},
    {title:"Even Frugality",slug:"hotel-finder",desc:"AI-assisted hotel finding framed as operational frugality: better options, less manual search, and clearer tradeoffs.",cats:["AI","Leadership","Frugality","Travel"],status:"Current",subtitle:"Hotel Finder"},
    {title:"Receipt Finder",slug:"receipt-finder",desc:"Local-first receipt organization that turns an unstructured personal workflow into searchable evidence.",cats:["AI","Automation","Productivity"],status:"Current"},
    {title:"Ask Campus Switching Webex AI Agent",slug:"ask-campus-switching-webex-ai-agent",desc:"Human-first RAG support for campus switching questions, with retrieval boundaries and controlled responses.",cats:["AI","AgenticOps","Networking"],status:"Current"},
    {title:"Catalyst Center to Meraki Migration Steps",slug:"aia-catc-to-meraki-migration-steps",desc:"Auditable migration planning that organizes prerequisites, decisions, validation, and rollback thinking.",cats:["AI","Networking","Migration"],status:"Current"},
    {title:"BGP EVPN SD-Access API Analysis",slug:"bgp-evpn-sd-access-api-analysis",desc:"Fabric automation lifecycle mapping for understanding API coverage, dependencies, and implementation gaps.",cats:["Networking","Automation","Research"],status:"Current"},
    {title:"Catalyst vs Meraki Switching Gap",slug:"catalyst-switch-vs-meraki-ms-switching-gap",desc:"Evidence-backed comparison of switching capabilities and operating-model tradeoffs.",cats:["Networking","Research","Leadership"],status:"Current"},
    {title:"CatC to Meraki Migration AI Assistant",slug:"catc-to-meraki-migration-ai-assistant",desc:"Guided migration workflow that uses AI to structure decisions without hiding technical constraints.",cats:["AI","Networking","Migration"],status:"Current"},
    {title:"Meraki MS vs IOS XE Switching Gaps",slug:"meraki-ms-vs-ios-xe-os-switching-gaps",desc:"Operating-model comparison for teams evaluating cloud-managed and IOS XE switching.",cats:["Networking","Research"],status:"Current"},
    {title:"SNRA CVD Programming Playbook",slug:"snra-cvd-programming-playbook",desc:"Coordinated programming guidance for secure network reference architecture automation.",cats:["Automation","Networking","Leadership"],status:"Current"},
    {title:"Terraform Meraki Switching Gaps",slug:"terraform-meraki-switching-gaps",desc:"Capability and automation crosswalk for infrastructure-as-code and switching workflows.",cats:["Automation","Networking","Research"],status:"Current"},
    {title:"Agentic AI Webex Bot",repo:"agentic-ai-webex-bot",desc:"An earlier agentic collaboration experiment connecting AI workflows with Webex operations.",cats:["AI","AgenticOps","Automation"],status:"Previous"},
    {title:"Bedrock AgentCore Research Agent",repo:"bedrock-agentcore-research-agent",desc:"Research-agent exploration focused on tool use, grounding, and repeatable investigation.",cats:["AI","AWS","Research"],status:"Previous"},
    {title:"Agentic AI FinOps",repo:"agentic-ai-finops-app",desc:"Agentic cost-operations exploration for turning cloud cost signals into useful actions.",cats:["AI","FinOps","Automation"],status:"Previous"},
    {title:"Agentic AI Travel Agency",repo:"agentic-ai-travel-agency-aws-bedrock",desc:"Travel-planning experiment demonstrating orchestration, recommendation, and service integration.",cats:["AI","AWS","Travel"],status:"Previous"},
    {title:"AI / GenAI Interview Questions",repo:"ai-genai-agentic-ai-interview-questions",desc:"A practical enablement resource for building shared AI fluency across technical teams.",cats:["AI","Leadership","Enablement"],status:"Previous"},
    {title:"MCP with Claude",repo:"wordpress-mcp-with-claude",desc:"MCP integration experiment exploring how assistants can safely work with content systems.",cats:["AI","MCP","Automation"],status:"Previous"},
    {title:"Vibe Studio",repo:"vibe-studio",desc:"Product-building experiment focused on fast feedback loops and AI-assisted creation.",cats:["AI","Product","Experiment"],status:"Previous"},
    {title:"CUDA vs PyTorch MPS Inference",repo:"nvidia-cuda-vs-pytorch-mps-inference",desc:"Performance-oriented model inference comparison across local acceleration paths.",cats:["AI","Performance","Research"],status:"Previous"},
    {title:"FinOps Agentic AI Local Agents",repo:"finops-agentic-ai-local-agents",desc:"Local-agent exploration for cost analysis, repeatability, and operational decision support.",cats:["AI","FinOps","AgenticOps"],status:"Previous"},
    {title:"JIT PAM GitHub NHI",repo:"jit-pam-github-nhi",desc:"Just-in-time privileged access exploration for non-human identities and secure automation.",cats:["Security","Automation","Leadership"],status:"Previous"}
  ];

  function pageUrl(project) { return project.slug ? "/" + project.slug + "/" : "https://github.com/netjoints/" + project.repo; }
  function repoUrl(project) { return "https://github.com/netjoints/" + (project.repo || project.slug); }
  function esc(value) { return String(value).replace(/[&<>\"']/g, function (c) { return ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]; }); }
  function renderCard(project) {
    var card = document.createElement("article"); card.className = "project-card";
    card.dataset.title = project.title.toLowerCase(); card.dataset.categories = project.cats.join(" ").toLowerCase(); card.dataset.status = project.status;
    card.innerHTML = '<div class="eyebrow">' + esc(project.status) + (project.subtitle ? " · " + esc(project.subtitle) : "") + '</div><h2>' + esc(project.title) + '</h2><p>' + esc(project.desc) + '</p><div class="tags">' + project.cats.map(function (c) { return '<span class="tag">' + esc(c) + '</span>'; }).join("") + '</div><div class="card-actions"><a class="overview-link" href="' + pageUrl(project) + '">Overview</a><a class="repo-link" href="' + repoUrl(project) + '" target="_blank" rel="noopener noreferrer">Source repository</a></div>';
    return card;
  }
  function init(root) {
    var scope = root.dataset.scope || "all";
    var visible = projects.filter(function (p) { return scope === "all" || p.cats.indexOf("AI") >= 0 || p.cats.indexOf("AgenticOps") >= 0 || p.cats.indexOf("MCP") >= 0; });
    var grid = root.querySelector(".project-grid"), search = root.querySelector("[data-filter=search]"), category = root.querySelector("[data-filter=category]"), status = root.querySelector("[data-filter=status]"), sort = root.querySelector("[data-filter=sort]"), count = root.querySelector(".catalog-count"), empty = root.querySelector(".catalog-empty");
    Array.from(new Set(visible.reduce(function (all, p) { return all.concat(p.cats); }, []))).sort().forEach(function (c) { category.appendChild(new Option(c, c)); });
    visible.forEach(function (p) { grid.appendChild(renderCard(p)); });
    function apply() {
      var q = search.value.trim().toLowerCase(), selected = category.value, state = status.value, ordered = Array.from(grid.children).sort(function (a, b) { return sort.value === "title-desc" ? b.dataset.title.localeCompare(a.dataset.title) : a.dataset.title.localeCompare(b.dataset.title); }), shown = 0;
      ordered.forEach(function (card) { var match = (!q || card.dataset.title.indexOf(q) >= 0 || card.dataset.categories.indexOf(q) >= 0) && (!selected || card.dataset.categories.indexOf(selected.toLowerCase()) >= 0) && (!state || card.dataset.status === state); card.hidden = !match; if (match) shown++; grid.appendChild(card); });
      count.textContent = shown + " project" + (shown === 1 ? "" : "s") + " shown"; empty.hidden = shown !== 0;
    }
    [search, category, status, sort].forEach(function (control) { control.addEventListener("input", apply); control.addEventListener("change", apply); }); apply();
  }
  document.querySelectorAll("[data-project-catalog]").forEach(init);
})();
