import styles from './index.module.css';

export const tmpl = `
	<div class="${styles.root}">
		{{{navigation}}}
		<main class="${styles.body}">
			<div class="${styles.main}">
				<form>
					<div class="${styles.topSection}">
						{{{avatar}}}
						<h2>{{name}}</h2>
					</div>
					<div class="${styles.mainSection}">
						{{{email}}}
						{{{login}}}
						{{{first_name}}}
						{{{second_name}}}
						{{{display_name}}}
						{{{phone}}}
					</div>
					<div class="${styles.bottomSection}">
						<div>
							{{{changeData}}}
						</div>
						<div>
							{{{changePassword}}}
						</div>
						<div>
							{{{exit}}}
						</div>
					</div>
				</form>
			</div>
	</main>
	</div>
`;
