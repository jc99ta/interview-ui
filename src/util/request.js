function get({url, token}) {
    let headers = {
        "Content-type": "application/json; charset=UTF-8"
    }
    if (token) {
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(`http://localhost:3000/${url}`,
        {headers:headers});
}


function del({url, token}) {
    let headers = {
        "Content-type": "application/json; charset=UTF-8"
    }
    if (token) {
        headers.authorization = `Bearer ${token}`;
    }

    return fetch(`http://localhost:3000/${url}`, {

        // Adding method type
        method: "DELETE",

        // Adding headers to the request
        headers: headers
    });
}


function post({url, body, token}) {
    let headers = {
        "Content-type": "application/json; charset=UTF-8"
    }
    if (token) {
        headers.authorization = `Bearer ${token}`;
    }

    return fetch(`http://localhost:3000/${url}`, {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(body),

        // Adding headers to the request
        headers: headers
    });
}

export {get, post, del};
