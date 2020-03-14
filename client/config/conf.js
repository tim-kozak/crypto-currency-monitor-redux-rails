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

const local = {
    api: {
        HOST: "http://0.0.0.0:3000/api/v1"
    },
    testUser: {
        email: "test@test.com",
        password: "test"
    },
    routes: {

    }
};

export const Config = (() => {
    switch (process.env.NODE_ENV) {
        case 'development': {
            return dev;
        }
        case 'production': {
            return prod;
        }
        case 'none': {
            return local;
        }
    }
})();
