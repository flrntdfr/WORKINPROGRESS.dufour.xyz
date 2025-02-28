---
layout: chantier
title: .com
tags: list
started: 2022-09-26 15:07
finished: 2022-12-26 18:54
featured: false
description: |
    Short intro on .com bubble. Relevance of .com domains still today.
    C'est un script Js qui test si un domaine est registered (mais sans utiliser d'API. dig?)
    C'est un tableau avec les noms de domaines en temps réal: rouge = registered / green = still free to register.
    Someone who sees that can register the domain for fun, will appear red on the table.
    En acheter 2/3 d'avance?
    Donner depuis quand registered?
    En trouver des fous qui sont registered
    Une troisièmes colonne avec le prix pour les libres
---

Voice.com - Sold for $30 million in 2019.
360.com - Sold for $17 million in 2015.
Sex.com - Sold for $13 million in 2010.
Fund.com - Sold for $9.99 million in 2008.
Hotels.com - Sold for $11 million, exact date varies.

<style>
.domain-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

.domain-table th, .domain-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
}

.domain-table th {
    background-color: #f5f5f5;
}

.status-checking {
    color: #666;
}

.status-exists {
    color: red;
}

.status-free {
    color: green;
}
</style>

<table class="domain-table">
    <thead>
        <tr>
            <th>Domain</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody id="domainTableBody">
    </tbody>
</table>

<script>
const domains = [
    'com.com',
    'earth.com',
    'fart-in-a-box.com',
    `isthisart.com`,
    'mac.com',
    `pets.com`,
    'relentless.com',
    `symbolics.com`,
    `think.com`,
];

async function checkDomain(domain) {
    try {
        const response = await fetch(`https://${domain}`, {
            mode: 'no-cors',
            timeout: 5000,
            redirect: 'follow'
        });
        return {
            exists: true,
            status: 'Registered'
        };
    } catch (error) {
        try {
            const httpResponse = await fetch(`http://${domain}`, {
                mode: 'no-cors',
                timeout: 5000,
                redirect: 'follow'
            });
            return {
                exists: true,
                status: 'Registered'
            };
        } catch (httpError) {
            return {
                exists: false,
                status: 'Available'
            };
        }
    }
}

async function populateTable() {
    const tbody = document.getElementById('domainTableBody');
    
    for (const domain of domains) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${domain}</td>
            <td class="status-checking">Checking...</td>
        `;
        tbody.appendChild(row);
        
        const result = await checkDomain(domain);
        row.cells[1].textContent = result.status;
        row.cells[1].className = result.exists ? 'status-exists' : 'status-free';
    }
}


document.addEventListener('DOMContentLoaded', populateTable);
</script>

