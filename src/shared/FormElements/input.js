import { useEffect, useReducer } from "react";
import { validate } from "../../Utils/Validator";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCHED":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }

  
};

const Input = (props) => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false
  });
  
  const {id, onInput} = props
  const {value, isValid} = inputState

  useEffect (()=> {
     onInput(id, value, isValid)
  },[id, value, isValid, onInput]);

  const onBlurHandler = () => {
    dispatch({
      type: "TOUCHED",
    });
  };
  const onChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };


  const element =
    props.element === "input" ? (
      <input
        id = {props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        value={inputState.value}

        className=" border border-border-dark rounded-lg p-1 bg-transparent text-lighttext"
      />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} />
    );

  return (
    <>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </>
  );
};

export default Input;
