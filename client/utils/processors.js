export const remapToAllIds = (array) => {
    let byIds = {};
    const allIds = array.map(item => {
        const id = item["id"];
        byIds[id] = item;
        return id;
    });
    return [allIds,byIds];
};

export const parseData = (data) => {
    return JSON.parse(data);
};