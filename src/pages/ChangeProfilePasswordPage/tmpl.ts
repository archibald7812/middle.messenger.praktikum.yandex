import styles from './index.module.css';

export const tmpl = `
	<div class="${styles.root}">
		{{{navigation}}}
		<main class="${styles.body}">
			<div class="${styles.main}">
				<form>
						{{{avatar}}}
						<h2>{{name}}</h2>
						{{{old_password}}}
						{{{password}}}
						{{{repeat_password}}}
						{{{button}}}
				</form>
			</div>
	</main>
	</div>
`;
