import $ from "jquery"
import stringEffect from "../js/stringAnimate.js"
import is from "is_js"

window.is = is;

document.addEventListener("DOMContentLoaded", e => {

	const $body = $("body");

	setTimeout(function(){
		$body.addClass("loaded-1")
	}, !is.safari() ? 6000 : 2600)

	setTimeout(function(){
		$body.addClass("loaded-2")
	}, !is.safari() ? 8500 : 3300)

	setTimeout(function(){
		$body.addClass("loaded-3")
	}, !is.safari() ? 10000 : 4000)


	$(".about-text__title, .about-text__text .text-page p").each((i, el) => {
		new stringEffect({
			selector: el,
		});
	});

	$(".about__cont, .desc__cont, .events__cont").each(function(){
		if (isScrolledIntoView(this))
			$(this).addClass("js__scrolled")

		if ($(".about__cont:not(:nth-child(4))").offset().top - $(window).scrollTop() - $(window).height() - 40 < 0){
			$(".first-screen__cont:not(:first-child)").addClass("js__scrolled")
			if (!window.matchMedia("(max-width: 1000px)").matches)
				$(".about__cont:not(:nth-child(4))").removeClass("js__scrolled")
		}else{
			$(".first-screen__cont:not(:first-child)").removeClass("js__scrolled")
			$(".about__cont:not(:nth-child(4))").addClass("js__scrolled")
		}
	})

	document.addEventListener("scroll", function(){
		$(".about__cont, .desc__cont, .events__cont").each(function(){
			if (isScrolledIntoView(this))
				$(this).addClass("js__scrolled")
		})

		if ($(".about__cont:not(:nth-child(4))").offset().top - $(window).scrollTop()- 40 < 0){
			$(".first-screen__cont:not(:first-child)").addClass("js__scrolled")
			if (!window.matchMedia("(max-width: 1000px)").matches)
				$(".about__cont:not(:nth-child(4))").removeClass("js__scrolled")
		}else{
			$(".first-screen__cont:not(:first-child)").removeClass("js__scrolled")
			$(".about__cont:not(:nth-child(4))").addClass("js__scrolled")
		}
	})

	document.addEventListener("touchmove", function(){
		$(".about__cont, .desc__cont, .events__cont").each(function(){
			if (isScrolledIntoView(this))
				$(this).addClass("js__scrolled")
		})

		if ($(".about__cont:not(:nth-child(4))").offset().top - $(window).scrollTop() - 40 < 0){
			$(".first-screen__cont:not(:first-child)").addClass("js__scrolled")
			if (!window.matchMedia("(max-width: 1000px)").matches)
				$(".about__cont:not(:nth-child(4))").removeClass("js__scrolled")
		}else{
			$(".first-screen__cont:not(:first-child)").removeClass("js__scrolled")
			$(".about__cont:not(:nth-child(4))").addClass("js__scrolled")
		}
	})
})

function isScrolledIntoView(elem){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + 120;

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}