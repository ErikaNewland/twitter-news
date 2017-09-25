import React from 'react';




export default function Footer() {



    return (
        <div className="container">
            <div className="jumbotron">
                <p className = "explanation">Each red dot represents the location referenced in a tweet originating from one of the following news organziations: <br/>Mashable, CNN Breaking News, Time, Breaking News, BBC Breaking News, Gizmodo, CNN, BBC, NPR, NY Times, NY Times Breaking, Washington Post, LA Times, Miami Herald, Chicago Tribune, Al Jazeer, CNBC, MSNBC, PBS Newshour, Nigthly News </p>
                <p className = "name"> A Hackathon Project by Erika Newland<br/>Grace Hopper Program</p>
            </div>
        </div>
    )
}

const mapState = state => {
    return {
        cart: state.cart
    }
}