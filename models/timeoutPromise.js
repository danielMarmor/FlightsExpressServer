const TimeOutPromise = (timeout, callback) => {
    const promise = Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Reponse Could Not be Recieved from FlightSystem DB Remote Server, Timeout ${timeout / 1000} Seconds `))
        }, timeout);
        callback(
            (value) => {
                clearTimeout(timer);
                resolve(value);
            },
            (error) => {
                clearTimeout(timer);
                reject(error);
            }
        )
    });
    return promise;
}