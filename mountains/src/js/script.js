import $ from "jquery";
import 'slick-carousel';

$(document).ready(function(){
	$('.carousel_block').slick({
		dots: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 1500,
		autoplay: true,
		autoplaySpeed: 1500,
		arrows: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	
	// tabs
	
	$('.tab_btn.first').addClass('active');
	$('.tabs_content.first').addClass('active');
	$('.climb').css('background', 'url(img/climb/mountain1.jpg) center center/cover no-repeat');

	let documentWidth = $(document).width();


	$('.tab_btn').each(function() {
		$('.tab_btn').on('click', function() {
			$(this).addClass('active').siblings().removeClass('active');
	
			if($(this).hasClass('first')) {
				$('.climb').css('background', 'url(img/climb/mountain1.jpg) center center/cover no-repeat');
				$('.tabs_content.first').addClass('active').siblings().removeClass('active');
			}
	
			if($(this).hasClass('second')) {
				$('.climb').css('background', 'url(img/climb/mountain2.jpg) center center/cover no-repeat');
				$('.tabs_content.second').addClass('active').siblings().removeClass('active');
			}
		});
	});

	$(window).resize(function(){
		if(documentWidth < 577) {
			$('.tabs_content').each(function() {
				$('.tabs_content').removeClass('active');
			});
	
			$('.tab_btn').each(function() {
				$('.tab_btn').removeClass('active');
			});
		}
	  });
});