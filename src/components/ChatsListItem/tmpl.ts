import styles from './index.module.css';

export const tmpl = `
	<div class='${styles.root}'>
		<div class='${styles.profile}'>
			<div class='${styles.avatar}'></div>
		</div>
		<div class='${styles.main}'>
			<h4>{{name}}</h4>
			<p>{{lastMessagePlaceholder}}</p>
		</div>
		<div class='${styles.info}'>
			<p>{{latsMessageTime}}</p>
			<div class='${styles.newMessages}'>{{{unreadMessages}}}</div>
		</div>
	</div>
`;
