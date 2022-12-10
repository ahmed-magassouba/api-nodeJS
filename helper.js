exports.success = (message,data) => {
    return {
        status: 200,
        message: message,
        data: data
    }
}

exports.error = (message) => {
    return {
        status: 500,
        message: message
    }
}


