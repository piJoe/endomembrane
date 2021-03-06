class EndomembraneAction {
    constructor(endomembrane, name, store, func) {
        this.endomembrane = endomembrane
        this.name = name
        this.store = store // must be of type EndomembraneStore
        this.func = func
    }

    commit(...commands) {
        if (this.store._commit(commands)) { //commit returns true, if store has changed
            this.endomembrane._callUpdate()
        }
    }

    call(...payload) {
        this.func.bind({
            commit: this.commit.bind(this),
            store: this.store._getImmutableStore()
        })(...payload)
    }
}

export {EndomembraneAction}