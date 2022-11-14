const service = {
    app: null,
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
    },
    verifyTaskConsistence(task) {
        console.log(task.key);
        if (!utils.isNull(task.title) || !utils.isUndefined(task.title)) {
            const date = new Date(Date.parse(task.title))
            task.key = date.toLocaleDateString("en-GB")
            delete task.title
        }

        if (utils.isNull(task.locale) || utils.isUndefined(task.locale)) {
            const date = new Date(Date.parse(task.key))
            task.locale = date.toLocaleDateString("en-GB")
        }
    },
    verifyTasksConsistense() {
        this.app.tasks.forEach(this.verifyTaskConsistence)
        repository.save(this.app.tasks)
    }
}