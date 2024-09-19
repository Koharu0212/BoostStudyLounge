import React, { createContext, useState } from 'react'

export const SeatContext = createContext();

export default function SeatContext({children}) {
    const [occupiedSeat, setOccupiedSeat] = useState({});

    const occupySeat= (seat_id) => {
		setOccupiedSeat(seat_id);
    };

    const vacateSeat = (seat_id) => {
        setOccupiedSeat(seat_id);
    };

    return (
        <SeatContext.Provider value={{occupiedSeat, occupySeat, vacateSeat}}>
            {children}
        </SeatContext.Provider>
    )
}