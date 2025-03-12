import Product from "../models/productModel.js";

const FilterService = (query, reqQuery) => {
    let filteredQuery = query;
    const  productQueryFilters = ['name', 'price', 'description' , 'stock', 'category'];

    const filters = {}

    productQueryFilters.forEach((el) => {
        if(reqQuery[el]) filters[el] = reqQuery[el];
    });

    filteredQuery =  query.find(filters);


    if(reqQuery.sort) {
        filteredQuery = filteredQuery.sort(reqQuery.sort)
    };

    if(reqQuery.fields) {
        filteredQuery = filteredQuery.select(reqQuery.fields.split(",").join( ' '));
    };

    //პ ა გ ი ნ ა ც ი ა
    const page = parseInt(reqQuery.page) *1 || 1;
    const limit = parseInt(reqQuery.limit) *1 || 100;
    const skip = (page - 1) * limit;
    filteredQuery = filteredQuery.skip(skip).limit(limit);


    return filteredQuery;
}

export default FilterService;

