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

type Options = {
	method: Methods;
	data?: any;
	query?: string
};

/* export class HTTPTransport {
	static API_URL = 'https://ya-praktikum.tech/api/v2';
	protected endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
	}

	public get<Response>(path = '/', query: string = ''): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			query,
			method: Methods.GET
		});
	}

	public post<Response = void>(path: string, data?: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Methods.POST,
			data,
		});
	}

	public put<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Methods.PUT,
			data,
		});
	}

	public patch<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Methods.PATCH,
			data,
		});
	}

	public delete<Response>(path: string): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Methods.DELETE,
		});
	}

	private request<Response>(url: string, options: Options = { method: Methods.GET }): Promise<Response> {
		const { method, data, query } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			//@ts-expect-error
			xhr.onreadystatechange = (e) => {

				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status < 400) {
						resolve(xhr.response);
					} else {
						reject(xhr.response);
					}
				}
			};

			xhr.onabort = () => reject({ reason: 'abort' });
			xhr.onerror = () => reject({ reason: 'network error' });
			xhr.ontimeout = () => reject({ reason: 'timeout' });

			xhr.withCredentials = true;
			xhr.responseType = 'json';

			if (method === Methods.GET || !data) {
				let queryString = '';
				if (query !== undefined) {
					queryString = `?${Object.entries(query)
						.map(([key, value]) => `${key}=${value}`)
						.join('&')}`;
				}
				xhr.open(method, url + queryString);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send();
			} else {
				xhr.open(method, url);
				if (data instanceof FormData) {
					xhr.send(data)
				} else {
					xhr.setRequestHeader('Content-Type', 'application/json');
					xhr.send(JSON.stringify(data ?? {}))
				}
			}
		});
	}
} */

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
