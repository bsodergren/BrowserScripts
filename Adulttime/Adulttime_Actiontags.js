// ==UserScript==
// @name        Adulttime Actiontag script
// @match        https://members.adulttime.com/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @version     1.6.7
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/Additional.js?683029
// @description 4/28/2026, 6:34:22 AM
// ==/UserScript==


(function () {
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
		data = {
			action: 'saveAdulttimeSubtitle',
			class: 'Form',
			text: JSON.stringify(subtitle)
		}
		saveToLocalServer('process.php', data, 'Saved Subtitles')
	}
	// Ensure script runs only after DOM is ready
	function getVideoLinks() {
		// Example: Change background color
		let people = []
		let markers = []
		let genreList = []
		let actorList = []

		var VideoList = document.querySelectorAll('.vjs-marker')
		var titleElement = document.getElementsByClassName('ScenePlayerHeaderPlus-SceneTitle-Title')
		title = titleElement[0].innerText
		pro = document.getElementsByClassName('vjs-progress-holder')
		Lentext = pro[0].getAttribute('aria-valuetext')
		lenSplit = Lentext.split(' of ')
		Videolength = lenSplit[1]

		d = document.querySelectorAll(".ActorImage-BackgroundBox")

		for (var i = 0; i < d.length; i++) {
			var parent = d[i].parentElement
			actor = parent.innerText
			actorList.push(actor)
		}

		g = document.querySelectorAll(".ButtonList-Button")
		for (var i = 0; i < g.length; i++) {
			genre = g[i].innerText
			genreList.push(genre)
		}

		for (var i = 0; i < VideoList.length; i++) {
			markerName = VideoList[i].getAttribute('data-tip')
			position = VideoList[i].getAttribute('position')
			markers.push({
				Marker: markerName,
				Position: position
			})
		}

		people = {
			VideoName: title,
			VideoLen: Videolength,
			Markers: markers,
			Genre: genreList,
			Actors: actorList
		}

		data = {
			action: 'saveAdulttimeJson',
			class: 'Form',
			text: JSON.stringify(people)
		}
		saveToLocalServer('process.php', data, 'Saved Markers')
	}

	function removeMarkerButton() {
		b = document.getElementById('MarkerButton')
	}
	// function saveToText(Formdata, action) {
	//   var b = null
	//   if (action === 'saveAdulttimeSubtitle') {
	//     toastText = 'Saved Subtitles'
	//   }
	//   if (action === 'saveAdulttimeJson') {
	//     toastText = 'Saved Action Tag Data'
	//     b = document.getElementById('MarkerButton')
	//   }
	//   var jsonstr = JSON.stringify(Formdata)
	//   jsonstr = encodeURIComponent(jsonstr)
	//   GM_xmlhttpRequest({
	//     method: 'POST',
	//     url: 'http://media.lan/plex/process.php',
	//     data: encodeURI('class=Forms&action=' + action + '&text=' + jsonstr),
	//     headers: {
	//       'Content-Type': 'application/x-www-form-urlencoded'
	//     }
	//   })
	//   showToast(toastText, 3000, b)
	// }
	// unsafeWindow.getVideoLinks = getVideoLinks
	// unsafeWindow.getVideoLinks = getSubtitle
}());
