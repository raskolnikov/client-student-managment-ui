import history from './history'

export function setUrlParam(key, value) {

    let searchParams = new URLSearchParams();    
    searchParams.set(key,value);

    history.push({
        search: searchParams.toString()
    })
}

export function appendUrlParam(key, value) {

    let searchParams = new URLSearchParams(history.location.search);
    searchParams.delete(key);
    
    searchParams.set(key,value);

    history.push({
        search: searchParams.toString()
    })
}

export function getUrlParam(key) {

    let searchParams = new URLSearchParams(history.location.search);    
    return searchParams.get(key);
}

