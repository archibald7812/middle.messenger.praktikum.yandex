import styles from './index.module.css';

export const tmpl = `\
	<div class="${styles.root}">
		{{{navigation}}}
		<main class="${styles.body}">
			<div class="${styles.main}">
				<div class="${styles.topSection}">
					<h2>{{ title }}</h2>
				</div>
				<div class="${styles.mainSection}">
					<form>
						{{{login}}}
						{{{password}}}
						{{{button}}}
					</form>
				</div>
				<div class="${styles.bottomSection}">
					{{{link}}}
				</div>
			</div>
		</main>
	</div>
	
`;
