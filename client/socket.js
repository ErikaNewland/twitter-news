import io from 'socket.io-client';
import store, {addTweet} from './store'

const socket = io(window.location.origin);

socket.on('connect', () => {
    socket.on('new-tweet', (tweetData) => {
        store.dispatch(addTweet(tweetData))
    });
});

export default socket;

