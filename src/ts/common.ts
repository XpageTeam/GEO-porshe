require("../sss/main.sss")

import {App, Element} from "./app"
import {TweenLite} from "gsap"
require("gsap/ScrollToPlugin.js")

App.domReady(() => {

	const $body = new Element("body");

	setTimeout(function(){
		$body.addClass("loaded").removeClass("loading")
	}, 300)

	const _duration = 0.5;
	const _distance: number = 200;

	const onScroll = (e: any) => {
		e.preventDefault();
										
		var _delta: number = parseFloat(e.wheelDelta)/120 || -parseFloat(e.detail)/3;
		var _scrollTop = window.scrollY;
		var _finalScroll = _scrollTop - _delta*_distance;
			
		TweenLite.to(window, _duration, {
			scrollTo : {
				y: _finalScroll,
				x: 0,
			},
			autoKill: true,
			overwrite: 5							
		});
	}	

	document.addEventListener("mousewheel", onScroll)
	document.addEventListener("touchmove", onScroll)
	document.addEventListener("DOMMouseScroll", onScroll)
})