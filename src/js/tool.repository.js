const repository = {
    KEY_NAME: "days",
    DEFAULT_VALUES: [
        { 
            "key": "07/09/2022", 
            "locale": "09/07/2022", 
            "items": [
                { "description": "Practice guitar", "checked": true }
            ]
        }, 
        { 
            "key": "07/30/2022", 
            "locale": "30/07/2022", 
            "items": [
                { "description": "Clear my room", "complete": false }, 
                { "description": "Search for articles about dopamine", "checked": true }, 
                { "description": "Teach math to my brother", "checked": true }
            ] 
        },
        { 
            "key": "11/14/2022", 
            "locale": "14/11/2022", 
            "items": [
                { "description": "Review and maintain my browser task app", "checked": true }, 
                { "description": "Buy a new book", "checked": true }
            ] 
        }, 
    ],
    startup() {
        try {
            const value = JSON.parse(localStorage.getItem(this.KEY_NAME))

            if (utils.isNull(value) || utils.isUndefined(value)) {
                throw new Error
            }
        } catch {
            localStorage.setItem(this.KEY_NAME, JSON.stringify([]))
        }
    },
    drop() {
        localStorage.removeItem(this.KEY_NAME)
    },
    save(values) {
        localStorage.setItem(this.KEY_NAME, JSON.stringify(values))
    },
    all() {
        return JSON.parse(localStorage.getItem(this.KEY_NAME))
    }
}