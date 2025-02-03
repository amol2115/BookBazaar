import React from "react";
import heroimg from "../assets/Books.png";

const Home = () => {
    return (
        <div className="home page-bg">
            <div className="hero-text">
                <h1>Welcome to the Book Bazaar</h1>
                <h3>Have a great time! </h3>
            </div>
            <div className="hero-img">
                <img src={heroimg} alt="" />
            </div>
        </div>
    );
};

export default Home;
