function Slider( container, nav, dots ) {
	this.container = container;
	this.nav = nav;
	this.dots = dots;

	this.slides = this.container.find(".slide").children();
	this.slideWidth = this.slides[0].width;
	this.slideLength = this.slides.length;
	this.current = 0;
}

Slider.prototype.init = function() {
	//Update container width
	this.container.width(this.slideWidth * this.slideLength);

	//Generate nav dots if dots has been passed in
	if (this.dots !== undefined) {
		//Refactor to only update DOM once
		for(var i = 0; i < this.slideLength; i++) {
			var t = $("<a>").html("" + (i+1));
			t.attr({
				"data-slide": i,
				"href": '#'
			});
			this.dots.append(t);
		}

		//Set first slide as active on init
		this.dots.children()[this.current].className = "slidedot-active";
	}
}

Slider.prototype.setActiveDot = function( ) {
	this.dots.children().removeClass("slidedot-active");
	this.dots.children()[this.current].className = "slidedot-active";
}

Slider.prototype.setSlide = function( slideNum ) {
	this.current = slideNum;
	return this.current;
}

Slider.prototype.currentSlide = function( direction ) {
	if( direction === "next" ) {
		this.current++;
	}
	else {
		this.current--
	}

	if (this.current > this.slideLength - 1) {
		this.current = 0;
	} 
	else if (this.current < 0) {
		this.current = this.slideLength - 1;
	}

	return this.current;
}

Slider.prototype.move = function( suffix ) {
	this.container.css({ 
		"-webkit-transform": "translate(" + (-(this.slideWidth * this.current)) + suffix + ")",
		"transform": "translate(" + (-(this.slideWidth * this.current)) + suffix + ")",
	});
}

/*=========================================================*/
/* Main function
/* Uses a revealing module pattern
/* Returns an init function, to kick off all scripts on the 
/* page. Keeps all the configuration and private
/*=========================================================*/

var Main = (function() {

	function slider() {
		var slider = new Slider( $(".slide-wrapper"), $(".slide-nav"), $(".slide-dots") );
		slider.init();

		$(".slide-nav").on("click", "a", function(e) {
			e.preventDefault();
			slider.currentSlide( $(this).data("dir") );
			slider.setActiveDot();
			slider.move("px");
		});

		$(".slide-dots").on("click", "a", function(e) {
			e.preventDefault();
			slider.setSlide( $(this).data("slide") );
			slider.setActiveDot();
			slider.move("px");
		});
	}

	function init() {
		slider();
	}

	return {
		init: init
	}
})();

Main.init();


