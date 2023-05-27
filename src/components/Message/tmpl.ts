import styles from './index.module.css';

export const tmpl = `
	<div class='${styles.root} {{#if isMessageByProfile}}
	${styles.isMessageByProfile}
	{{else}}
{{/if}}'>
		<div class='${styles.body}'>
			{{text}}
				{{#if imageSrc}}
					<img src='{{imageSrc}}'/>
				{{else}}
				{{/if}}
			<div class='${styles.time}'>
				<p>{{time}}</p>
			</div>
		</div>
	</div>
`;
