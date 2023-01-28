import NavLinks from "./NavLinks";

const Navigation = (props) => {
  return (
    <div>
      <NavLinks setToggleDarkMode={props.setToggleDarkMode} toggleDarkMode={props.toggleDarkMode}/>
    </div>
  );
};

export default Navigation;
