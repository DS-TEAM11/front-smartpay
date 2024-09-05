import './Button.css';

const Button = ({ className, text, onClick }) => {
    if (className) {
        return (
            <button className={`Button ${className}`} onClick={onClick}>
                {text}
            </button>
        );
    }
    return (
        <button className={`Button`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
