
export function changeUserName(user) {
    return {
        type: 'CH_NAME',
        payload: user,
    }
}

export function changeBase(actions) {
    return {...actions}
}

export function changeCom(actions) {
    return {...actions}
}

export function changeMap(actions) {
    return {...actions}
}

export function changeCache(actions) {
    return {...actions}
}
