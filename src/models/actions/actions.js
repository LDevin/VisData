
export function changeUserName(user) {
    return {
        type: 'CH_NAME',
        payload: user,
    }
}

export function changeBase(user) {
    return {
        type: 'CH_DAY',
        payload: user,
    }
}

export function changeCom(user) {
    return {
        type: 'CH_ALL',
        payload: user,
    }
}
