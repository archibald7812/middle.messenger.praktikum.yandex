import './reset.css';
import './index.css';
import { App } from './App';

const root = document.getElementById('root');

if (root === null) {
	throw new Error('#root is not found.');
}

root.append(App().element);
