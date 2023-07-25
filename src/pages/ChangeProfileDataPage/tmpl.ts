import styles from './index.module.css';

export const tmpl = `
	<div class="${styles.root}">
		{{{navigation}}}
		<main class="${styles.body}">
			<div class="${styles.main}">
				<form>
					<input type="file" id="avatar" name="avatar"/>
					{{{avatarButton}}}
				</form>
				<form>
					{{{email}}}
					{{{login}}}
					{{{first_name}}}
					{{{second_name}}}
					{{{display_name}}}
					{{{phone}}}
					{{{button}}}
				</form>
			</div>
	</main>
	</div>
`;
