
export default class LoadApi {
	constructor(server) {
		this.server = server;
	}

	install() {
		return this.server.Version();
	}
}
