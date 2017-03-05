class ActionAlreadyDefinedException {
    constructor(action) {
        this.name = 'ActionAlreadyDefinedException'
        this.message = `An action with the name ${action} is already defined.`
    }
}

class GetterAlreadyDefinedException {
    constructor(getter) {
        this.name = 'GetterAlreadyDefinedException'
        this.message = `A getter with the name ${getter} is already defined.`
    }
}

class ActionNotDefinedException {
    constructor(action) {
        this.name = 'ActionNotDefinedException'
        this.message = `An action with the name ${action} is not defined.`
    }
}

class GetterNotDefinedException {
    constructor(getter) {
        this.name = 'GetterNotDefinedException'
        this.message = `A getter with the name ${getter} is not defined.`
    }
}

export {ActionAlreadyDefinedException, GetterAlreadyDefinedException, ActionNotDefinedException, GetterNotDefinedException}