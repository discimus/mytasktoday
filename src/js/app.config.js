const appConfig = {
    data() {
        return {
            inputValue: "",
            tasks: repository.all()
        }
    },
    beforeCreate() {
        repository.startup()
    },
    mounted() {
        service.useApp(this)
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