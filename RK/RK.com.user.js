// ==UserScript==
// @name        RealityKings.com
// @match      https://site-ma.realitykings.com/scene/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/VideoMetadata.js?461015
// @require http://media.lan/scripts/ScriptReq/Additional.js?931082
// @version     1.6.2
// @author      -
// @description 5/14/2026, 8:26:35 AM
// ==/UserScript==

class realitykings extends VideoMetaData
{
	setup()
	{
		// this.videoPlaylist = document.querySelector('.title-zone')
	}

	getFormatedVideoTitle(str)
	{
		var videoTitle = str.toLowerCase();
		videoTitle = videoTitle.replaceAll('-', '');
		return this.getBefore(videoTitle, '_');
	}

	getSearchTitle(str)
	{
		var titletxt = str.replaceAll(' ', '-').toLowerCase();
		titletxt = titletxt.replaceAll("'", '-');
		titletxt = titletxt.replaceAll('-', '');
		return titletxt;
	}

	getVideoFile()
	{
		var lenEl = document.querySelector('.vjs-duration-display');
		this.Videolength = lenEl.innerHTML;

		var downloadList = document.querySelectorAll('head > meta');
		downloadList.forEach((el) =>
		{
			if (el.name == 'dti.url')
			{
				var urlstr = el.content.split('/');
				this.video_file = urlstr[urlstr.length - 1] + '_1080p.mp4';
			}
		});
	}

	getVideoGenreList()
	{
		var divList = document.querySelectorAll('.sc-vdkjux-0');
		divList.forEach((divEl) =>
		{
			this.genreList.push(divEl.innerHTML);

		});
	}

	getVideoTitle()
	{
		var hElement = document.querySelector('.sc-1b6bgon-3');
		this.title = hElement.innerHTML;

	}

	getVideoActors()
	{
		var hElement = document.querySelectorAll('.sc-1b6bgon-8');

		hElement.forEach((hel) =>
		{
			var actorName = hel.innerHTML;
			this.actorList.push(actorName);
			// console.log(videoTitle + ' = ' + titletxt);

		});
	}

	getActionTags()
	{
		var t = document.querySelectorAll(".sc-2t5ssm-2")
		t.forEach((el) =>
		{
			var titleEl = el.querySelectorAll(".sc-2t5ssm-4")
			// console.log(titleEl[0])
			var tagTitle = titleEl[0].innerText
			var timeNodes = el.querySelectorAll(".sc-2t5ssm-7")
			timeNodes.forEach((tNode) =>
			{
				var timeCode = tNode.innerText;
				this.markers.push({
					Marker: tagTitle,
					timeCode: this.timeToSeconds(timeCode)
				})
				// this.markers.push({[this.timeToSeconds(timeCode)]: tagTitle})
			});
		})
	}
}

(function ()
{
	waitForElement('div > a.active', (el) =>
	{
		var markerBtn = el.cloneNode(true);
		markerBtn.classList.remove('active');
		markerBtn.innerHTML = 'Get Data';
		markerBtn.removeAttribute('href');
		markerBtn.onclick = getVideoInfo;
		el.parentNode.appendChild(markerBtn);
	});

	function getVideoInfo()
	{
		MetaData = new realitykings();
		// console.log(MetaData.people )
		MetaData.getVideoDetails();
		// console.log(MetaData.people )
		MetaData.getActionTags();
		// console.log(MetaData.people )

		// MetaData.getVideoActors();
		// MetaData.getVideoTitle();
		// MetaData.getVideoGenreList();
		//  MetaData.people = {
		// 	title: MetaData.title,
		//     markers: MetaData.markers,
		//     Genre: MetaData.genreList,
		//     Actors: MetaData.actorList
		// 	        }


		MetaData.people['VideoLen'] = MetaData.Videolength;
		MetaData.people['Markers'] = MetaData.markers;
			// console.log(MetaData.people )
		MetaData.sendToServer();

	}

	unsafeWindow.realitykings = realitykings;
	unsafeWindow.getVideoInfo = getVideoInfo
})();
