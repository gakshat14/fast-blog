export function getURI<T>(uri: string): Promise<T> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const jsonResponse = await response.json();
            if(response.status > 400) {
                reject('Something went wrong');
            }
            resolve(jsonResponse);
        } catch (error) {
            reject(error);
        }
    })
}