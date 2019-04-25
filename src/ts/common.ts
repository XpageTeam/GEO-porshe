require("../sss/main.sss")

import {App, Element, EventListener} from "./app"
import {TweenLite, Power1} from "gsap"
// import {Power1} from "../js/EasePack.js"
require("gsap/ScrollToPlugin.js")

App.domReady(() => {

	const $body = new Element("body");

	setTimeout(function(){
		$body.addClass("loaded").removeClass("loading")
	}, 300)

	const _duration = 0.6;
	const _distance: number = 200;

	const onScroll = (e: any) => {
		e.preventDefault();
										
		var _delta: number = parseFloat(e.wheelDelta)/120 || -parseFloat(e.detail)/3;
		var _scrollTop = window.scrollY;
		var _finalScroll = _scrollTop - _delta*_distance;
			
		scrollTo(_finalScroll, _duration)
	}	

	App.each(".first-screen__text i > i", function(el: HTMLElement, i: number){
		el.style.transitionDelay = `${(i*100)}ms`
	})

	document.addEventListener("mousewheel", onScroll)
	//document.addEventListener("touchmove", onScroll)
	document.addEventListener("DOMMouseScroll", onScroll)
})

App.domReady(() => {
	const video: HTMLVideoElement = document.querySelector(".video__video"),
		$video = new Element(".video");

	let curVideoState = "paused";

	new EventListener(".video__play").add("click", (el: HTMLElement, e: Event) => {
		if (curVideoState == "paused")
			video.play()
		else
			video.pause()
	})

	new EventListener(video).add("playing", (el: HTMLElement, e: Event) => {
		$video.addClass("js__playing")
		curVideoState = "playing"
	})

	new EventListener(video).add("ended", (el: HTMLElement, e: Event) => {
		$video.removeClass("js__playing")
		curVideoState = "paused"
	})

	new EventListener(video).add("pause", (el: HTMLElement, e: Event) => {
		$video.removeClass("js__playing")
		curVideoState = "paused"
	})

	new EventListener(".watch-link--to-video").add("click", (el: HTMLElement, event: Event) => {
		event.preventDefault()

		const target: HTMLElement = document.querySelector(".video__cont")

		scrollTo(target.offsetTop, .5)

		setTimeout(function(){
			video.play()
		}, 500)
	})
})

App.domReady(() => {
	const $links = new Element(".i-menu__link");
		// $lists = new Element(".instruments-list")

	new EventListener($links).add("click", (el: HTMLElement, e: Event) => {
		e.preventDefault();

		const $this = new Element(el);

		if ($this.hasClass("js__active"))
			return

		const id: string = el.getAttribute("data-id");

		$links.removeClass("js__active")

		new Element(".instruments-list.js__active").removeClass("js__active")

		new Element(`.instruments-list[data-id='${id}']`).addClass("js__active")

		$this.addClass("js__active")
	})
})

App.domReady(() => {
	const main = document.querySelector(".first-screen__cont");
	const sheetsSvg = document.querySelector(".first-screen__bg img");

	main.addEventListener("mousemove", (e: any) => {
		let pos = {x: 0, y: 0};


	    pos.x = (e.pageX - sheetsSvg.clientWidth / 2) * -1 / 100;
	    pos.y = (e.pageY - sheetsSvg.clientHeight / 2) * -1 / 100;

	    TweenLite.to(sheetsSvg, 1, {
	    	x: pos.x,
	    	y: pos.y,
	    	rotationY: (e.pageX > window.innerWidth / 2) ? pos.x / 15 * - 1 : pos.x / 15,
	    	rotationX: (e.pageY > window.innerHeight / 2) ? pos.y / 15 * - 1 : pos.y / 15,
	    	z: pos.y,
	    	ease: Power1.easeOut,
	    })
	})
})

const scrollTo = (distance: number, duration: number = .7) => {
	TweenLite.to(window, duration, {
		scrollTo : {
			y: distance,
			x: 0,
		},
		ease: Power1.easeOut,
		autoKill: true,
		overwrite: 5							
	});
}