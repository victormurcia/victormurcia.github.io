---
layout: page
title: Research
permalink: /research/
reading: true
wide: true
eyebrow: Research
lede: "I use first-principles computation and machine learning to make difficult measurements quantitative — and to extract reliable structure from complex scientific and clinical data."
description: "Research by Victor Murcia — quantitative resonant X-ray optical tensors (Physical Review Letters), combining DFT, dimensionality reduction, and spectroscopy; plus medical AI and clinical NLP research."
---

<div class="spectrum research-signal" role="img" aria-label="A resonant soft X-ray scattering profile — scattered intensity versus q — the measurement this work makes quantitative.">
  <svg viewBox="0 0 1000 120" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">
    <path class="spec__fill" d="M0,58 C25,40 45,22 70,20 C95,18 115,44 140,66 C165,86 185,92 205,90 C230,88 250,64 278,60 C305,56 325,84 352,88 C380,90 402,74 430,72 C462,70 486,88 516,90 C560,91 610,84 660,86 C740,89 850,100 1000,104 L1000,120 L0,120 Z"/>
    <line class="spec__base" x1="0" y1="112" x2="1000" y2="112" vector-effect="non-scaling-stroke"/>
    <path class="spec__line" pathLength="1000" vector-effect="non-scaling-stroke" d="M0,58 C25,40 45,22 70,20 C95,18 115,44 140,66 C165,86 185,92 205,90 C230,88 250,64 278,60 C305,56 325,84 352,88 C380,90 402,74 430,72 C462,70 486,88 516,90 C560,91 610,84 660,86 C740,89 850,100 1000,104"/>
  </svg>
</div>
<p class="spec-cap">Resonant soft-X-ray scattering · I(q)</p>

<div class="feat">
  <p class="feat__eyebrow">Featured · Physical Review Letters</p>
  <h2 class="feat__title"><a href="https://arxiv.org/abs/2509.01734" rel="noopener" target="_blank">Quantitative and bond-traceable resonant X-ray optical tensors of organic molecules</a></h2>
  <p class="feat__meta">Murcia, Alqahtani, Heilman &amp; Collins&emsp;·&emsp;Accepted, <em>Physical Review Letters</em>&emsp;·&emsp;<a href="https://arxiv.org/abs/2509.01734" rel="noopener" target="_blank">arXiv:2509.01734</a><!-- VERIFY: PRL publisher DOI once published --></p>
  <p class="feat__quote">Makes resonant soft-X-ray scattering quantitative — resolving the orientation of individual chemical bonds inside molecular nanostructures, a longstanding gap in the field.</p>
</div>

<p class="measure-wide">Resonant soft X-ray scattering and NEXAFS spectroscopy are extraordinarily sensitive to how individual chemical bonds are oriented inside a material — the signal varies with photon energy and X-ray polarization. That sensitivity had never been fully usable, because quantitative analysis requires an accurate optical model with both <em>bond</em> and <em>orientation</em> specificity, and no such model existed.</p>

<p class="measure-wide">My work builds one. An algorithm parameterizes and refines first-principles density functional theory calculations against angle-resolved absorption measurements, producing an optical tensor that reproduces data across samples with different molecular orientation and crystalline packing. In practice, it enables label-free orientation analysis of specific chemical moieties <em>inside</em> molecular nanostructures — a longstanding gap in quantitative resonant soft X-ray analysis.</p>

<p class="measure-wide">What I find most useful about the result is its shape, which recurs across my work:</p>

<div class="pipeline">
  <div class="pstep"><p class="pstep__n">01</p><p class="pstep__t">First-principles DFT</p></div>
  <div class="pstep"><p class="pstep__n">02</p><p class="pstep__t">Dimensionality reduction &amp; clustering</p></div>
  <div class="pstep"><p class="pstep__n">03</p><p class="pstep__t">Interpretable representation</p></div>
  <div class="pstep"><p class="pstep__n">04</p><p class="pstep__t">Refinement against experiment</p></div>
  <div class="pstep"><p class="pstep__n">05</p><p class="pstep__t">Quantitative optical tensors</p></div>
  <div class="pstep pstep--end"><p class="pstep__n">06</p><p class="pstep__t">Better models of orientation &amp; nanostructure</p></div>
</div>

<p class="measure-wide">A hard first-principles problem is compressed into an interpretable representation, then refined against real measurements until it becomes quantitative and predictive. See <a href="{{ '/publications/' | relative_url }}">Publications</a> for the full record.</p>

<h2>Medical &amp; clinical AI</h2>

<p class="measure-wide">From 2022 to 2025 I applied the same instinct — extracting reliable structure from messy, high-stakes data — to medicine, as a Data Scientist (MAVERIC) and AI Researcher (National Artificial Intelligence Institute) at the U.S. Department of Veterans Affairs in Boston, and with Dr. Marco Zenati's Harvard MRCAS laboratory.</p>

<div class="themes">
  <div class="theme"><h4>Clinical-trial matching</h4><p>NLP and transformer systems that match patients to trials from electronic health records and eligibility criteria, including <em>Molecular Consult</em> for the National Precision Oncology Program; presented at AMIA.</p></div>
  <div class="theme"><h4>Medical imaging</h4><p>Deep-learning pipelines on DICOM imaging for liver-cancer screening (the PREMIUM trial) and ARDS classification from chest X-rays, with Grad-CAM / SHAP interpretability.</p></div>
  <div class="theme"><h4>Research impact &amp; trustworthy AI</h4><p>NLP for bibliometric analysis of VA research, and fairness / bias audits on clinical models; released PyUMLS-Similarity. This work earned the VA's highest federal performance rating.</p></div>
  <div class="theme"><h4>Surgical safety</h4><p>With Harvard MRCAS, multimodal models (EKG, audio, transcribed speech) assessing cognitive load and communication in cardiac surgery, including GANs for synthetic physiological data.</p></div>
</div>

<p class="note measure-wide">Some of this is open source — <a href="https://github.com/victormurcia/PyUMLS_Similarity2">PyUMLS_Similarity</a> (semantic similarity over the UMLS ontology) and a <a href="https://github.com/victormurcia/Clinical-Trial-Semantic-Structure-Visualizer">clinical-trial concept visualizer</a>.</p>

<h2>Earlier work — organic electronics &amp; X-ray spectroscopy</h2>

<p class="measure-wide">Before the optical-tensor work, my research centered on the structure–property relationships of organic semiconductors — the polymers and small molecules used in solar cells, transistors, and related carbon-based technologies. Using X-ray spectroscopy and scattering, I studied how molecular conformation, aggregation, and interfaces govern charge separation and device performance. That body of work is listed under <a href="{{ '/publications/' | relative_url }}">Publications</a>.</p>
