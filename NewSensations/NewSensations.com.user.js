// ==UserScript==
// @name        newsensations.com
// @match       https://newsensations.com/members/gallery.php*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/Additional.js?596426
// @version     1.0.3
// @author      -
// @description 5/14/2026, 8:26:35 AM
// ==/UserScript==

(function () {
	function searchNodeListForText(nodes, searchText) {
		if (!(nodes instanceof NodeList)) {
			throw new TypeError('First argument must be a NodeList');
		}
		if (typeof searchText !== 'string') {
			throw new TypeError('Search text must be a string');
		}

		const matches = [];
		const lowerSearch = searchText.toLowerCase();

		nodes.forEach((node) => {
			if (node.textContent.toLowerCase().includes(lowerSearch)) {
				matches.push(node);
			}
		});

		return matches;
	}

	var ButtonRow = document.querySelectorAll('.ex-grid-item.ex-actions-row');
	var linkGrabberBtn = document.createElement('button');
	linkGrabberBtn.onclick = getVideoLinks;
	//     // linkGrabberBtn.classList.add('Button'); //playlistButtons tooltipTrig js-pop
	var span = document.createElement('span');
	span.innerText = 'Get Video Json';
	span.className = 'text';
	linkGrabberBtn.appendChild(span);
	ButtonRow[0].appendChild(linkGrabberBtn);

	function getVideoLinks() {
		// Example: Change background color
		let videoJson = [];
		let names = [];
		let VideoSeries = 'New Sensations';

		const listItems = document.querySelectorAll('div >.ex-grid-item > span');
		const found = searchNodeListForText(listItems, 'Series: ');

		console.log('Found elements:', found);

		// Highlight matches
		found.forEach((el) => {
			next = el.nextElementSibling;
			VideoSeries = next.innerText;
			console.log(next.innerText);
		});

		e = document.querySelector('.ex-player.is-paused');
		s = e.getAttribute('data-sources');
		array = JSON.parse(s);
		url = array[0].src;
		path = url.split('?', 1);
		pcs = path[0].split('/');
		filename = pcs[pcs.length - 1];

		videoTitleEl = document.querySelectorAll('div>.ex-grid-item > h4');
		videoTitle = videoTitleEl[0].innerText;

		link = document.querySelectorAll('div> .ex-grid-item > a');
		for (var i = 0; i < link.length; i++) {
			name = link[i].innerText;
			if (name !== '') {
				if (name !== VideoSeries) {
					names.push(name);
				}
			}
		}

		videoJson = {
			Network: 'New Sensations',
			Title: videoTitle,
			Studio: VideoSeries,
			Actors: names,
			video_file: filename,
		};

		data = {
			action: 'saveNewSensationsJson',
			class: 'WebHelper',
			text: JSON.stringify(videoJson),
		};
		saveToLocalServer('process.php', data, 'Saved Subtitles');
		// Your DOM manipulation code here
	}
})();
