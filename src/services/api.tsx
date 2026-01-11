import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});


export const fetchPosts = async (pageNumber:any) => {
  try {
    const response = await api.get(`/posts?_start=${pageNumber}&_limit=5`);
    return response.status === 200 ? response.data : [];
  } catch (error) {
    console.log(error);
  }
};

export const fetchIndvPost = async (id:any) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.status === 200 ? response.data : [];
  } catch (error) {
    console.log(error)
  }
};

export const deletePost = async (id:any) => {
  try {
    return await api.delete(`/posts/${id}`);
  } catch (error) {
    console.log(error)
  } 
}

export const updatePost = async (id:any) => {
  try {
    return await api.patch(`/posts/${id}`,{title:"I have updated title"});
  } catch (error) {
    console.log(error)
  } 
}
