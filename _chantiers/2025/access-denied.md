---
layout: chantier
title: Access denied
started: 2025-02-19 13:30
ended: 2025-02-19 13:30
labels: [web]
---

<style>
.native-alert {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #DDDDDD;
    border: 2px solid #000;
    box-shadow: 2px 2px 0px #000;
    width: 300px;
    font-family: "Chicago", "Geneva", system-ui;
    z-index: 1000;
}

.native-alert-title {
    background: #000;
    color: white;
    padding: 4px 6px;
    font-weight: normal;
    text-align: center;
    font-size: 14px;
}

.native-alert-content {
    padding: 20px;
    text-align: center;
    font-size: 12px;
    line-height: 1.4;
}

.native-alert-buttons {
    padding: 10px;
    text-align: center;
    margin-bottom: 10px;
}

.native-button {
    min-width: 60px;
    padding: 3px 8px;
    border: 2px solid #000;
    border-radius: 0;
    background: #DDDDDD;
    font-family: "Chicago", "Geneva", system-ui;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    box-shadow: 2px 2px 0px #000;
    position: relative;
}

.native-button:active {
    left: 1px;
    top: 1px;
    box-shadow: 1px 1px 0px #000;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(50, 50, 50, 0.5);
    z-index: 999;
}
</style>

<div class="overlay"></div>
<div class="native-alert">
    <div class="native-alert-title">
        Access Denied
    </div>
    <div class="native-alert-content">
        This incident will be reported.
    </div>
    <div class="native-alert-buttons">
        <button class="native-button" onclick="window.location.href='/'">Report</button>
    </div>
</div>

<script>
/* Store the current URL */
const currentUrl = window.location.href;

/* Add initial history entries */
for (let i = 0; i < 10; i++) {
    history.pushState(null, '', currentUrl);
}

/* Handle back button clicks */
window.addEventListener('popstate', function(e) {
    /* Add more history entries */
    for (let i = 0; i < 5; i++) {
        history.pushState(null, '', currentUrl);
    }
});

/* Handle any clicks on the page */
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        history.pushState(null, '', currentUrl);
    }
});

/* Report by Enter button */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') window.location.href='/';
});
</script>

▎