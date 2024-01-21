import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoardInsert({모든데이터}){
    let {게시글배열 , 게시글배열변경함수} = 모든데이터;

    const navigate = useNavigate();
 
  let [입력값, 입력값변경] =useState({글제목 : "", 
                                    글내용 : "",
                                    작성자 : ""});
  // 입력값.글제목
  function 게시글등록 () {
    // "" => false , "dasdsa" => true
    let {글내용 , 글제목, 작성자} = 입력값;

    if( !글내용 || !글제목  || !작성자 ){
      alert("뭐든 입력하십쇼");
      return;
    }

    //2) 가져온 데이터를 바탕으로 게시글 객체 생성하기
    let 게시글 = {
        //글번호는 게시글배열에서 고유해야함. 게시글배열에서 가장큰 글번호값을 찾은후 +1해서 반환해줄 예정.
        글번호 : Math.max( ...게시글배열.map( function(게시글, 인덱스) {return 게시글.글번호})) +1,
        ...입력값, // 한줄로 키밸류값으로 가져옴
        작성일 : new Date().toLocaleDateString() // 2024. 01. 15
    }
    //3) 생성한 게시글객체를 게시글배열에 추가한 후 , 게시글배열변경함수 호출하기(랜더링)   
    게시글배열변경함수([...게시글배열 , 게시글]);

    //입력값 초기화(state초기화)
    입력값변경({
      글제목 : "",
      글내용 : "",
      작성자 : ""
    })
    
    navigate('/list');
  }
  function onIputHandler(e){
    let {name , value} = e.target;
    입력값변경({...입력값, [name] : value});
  }   
    return (
        <div className='outer'>
          <br />
          <h2>등록</h2>
          <table className='enroll-table'>
            <tr>
              <th>제목</th>
              <td colSpan={3}>
                <input type='text' name='글제목'
                onChange={function(e){
                  입력값변경({...입력값, 글제목 : e.target.value});
                }}
                value={입력값.글제목} // 입력값 내부에 있는 글제목값을 가져와라
                />
              </td>
            </tr>
            <tr>
              <th>작성자</th>
              <td colSpan={3}>
                <input type='text' name='작성자' 
                onChange={function(e){
                  console.dir(e.target)
                  입력값변경({                    
                    ...입력값 , 
                    [e.target.name] : e.target.value // 입력하고자하는 값은 뒤에 놔야함
                    // [] 표기법을 통해 속성명을 지정해줘야함. [e.target.name]에는 작성자가 들어감
                  })
                  
                }}
                value={입력값.작성자} // 입력값 내부에 있는 작성자값을 가져와라
                />
              </td>
            </tr>
            <tr>
              <th>글내용</th>
              <td colSpan={3} style={ { height: "200px" }  }>
                <textarea name='글내용'
                onChange={onIputHandler}
                value={입력값.글내용}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th colSpan={4}><button onClick={게시글등록}>등록</button></th>
            </tr>
          </table>
      </div>

    )
}
