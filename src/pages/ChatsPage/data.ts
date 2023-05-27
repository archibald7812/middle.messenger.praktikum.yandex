import { IChatsListItem } from 'src/components/ChatsListItem/ChatsListItem';
import { IMessagesSection } from 'src/components/MessagesSection/MessagesSection';

export const chats: IChatsListItem[] = [
	{
		id: 1,
		avatar: '',
		name: 'Андрей',
		latsMessageTime: '13:00',
		lastMessagePlaceholder: 'Изображение',
		newMessages: 2,
	},
	{
		id: 2,
		avatar: '',
		name: 'Андрей',
		latsMessageTime: '13:00',
		lastMessagePlaceholder: 'Изображение',
		newMessages: 2,
	},
	{
		id: 3,
		avatar: '',
		name: 'Андрей',
		latsMessageTime: '13:00',
		lastMessagePlaceholder: 'Изображение',
		newMessages: 2,
	},
	{
		id: 4,
		avatar: '',
		name: 'Андрей',
		latsMessageTime: '13:00',
		lastMessagePlaceholder: 'Изображение',
		newMessages: 2,
	},
	{
		id: 5,
		avatar: '',
		name: 'Андрей',
		latsMessageTime: '13:00',
		lastMessagePlaceholder: 'Изображение',
		newMessages: 2,
	},
	{
		id: 6,
		avatar: '',
		name: 'Андрей',
		latsMessageTime: '13:00',
		lastMessagePlaceholder: 'Изображение',
		newMessages: 2,
	},
	{
		id: 7,
		avatar: '',
		name: 'Андрей',
		latsMessageTime: '13:00',
		lastMessagePlaceholder: 'Изображение',
		newMessages: 2,
	},
	{
		id: 8,
		avatar: '',
		name: 'Андрей',
		latsMessageTime: '13:00',
		lastMessagePlaceholder: 'Изображение',
		newMessages: 2,
	},
	{
		id: 9,
		avatar: '',
		name: 'Андрей',
		latsMessageTime: '13:00',
		lastMessagePlaceholder: 'Изображение',
		newMessages: 2,
	},
	{
		id: 10,
		avatar: '',
		name: 'Андрей',
		latsMessageTime: '13:00',
		lastMessagePlaceholder: 'Изображение',
		newMessages: 2,
	},
];

export const messages: IMessagesSection[] = [
	{
		id: 1,
		day: '19 аперля',
		messages: [
			{
				id: 1,
				text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
				time: '11:56',
			},
			{
				id: 2,
				imageSrc:
					'https://i.ibb.co/k1cHTw3/2020-06-21-19-18-1.png',
				time: '11:56',
			},
			{
				id: 3,
				isMessageByProfile: true,
				text: 'Круто!',
				time: '12:00',
			},
		],
	},

];
