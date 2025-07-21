class ApiResponse {
    constructor(statusCode, data, message){
        this.statusCode = statusCode
        this.data = data
        this.message = message || "Success"
        this.success = statusCode < 400
    }
}

module.exports=  ApiResponse 