import { HTTPTransport } from "../utils/request";

export abstract class API {
	protected http: HTTPTransport;

	protected constructor(endpoint: string) {
		this.http = new HTTPTransport(endpoint);
	}
}