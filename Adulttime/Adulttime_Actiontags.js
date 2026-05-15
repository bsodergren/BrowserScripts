// ==UserScript==
// @name        Adulttime Actiontag script
// @namespace   Violentmonkey Scripts
// @match        https://members.adulttime.com/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @version     1.2.1
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @description 4/28/2026, 6:34:22 AM
// ==/UserScript==

; (function () {
    function showToast(message, duration = 3000, element = null) {
        // Create toast container if it doesn't exist
        let container = document.getElementById('tm-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'tm-toast-container';
            container.style.position = 'fixed';
            container.style.top = '20px';
            container.style.left = '20px';
            container.style.zIndex = '999999';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.gap = '10px';
            document.body.appendChild(container);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.background = 'rgba(0, 0, 0, 0.85)';
        toast.style.color = '#fff';
        toast.style.padding = '10px 16px';
        toast.style.borderRadius = '6px';
        toast.style.fontSize = '18px';
        toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        toast.style.opacity = '0.5';
        toast.style.transition = 'opacity 0.3s ease';

        container.appendChild(toast);

        // Fade in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
        });

        // Remove after duration
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.addEventListener('transitionend', () => {
                toast.remove();
                if (element !== null) {
                    element.remove()
                }
            });
        }, duration);
    }



    function waitForElement(selector, callback) {
        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector);
            if (element) {
                observer.disconnect(); // Stop observing
                callback(element);
            }
        });

        // Observe changes in the entire document
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    waitForElement('.VideoJSPlayer-DownloadOptionSubTitle-Link', (el) => {
        el.onclick = getSubtitle;
    });



    // Example usage:
    waitForElement('.ScenePlayerHeaderPlus-ActionTagsButtonToggleWrapper', (el) => {
        var linkGrabberBtn = document.createElement('button');
        linkGrabberBtn.id = "MarkerButton";
        linkGrabberBtn.onclick = getVideoLinks;
        var span = document.createElement('span');
        span.innerText = 'Get Video Markers';
        span.className = 'text';
        linkGrabberBtn.appendChild(span);
        el.appendChild(linkGrabberBtn);
    });


    function getSubtitle() {
        var downloadEl = document.getElementsByClassName('VideoJSPlayer-DownloadOptionSubTitle-Link');
        href = downloadEl[0].href
        downloadEl[0].href = "#"
        var titleElement = document.getElementsByClassName('ScenePlayerHeaderPlus-SceneTitle-Title')
        title = titleElement[0].innerText
        subtitle = { VideoName: title, Subtitle: href }
        saveToText(subtitle, 'saveAdulttimeSubtitle')
    }

    // Ensure script runs only after DOM is ready

    function getVideoLinks() {
        // Example: Change background color
        let people = []
        var VideoList = document.querySelectorAll('.vjs-marker')

        var titleElement = document.getElementsByClassName('ScenePlayerHeaderPlus-SceneTitle-Title')
        title = titleElement[0].innerText
        pro = document.getElementsByClassName('vjs-progress-holder')
        Lentext = pro[0].getAttribute('aria-valuetext')
        lenSplit = Lentext.split(" of ")
        Videolength = lenSplit[1]
        people.push({ VideoName: title, VideoLen: Videolength })

        for (var i = 0; i < VideoList.length; i++) {
            markerName = VideoList[i].getAttribute('data-tip')
            position = VideoList[i].getAttribute('position')
            people.push({ Marker: markerName, Position: position })
        }
        saveToText(people, 'saveAdulttimeJson')
    }


    function saveToText(Formdata, action) {

        var b = null
        if (action === "saveAdulttimeSubtitle") {
            toastText = "Saved Subtitles"
        }
        if (action === "saveAdulttimeJson") {
            toastText = "Saved Action Tag Data"
            b = document.getElementById("MarkerButton")
        }


        var jsonstr = JSON.stringify(Formdata)
        jsonstr = encodeURIComponent(jsonstr)
        GM_xmlhttpRequest({
            method: 'POST',
            url: "http://media.lan/plex/process.php",
            data: encodeURI("class=Forms&action=" + action + "&text=" + jsonstr),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        showToast(toastText, 3000, b)

    }
    // unsafeWindow.getVideoLinks = getVideoLinks
    // unsafeWindow.getVideoLinks = getSubtitle
})()
