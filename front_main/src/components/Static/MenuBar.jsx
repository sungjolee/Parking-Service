import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

const Menubar = styled.div`
  position: fixed;
  bottom: 20px;
  display: flex;
  left: 50%;
  transform: translate(-50%, 0);
  align-items: center;
  justify-content: space-around;
  width: 280px;
  height: 50px;
  border-radius: 50px;
  background-color: lightgray;
  position: fixed;
`;

export default function MenuBar() {
  const [value, setValue] = React.useState(1);
  const keyword = useSelector((state) => state.keyword.value);

  function warning() {
    // 선택된 주차장이 없다면 search page로 이동
    if (keyword === '') {
      setValue(0)   // 메뉴바 searchpage 활성화
      alert('선택된 주차장이 없습니다.')
    }
  }
  console.log(window.location.pathname);
  useEffect(() => {
  }, [])

  return (
    <Menubar>
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Search" icon={<SearchIcon />} component={Link} to={`/SearchPage`} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to={`/`}/>
        <BottomNavigationAction onClick={warning} label="Parking" icon={<LocalParkingIcon />}  
        component={Link} to={keyword ? `/${keyword.PARKING}` : `/SearchPage`}/>
      </BottomNavigation>
    </Box>
    </Menubar>
  );
}
