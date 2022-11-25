import { useContext } from "react";
import themeContext from "../../Context/theme";

function SearchBar(props) {
  const searchForItem = (e) => {
    let val = e.target.value
      ? props.filteredList.filter((item) => {
          return item.full_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        })
      : props.list;
    props.setVal([...val]);
  };

  const context = useContext(themeContext);
  return (
    <input
      type="search"
      onChange={searchForItem}
      placeholder="Search here"
      className={`m-4 shadow-lg p-2 rounded-md text-2xl	outline-none w-1/3 ${context.theme.inputs} ${context.theme.font}`}
    />
  );
}

export default SearchBar;
