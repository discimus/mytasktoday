const service = {
    useApp(app) {
        this.app = app
        return this
    },
    addTask() {
        const today = utils.getCurrentDate()
        const key = today.toLocaleDateString("en-US")
        
        if (this.app.inputValue === "" || this.app.inputValue === undefined) {
            return;
        }
        
        var currentTask = this.app.tasks.find(t => t.key === key)
        
        if (currentTask === undefined) {
            const content = { key, locale: today.toLocaleDateString("en-GB"), items: [] }
            this.app.tasks.push(content)
        }
        
        const index = this.app.tasks.findIndex(t => t.key == key)
        
        if (index == -1) {
            throw "Index out of bound."
        }
        
        const task = this.app.tasks[index]
        
        const item = {
            description: this.app.inputValue,
            complete: false
        }
        
        task.items.push(item)

        this.app.inputValue = ""

        repository.save(this.app.tasks)
    }
}