/* eslint-disable consistent-return */
import styles from '../../components/Input/index.module.css';

export const validationFunc = (elem: HTMLDivElement) => {
	let name = '';
	let value = '';

	for (let i = 0; i <= elem.children.length - 1; i += 1) {
		if (elem.children[i].tagName === 'INPUT') {
			name = (elem.children[i] as HTMLInputElement).name;
			value = (elem.children[i] as HTMLInputElement).value;
		}
	}

	const toggleStyle = (isInvalid: boolean) => {
		if (isInvalid) {
			elem.classList.add(styles.invalid);
		} else {
			elem.classList.remove(styles.invalid);
		}
	};

	switch (name) {
		case 'login': {
			const isInvalid = value.length < 3
				|| value.length > 20
				|| !value.match(/^\d*[^\d]+\d*$/)
				|| !value.match(/^[\w-]+$/);
			toggleStyle(isInvalid);
			return isInvalid;
		}
		case 'password': {
			const isInvalid = value.length < 8
				|| value.length > 40
				|| !value.match(/^(?=.*[A-Z])(?=.*\d).*$/);
			toggleStyle(isInvalid);
			return isInvalid;
		}
		case 'repeat_password': {
			const isInvalid = value.length < 8
				|| value.length > 40
				|| !value.match(/^(?=.*[A-Z])(?=.*\d).*$/);
			toggleStyle(isInvalid);
			return isInvalid;
		}
		case 'email': {
			const isInvalid = !value.match(/^\w+@\w+\.\w+$/)
				|| value.length === 0;
			if (isInvalid) {
				elem.classList.add(styles.invalid);
			} else {
				elem.classList.remove(styles.invalid);
			}
			return isInvalid;
		}
		case 'first_name': {
			const isInvalid = value.length === 0
				|| !value.match(/^[А-ЯA-Z]/)
				|| !value.match(/[a-zа-я-]+$/);
			toggleStyle(isInvalid);
			return isInvalid;
		}
		case 'second_name': {
			const isInvalid = value.length === 0
				|| !value.match(/^[А-ЯA-Z]/)
				|| !value.match(/[a-zа-я-]+$/);
			toggleStyle(isInvalid);
			return isInvalid;
		}
		case 'phone': {
			const isInvalid = value.length < 10
				|| value.length > 15
				|| !value.match(/^(\+?)\d+$/);
			toggleStyle(isInvalid);
			return isInvalid;
		}
		case 'message': {
			const isInvalid = value.length === 0;
			toggleStyle(isInvalid);
			return isInvalid;
		}
		default: {
			return false;
		}
	}
};
