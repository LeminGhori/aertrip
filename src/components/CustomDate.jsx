import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { DateField } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";

export default function CustomDate({ fieldName, action }) {
    const dispatch = useDispatch();
    const value = useSelector(
        (state) => state.flight?.[fieldName?.toLowerCase()]
    );

    return (
        <StyledEngineProvider injectFirst>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                    label={fieldName}
                    value={value} // Set the value
                    onChange={(date) => {
                        dispatch(action(date));
                    }}
                    error={false}
                />
            </LocalizationProvider>
        </StyledEngineProvider>
    );
}
