const appConfig = {
    data() {
        return {
            inputValue: "",
            days: [{ "title": "8/7/2022", "items": [{ "description": "subir meu app no github pages", "complete": false, "checked": true }, { "description": "mostrar pros caras", "complete": false, "checked": true }, { "description": "ouvir uma música", "complete": false, "checked": true }, { "description": "assistir video sobre redes do Akita", "complete": false, "checked": true }] }, { "title": "9/7/2022", "items": [{ "description": "assistir um vídeo do desenvolvedor.io", "complete": false, "checked": true }] }, { "title": "30/7/2022", "items": [{ "description": "libs monogame: https://github.com/aloisdeniel/awesome-monogame", "complete": false, "checked": true }, { "description": " MonoGame Tutorial 001 - Drawing a Sprite ", "complete": false, "checked": true }, { "description": "http://rbwhitaker.wikidot.com/monogame-getting-started-tutorials", "complete": false, "checked": true }, { "description": "http://rbwhitaker.wikidot.com/introduction-to-monogame", "complete": false, "checked": true }, { "description": "http://rbwhitaker.wikidot.com/setting-up-monogame", "complete": false, "checked": true }, { "description": "http://rbwhitaker.wikidot.com/monogame-project-template", "complete": false, "checked": true }, { "description": "http://rbwhitaker.wikidot.com/monogame-managing-content", "complete": false, "checked": true }, { "description": "http://rbwhitaker.wikidot.com/monogame-2d-tutorials", "complete": false }, { "description": "http://rbwhitaker.wikidot.com/monogame-introduction-to-2d-graphics", "complete": false, "checked": true }, { "description": "http://rbwhitaker.wikidot.com/monogame-spritebatch-basics", "complete": false }] }]
        }
    },
    mounted() {
        try {
            const currentLocalContent = JSON.parse(localStorage.days)

            if (!Array.isArray(currentLocalContent)) {
                localStorage.days = JSON.stringify([])
            }
        } catch (e) {
            localStorage.days = JSON.stringify([])
        }

        this.days = JSON.parse(localStorage.days)
    },
    computed: {
        reverseDays() {
            return this.days
                .sort((a, b) => Date.parse(b.title.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')) - Date.parse(a.title.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')))
        }
    },
    methods: {
        addNewItem() {
            const today = new Date(Date.now())
            const key = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

            if (this.inputValue === "" || this.inputValue === undefined) {
                return;
            }

            var currentDay = this.days.find(t => t.title === key)

            if (currentDay === undefined) {
                const content = {
                    title: key,
                    items: []
                }

                this.days.push(content)
            }

            const index = this.days.findIndex(t => t.title == key)

            if (index == -1) {
                throw "Index out of bound."
            }

            const day = this.days[index]

            const item = {
                description: this.inputValue,
                complete: false
            }

            day.items.push(item)

            this.inputValue = ""

            this.saveCurrentDays()
        },
        saveCurrentDays() {
            localStorage.days = JSON.stringify(this.days)
        }
    }
}