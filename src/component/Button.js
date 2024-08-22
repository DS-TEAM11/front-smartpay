import './Button.css';

const Button = ({ className, text, onClick }) => {
    return (
        <button className={`Button ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
