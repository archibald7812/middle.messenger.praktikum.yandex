import styles from './index.module.css';

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
				{{{chatsList}}}
			</div>
			<div class='${styles.chat}'>
				<div class='${styles.topSection}'>
					<div class='${styles.avatar}'>{{{avatar}}}<span>{{activeChat.title}}</span></div>
					<div class='${styles.inputUser}'>{{{inputUser}}}</div>
					<div class='${styles.addUser}'>{{{addUser}}}</div>
					<div class='${styles.removeUserUser}'>{{{removeUser}}}</div>
				</div>
				<div class='${styles.messagesSection}'>
					{{{messageListItem}}}
				</div>
				<div class='${styles.newMessageSection}'>
					<form>
						{{{newMessage}}}
						{{{sendMessage}}}
					</form>
				</div>
			</div>
		</main>
	</div>
`;

//<img src=${attach}} alt='Выберите файл'/>
