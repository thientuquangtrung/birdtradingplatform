const pagination = (page) => {
    const rowsOfPage = parseInt(process.env.ROW_OF_PAGE);
    if (!page) page = 1;
    else {
        page = parseInt(page);
    }

    return {
        rowsOfPage,
        page,
    };
};

module.exports = {
    pagination,
};
