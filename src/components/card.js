const Card = (props) => {


  return (
    <>
      <div className={`p-2 flex flex-col items-center`}>
        {props.children}
      </div>
    </>
  );
};

export default Card;
