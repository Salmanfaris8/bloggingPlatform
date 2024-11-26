import commonAPI from "./commonAPI";
import SERVER_URL from "./serverUrl";

// add
export const addPostsAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-post`,reqBody,reqHeader)
}

// get
export const getAllPostsAPI = async(searchKey)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-posts?search=${searchKey}`,{})
} 

// edit
export const editPostAPI = async(id,reqBody)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit/${id}/post`,reqBody)
}

// remove
export const removePostAPI = async(id)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/post/${id}/remove`,{})
}