import $ from 'jquery';
import 'slick-carousel';
import 'jquery-validation';
import 'jquery-mask-plugin';
import WOW from 'wow.js';

$(document).ready(function(){
	new WOW().init();
	
	function loadScript(src) {
		const script = document.createElement('script');
		script.src = src;
		script.async = false;
		document.body.appendChild(script);
	};

	loadScript('https://kit.fontawesome.com/e1bf98aa6f.js');

	$('.carousel_inner').slick(
		{
			speed: 1500,
			adaptiveWidth: true,
			autoplay: true,
			autoplaySpeed: 2000,
			pauseOnHover: true,
			prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
			nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
			responsive: [
				{breakpoint: 1200,
					settings: {
						arrows: true,
						dots: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						fade: false,
					}
				},
				{breakpoint: 768,
					settings: {
						arrows: false,
						dots: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						controls: false,
					}
				}
			]
		});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			});
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	// Modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	$('[data-modal=order]').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});


	function validateForms(form) {
		$(form).validate({
			rules: {
				name: 'required',
				phone: 'required',
				email: {
					required: true,
					email:true
				}
			},
			messages: {
				name: 'Please specify your name',
				phone: 'Please enter your phone number',
				email: {
					required: 'We need your email address to contact you',
					email: 'Invalid email'
				}
			}
		});

	}

	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');


	$('input[name=phone]').mask('+1 999-999-9999');


	$('form').submit(function(e){
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: 'POST',
			url: 'mailer/smart.php',
			data: $(this).serialize()
		}).done(function(){
			$(this).find('input').val('');
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	//Smoth scroll and pageup 


	$(window).scroll(function() {
		if ($(this).scrollTop() > 1000 ) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href^='#up']").click(function () {
		const _href = $(this).attr('href');
		$('html, body').animate({scrollTop: $(_href).offset().top+'px'}) ;
		return false;
	});
});