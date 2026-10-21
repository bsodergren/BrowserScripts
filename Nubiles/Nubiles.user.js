// ==UserScript==
// @name        MomLover.com
// @match      https://members.momlover.com/video/watch/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/VideoMetadata.js?441951
// @require http://media.lan/scripts/ScriptReq/Additional.js?489243
// @version     1.0.5
// @author      -
// @description 5/14/2026, 8:26:35 AM
// ==/UserScript==


class MomLover extends VideoMetaData
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
		var videolink = dom.attr(qs('meta[property="og:video"]'), 'content')
		// this.Videolength = lenEl.innerHTML;
    var vpcs = videolink.split("?")

    var l = vpcs[0].split("/").length

    this.video_file  = vpcs[0].split("/")[l-1].split("_trailer")[0]

    this.s


	}

	getVideoGenreList()
	{
		var keyStr = dom.attr(qs('meta[name="keywords"]'), 'content')
    var divList = keyStr.split(",")

		divList.forEach((divEl) =>
		{
			this.genreList.push(divEl);

		});
	}

	getVideoTitle()
	{

   this.title = dom.attr(qs('meta[property="og:title"]'), 'content')
    var lenEl = document.querySelector("span.vjs-remaining-time-display")
    this.Videolength = lenEl.innerText

    var studioEl = document.querySelector(".content-pane-title > a.site-link")
    var studioName = this.getBefore(studioEl.innerText, ".")
    var pcs = studioName.split(/(?=[A-Z])/);
    this.studioName = pcs.join(" ");
    console.log( this.studioName)

     this.NetworkName = dom.attr(qs('meta[property="og:site_name"]'), 'content')
		// var hElement = document.querySelector('.content-pane-title > h2');
    // console.log(hElement)
		// this.title = hElement.innerHTML;

	}

	getVideoActors()
	{
		var hElement = document.querySelectorAll('.content-pane-performer.model');

		hElement.forEach((hel) =>
		{
			var actorName = hel.innerHTML;
			this.actorList.push(actorName);
			// console.log(videoTitle + ' = ' + titletxt);

		});
	}

	getActionTags()
	{

	}
}

(function ()
{
	waitForElement('div > .content-pane-related-links', (el) =>
	{

    var btnGroup = document.createElement('div')
    btnGroup.classList.add('btn-group')

    var dataBtn = document.createElement('button')
    dataBtn.classList.add("btn")
    dataBtn.classList.add("btn-primary")
		dataBtn.innerHTML = 'Get Data';
		dataBtn.onclick = getVideoInfo;

    btnGroup.appendChild(dataBtn);
		el.appendChild(btnGroup);
	});

	function getVideoInfo()
	{
		MetaData = new MomLover();
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
    MetaData.people['Studio'] = MetaData.studioName;
    MetaData.people['Network'] = MetaData.NetworkName;



		MetaData.sendToServer();

	}

	unsafeWindow.MomLover = MomLover;
	unsafeWindow.getVideoInfo = getVideoInfo
})();
