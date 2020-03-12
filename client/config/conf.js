const prod = {
    api: {
        HOST: "http://199.244.50.247:9090/api/v1"
    },
    testUser: {
        email: "test@test.com",
        password: "test"
    },
    routes: {

    }
};

const dev = {
    api: {
        HOST: "http://0.0.0.0:9090/api/v1"
    },
    testUser: {
        email: "test@test.com",
        password: "test"
    },
    routes: {

    }
};

export const Config = process.env.NODE_ENV === 'development' ? dev : prod;