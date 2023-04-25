import styles from './index.module.css';

export const tmpl = `
	<div>
	{{#if label}}
	<label>{{label}}</label>
	{{else}}
{{/if}}
		<input id="{{name}}" type="{{type}}" name="{{name}}" class="${styles.root}" placeholder="{{placeholder}}" {{disabled}}/>
	</div>
`;
