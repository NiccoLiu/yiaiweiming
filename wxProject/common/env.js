
let getUrl =path=>{
    let localhost=process.env.NODE_ENV=='production' ? 'http://47.96.141.185:80' : '/api';
    return localhost + path;
}
 
export default getUrl;