// import styled from 'styled-components';
import Box from './Box' // props를 위한 BoxList import


const BoxList = () => {
  const TestDatas =  [
    {id : 1,
    value : 'true'},
    {id : 2,
    value : 'true'},
    {id : 3,
    value : 'false'},
    {id : 4,
    value : 'true'},
    {id : 5,
    value : 'false'},
    {id : 6,
    value : 'true'},
    {id : 7,
    value : 'false'},
    {id : 8,
    value : 'false'},
  ]
  
  return(
      <div>
        {
          TestDatas.map(TestData => ( TestData.id <= 4 ?
            <Box key={ TestData.id } data={ TestData } /> 
            : <Box key={ TestData.id } data={ TestData } />

          ))
        }
      </div>
  )
}
export default BoxList


// return(
//   <div>
//     {
//       TestDatas.map(TestData => (
//         <Box key={ TestData.id } data={ TestData } />
//       ))
//     }
//   </div>
// )

// }
// export default BoxList