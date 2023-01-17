
const Button = (props) => {
  return (
    <div className="bg-button-light p-1 rounded-lg text-center text-darktext">
      <button className={`button button-${props.className}`} type={props.type} disabled={props.disabled}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
