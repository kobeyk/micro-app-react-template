export default class AuthUser{
    constructor(options){
        options && options.userName ? this.userName = options.userName : "";
        options && options.userName ? this.password = options.password : "";
    }
}
