
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function searchField() {
  return (
   <>
          <div className="search-input">
                <div className="search-input-field">
                  <input
                    type="search"
                    placeholder="Search"
                    className="user-search"
                  />
                  <SearchOutlinedIcon style={{ color: "#ccc" }} />
                </div>
              </div>
   </>
  )
}

export default searchField