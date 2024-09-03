module.exports = (query) => {
    const filterStatus = [
        {
            name: "All",
            status: "",
            class: ""
        },
        {
            name: "Active",
            status: "active",
            class: ""

        },
        {
            name: "Inactive",
            status: "inactive",
            class: ""

        }
    ];

    if (query.status) {
        const index = filterStatus.findIndex(item => item.status === query.status);
        filterStatus[index].class = "active"
    } else {
        filterStatus[0].class = "active"
    }

    return filterStatus;

}