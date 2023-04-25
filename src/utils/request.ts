enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

interface requestParams {
	body?: Record<string, unknown>
	method: Methods
	query?: Record<string, unknown>
	timeout?: number
	url: string
}

export const request = ({
	body,
	method,
	query,
	timeout,
	url,
}: requestParams): Promise<XMLHttpRequest> => new Promise((resolve, reject) => {
	const xhr = new XMLHttpRequest();

	xhr.onload = () => {
		resolve(xhr);
	};

	xhr.onabort = reject;
	xhr.onerror = reject;
	xhr.ontimeout = reject;
	xhr.timeout = timeout ?? 5000;

	switch (method) {
		case Methods.GET: {
			let queryString = '';

			if (query !== undefined) {
				queryString = `?${Object.entries(query)
					.map(([key, value]) => `${key}=${value}`)
					.join('&')}`;
			}

			xhr.open(method, url + queryString);
			xhr.send();
			break;
		}
		case Methods.POST || Methods.PUT || Methods.DELETE: {
			xhr.open(method, url);
			xhr.send(JSON.stringify(body ?? {}));
			break;
		}
		default: {
			break;
		}
	}
});
