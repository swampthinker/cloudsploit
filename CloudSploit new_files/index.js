(function($) {
	// plugin definition
	$.fn.pinFooter = function(options) {		
		// Get the height of the footer and window + window width
		var wH = $(window).height();
		var wW = getWindowWidth();
		var fH = $(this).outerHeight(true);
		var bH = $("body").outerHeight(true);
		var mB = parseInt($("body").css("margin-bottom"));
		
		if (options == 'relative') {
			if (bH > getWindowHeight()) {
				$(this).css("position","absolute");
				$(this).css("width",wW + "px");
				$(this).css("top",bH - fH + "px");
				$("body").css("overflow-x","hidden");
			} else {
				$(this).css("position","fixed");
				$(this).css("width",wW + "px");
				$(this).css("top",wH - fH + "px");
			}
		} else { // Pinned option
			// Set CSS attributes for positioning footer
			$(this).css("position","fixed");
			$(this).css("width",wW + "px");
			$(this).css("top",wH - fH + "px");
			$("body").css("height",(bH + mB) + "px");
		}
	};
	
	// private function for debugging
	function debug($obj) {
		if (window.console && window.console.log) {
			window.console.log('Window Width: ' + $(window).width());
			window.console.log('Window Height: ' + $(window).height());
		}
	};
	
	// Dependable function to get Window Height
	function getWindowHeight() {
		var windowHeight = 0;
		if (typeof(window.innerHeight) == 'number') {
			windowHeight = window.innerHeight;
		}
		else {
			if (document.documentElement && document.documentElement.clientHeight) {
				windowHeight = document.documentElement.clientHeight;
			}
			else {
				if (document.body && document.body.clientHeight) {
					windowHeight = document.body.clientHeight;
				}
			}
		}
		return windowHeight;
	};
	
	// Dependable function to get Window Width
	function getWindowWidth() {
		var windowWidth = 0;
		if (typeof(window.innerWidth) == 'number') {
			windowWidth = window.innerWidth;
		}
		else {
			if (document.documentElement && document.documentElement.clientWidth) {
				windowWidth = document.documentElement.clientWidth;
			}
			else {
				if (document.body && document.body.clientWidth) {
					windowWidth = document.body.clientWidth;
				}
			}
		}
		return windowWidth;
	};
})(jQuery);

$( document ).ready(function() {
	if (getUrlParameter('ref') === 'producthunt' || getUrlParameter('ref') === 'betalist' || getUrlParameter('ref') === 'hackernews' || getUrlParameter('ref') === 'reddit') {
		console.log($('#promofooter'));

		var welcomeGroup = '';

		if (getUrlParameter('ref') === 'producthunt') {
			welcomeGroup = ', Product Hunters';
		} else if (getUrlParameter('ref') === 'betalist') {
			welcomeGroup = ', Beta Listers';
		} else if (getUrlParameter('ref') === 'hackernews') {
			welcomeGroup = ', Hackers';
		} else if (getUrlParameter('ref') === 'reddit') {
			welcomeGroup = ', Redditors';
		}

		$("#promofooter").show();
		$("#promofooter").css({
			width:'100%',
			'background-color':'white',
			'text-align':'center',
			'font-size':'14pt',
			'padding':'12px',
			'box-shadow':'0px -5px 18px -3px #C6C6C6'
		});

		$("#promofooter").html('Welcome' + welcomeGroup + '! <a href="/preregister">Pre-Register</a> in the next 24 hours to receive 2 months of CloudSploit Pro for free!')

		$("#promofooter").pinFooter();

		$(window).resize(function() {
			$("#promofooter").pinFooter();
		});
	}
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};