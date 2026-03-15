---
layout: chantier
spicy: true
title: DigiMed Secure Cloud
started: 2020-09-01 09:00
#ended: 2027-11-30 17:00
location: [Leibniz Supercomputing Centre]
result: [research]
tech: [OpenStack, AMD-SEV/SNP, Nvidia H200, Quobyte]
description: |
    <strong>DigiMed Bayern</strong>: The goal of the project is to advance the digital transformation of Bavaria's health system. The project focuses on the secondary use of cardiovascular research data from university hospitals and research institutes across the territory.<sup>1</sup>
    <br><br>
    <strong>Work Package 6</strong>: I contributed to the design, deployment, and operation of the DigiMed Secure Cloud<sup>2</sup>, a confidential cloud platform that allows the integration, sharing, and processing of large-scale sensitive data. This included developing an architecture that can replace existing on-premises data silos and migrate medical pipelines to cloud native technologies while implementing pseudonymization, FAIR data principles, and compliance with data protection and privacy regulations.<sup>3</sup>
    <br><br>
    <strong>DigiMed Secure Cloud</strong>: Concretly, the platform now hosts the German Heart Centre Datawarehouse<sup>4</sup>, the Bavarian Genome Computing Centre<sup>5</sup>, the Bavarian node for the German Human Genome-Phenome Archive<sup>6</sup>, the VRONI full genome sequencing database<sup>7</sup>, and the HerzFit mobile app anonymous data donation backend.<sup>8</sup> It provides secure datasharing on the Munich scientific network and routine multi-omics tools and AI workbench for secure training and inference of medical models.
href:
    - ["ext", "<sup>1</sup>", "DigiMed Bayern", "https://www.digimed-bayern.de/en.html"]
    - ["ext", "<sup>2</sup>", "DigiMed Bayern: IT Conception and Infrastructure", "https://www.digimed-bayern.de/en/work-packages/wp-6it-conception-infrastructure.html"]
    - ["ext", "<sup>3</sup>", "DigiMed Secure Cloud documentation", "https://digimed.pages.gitlab.lrz.de/user-documentation/"]
    - ["ext", "<sup>4</sup>", "Deutschen Herzzentrum München", "https://deutsches-herzzentrum-muenchen.de"]
    - ["ext", "<sup>5</sup>", "Germany’s national genomDE strategy", "https://www.nature.com/articles/s41591-025-03991-2"]
    - ["ext", "<sup>6</sup>", "German Human Genome-Phenome Archive project", "https://www.ghga.de"]
    - ["ext", "<sup>7</sup>", "VRONI study", "https://doi.org/10.1093/eurpub/ckac007"]
    - ["ext", "<sup>8</sup>", "HerzFit mobile app backend", "https://herzstiftung.de/service-und-aktuelles/publikationen-und-medien/app"]
---

<style>
data h2 {
    margin-bottom: 0;
}

h1 + h2 {
    margin-top: 0;
}

ul li,
ol li {
    margin-bottom: 0.5em;
}

ul li:last-child,
ol li:last-child {
    margin-bottom: 0;
}
</style>

# Milestones

| Mile | Stone |
|-:|:-|
| **03.2026** | Nvidia H200 GPUs are online. |
| **09.2025** | The DigiMed future user group is created. |
| **07.2025** | The DigiMed Secure Cloud becomes one of the 6 nodes of the German Human Genome-Phenome Archive. |
| **03.2025** | Onboarding of the German Human Genome-Phenome Archive and Genome Computing Centre. |
| **12.2024** | The DigiMed Bayern Project is extended for another 3 years and 2.7Mio€ are granted by the Bavarian Ministry of Health and Care. |
| **11.2024** | The DigiMed team at Leibniz Supercomputing Centre becomes an independent group and forms the trustworthy branch of the Big Data and AI group. |
| **09.2024** | Inspection of the infrastructure by the data protection officer — Bayerische Landesbeauftragte für den Datenschutz. |
| **12.2023** | The DigiMed Secure Cloud is announced to the public. |
| **03.2022** | The first secure data transfer from the German Heart Centre Munich to the DigiMed Secure Cloud takes place. |
| **01.2022** | The first CPU nodes with confidential computing are online. |
| **11.2021** | The first petabyte of storage is online. |
| **(10.2018)** | (Kickstart of the DigiMed Bayern Project, 24Mio€ are granted by the Bavarian Ministry of Health and Care) |

# Contributions

## Papers
1. **Fully Anonymized Data Acquisition for Digital Health Research in a Public-Private Partnership : A Case Study Using the HerzFit App** (in review), 2025.
1. **High-performance Computing Systems: Security Threats, Countermeasures and Prospects** (in review), 2025.
1. **Comparative Overview of Medical Research Data Platforms: Interoperability, Privacy, and Federated Learning in Translational Biomedical Research** (in review), 2025.
1. N. Zhou, F. Dufour, V. Bode, P. Zinterhof, N. J. Hammer, and D. Kranzlmüller, **"Towards Confidential Computing: A Secure Cloud Architecture for Big Data Analytics and AI,"** in IEEE International Conference on Cloud Computing (IEEE CLOUD), (Chicago, Illinois, USA), 2023.

## Talks
- 2025: F. Dufour, Jan Peschke, **"How to build a confidential cloud"? — A platform for next generation medical research**, OpenInfra Sweden, Stockholm. ([link ➟]({% link _chantiers/2025/OpenInfra.md %})).
- 2024: F. Dufour, **"We built a Trusted Research Environment for health research — 10 strategic and technical lessons learned"**, in Medical Valley, Online.
- 2023: F. Dufour, **"Towards the Medicine of the Future in Bavaria and Germany, One Heartbeat at the Time With Confidential Computing"** in Open Confidential Computing Conference (OC3), Online. ([link ➟]({% link _chantiers/2023/OC3.md %}))

## Posters
1. F. Dufour, N. Zhou, V. Bode, P. Zinterhof, N. J. Hammer, D. Kranzlmüller, **"Towards Confidential Computing: A Cloud Architecture for Big Data Analytics and AI in Biomedical Research"**, in ISC, Hamburg, Germany, May 2023. 
1. N. Zhou, F. Dufour, V. Bode, P. Zinterhof, N. J. Hammer, D. Kranzlmüller, **" DigiMed Cloud: A Highly-Secure Cloud for Big Data Analytics and AI in Biomedical Research"**, in Hipeac, Munich, Germany, Jan 2024. 

## Supervision and co-supervision
- Vinzent Bode, **"Grundlagen der Informationssicherheit für Cloud-User am Beispiel der DigiMed Secure Cloud"**, Ludwig-Maximilians-Universität Munich. (2026)
- Julia Moosmayr, **"Umsetzung der C5-Kriterien für Cloud-Dienste im Gesundheitswesen am Beispiel der DigiMed Secure Cloud"**, Ludwig-Maximilians-Universität Munich. (2026)
- Yassine Sfar, **"DigiMed Trusted Research Environment: Strategic Market Positioning for Healthcare Sovereignty, Privacy, and Utility of Medical Data"**, Technical University of Munich (2025).
- Valentin Pfeil, **"Confidential Computing Via Hardware Trusted Execution Environments by an OpenStack HPC Capable Cloud"**, University of the Bundeswehr Munich (2024).

## Press releases
- **2026**: Neue Gesundheits-Cloud: Bayern bündelt medizinische Daten ([link ➟](https://table.media/ceo/news/neue-gesundheits-cloud-bayern-buendelt-medizinische-daten))
- **2025**: Building Secure and Scalable Cloud Infrastructure for Medical Data: DigiMed Bayern and the Role of Quobyte ([link ➟](https://www.quobyte.com/blog/building-secure-and-scalable-cloud-infrastructure-for-medical-data/))
- **2024**: Blueprint for a data-protection-compliant, secure data cloud ([english ➟](https://www.lrz.de/presse/ereignisse/2024-04-03-Secure-Cloud/), [german ➟](https://www.lrz.de/presse/ereignisse/2024-04-03-Sichere-Cloud/)).
- **2024**: Preventing heart attacks and strokes: with cholesterol
measurement in children, digital heart management and data use ([link ➟](https://www.bio-m.org/fileadmin/Webdata/Uploads/Veranstaltungen/2024/DigiMed/20241107_Press_release_Preventing_heart_attacks_and_strokes.pdf)).
- **2023**: DigiMed Bayern flagship project launches its "Secure Cloud" at symposium on data-driven medicine ([link ➟](https://www.pressebox.com/pressrelease/biom-biotech-cluster-development-gmbh/DigiMed-Bayern-flagship-project-launches-its-Secure-Cloud-at-symposium-on-data-driven-medicine/boxid/1183210))