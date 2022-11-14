const utils = {
    getCurrentDate() {
        return new Date(Date.now())
    },
    formatLocaleDateString(str) {
        return str.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')
    },
    subtractMillisFromStrDates(str1, str2) {
        return Date.parse(str2) - Date.parse(str1)
    }
}