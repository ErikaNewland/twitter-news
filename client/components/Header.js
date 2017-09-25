import React from 'react';




export default function Header() {



    return (
        <div className="container">
            <div className="jumbotron">
                <h1>THIS.INCOMING</h1>
                <h3>Watch as the world's news unfolds in real time.</h3>
            </div>
        </div>
    )
}

const mapState = state => {
    return {
        cart: state.cart
    }
}