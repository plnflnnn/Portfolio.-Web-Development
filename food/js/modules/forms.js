import {closeModal, openModal} from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
	const forms = document.querySelectorAll(formSelector);

	const messages = {
		loading: 'img/form/spinner.svg',
		success: 'Thank you! We will contact you soon!',
		failure: 'Something went wrong...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});


	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = messages.loading;
			statusMessage.style.cssText = `
			  display: block;
			  margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);


			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('requests.json', json)
				.then(() => {
					showThanksModal(messages.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(messages.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(messages) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		prevModalDialog.classList.remove('show');
		openModal('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
		    <div class="modal__close" data-close>×</div>
			<div class="modal__title" data-close>${messages}</div>
		</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal('.modal');
		}, 4000);
	}
}
export default forms;