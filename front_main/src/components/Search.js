import "../css/SearchBar.css";

export default function Search() {
  return (
    <div>
      <div className="searchBar">
        <form>
          <input placeholder="주차장을 입력하세요." />
          <button type="submit">검색</button>
        </form>
      </div>
      <div className="subBar">
        <div>
          <span className="currentSearch">최근검색</span>
        </div>
        <div>
          <span className="bookMark">즐겨찾기</span>
        </div>
      </div>
      <div>
        검색목록
      </div>
    </div>
  )
};