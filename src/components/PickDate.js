import React, { useContext, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { HouseContext } from './HouseContext';

export default function PickDate() {
    const { bookingDate, setBookingDate } = useContext(HouseContext);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="When"
                value={bookingDate}
                minDate={dayjs('2017-01-01')}
                onChange={(newValue) => {
                    setBookingDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
