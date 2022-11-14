const appConfig = {
    data() {
        return {
            inputValue: "",
            tasks: repository.all()
        }
    },
    mounted() {
        repository.startup()
        service.app = this
        service.verifyTasksConsistense()
    },
    computed: {
        tasksOrderedByReverseKeyDate() {
            return this.tasks.sort((a, b) => utils.subtractMillisFromStrDates(a.key, b.key))
        },
    },
    methods: {
        addTask() {
            service.addTask()
        },
        persistCurrentAppState() {
            repository.save(this.tasks)
        }
    }
}