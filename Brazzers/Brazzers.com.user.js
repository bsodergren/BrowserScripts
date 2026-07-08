// ==UserScript==
// @name        Brazzers.com
// @match      https://site-ma.brazzers.com/scene/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/VideoMetadata.js?639087
// @require http://media.lan/scripts/ScriptReq/Additional.js?482283
// @version     1.3.6
// @author      -
// @description 5/14/2026, 8:26:35 AM
// ==/UserScript==

class brazzers extends VideoMetaData {
	setup() {
		// this.videoPlaylist = document.querySelector('.title-zone')
	}

	getFormatedVideoTitle(str) {
		var videoTitle = str.toLowerCase();
		videoTitle = videoTitle.replaceAll('-', '');
		return this.getBefore(videoTitle, '_');
	}

	getSearchTitle(str) {
		var titletxt = str.replaceAll(' ', '-').toLowerCase();
		titletxt = titletxt.replaceAll("'", '-');
		titletxt = titletxt.replaceAll('-', '');
		return titletxt;
	}

	getVideoFile() {
		var downloadList = document.querySelectorAll('head > meta');
		downloadList.forEach((el) => {
			if (el.name == 'dti.url') {
				var urlstr = el.content.split('/');
				this.video_file = urlstr[urlstr.length - 1] + '_1080p.mp4';
				return true;
			}
		});
	}

	getVideoGenreList() {
		var divList = document.querySelectorAll('div>h2');
		divList.forEach((divEl, idx) => {
			if (divEl.innerText == 'INFORMATION') {
				var next = divList[idx].parentNode.parentNode.childNodes;
				var children = next[1].childNodes[1].childNodes;
				children.forEach((cEl) => {
					this.genreList.push(cEl.innerHTML);
				});
				return true;
			}
		});
	}

	getVideoTitle() {
		if (this.video_file == '') {
			this.getVideoFile();
		}

		var videoTitle = this.getFormatedVideoTitle(this.video_file);

		var hElement = document.querySelectorAll('h2');

		hElement.forEach((hel) => {
			var titletxt = this.getSearchTitle(hel.innerHTML);
			if (videoTitle == titletxt) {
				this.title = hel.innerHTML;
				return true;
			}
		});
	}

	getVideoActors() {
		if (this.video_file == '') {
			this.getVideoFile();
		}

		var videoTitle = this.getFormatedVideoTitle(this.video_file);

		var hElement = document.querySelectorAll('h2');

		hElement.forEach((hel) => {
			var titletxt = this.getSearchTitle(hel.innerHTML);
			// console.log(videoTitle + ' = ' + titletxt);
			if (videoTitle == titletxt) {
				var parentElement = hel.parentNode;
				var aList = parentElement.querySelectorAll('a');
				aList.forEach((m) => {
					this.actorList.push(m.title);
				});

				return true;
			}
		});
	}
}

(function () {
	waitForElement('div > a.active', (el) => {
		var markerBtn = el.cloneNode(true);
		markerBtn.classList.remove('active');
		markerBtn.innerHTML = 'Get Data';
		markerBtn.removeAttribute('href');
		markerBtn.onclick = getVideoInfo;
		el.parentNode.appendChild(markerBtn);
	});

	function getVideoInfo() {
		MetaData = new brazzers();
		MetaData.sendToServer();

	}

	unsafeWindow.brazzers = brazzers;
})();
