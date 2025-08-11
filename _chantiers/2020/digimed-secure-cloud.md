---
layout: chantier
highlighted: true
title: DigiMed Secure Cloud
started:  2020-09-01 09:00
#ended: 2027-11-30 17:00
location: [Leibniz Supercomputing Centre]
result: [research]
tech: [OpenStack, AMD-SEV/SNP, Nvidia H200, Quobyte]
href:
  - ["ext", "<b>Consortium website:</b>", "digimed-bayern.de ➟", "https://www.digimed-bayern.de/en.html"]
  - ["ext", "<b>Cloud documentation:</b>", "pages.gitlab.lrz.de ➟", "https://digimed.pages.gitlab.lrz.de/user-documentation/"]
description: |
    The goal of the DigiMed Bayern Project is to advance the digital transformation of Bavaria’s health system. With a focus on the secondary use of cardiovascular research data from university hospitals and research institutes, it integrates sensitive clinical, imaging, and multi-omic data to enable better, data-driven medicine. This approach supports more accurate prediction of disease risks, more targeted prevention, and improved diagnosis and treatment — starting with cardiovascular diseases but designed to be transferable to other conditions.
    <br><br>
    Under Work Package 6, which focuses on the storage and compute infrastructure, I contributed to the design and deployment of a secure, privacy-compliant cloud platform for integrating, sharing, and analyzing large-scale biomedical data. This included developing an architecture that replaces existing data silos, implements FAIR data principles, and supports AI-driven analytics. The infrastructure is built for scalability, interoperability, and long-term sustainability, providing a foundation for collaborative research and clinical translation.
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
| **09.2025** | The DigiMed future user group is created. |
| **07.2025** | The DigiMed Secure Cloud becomes one of the 6 nodes of the German Human Genome-Phenome Archive. |
| **03.2025** | Onboarding of the German Human Genome-Phenome Archive and Genome Computing Centre. |
| **12.2024** | The DigiMed Bayern Project is extended for another 3 years and 2.7Mio€ are granted by the Bavarian Ministry of Health and Care. |
| **11.2024** | The DigiMed team of the Leibniz Supercomputing Centre becomes its own group and becomes the trustworthy branch of the Big Data and AI group. |
| **09.2024** | Inspection of the infrastructure by the data protection officer — Bayerische Landesbeauftragte für den Datenschutz. |
| **12.2023** | The DigiMed Secure Cloud is announced to the public. |
| **03.2022** | The first secure data transfer from the German Heart Centre Munich to the DigiMed Secure Cloud takes place. |
| **01.2022** | The first CPU nodes with confidential computing are online. |
| **11.2021** | The first petabyte of storage is online. |
| **(10.2018)** | (Kickstart of the DigiMed Bayern Project, 24Mio€ are granted by the Bavarian Ministry of Health and Care) |

# Contributions

## Papers
1.  **Comparative Overview of Medical Research Data Platforms: Interoperability, Privacy, and Federated Learning in Translational Biomedical Research** (in review), 2025.
1. N. Zhou, F. Dufour, V. Bode, P. Zinterhof, N. J. Hammer, and D. Kranzlmüller, **"Towards Confidential Computing: A Secure Cloud Architecture for Big Data Analytics and AI,"** in IEEE International Conference on Cloud Computing (IEEE CLOUD), (Chicago, Illinois, USA), 2023.

## Talks
- 2025: F. Dufour, Jan Peschke, **"How to build 
a confidential cloud"? — A platform for next generation medical research**, OpenInfra Sweden, Stockholm. ([link]({% link _chantiers/2025/OpenInfra.md %})).
- 2024: F. Dufour, **"We built a Trusted Research Environment for health research - 10 strategic and technical lessons learned"**, in Medical Valley, Online.
- 2023: F. Dufour, **"Towards the Medicine of the Future in Bavaria and Germany, One Heartbeat at the Time With Confidential Computing"** in Open Confidential Computing Conference (OC3), Online. ([link]({% link _chantiers/2023/OC3.md %}))

## Posters
1. F. Dufour, N. Zhou, V. Bode, P. Zinterhof, N. J. Hammer, D. Kranzlmüller, **"Towards Confidential Computing: A Cloud Architecture for Big Data Analytics and AI in Biomedical Research (poster),",** in ISC, Hamburg, Germany, May 2023. 
1. N. Zhou, F. Dufour, V. Bode, P. Zinterhof, N. J. Hammer, D. Kranzlmüller, **" DigiMed Cloud: A Highly-Secure Cloud for Big Data Analytics and AI in Biomedical Research (poster)",** in Hipeac, Munich, Germany, Jan 2024. 

## Supervision and co-supervision
- Vinzent Bode, **"tbd.",** Ludwig-Maximilians-Universität Munich. (2025)
- Julia Moosmayr, **"Implementierung von ausgewählten C5-Kriterien für Cloud-Dienste im Gesundheitswesen unter Berücksichtigung von NIS2 und ISO 27001: Eine Fallstudie der DigiMed Secure Cloud"** (2025)
- Yassine Sfar, **"DigiMed Trusted Research Environment: Strategic Market Positioning for Healthcare Sovereignty, Privacy, and Utility of Medical Data"**, Technical University of Munich (2025).
- Valentin Pfeil, **"Confidential Computing Via Hardware Trusted Execution Environments by an Openstack HPC Capable Cloud"**, University of the Bundeswehr Munich (2024).


## Press releases
- **2025**: Building Secure and Scalable Cloud Infrastructure for Medical Data: DigiMed Bayern and the Role of Quobyte ([link](https://www.quobyte.com/blog/building-secure-and-scalable-cloud-infrastructure-for-medical-data/))
- **2024**: Blueprint for a data-protection-compliant, secure data cloud ([english](https://www.lrz.de/presse/ereignisse/2024-04-03-Secure-Cloud/), [german](https://www.lrz.de/presse/ereignisse/2024-04-03-Sichere-Cloud/))
- **2024**: Preventing heart attacks and strokes: with cholesterol
measurement in children, digital heart management and data use ([link](https://www.bio-m.org/fileadmin/Webdata/Uploads/Veranstaltungen/2024/DigiMed/20241107_Press_release_Preventing_heart_attacks_and_strokes.pdf))
- **2023**: DigiMed Bayern flagship project launches its "Secure Cloud" at symposium on data-driven medicine ([link](https://www.pressebox.com/pressrelease/biom-biotech-cluster-development-gmbh/DigiMed-Bayern-flagship-project-launches-its-Secure-Cloud-at-symposium-on-data-driven-medicine/boxid/1183210))