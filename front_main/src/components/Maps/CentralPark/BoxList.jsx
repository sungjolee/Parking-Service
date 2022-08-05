import Box from '../Box' // props를 위한 BoxList import


const BoxList = ({ParkingData}) => {
  console.log(ParkingData)

  if (ParkingData) {  
    return(
        <div>
          {
            ParkingData.LIST.map(ParkingData => ( ParkingData.ID <= 4 ?
              <Box key={ ParkingData.ID } data={ ParkingData } /> 
              : <Box key={ ParkingData.ID } data={ ParkingData } />
            ))
          }
        </div>
    )
  }
}
export default BoxList