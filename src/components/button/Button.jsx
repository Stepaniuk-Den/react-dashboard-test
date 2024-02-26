import "./button.scss";
import PropTypes from "prop-types";

const Button = ({
  onClick = null,
  text = "button",
  type = "button",
  className = "button",
  style = {},
}) => {
  return (
    <button type={type} onClick={onClick} className={className} style={style}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.any,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Button;
