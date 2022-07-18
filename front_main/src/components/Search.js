export default function Search() {
    return (
        <div>
            <div className="searchBar">
                <input placeholder="검색어를 입력하세요." />
            </div>
            <div>
              <span className="currentSearch">최근검색</span>
              <span className="bookMark">즐겨찾기</span>
              <div>
                검색목록
              </div>
            </div>
        </div>
    )
};