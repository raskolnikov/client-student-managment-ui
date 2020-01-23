import { FETCH_PRODUCTS } from './actionTypes';
import axios from 'axios';
import { client } from '../util';


const compare = {

    lowestPrice: (a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
    },

    highestPrice: (a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        return 0;
    }
}

export const productsAPI = '/students';

export function newStudent() {

    return dispatch => {

        return dispatch({
            type: 'NEW_STUDENT'
        })
    }

}

export function saveStudent(student) {

    return dispatch => {
        return dispatch({
          type: 'SAVE_STUDENT',
          payload: client.post(productsAPI + "/", student)
        })
      }
}

export function fetchStudent(id) {

    return dispatch => {
        return dispatch({
            type: 'FETCH_STUDENT',
            payload: client.get(`${productsAPI}/${id}`)
        })

    }
    
}

export function updateStudent(student) {

    return dispatch => {

        return dispatch({
            type: 'UPDATE_STUDENT',
            payload: client.put(`${productsAPI}/${student.id}`, student )
        })
    }
    
}

export function deleteStudent(id) {

    return dispatch => {

        return dispatch({
            type: 'DELETE_STUDENT',
            payload: client.delete(`${productsAPI}/${id}`)
        })
    }
    
}

export const fetchProducts = (filters, sortBy, callback) => dispatch => {
    return client
        .get(productsAPI + "/")
        .then(res => {
            let products = res.data;

            /*
            if (!!filters && filters.length > 0) {
                products = products.filter(p =>
                    filters.find(f => p.availableSizes.find(size => size === f))
                );
            }

            if (!!sortBy) {
                products = products.sort(compare[sortBy]);
            }

            if (!!callback) {
                callback();
            }

            */
            return dispatch({
                type: FETCH_PRODUCTS,
                payload: products
            });
        })
        .catch(err => {
            console.log('Could not fetch products. Try again later.');
        });
};
