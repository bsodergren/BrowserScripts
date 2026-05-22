// ==UserScript==
// @name        download private.com
// @namespace   Violentmonkey Scripts
// @match       https://members.private.com/*
// @grant       none
// @version     1.0.1
// @author      -
// @description 3/23/2026, 10:57:20 PM
// ==/UserScript==
(function() {
	'use strict';
	/**
	 * Converts MP4 links to trigger a download instead of opening.
	 */
	function forceDownloadLinks() {
		document.querySelectorAll('a[href$=".mp4"]').forEach(link => {
			// Skip if already processed
			onsole.log(link)
			if (link.dataset.forceDownload) return;
			link.dataset.forceDownload = 'true';
			link.addEventListener('click', function(e) {
				e.preventDefault();
				console.log(e)
				const url = link.href;
				const fileName = url.split('/').pop().split('?')[0] || 'video.mp4';
				// Create a hidden download link
				const a = document.createElement('a');
				a.href = url;
				a.download = fileName;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			});
		});
	}
	// Run on page load
	forceDownloadLinks();
	// Also run when new content is added dynamically
	const observer = new MutationObserver(forceDownloadLinks);
	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
})();
