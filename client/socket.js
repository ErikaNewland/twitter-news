import io from 'socket.io-client';
import store, {addTweetLocation} from './store'

const socket = io(window.location.origin);


socket.on('connect', () => {

    socket.on('new-tweet', (tweetLocation) => {
        store.dispatch(addTweetLocation(tweetLocation))
    });


});

export default socket;

