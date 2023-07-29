import Block from '../../utils/Block';
import styles from './index.module.css';

export class Avatar extends Block {

	render() {
		return this.compile(`
		<div class="${styles.root}">
			<div class="${styles.avatar}">
			${this.props.src ?
				`<img src= "https://ya-praktikum.tech/api/v2/resources${this.props.src}" alt="Аватар"/>` :
				''}
			</div>
	</div>
		`, this.props);
	}
}
