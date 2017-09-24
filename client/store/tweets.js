import socket from '../socket'

const ADD_TWEET = 'ADD_TWEET'
const REMOVE_TWEET = 'REMOVE_TWEET'

export const addTweetLocation = tweetLocation => {
    return {type: ADD_TWEET, tweetLocation}
}

export const removeTweetLocation = tweetLocation => {
    return {type: ADD_TWEET, tweetLocation}
}

export default function(state = {}, action) {
    switch (action.type) {
        case ADD_TWEET: return [...state, action.tweetLocation]
        case REMOVE_TWEET: {
            return [...state].splice(state.indexOf(tweet))
        }
        default: return state 
    }
}