import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

export const getAllCharacters = async () => {
    const response = await axios.get(`${API_URL}/character`);
    return response.data;
};

export const getCharacters = async (page?: number) => {
    if (page) {
        const response = await axios.get(`${API_URL}/character?page=${page}`);
        return response.data;
    }
};