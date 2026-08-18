---
layout: page
title: AI Systems & Engineering
permalink: /engineering/
reading: true
wide: true
eyebrow: AI Systems & Engineering
lede: "I build production AI systems — the architecture, the models, and the engineering that makes them dependable enough to ship."
description: "Production AI engineering by Victor Murcia — LLM systems, document and multimodal intelligence, RAG and knowledge systems, agentic workflows, AI evaluation and reliability, scientific AI, and enterprise AI architecture."
---

<div class="spectrum" role="img" aria-label="A soft X-ray absorption spectrum — a nod to the synchrotron and NEXAFS research behind this work.">
  <svg viewBox="0 0 1000 120" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">
    <path class="spec__fill" d="M0,100 C40,99 95,98 135,93 C165,89 182,82 200,66 C218,50 232,26 250,18 C262,13 275,14 286,28 C300,46 314,72 338,80 C360,87 384,82 402,72 C424,60 446,48 476,47 C512,45 540,52 576,50 C616,48 648,44 686,50 C730,57 764,76 812,90 C858,103 902,108 1000,110 L1000,120 L0,120 Z"/>
    <line class="spec__base" x1="0" y1="112" x2="1000" y2="112" vector-effect="non-scaling-stroke"/>
    <path class="spec__line" pathLength="1000" vector-effect="non-scaling-stroke" d="M0,100 C40,99 95,98 135,93 C165,89 182,82 200,66 C218,50 232,26 250,18 C262,13 275,14 286,28 C300,46 314,72 338,80 C360,87 384,82 402,72 C424,60 446,48 476,47 C512,45 540,52 576,50 C616,48 648,44 686,50 C730,57 764,76 812,90 C858,103 902,108 1000,110"/>
    <text class="spec__label" x="268" y="9" text-anchor="middle">&#960;*</text>
    <text class="spec__label" x="512" y="36" text-anchor="middle">&#963;*</text>
  </svg>
</div>

<p class="measure">My work sits where modern AI meets real technical and scientific software — where "it runs in a notebook" is the start of the problem, not the end of it. The interesting part is everything after: reliability, evaluation, architecture, and the judgment to know when a system is actually good enough to put in front of people.</p>

<h2>Areas of work</h2>

<dl class="eng-areas">
  <div class="eng-area"><dt>Production LLM systems</dt><dd>Designing and orchestrating large language models into features that hold up under real inputs, latency budgets, and cost constraints.</dd></div>
  <div class="eng-area"><dt>Document &amp; multimodal intelligence</dt><dd>Extracting structured meaning from documents, tables, and mixed media — the unglamorous core of most useful enterprise AI.</dd></div>
  <div class="eng-area"><dt>Retrieval &amp; knowledge systems</dt><dd>RAG and knowledge architectures that ground models in an organization's own information rather than the open web.</dd></div>
  <div class="eng-area"><dt>Agentic workflows</dt><dd>Multi-step, tool-using agents scoped to do real work reliably, with explicit boundaries and understood failure modes.</dd></div>
  <div class="eng-area"><dt>AI evaluation &amp; reliability</dt><dd>Measuring whether a system is genuinely good — and keeping it good as models, data, and requirements shift underneath it.</dd></div>
  <div class="eng-area"><dt>Scientific AI</dt><dd>Bringing AI into scientific and technical software, where correctness and interpretability are not optional.</dd></div>
  <div class="eng-area"><dt>Enterprise AI architecture</dt><dd>System design that lets AI features share infrastructure, evaluation, and guardrails instead of each being a bespoke one-off.</dd></div>
  <div class="eng-area"><dt>Forward-deployed engineering</dt><dd>Working directly with the people who use these systems, and shipping against their real problems rather than a proxy for them.</dd></div>
</dl>

<p class="note">I keep confidential Datacor and customer details out of public writing. The below describes capabilities and impact, not customer data.</p>

<h2>Selected production work</h2>

<p class="measure">A sample of production AI I've led at Datacor. The metrics are from real deployments.</p>

<div class="prodwork">
  <div class="prod">
    <p class="prod__fig">92<span class="prod__unit">%+</span><span class="prod__cap">Schema accuracy</span></p>
    <p class="prod__subs"><span>8–12× throughput</span><span>~70% less manual review</span></p>
    <h3 class="prod__title">AI cash-application platform</h3>
    <p class="prod__desc">A multimodal document-intelligence system — OCR, layout-aware parsing, and LLM ensembles with judge-model validation — operating on complex financial documents.</p>
  </div>
  <div class="prod">
    <p class="prod__fig">30–50<span class="prod__unit">%</span><span class="prod__cap">Retrieval relevance ↑</span></p>
    <p class="prod__subs"><span>~40% lower support burden</span></p>
    <h3 class="prod__title">AI knowledge copilot</h3>
    <p class="prod__desc">A hybrid RAG + knowledge-graph platform over engineering software and technical documentation.</p>
  </div>
  <div class="prod">
    <p class="prod__fig">4<span class="prod__cap">Shared services</span></p>
    <p class="prod__subs"><span>1 unified data model</span><span>RAG · agents · eval · governance</span></p>
    <h3 class="prod__title">Enterprise AI architecture</h3>
    <p class="prod__desc">A unified data model plus reusable RAG, agent, evaluation, and governance components that let AI features share infrastructure across business units — with organizational standards for LLM evaluation, observability, and human-in-the-loop validation.</p>
  </div>
  <div class="prod">
    <p class="prod__fig">&gt;1<span class="prod__unit">M</span><span class="prod__cap">LOC refactored</span></p>
    <p class="prod__subs"><span>legacy C++ / C#</span><span>CI/CD parity gates</span></p>
    <h3 class="prod__title">Agentic code modernization</h3>
    <p class="prod__desc">AI-assisted refactoring of multi-million-line legacy engineering codebases, using a strangler-fig strategy and static-analysis mapping to preserve behavior.</p>
  </div>
</div>

<h2>Selected public work</h2>

<p class="measure">A few open repositories that reflect the technical range — scientific computing, clinical NLP, and document intelligence.</p>

<ul class="eng-repos">
  <li class="eng-repo">
    <span class="eng-repo__spark" aria-hidden="true"><i style="height:35%"></i><i style="height:70%"></i><i style="height:50%"></i><i style="height:90%"></i><i style="height:55%"></i></span>
    <span>
      <a class="eng-repo__name" href="https://github.com/victormurcia/DFT-Clustering">DFT-Clustering</a><span class="eng-repo__lang">IGOR Pro</span>
      <span class="eng-repo__desc">Processes DFT calculations of NEXAFS spectra with tensor-based modeling — the tooling behind the <em>Physical Review Letters</em> work.</span>
    </span>
  </li>
  <li class="eng-repo">
    <span class="eng-repo__spark" aria-hidden="true"><i style="height:60%"></i><i style="height:45%"></i><i style="height:85%"></i><i style="height:50%"></i><i style="height:72%"></i></span>
    <span>
      <a class="eng-repo__name" href="https://github.com/victormurcia/ChemNER">ChemNER</a><span class="eng-repo__lang">Python</span>
      <span class="eng-repo__desc">A custom named-entity-recognition model for extracting and labeling chemical compounds from text.</span>
    </span>
  </li>
  <li class="eng-repo">
    <span class="eng-repo__spark" aria-hidden="true"><i style="height:50%"></i><i style="height:88%"></i><i style="height:40%"></i><i style="height:66%"></i><i style="height:44%"></i></span>
    <span>
      <a class="eng-repo__name" href="https://github.com/victormurcia/PyUMLS_Similarity2">PyUMLS_Similarity</a><span class="eng-repo__lang">Python</span>
      <span class="eng-repo__desc">Computes semantic-similarity metrics between concepts in the UMLS medical ontology — clinical NLP infrastructure.</span>
    </span>
  </li>
  <li class="eng-repo">
    <span class="eng-repo__spark" aria-hidden="true"><i style="height:42%"></i><i style="height:75%"></i><i style="height:58%"></i><i style="height:95%"></i><i style="height:52%"></i></span>
    <span>
      <a class="eng-repo__name" href="https://github.com/victormurcia/Clinical-Trial-Semantic-Structure-Visualizer">Clinical-Trial-Semantic-Structure-Visualizer</a><span class="eng-repo__lang">Python</span>
      <span class="eng-repo__desc">Extracts and visualizes medical concepts from clinical-trial eligibility criteria.</span>
    </span>
  </li>
</ul>

<p class="note">More on <a href="https://github.com/victormurcia">GitHub</a>.</p>
