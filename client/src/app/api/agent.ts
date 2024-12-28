import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";


const sleep=()=>new Promise(resolve=>setTimeout(resolve,500));
axios.defaults.baseURL='http://localhost:5000/api/';
axios.defaults.withCredentials=true;

// Getting response and store in responseBody
const  responseBody=(response:AxiosResponse)=>response.data;


//anything not in 200 code will be rejected
axios.interceptors.response.use(async response=>{
 await sleep();   
return response;
},( error:AxiosError)=>{

    const{data,status}=error.response as AxiosResponse;

    switch(status){
    case 400:
        // only to display array of errors
        if(data.errors){
            const modelStateErrors:string[] = [];
            for(const key in data.errors){
                if(data.errors[key]){
                  modelStateErrors.push(data.errors[key])
    
                }
            }
    
            throw modelStateErrors.flat();
        }    
        toast.error(data.title);
        break;
    case 401:
        toast.error(data.title);
        break;
    case 404:
        toast.error(data.title);
        break;   
    case 500:
        router.navigate('/server-error',{state:{error:data}});
        break; 
     default:
        break;
        
    }
    return Promise.reject(error.response)
})

const requests={
    get:(url:string)=>axios.get(url).then (responseBody),
    post:(url:string,body:object)=>axios.post(url,body).then (responseBody),
    put:(url:string,body:object)=>axios.put(url,body).then (responseBody),
    delete:(url:string)=>axios.delete(url).then (responseBody),
}

//store request for Catalogue
const Catalog={
list:()=>requests.get('products'),
details:(id:number)=>requests.get(`products/${id}`),
fetchFilters:()=>requests.get('products/filters')

}

const Basket={
    get:()=>requests.get('basket'),
    addItem: (productId:number,quantity=1)=>requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}) ,
    removeItem: (productId:number,quantity=1)=>requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const agent={
    Catalog,
    TestErrors: {
        get400Error: () => requests.get('buggy/bad-request').catch(error=>console.log(error)),
        get401Error: () => requests.get('buggy/unauthorised').catch(error=>console.log(error)),
        get404Error: () => requests.get('buggy/not-found').catch(error=>console.log(error)),
        get500Error: () => requests.get('buggy/server-error').catch(error=>console.log(error)),
        getValidationError: () => requests.get('buggy/validation-error')
    },
    Basket
}


export default agent;


