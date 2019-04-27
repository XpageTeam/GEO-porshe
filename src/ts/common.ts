require("../sss/main.sss")

import {App, Element, EventListener} from "./app"
import {TweenLite, Power1} from "gsap"
// import {Power1} from "../js/EasePack.js"
require("gsap/ScrollToPlugin.js")

declare global {
    interface Window { is: any; }
}

window.is = window.is || {};

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

	if (!window.is.safari()){
		document.addEventListener("mousewheel", onScroll)
		//document.addEventListener("touchmove", onScroll)
		document.addEventListener("DOMMouseScroll", onScroll)
	}
})

App.domReady(() => {
	const audio: HTMLVideoElement = document.querySelector(".audio"),
		$audio = new Element("audio");

	const video: HTMLVideoElement = document.querySelector(".video__video"),
		$video = new Element(".video");

	let curVideoState = "paused";

	new EventListener(".video__play").add("click", (el: HTMLElement, e: Event) => {
		if (curVideoState == "paused"){
			if (!window.is.safari())
				audio.pause()	
			video.play()
		}else{
			video.pause()
			if (!window.is.safari())
				audio.play()
		}
	})

	if (!window.is.safari())
		document.addEventListener("click", function(){
			audio.load()
			audio.play()
		},{
			once: true
		})

	if (!window.is.safari())
		document.addEventListener("touchmove", function(){
			audio.play()
		},{
			once: true
		})

	if (!window.is.safari())
		document.addEventListener("scroll", function(){
			audio.play()
		},{
			once: true
		})

	new EventListener(video).add("playing", (el: HTMLElement, e: Event) => {
		$video.addClass("js__playing")
		if (!window.is.safari())
			audio.pause()
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
			if (!window.is.safari())
				audio.pause()
		}, 500)
	})


	new EventListener(".first-screen__cont .watch-link:not(.watch-link--to-video").add("click", (el: HTMLElement, event: Event) => {
		event.preventDefault()

		const target: HTMLElement = document.querySelector(".events__cont")

		scrollTo(target.offsetTop, .5)


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

	if (!window.is.safari())
	main.addEventListener("mousemove", (e: any) => {
		let pos = {x: 0, y: 0};


	    pos.x = (e.pageX - sheetsSvg.clientWidth / 2) * -1 / 100;
	    pos.y = (e.pageY - sheetsSvg.clientHeight / 2) * -1 / 100;

	    TweenLite.to(sheetsSvg, 1, {
	    	x: pos.x,
	    	y: pos.y,
	    	rotationY: !window.is.safari() ? (e.pageX > window.innerWidth / 2) ? pos.x / 15 * - 1 : pos.x / 15 : 0,
	    	rotationX: !window.is.safari() ? (e.pageY > window.innerHeight / 2) ? pos.y / 15 * - 1 : pos.y / 15 : 0,
	    	z: !window.is.safari() ? pos.y : 0,
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