import axios from 'axios';


/*
const axiosExecutor =  (axiosFunction, url, data) => {
    return new Promise((resolve) => {
        axiosFunction(url, data).then(resp => {
            resolve(resp.data);
        }).catch(err=> {
            console.log(`shit there was an error ${JSON.stringify(err)}`)
            resolve([])
        });
    });
};
*/

const axiosExecutor =  (axiosFunction, url, data) => {
    return axiosFunction(url, data).then(resp => {
             return resp.data;
        });
};


const returnval = {
    getFunction : (url, configOptions) => {
        return axiosExecutor(axios.get, url, configOptions);
    },
    postFunction : (url, data) => {
        return axiosExecutor(axios.post, url, data);
    },
    putFunction : (url, data) => {
        return axiosExecutor(axios.put, url, data);
    },
    deleteFunction : (url, data) => {
        return axiosExecutor(axios.delete, url, data );
    }
        
}

export const getFunction = returnval.getFunction
export const postFunction = returnval.postFunction
export const putFunction = returnval.putFunction
export const deleteFunction =returnval.deleteFunction

export default returnval;