import socket from '../socket'

const ADD_TWEET = 'ADD_TWEET'
const REMOVE_TWEET = 'REMOVE_TWEET'

export const addTweet = tweet => {
    return {type: ADD_TWEET, tweet}
}

export const removeTweet = tweet => {
    return {type: ADD_TWEET, tweet}
}

export default function(state = {}, action) {
    switch (action.type) {
        case ADD_TWEET: return [...state, action.tweet]
        case REMOVE_TWEET: {
            return [...state].splice(state.indexOf(tweet))
        }
        default: return state 
    }
}