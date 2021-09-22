const Store = require('electron-store')

const { userPreferencesSchema } = require("./Schemas")

const userPreferences  = new Store({
    cwd: "data/config",
    name: "userPreferences",
    schema: userPreferencesSchema,
})

console.log(userPreferences.store);

module.exports = { userPreferences }