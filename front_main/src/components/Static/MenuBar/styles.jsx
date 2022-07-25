import styled from 'styled-components';

const Wrapper = styled.div`
  .menuBar {
    position: fixed;
    bottom: 20px;
    display: flex;
    left: 50%;
    transform: translate(-50%, 0);
    
    align-items: center;
    justify-content: space-around;
    width: 280px;
    height: 50px;
    border-radius: 30px;
    background-color: blue;
    position: fixed;
  }

  .home {
    height: 40px;
    width: 80px;
    background-color: #4F4587;
    border-radius: 30px;
    border: 0;
    outline: 0;  
    margin: 3px;
  }

  .parking {
    height: 40px;
    width: 80px;
    background-color: #4F4587;
    border-radius: 30px;
    border: 0;
    outline: 0;  
    margin: 3px;
  }

  .search{
    height: 40px;
    width: 80px;
    background-color: #4F4587;
    border-radius: 30px;
    border: 0;
    outline: 0;  
    margin: 3px;
  }

  a {
    text-decoration: none;
    color: white;
  }

`;

export default Wrapper;

/*
// 버튼이 클릭되었을 때 보라색으로 변경되게 만들기
.active {
  height: 40px;
  width: 80px;
  background-color: #4F4587;
  border-radius: 30px;
  border: 0;
  outline: 0;  
  margin: 3px;
}
*/