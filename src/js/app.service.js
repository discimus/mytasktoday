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
    },
    exportData() {
        const link = document.createElement("a")
        const content = repository.all()

        link.download = "data.json"

        const contentAsJson = JSON.stringify(content)

        const blob = new Blob([contentAsJson], { type: "text/plain" })

        link.href = window.URL.createObjectURL(blob)
        link.click()
    },
    uploadData(e) {
        const FIRST_FILE_INDEX = 0
        const inputFile = document.getElementById("input-to-upload-data")
        const file = inputFile.files[FIRST_FILE_INDEX]

        function handleOnloadReaderEvent(e) {
            try {
                const parsedContent = JSON.parse(e.target.result)
                repository.save(parsedContent)
                location.reload()
            } catch {
                alert("Error on save content file :(")
            }
        }

        function handleOnerrorReaderEvent(e) {
            span.innerHTML = "Ooops... Error! :("
        }

        if (file) {
            const reader = new FileReader()

            reader.readAsText(file, "UTF-8")
            reader.onload = handleOnloadReaderEvent
            reader.onerror = handleOnerrorReaderEvent
        }
    }
}