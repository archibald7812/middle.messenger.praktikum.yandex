export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}

interface RequestParams {
	payload?: Record<string, unknown> | any
	method: Methods
	query?: Record<string, unknown>
	timeout?: number
	url: string
}

export const request = ({
	payload,
	method,
	query,
	timeout,
	url,
}: RequestParams): Promise<XMLHttpRequest> => new Promise((resolve, reject) => {
	const requestUrl = new URL(`/api/v2${url}`, 'https://ya-praktikum.tech');

	const xhr = new XMLHttpRequest();

	xhr.onload = () => {
		resolve(xhr);
	};

	xhr.onabort = reject;
	xhr.onerror = reject;
	xhr.ontimeout = reject;
	xhr.timeout = timeout ?? 5000;
	xhr.withCredentials = true;

	switch (method) {
		case Methods.GET: {
			let queryString = '';

			if (query !== undefined) {
				queryString = `?${Object.entries(query)
					.map(([key, value]) => `${key}=${value}`)
					.join('&')}`;
			}
			xhr.open(method, requestUrl + queryString);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send();
			break;
		}
		case Methods.POST:
		case Methods.PUT:
		case Methods.DELETE: {
			xhr.open(method, requestUrl);
			if (payload instanceof FormData) {
				xhr.send(payload)
			} else {
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(payload ?? {}))
			}
			break;
		}
		default: {
			console.log('fail')
			break;
		}
	}
});
