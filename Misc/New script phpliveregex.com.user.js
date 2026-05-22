// ==UserScript==
// @name        New script phpliveregex.com
// @namespace   Violentmonkey Scripts
// @match       https://www.phpliveregex.com/*
// @grant       none
// @version     1.0.1
// @author      -
// @description 2/21/2026, 4:33:15 AM
// ==/UserScript==
(function() {
	container = document.querySelector('body > .container')
	console.log(container)
	container.setAttribute('style', 'width:90%')
	console.log(container)
	examples = document.querySelector('#examples')
	examplesdiv = examples.parentElement
	examplesdiv.setAttribute('class', 'col-md-7')
	result = document.querySelector('#result-tabs')
	resultdiv = result.parentElement
	resultdiv.setAttribute('class', 'col-md-5')
})();
