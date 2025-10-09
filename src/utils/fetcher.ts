async function fetcher(url:string){
    const baseURL = 'https://dummyjson.com';
    //const baseURL = 'http://localhost:8000';
    return fetch(`${baseURL}${url}`).then(res=> res.json());
}

export default fetcher;