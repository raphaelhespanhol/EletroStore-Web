import axios from "axios";

const APP_NAME = "EletroStore/api";
const BASE_API_URL = `http://localhost:8080/${APP_NAME}`;
const PRODUCT_API_URL = `${BASE_API_URL}/products`;

class ProductService {
    retrieveAll() {
        return axios.get(`${PRODUCT_API_URL}`);
    }
    retrieveAllWithoutImages() {
        return axios.get(`${PRODUCT_API_URL}/findAllWithoutImages`);
    }
    retrieveAllByName(name) {
        return axios.get(`${PRODUCT_API_URL}/findAllByName/${name}`);
    }
    retrieveAllByCategoryId(categoryId) {
        return axios.get(`${PRODUCT_API_URL}/findAllByCategoryId/${categoryId}`);
    }
    retrieveAllByNameAndCategoryId(name, categoryId) {
        return axios.get(`${PRODUCT_API_URL}/findAllByNameAndCategoryId/${name}/${categoryId}`);
    }
    retrieveById(id) {
        return axios.get(`${PRODUCT_API_URL}/${id}`);
    }
    create(body){
        return axios.post(`${PRODUCT_API_URL}`, body);
    }
    update(id, body){
        return axios.put(`${PRODUCT_API_URL}/${id}`, body);
    }
    deleteById(id) {
        return axios.delete(`${PRODUCT_API_URL}/${id}`);
    }
}

export default new ProductService();
