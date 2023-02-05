const Card = (props) => {

  return (
    <>
      <div className={`flex flex-col items-center`}>
        {props.children}
      </div>
    </>
  );
};

export default Card;
