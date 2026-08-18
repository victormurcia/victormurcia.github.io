---
layout: page
title: Research
permalink: /research/
reading: true
eyebrow: Research
lede: "I use first-principles computation and machine learning to make difficult measurements quantitative — and to extract reliable structure from complex scientific and clinical data."
description: "Research by Victor Murcia — quantitative resonant X-ray optical tensors (Physical Review Letters), combining DFT, dimensionality reduction, and spectroscopy; plus medical AI and clinical NLP research."
---

## Quantitative optical tensors from first principles

<p class="paper-meta">Murcia, Alqahtani, Heilman &amp; Collins&emsp;·&emsp;Accepted, <em>Physical Review Letters</em>&emsp;·&emsp;<a href="https://arxiv.org/abs/2509.01734" rel="noopener" target="_blank">arXiv:2509.01734</a><!-- VERIFY: PRL publisher DOI once published --></p>

Resonant soft X-ray scattering and NEXAFS spectroscopy are extraordinarily sensitive to how individual chemical bonds are oriented inside a material — the signal varies with photon energy and X-ray polarization. That sensitivity had never been fully usable, because quantitative analysis requires an accurate optical model with both *bond* and *orientation* specificity, and no such model existed.

My work builds one. An algorithm parameterizes and refines first-principles density functional theory calculations against angle-resolved absorption measurements, producing an optical tensor that reproduces data across samples with different molecular orientation and crystalline packing. In practice, it enables label-free orientation analysis of specific chemical moieties *inside* molecular nanostructures — a longstanding gap in quantitative resonant soft X-ray analysis.

What I find most useful about the result is its shape, which recurs across my work:

<ol class="flow">
  <li>Complex first-principles (DFT) calculations</li>
  <li>Dimensionality reduction &amp; clustering</li>
  <li>A physically interpretable representation</li>
  <li>Refinement against experiment</li>
  <li>Quantitative optical tensors</li>
  <li>Better models of molecular orientation &amp; nanostructure</li>
</ol>

A hard first-principles problem is compressed into an interpretable representation, then refined against real measurements until it becomes quantitative and predictive. See [Publications]({{ '/publications/' | relative_url }}) for the full record.

## Medical &amp; clinical AI

I've also applied the same instinct — extracting reliable structure from messy, high-stakes data — to medicine and healthcare.

- **U.S. Department of Veterans Affairs** — clinical natural-language-processing research through MAVERIC and the National Artificial Intelligence Institute.<!-- VERIFY: role title, dates, one-line contribution -->
- **Harvard MRCAS laboratory** — medical AI and robotics research.<!-- VERIFY: role title, dates, one-line contribution -->

That work is reflected in open tools such as [PyUMLS_Similarity](https://github.com/victormurcia/PyUMLS_Similarity2) (semantic similarity over the UMLS medical ontology) and a [clinical-trial concept visualizer](https://github.com/victormurcia/Clinical-Trial-Semantic-Structure-Visualizer).

## Earlier work — organic electronics &amp; X-ray spectroscopy

Before the optical-tensor work, my research centered on the structure–property relationships of organic semiconductors — the polymers and small molecules used in solar cells, transistors, and related carbon-based technologies. Using X-ray spectroscopy and scattering, I studied how molecular conformation, aggregation, and interfaces govern charge separation and device performance. That body of work is listed under [Publications]({{ '/publications/' | relative_url }}).
