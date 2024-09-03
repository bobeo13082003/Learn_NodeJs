module.exports = (objectPagination, allProducts, query) => {


    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limit;

    const page = Math.ceil(allProducts / objectPagination.limit)
    objectPagination.totalPage = page;

    return objectPagination;
}