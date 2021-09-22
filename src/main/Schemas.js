const isMac = process.platform === "darwin"

const userPreferencesSchema = {
    "open-window-in-fullscreen": {
        type: "boolean",
        default: true
    },
    "use-mac-controls": {
        type: "boolean",
        default: isMac
    }
}

module.exports = { userPreferencesSchema }