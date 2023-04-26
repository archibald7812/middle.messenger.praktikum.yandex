import { messages } from '../../pages/ChatsPage/data';
import styles from './index.module.css';

export const tmpl = `
	<div class='${styles.root}'>
		<div class='${styles.day}'>{{day}}</div>
		<div class='${styles.main}'>
			${messages[0].messages.map((message) => `{{{${message.id}}}}`).join('')}
		</div>
	</div>`;
