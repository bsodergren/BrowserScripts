// ==UserScript==
// @name       Pornhub - Make thumbnails better & larger
// @namespace https://greasyfork.org/users/984905
// @match        https://*.pornhub.com/*
// @match        https://*.pornhub.org/*
// @match        https://*.pornhubpremium.com/*
// @match        https://*.pornhubpremium.org/*
// @version     1.0.3
// @author      Bjorn
// @run-at       document-end
// @description
// ==/UserScript==

; (function () {
    'use strict';

    let d = document.getElementsByClassName('row-5-thumbs');
    if (typeof d[0] !== "undefined") {
        d[0].setAttribute("style", 'grid-template-columns: repeat(2, minmax(0, 1fr));')
    }

}());
