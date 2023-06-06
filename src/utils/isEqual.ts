/* eslint-disable default-param-last */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
interface MyObject {
	[key: string]: any;
}

export function isEqual(obj1: MyObject = {}, obj2: MyObject = {}): boolean {
	if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
		throw new Error('Аргументами должны быть только объекты');
	}

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (!obj2.hasOwnProperty(key)) {
			return false;
		}

		const value1 = obj1[key];
		const value2 = obj2[key];

		// Рекурсивно сравниваем значения свойств
		if (typeof value1 === 'object' && typeof value2 === 'object') {
			if (!isEqual(value1, value2)) {
				return false;
			}
		} else if (value1 !== value2) {
			return false;
		}
	}

	return true;
}
