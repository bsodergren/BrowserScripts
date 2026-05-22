// ==UserScript==
// @name        Adulttime Actiontag script
// @match        https://members.adulttime.com/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @version     1.3.2
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require https://update.greasyfork.org/scripts/578336/1826440/Bs%20ToastPopup.js
// @description 4/28/2026, 6:34:22 AM
// @downloadURL https://update.greasyfork.org/scripts/578332/Adulttime%20Actiontag%20script.user.js
// @updateURL https://update.greasyfork.org/scripts/578332/Adulttime%20Actiontag%20script.meta.js
// ==/UserScript==
;
(function() {
	waitForElement('.VideoJSPlayer-DownloadOptionSubTitle-Link', el => {
		el.onclick = getSubtitle
	})
	// Example usage:
	waitForElement('.ScenePlayerHeaderPlus-ActionTagsButtonToggleWrapper', el => {
		var linkGrabberBtn = document.createElement('button')
		linkGrabberBtn.id = 'MarkerButton'
		linkGrabberBtn.onclick = getVideoLinks
		var span = document.createElement('span')
		span.innerText = 'Get Video Markers'
		span.className = 'text'
		linkGrabberBtn.appendChild(span)
		el.appendChild(linkGrabberBtn)
	})

	function getSubtitle() {
		var downloadEl = document.getElementsByClassName('VideoJSPlayer-DownloadOptionSubTitle-Link')
		href = downloadEl[0].href
		downloadEl[0].href = '#'
		var titleElement = document.getElementsByClassName('ScenePlayerHeaderPlus-SceneTitle-Title')
		title = titleElement[0].innerText
		subtitle = {
			VideoName: title,
			Subtitle: href
		}
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
		lenSplit = Lentext.split(' of ')
		Videolength = lenSplit[1]
		people.push({
			VideoName: title,
			VideoLen: Videolength
		})
		for (var i = 0; i < VideoList.length; i++) {
			markerName = VideoList[i].getAttribute('data-tip')
			position = VideoList[i].getAttribute('position')
			people.push({
				Marker: markerName,
				Position: position
			})
		}
		saveToText(people, 'saveAdulttimeJson')
	}

	function saveToText(Formdata, action) {
		var b = null
		if (action === 'saveAdulttimeSubtitle') {
			toastText = 'Saved Subtitles'
		}
		if (action === 'saveAdulttimeJson') {
			toastText = 'Saved Action Tag Data'
			b = document.getElementById('MarkerButton')
		}
		var jsonstr = JSON.stringify(Formdata)
		jsonstr = encodeURIComponent(jsonstr)
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://media.lan/plex/process.php',
			data: encodeURI('class=Forms&action=' + action + '&text=' + jsonstr),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		showToast(toastText, 3000, b)
	}
	// unsafeWindow.getVideoLinks = getVideoLinks
	// unsafeWindow.getVideoLinks = getSubtitle
})()
