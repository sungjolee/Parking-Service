
import Box from "./Box";
// import api from "./api";

export default function Parking() {
    return (
        <div>
            <ul>
                {/* {parking.emptySpotNow}/{parking.totalSpot}  */}
                <li>  (빈공간/총대수)</li>
            </ul>
            <ui>
                <Box name='첫번째'/>
                <Box name='두번째'/>
                <Box name='세번째'/>
                <Box name='네번째'/>
                <Box name='다섯번째'/>
                <Box name='여섯번째'/>
                <Box name='일곱번째'/>
            </ui> <br />

        </div>
    )
};