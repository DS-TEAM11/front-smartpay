import React from "react";
import NavBar from "../component/NavBar";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Home = () => {
    const styles = {
        card: {
            width: '300px',
            height: '200px',
            margin: '20px auto',
            backgroundColor: 'blue',
            border: '1px solid #dddddd',
        }
    }

    return (
        <>  
            <NavBar />
            <Header />
            <div style={styles.card}>

            </div>
            <Footer />
        </>
    )
}

export default Home;