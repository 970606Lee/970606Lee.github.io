import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function BoardUpdate({모든데이터}){

    const navigate = useNavigate();

    // 상세보기, 배열
    let {게시글배열, 게시글배열변경함수, 상세보기, 상세보기변경} = 모든데이터;

    let [입력값, 입력값변경] = useState(상세보기); 
    // detail에서 가져왔던 상세보기 정보를 그대로 가져와줌


    console.log(입력값);
    
    function 게시글수정(){
        // 수정 완료 후 게시글 상세페이지로 이동
        let {글제목, 글내용, 작성자} = 입력값;
        if(!글제목 || !글내용 || !작성자){
            alert("뭐든 입력하세요");
            return;
        }

        const 변경된게시글배열 = 게시글배열.map(function(게시글){
            if(게시글.글번호 == 입력값.글번호) return 입력값;  // 일치한다면 입력값 반환
            return 게시글;  // 일치하지 않는다면 게시글 반환
        })
        
        게시글배열변경함수([...변경된게시글배열]); // [...변경된게시글배열] 2차원이 배열이 될수 있어서 ()를 붙여야 배열이된다.
        // 레이아웃변경(2);
        상세보기변경(입력값);
        navigate('/detail');
    }

    // 입력했던 값들이 알맞게 추가될 것
    function onIputHandler(e){
        let {name , value} = e.target;
        입력값변경({...입력값, [name] : value});
    }   

    return (
        <div className='outer'>
        <br />
        <h2>수정</h2>
        <table className='enroll-table'>
          <tr>
            <th>제목</th>
            <td colSpan={3}>
              <input type='text' name='글제목'
              onChange={onIputHandler}
              value={입력값.글제목}
              />
            </td>
          </tr>
          <tr>
            <th>작성자</th>
            <td colSpan={3}>
              <input type='text' name='작성자' 
              onChange={onIputHandler}
              value={입력값.작성자}
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
            <th colSpan={4}><button onClick={ 게시글수정}>수정</button></th>
          </tr>
        </table>
    </div>
    )
}