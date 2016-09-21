module.exports = {
    // server config.
    // you can use domain name, ip address or localhost.
    server: 'example.com',
    port: 9200,

    // local test config
    localServer: 'localhost',
    localPort: 9200,

    // database url and name
    database: 'database_name',
    testDatabase: 'test_database_name',

    // jwt encryption secret
    jwtSecret: 'jwt_token_secret',

    // qiniu CDN config.
    // this is not necessary. if you not modify this config. image will save to local disk.
    accessKey: 'qiniu_access_key',
    secretKey: 'qiniu_secret_key',
    bucket: 'bucket_name',
    bucketUrl: 'bucket_outside_url',

    // max message lenght. for both backend and frontend
    maxMessageLength: 1024,
};
