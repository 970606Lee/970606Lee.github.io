import { useNavigate } from "react-router-dom";

export default function BoardList({모든데이터}){
    // console.log(props);

    let {게시글배열, 게시글배열변경함수, 상세보기변경} = 모든데이터;

    const navigate = useNavigate();

    function 게시글삭제(삭제할글번호) {
        //2) 게시글배열에서 글번호와 일치하지 않는 게시글만 필터링하기. (filter함수 이용)
        let 필터링배열 = 게시글배열.filter( function(게시글) { 
          return 게시글.글번호 !== 삭제할글번호; 
        }); 
        게시글배열변경함수(필터링배열); 

    }

    
    function 게시글상세조회(조회할글번호) {
        let 상세게시글 = 게시글배열.find( function(게시글) { 
            return 게시글.글번호 == 조회할글번호;
        });
        
        // 레이아웃변경(2);
        // navigate로 이동하고자 하는 페이지 적어주면됨
        navigate('/detail');
        상세보기변경(상세게시글);
    }

    return (
        <div className='outer'>
        <br />
        <h2>일반게시판</h2>
        <table className='list-table'>
          <thead>
            <tr>
              <th style={ {width : "10%" } }>번호</th>
              <th style={ {width : "40%" } }>제목</th>
              <th style={ {width : "20%" } }>작성자</th>
              <th style={ {width : "20%" } }>작성일</th>
              <th style={ {width : "10%" } }>삭제</th>
            </tr>
          </thead>
          <tbody>
            {/* 
              Array내부의 map함수 사용 예정
              [1,2,3].map(function () { return 1}) ==> [1,1,1]
            */
             게시글배열.map(function( 게시글, 인덱스) {
              return (
                <tr key={인덱스} onClick={ () =>  게시글상세조회(게시글.글번호)}>
                  <td>{게시글.글번호}</td>
                  <td>{게시글.글제목}</td>
                  <td>{게시글.작성자}</td>
                  <td>{게시글.작성일}</td>
                  <td><button onClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 방지
                    게시글삭제(게시글.글번호)}}
                    >삭제</button>
                  </td>
                </tr>
                )
             })
            }
          </tbody>
        </table>
      </div>
    )
}