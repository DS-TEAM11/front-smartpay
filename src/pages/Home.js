import React from "react";
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
            <Header />
            Home 페이지입니다.
            <div style={styles.card}>

            </div>
            <Footer />
        </>
    )
}

export default Home;