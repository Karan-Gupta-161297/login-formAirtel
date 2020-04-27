export function validateuser(userdata) {

    let BaseURL = "http://localhost:8080/addUser";

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');


    var fetchData = {
        method: 'POST',
        body: JSON.stringify(userdata),
        headers: myHeaders
    }

    return new Promise((resolve, reject) => {
        fetch(BaseURL, fetchData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                reject(error);
            });

    });
}
