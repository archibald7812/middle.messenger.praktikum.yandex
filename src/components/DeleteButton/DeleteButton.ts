/* eslint-disable consistent-return */
import Block from '../../utils/Block';
import styles from './index.module.css';

export class DeleteButton extends Block {

	render() {
		return this.compile(`
		<p class='${styles.root}'>{{title}}</p>
		`, this.props);
	}
}
