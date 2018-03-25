'use strict';

const local = {

};

async function controller (ctx, options, dependency) {
    const {iface, log} = dependency
    const {param} = options
    const data = param.user
    //  side effect
    const user = await iface.getUser(ctx, data.id, dependency)

    
    const newUser = pureController(user)

    //  side effect
    const updatedUser = await iface.updateUser(ctx, data.id, user, dependency)

    //  side effect
    log.info('user updated', { user: updatedUser })

    //  side effect
    // local[updatedUser.id] = updatedUser

    return updatedUser
}



// getUserMonad(id, pureController)

// class controller {}
// class updateUser extend controller {}


function pureController (user) {

    return { ...user, name: user.name.toUpperCase() }
}

module.exports = controller

