import './App.css';

import {useState} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import 초기게시글 from './data'; 

import BoardList from './board/BoardList';
import BoardInsert from './board/BoardInsert';
import BoardDetail from './board/BoardDetail';
import BoardUpdate from './board/BoardUpdate';


function App() {

  // 변수 선언부, State관리
  let 제목 = "블로그";
  let [게시글배열, 게시글배열변경함수] = useState(초기게시글);
  //레이아웃상태를 state로 저장시키기
  let [레이아웃, 레이아웃변경] = useState(0);
  let [상세보기, 상세보기변경] = useState(null); 
  let 등록페이지url = "/insert"; 

  let 모든데이터 = {
    게시글배열, 게시글배열변경함수, 상세보기, 상세보기변경
  }



  /* View return*/
  return (
    <div className="App">
      <div className="header">
        <h3 style={ { fontWeight : "bolder" } }>{제목}</h3>
      </div>
      <div className='nav'>
        <Link to="/list">게시판</Link>
        <Link to={등록페이지url} >등록</Link>
      </div>


      <Routes>
        <Route path='/' element={ <BoardList  모든데이터={모든데이터} /> } />
        <Route path='/list' element={<BoardList 모든데이터={모든데이터} />}/>
        <Route path='/insert' element={<BoardInsert 모든데이터={모든데이터} />}/>
        <Route path='/detail' element={<BoardDetail  모든데이터={모든데이터} />}/>
        <Route path='/update' element={<BoardUpdate 모든데이터={모든데이터} />}/>
        {/* 사용자가 잘못된 url를 입력했을 때 에러페이지로 보내도록함. *: 모든경로 의미(항상 맨마지막에 작성) */}
        <Route path='*' element={
          <div>
            <h1 style={ {color : "red" }} > 존재하지 않는 페이지입니다. </h1>
            <Link to='/'> 사이트로 돌아가기 </Link>
          </div>
        }/>
        {/* 위에꺼 제외한 모든 페이지, 맨 아래쪽에 위치해야함  */}


      </Routes>


      {/* {
        레이아웃 == 0 ? 
        <BoardList 게시글배열={게시글배열} 게시글배열변경함수={게시글배열변경함수} 상세보기변경={상세보기변경} 레이아웃변경={레이아웃변경}/> :
        레이아웃 == 1 ?
        <BoardInsert 게시글배열={게시글배열} 게시글배열변경함수={게시글배열변경함수}/> :
        레이아웃 == 2 ?
        <BoardDetail  상세보기={상세보기} 레이아웃변경={레이아웃변경}/> :
        레이아웃 == 3 ?
        <BoardUpdate 상세보기변경={상세보기변경} 게시글배열={게시글배열} 
          게시글배열변경함수={게시글배열변경함수} 상세보기={상세보기} 레이아웃변경={레이아웃변경} /> :
        null
      } */}
    </div>
  );
}

export default App;