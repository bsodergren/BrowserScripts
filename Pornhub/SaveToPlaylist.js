// ==UserScript==
// @name       Pornhub - Save to local playlist
// @namespace https://greasyfork.org/users/984905
// @match        https://*.pornhub.com/*
// @match        https://*.pornhub.org/*
// @match        https://*.pornhubpremium.com/*
// @match        https://*.pornhubpremium.org/*
// @grant       GM_xmlhttpRequest
// @version     1.2
// @author      Bjorn
// @run-at       document-end
// @description 4/28/2026, 6:34:22 AM
// @require https://update.greasyfork.org/scripts/578336/1826440/Bs%20ToastPopup.js
// ==/UserScript==


; (function () {
    'use strict';
    showToast("loaded",3000);

    let d = document.getElementsByClassName('row-5-thumbs');
    if (typeof d[0] !== "undefined") {
        console.log(d[0]);
        d[0].setAttribute("style", '    grid-template-columns: repeat(2, minmax(0, 1fr));')
    }

    let savedLinks = [];
    document.addEventListener('contextmenu', function (e) {
        if (e.ctrlKey && e.shiftKey) {
            const link = e.target.closest('a');
            if (link && link.href) {
                e.preventDefault(); // prevent default context menu
                saveToText(link.href)
            }
        }
    });

    function saveToText(Formdata) {
        console.log(Formdata)
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://media.lan/plex/pledit.php",
            data: encodeURI("file=PhClicked.txt&action=addToPlaylist&text=" + Formdata),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        showToast("Saved to playlist", 3000)
    }
}());
