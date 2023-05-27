import styles from './index.module.css';

export const tmpl = `\
	<div class="${styles.root}">
		{{{navigation}}}
		<main class="${styles.body}">
			<div class="${styles.main}">
				{{{link}}}
			</div>
	</main>
	</div>
	
`;
