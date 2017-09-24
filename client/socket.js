import io from 'socket.io-client';
import store, {addTweetLocation} from './store'

const socket = io(window.location.origin);


socket.on('connect', () => {

    socket.on('new-tweet', (tweetData) => {
        store.dispatch(addTweetLocation(tweetData))
    });


});

export default socket;

