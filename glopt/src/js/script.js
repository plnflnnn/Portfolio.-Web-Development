window.addEventListener('DOMContentLoaded', () => {
	//hamburger

	const hamburger = document.querySelector('.hamburger'),
		menu = document.querySelector('.menu'),
		closeBtn = document.querySelector('.menu__close');
	
	hamburger.addEventListener('click', function() {
		hamburger.style.display = 'none';
		menu.classList.add('active');
	});
	closeBtn.addEventListener('click', function() {
		menu.classList.remove('active');
		hamburger.style.display = 'block';
	});

	//tiny slider

	const slider = tns({
		container: '.reviews__wrapper',
		items: 1,
		slideBy: 1,
		autoplay: false,
		autoplayHoverPause: true,
		speed: 800,
		mouseDrag: true,
		controls: false
	});

	document.querySelector('.prev').addEventListener('click', function () {
		slider.goTo('prev');
	});

	document.querySelector('.next').addEventListener('click', function () {
		slider.goTo('next');
	});

	//form 

	const forms = document.querySelectorAll('form');
	forms.forEach(item => {
		bindPostData(item);
	});
	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const messages = {
				loading: 'Loading...',
				success: 'Thank you! We will contact you soon',
				failure: 'Something went wrong...'
			};
			function showMessage(mess) {
				const statusMessage = document.createElement('div');
				statusMessage.style.cssText = `
				  display: block;
				  text-align: center;
				  font-weight:  300;
				  font-size: 16px;
				  margin-top: 30px;
				  position: absolute;
				`;
				statusMessage.classList.add('statusMessages');
				statusMessage.textContent = mess;
				form.insertAdjacentElement('afterend', statusMessage);
				setTimeout(() => {
					statusMessage.remove();
				}, 3000);
			}
			const formData = new FormData(form);
			const object = {};
			formData.forEach(function(value, key) {
				object[key] = value;
			});
			fetch('db.json', {
				method: 'POST',
				body: JSON.stringify(object),
				headers: {
					'Content-type': 'application/json'
				}
			})
				.then(data => data.text())
				.then(() => {
					showMessage(messages.success);
				}).catch(() => {
					showMessage(messages.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}
});
