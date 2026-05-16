// ==UserScript==
// @name       Pornhub - Save file URL to local playlist
// @namespace https://greasyfork.org/users/984905
// @match        https://*.pornhub.com/*
// @match        https://*.pornhub.org/*
// @match        https://*.pornhubpremium.com/*
// @match        https://*.pornhubpremium.org/*
// @grant       GM_xmlhttpRequest
// @version     1.2.3
// @author      Bjorn
// @run-at       document-end
// @description 4/28/2026, 6:34:22 AM
// @require http://media.lan/scripts/ScriptReq/Additional.js?v645
// ==/UserScript==


; (function () {
    'use strict';

    let d = document.getElementsByClassName('row-5-thumbs');
    if (typeof d[0] !== "undefined") {
        d[0].setAttribute("style", 'grid-template-columns: repeat(2, minmax(0, 1fr));')
    }

    let savedLinks = [];
    document.addEventListener('contextmenu', function (e) {
        if (e.ctrlKey && e.shiftKey) {
            const link = e.target.closest('a');
            if (link && link.href) {
                e.preventDefault(); // prevent default context menu

                data = {
                    file: "PhClicked.txt",
                    action: "addToPlaylist",
                    text: link.href
                }
                saveToLocalServer("pledit.php", data, "Saved to playlist")
            }
        }
    });

}());
