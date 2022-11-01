import axios from "axios";


export default class Request{

    constructor(url , data = {} , headers = {}) {
        this.url = url;
        this.data = data;
        this.headers = headers;
    }

    request(method) {

        let { url , data , headers} = this ;

        
        headers = {
            ...headers , 
            'Content-Type': 'application/x-www-form-urlencoded' , 
            'Access-Control-Allow-Origin': '*'
        }

        if(this.token !== undefined) {
            headers = {
                ...headers ,
            } ;
        }
        
        switch (method) {
            case "get" : {
                url += (Object.keys(data).length) ? "?" + (new URLSearchParams(data)).toString() : "" ;
                return axios({
                    method ,
                    url ,
                    headers ,
                });
            }
            default : {
                return axios({
                    method ,
                    url ,
                    headers ,
                    data ,
                });
            }
        }


    }

    post(){
        return this.request("post");
    }

    get(){
        return this.request('get');
    }

    delete(){
        return this.request('delete');
    }
}