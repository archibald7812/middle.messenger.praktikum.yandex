import styles from './index.module.css';

export const tmpl = `
	<div class="${styles.root}">
		<div class="${styles.avatar}">
		<img src="https://ya-praktikum.tech/api/v2/resources{{src}}" alt="Аватар"/>
		</div>
	</div>
`;
