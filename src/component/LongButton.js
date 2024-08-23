import './LongButton.css';

const LongButton = ({ className, text, onClick }) => {
    return (
        <button className={`LongButton ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default LongButton;
