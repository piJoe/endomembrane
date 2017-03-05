import {ActionAlreadyDefinedException, ActionNotDefinedException, GetterAlreadyDefinedException, GetterNotDefinedException} from './exceptions/exceptions'
import {EndomembraneAction} from './action'
import {EndomembraneGetter} from './getter'

/**
 * The Endomembrane System.
 */
class Endomembrane {
    /**
     * Creates a new Endomembrane instance.
     */
    constructor() {
        this._actions = {}
        this._getters = {}
        this._eventListeners = []
    }

    /**
     * registers a new action, which can then be called by call
     * @param {string} actionName - the name to define this action (case-sensitive!)
     * @param {EndomembraneStore} store - an EndomembraneStore used for this action
     * @param {function} fn - the function which gets called by call
     */
    registerAction(actionName, store, fn) {
        if (this._actions.hasOwnProperty(actionName)) 
            throw new ActionAlreadyDefinedException(actionName)

        this._actions[actionName] = new EndomembraneAction(this, actionName, store, fn)
    }

    /**
     * registers a new getter, which can then be called by get
     * @param {string} getterName - the name to define this getter (case-sensitive!)
     * @param {EndomembraneStore} store - an EndomembraneStore used for this action
     * @param {function} fn - the function which gets called by get. This function should always return something.
     */
    registerGetter(getterName, store, fn) {
        if (this._getters.hasOwnProperty(getterName)) 
            throw new GetterAlreadyDefinedException(getterName)

        this._getters[getterName] = new EndomembraneGetter(this, getterName, store, fn)
    }

    /**
     * register a new listener for an update event.
     * @param {function} callback - this gets only called when the store has changed
     */
    onUpdate(callback) {
        this._eventListeners.push(callback)
    }

    /**
     * calls all the update callbacks, tell them we've updated our store!
     */
    _callUpdate() {
        this._eventListeners.forEach(callback => {callback()})
    }

    /**
     * calls the action 'actionName' with payload as arguments
     * @param {string} actionName - the action you want to call
     * @param {...} payload - the payload you want to send to your action (accepts rest parameters)
     */
    call(actionName, ...payload) {
        if (!this._actions.hasOwnProperty(actionName)) 
            throw new ActionNotDefinedException(actionName)

        // notice: we do not return anything here, because actions cannot return values!
        this._actions[actionName].call(...payload)
    }

    /**
     * calls the getter 'getterName' with payload as arguments.
     * returns the result of your getter function
     * @param {string} getterName - the action you want to call
     * @param {...} payload - the payload you want to send to your action (accepts rest parameters)
     * @returns {*}
     */
    get(getterName, ...payload) {
        if (!this._getters.hasOwnProperty(getterName)) 
            throw new GetterNotDefinedException(getterName)

        return this._getters[getterName].get(...payload)
    }
}

export {Endomembrane}