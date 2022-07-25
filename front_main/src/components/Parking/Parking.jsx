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
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
            </ui> <br />

        </div>
    )
};
