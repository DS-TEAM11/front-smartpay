import Button from '../component/Button';
import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';

const NotFoundPage = () => {
    return (
        <div className="errorpage">
            <h1>Not Found Page</h1>
            <Link to="/home">
                <Button text={'홈으로 돌아가기'}></Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
