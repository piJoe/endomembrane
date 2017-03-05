class EndomembraneGetter {
    constructor(endomembrane, name, store, func) {
        this.endomembrane = endomembrane
        this.name = name
        this.store = store // must be of type EndomembraneStore
        this.func = func
    }

    get(...payload) {
        return this.func.bind({
            store: this.store._getImmutableStore(),
        })(...payload)
    }
}

export {EndomembraneGetter}