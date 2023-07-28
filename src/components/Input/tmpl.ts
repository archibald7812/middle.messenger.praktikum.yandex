import styles from './index.module.css';

export const tmpl = `
	<div class="${styles.root}">
	{{#if label}}
	<label>{{label}}</label>
	{{else}}
{{/if}}
		<input id="{{name}}" type="{{type}}" name="{{name}}" class="${styles.input}" placeholder="{{placeholder}}" {{disabled}} value="{{value}}"/>
		<span>Неверно заполнено</span>
	</div>
`;
