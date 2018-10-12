$(document).ready(() => {
	// Initialize heights with height of each section
	var sections = getSectionNamesAndHeights()

	// Smooth Scrolling
	var lastLink = $('nav li').first()
	// Select all links with hashes
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function (event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
				&&
				location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 600, function () {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ($target.is(":focus")) { // Checking if the target was focused
							return false;
						} else {
							$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
							$target.focus(); // Set focus again
						};
					});
				}
			}

			// Set active tab
			lastLink.removeClass('active')
			$(this).parents('li').addClass('active')
			lastLink = $(this).parents('li')
		});

	$(window).scroll((e) => {
		let currentPos = $(window).scrollTop()

		var sectionNames = Object.keys(sections)
		var currentSection = sectionNames[0]

		for (var i = 1; i < sectionNames.length; i++) {
			if (sections[sectionNames[i]] > currentPos - 1) {
				currentSection = '#' + sectionNames[i - 1]

				// Remove .active from old tab, add to new one
				$('.active').toggleClass('active')
				$('a[href="' + currentSection + '"]').parent('li').toggleClass('active')

				break;
			}

			// If we get to end of keys
			currentSection = '#' + sectionNames[sectionNames.length - 1]
			// Remove .active from old tab, add to new one
			$('.active').toggleClass('active')
			$('a[href="' + currentSection + '"]').parent('li').toggleClass('active')
		}
	})

	function getSectionNamesAndHeights() {
		let data = {}

		data['landing-container'] = 0

		$('section').each(function () {
			data[this.id] = this.offsetTop
		})
		return data
	}
})

