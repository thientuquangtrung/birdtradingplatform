const pagination = (page) => {
    const rowsOfPage = Number(process.env.ROW_OF_PAGE);
    if (!page) page = 1;
    else {
        page = Number(page);
    }

    return {
        rowsOfPage,
        page,
    };
};

module.exports = {
    pagination,
};
