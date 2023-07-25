import { chats, messages } from './data';
import styles from './index.module.css';
import attach from '../../styles/images/Attach.svg';

export const tmpl = `
	<div class='${styles.root}'>
		{{{navigation}}}
		<main class='${styles.body}'>
			<div class='${styles.sideBar}'>
				<div class='${styles.searchSection}'>
					<form>
						{{{inputChat}}}
						<div class='${styles.createChat}'>{{{createChat}}}</div>
					</form>
				</div>
				<div class='${styles.chatsSection}'>
					${chats.map((chat) => `{{{chatsListItem${chat.id}}}}`).join('')}
				</div>
			</div>
			<div class='${styles.chat}'>
				<div class='${styles.topSection}'>
					<div class='${styles.avatar}'>{{{avatar}}}<span>Иван</span></div>
					<div class='${styles.settings}'></div>
				</div>
				<div class='${styles.messagesSection}'>
					${messages.map((message) => (`{{{messageListItem${message.id}}}}`)).join('')}
				</div>
				<div class='${styles.newMessageSection}'>
					<img src=${attach}} alt='Выберите файл'/>
					<form>{{{newMessage}}}</form>
					<span class='${styles.send}'/>
				</div>
			</div>
		</main>
	</div>
`;
