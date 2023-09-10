import Swal from 'sweetalert2';

/**
 * @description 커스텀 alert
 * @author 고종현
 * @version 1.0
 */
export default class CustomAlert {
	static success(resource = '', callBack = () => {}, confirmButtonText = '확인') {
		Swal.fire({
			icon: 'success',
			html: resource,
			confirmButtonText: confirmButtonText,
		}).then((result) => {
			if (result.isConfirmed) {
				callBack();
			}
		});
	}

	static error(resource = '', callBack = () => null, confirmButtonText = '확인') {
		Swal.fire({
			icon: 'error',
			html: resource,
			confirmButtonText: confirmButtonText,
		}).then((result) => {
			if (result.isConfirmed) {
				callBack();
			}
		});
	}

	static warning(resource = '', callBack = () => null, confirmButtonText = '확인') {
		Swal.fire({
			icon: 'warning',
			html: resource,
			confirmButtonText: confirmButtonText,
		}).then((result) => {
			if (result.isConfirmed) {
				callBack();
			}
		});
	}

	static question(resoruce = '', callBack = () => {}, confirmButtonText = '확인', cancelButtonText = '취소') {
		Swal.fire({
			icon: 'warning',
			html: resoruce,
			confirmButtonText: confirmButtonText,
			showCancelButton: true,
			cancelButtonText: cancelButtonText,
		}).then((result) => {
			if (result.isConfirmed) {
				callBack();
			}
		});
	}

	static info(resource = '', callBack = () => null, confirmButtonText = '확인') {
		Swal.fire({
			icon: 'info',
			html: resource,
			confirmButtonText: confirmButtonText,
		}).then((result) => {
			if (result.isConfirmed) {
				callBack();
			}
		});
	}

	static input(title = '', value = '', placeholder = '', callBack = () => null, validationMessage = '입력한 값을 확인해주세요.', confirmButtonText = '확인') {
		Swal.fire({
			title: title,
			confirmButtonText: confirmButtonText,
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off',
			},
			inputValue: value,
			inputPlaceholder: placeholder,
			showLoaderOnConfirm: true,
			preConfirm: (text) => {
				if (text === null || text === undefined || text === '') {
					Swal.showValidationMessage(validationMessage);
				} else {
					return text;
				}
			},
		}).then((result) => {
			if (result.isConfirmed) {
				callBack();
			}
		});
	}

	static toast(resource = '') {
		Swal.mixin({
			toast: true,
			position: 'bottom-start',
			showConfirmButton: false,
			timer: 1000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			},
		}).fire({
			icon: 'success',
			title: resource,
		});
	}
}
