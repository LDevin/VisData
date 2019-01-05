const fk = {
    json: 'json-server',
    faker: 'faker-mock'
}
module.exports = {
    port: 9000,
    jsondir:`../${fk.json}/test`,
    fakerdir: `../${fk.faker}/test`,
    debug: false,
}