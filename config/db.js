const environment = process.env.NODE_ENV || "development";

const configuration = {
    development: {
        host: "127.0.0.1",
        port: "3306",
        database: "aws-node",
        user: "root",
        password: ""
    },
    demo: {
        host: "127.0.0.1",
        port: "3306",
        database: "",
        user: "root",
        password: ""
    },
    production: {
        host: "127.0.0.1",
        port: "3306",
        database: "",
        user: "root",
        password: ""
    },
};
module.exports = configuration[environment];
