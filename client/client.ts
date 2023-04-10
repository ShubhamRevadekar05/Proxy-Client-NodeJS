import http from "http";
import https from "https";

class ProxyClient {
    options: {};
    constructor(options: {}) {
        this.options = options;
    }
    public request(options, callback) {
        var {hostname, path, method, headers, protocol} = options;
        if(!headers) {
            headers = {};
        }
        if(this.options["username"]) {
            Object.assign(headers, {'Proxy-Authorization': 'Basic ' + Buffer.from(this.options["username"] + ':' + this.options["password"]).toString('base64')});
        }
        if(this.options["type"] === "http") {
            return http.request({
                "hostname": this.options["hostname"],
                "port": this.options["port"],
                "path":  (protocol ? protocol + "://" : "https://") + hostname + (path[0] === "/" ? path : "/" + path),
                "method": method,
                "headers": headers
            }, callback);
        }
        return https.request({
            "hostname": this.options["hostname"],
            "port": this.options["port"],
            "path":  (protocol ? protocol + "://" : "https://") + hostname + (path[0] === "/" ? path : "/" + path),
            "method": method,
            "headers": headers
        }, callback);
    };
}

export { ProxyClient };