/*==================================================================================================*/
/* Slider Constructor
/* Initializes the variables used throughout the script.
/* Accepts three arguments, the container element, the navigation element and optionally the navigation 
/* dots element.
/*==================================================================================================*/

function Slider( container, nav, dots ) {
	this.container = container;
	this.nav = nav;
	this.dots = dots;

	this.slides = this.container.find(".slide").children();
	this.slideWidth = this.slides[0].width; //Sets the slider width based on the first slide
	this.slideLength = this.slides.length;
	this.current = 0;
}

Slider.prototype.init = function() {
	//Set container width
	this.container.width(this.slideWidth * this.slideLength);

	//Generate nav dots if dots has been passed in to the constructor
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
	//Update the active class on the dots element
	this.dots.children().removeClass("slidedot-active");
	this.dots.children()[this.current].className = "slidedot-active";
}

Slider.prototype.setSlide = function( slideNum ) {
	//Update variable
	this.current = slideNum;
	return this.current;
}

Slider.prototype.currentSlide = function( direction ) {
	//Increment or decrement this.current
	if( direction === "next" ) {
		this.current++;
	}
	else {
		this.current--
	}

	//Check that this.current isn't below 0 or higher than the total number of slides
	if ( this.current > this.slideLength - 1 ) {
		this.current = 0;
	} 
	else if ( this.current < 0 ) {
		this.current = this.slideLength - 1;
	}

	return this.current;
}

Slider.prototype.move = function( suffix ) {
	//Use transform for better performance, should be pretty bulletproof for everything above IE8
	this.container.css({ 
		"-webkit-transform": "translate(" + (-(this.slideWidth * this.current)) + suffix + ")",
		   "-moz-transform": "translate(" + (-(this.slideWidth * this.current)) + suffix + ")",
			"-ms-transform": "translate(" + (-(this.slideWidth * this.current)) + suffix + ")",
				"transform": "translate(" + (-(this.slideWidth * this.current)) + suffix + ")",
	});
}

/*==================================================================================================*/
/* Main function
/* Uses a revealing module pattern to keep all configuration private and keep the global scope clean
/* Returns an init function, to kick off all scripts on the page.
/*==================================================================================================*/

var Main = (function() {

	function slider() {
		var slider = new Slider( $(".slide-wrapper"), $(".slide-nav"), $(".slide-dots") );
		slider.init();

		$(".slide-nav").on("click", "a", function(e) {
			e.preventDefault();
			slider.currentSlide( $(this).data("dir") ); //Use the data-dir attribute as argument
			slider.setActiveDot(); 
			slider.move("px");
		});

		$(".slide-dots").on("click", "a", function(e) {
			e.preventDefault();
			slider.setSlide( $(this).data("slide") ); //Use the data-slide attribute as argument
			slider.setActiveDot();
			slider.move("px");
		});
	}

	function init() {
		slider(); //Run the function
	}

	return {
		init: init //Return it
	}
})();

Main.init(); //GO!
