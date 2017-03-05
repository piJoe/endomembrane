import Immutable from 'immutable'
class EndomembraneStore {
    constructor(jsObj) {
        this._store = Immutable.fromJS(jsObj)
    }

    _getImmutableStore() {
        return this._store
    }

    _commit(commands) {
        var oldStore = this._store // backup the old store to later check for changes
        commands.forEach(this._executeCommand.bind(this))

        return !Immutable.is(oldStore, this._store) // returns true, if store has changed with this commit
    }
    _executeCommand(commandArray) {
        var [method, ...params] = commandArray
        this._store = this._store[method](...params)
    }
}

export {EndomembraneStore}