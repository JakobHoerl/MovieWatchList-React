import { FaClipboardList } from "react-icons/fa";
export default function Navbar({
  listNumber,
  toggleWatchedMovieList,
  setSearchBarResult,
  currValue,
  showDeleteBox,
}) {
  return (
    <div className="nav-bar">
      <Searchbar
        currValue={currValue}
        setSearchBarResult={setSearchBarResult}
      ></Searchbar>

      <div
        title="Show your rated Movies"
        onClick={toggleWatchedMovieList}
        className={showDeleteBox ? "matches-transparent" : "matches"}
      >
        <FaClipboardList size="2.5rem" />
        <span className={listNumber && !showDeleteBox ? "listNumber" : ""}>
          {listNumber && !showDeleteBox ? listNumber : ""}
        </span>
      </div>
    </div>
  );
}

function Searchbar({ setSearchBarResult, currValue }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setSearchBarResult(e)}
        value={currValue}
        type="text"
        placeholder="Search"
      ></input>
    </form>
  );
}
