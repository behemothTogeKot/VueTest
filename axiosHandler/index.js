import axios from "axios";
const baseUrl = "https://5fb0f9d859018900164463bd.mockapi.io/api/userform/";
// const baseUrl = "https://jsonplaceholder.typicode.com";

export const getAllUsers = () => {
	return axios.get(`${baseUrl}/users`);
};
export const findUsers = (params) => {
	return axios.get(`${baseUrl}/users`, { params });
};
export const getUser = (id) => {
	return axios.get(`${baseUrl}/users/${id}`);
};

export const createUser = (userForm) => {
	return axios.post(`${baseUrl}/users`, userForm);
};

export const updateUser = ({ id, ...params }) => {
	return axios.put(`${baseUrl}/users/${id}`, params);
};

export const deleteUser = (id) => {
	return axios.delete(`${baseUrl}/users/${id}`);
};
