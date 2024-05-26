import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOption, setPriceRange } from "../store/action/action.jsx";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function PriceDropDown() {
    const options = [
        { value: "refundableFaresOnly", label: "Refundable fares only" },
        { value: "priceRange", label: "Price range", type: "slider" },
    ];

    const selectedOption = useSelector((state) => state.filter.selectedOption);
    const priceRange = useSelector((state) => state.filter.priceRange);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleSelect = (option) => {
        dispatch(setSelectedOption(option));
        if (option.type !== "slider") {
            setIsOpen(false);
        }
    };

    const handlePriceRangeChange = (event, newValue) => {
        dispatch(setPriceRange(newValue));
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedOption.label ? selectedOption.label : "Please Select"}
                {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </div>
            {isOpen && (
                <ul className="dropdown-list" style={{ width: "340px" }}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={`dropdown-item ${selectedOption.value === option.value ? "active" : ""
                                }`}
                            onClick={() => handleSelect(option)}
                            style={{
                                flexDirection: option.type === "slider" ? "column" : "row",
                            }}
                        >
                            <div className="option-label">{option.label}</div>
                            {option.type === "slider" && (
                                <Box sx={{ width: "80%", padding: "16px" }}>
                                    <div className="slider-range-values">
                                        <span>{priceRange[0]}</span>
                                        <span>{priceRange[1]}</span>
                                    </div>
                                    <Slider
                                        value={priceRange}
                                        onChange={handlePriceRangeChange}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={300000}
                                        getAriaLabel={() => "Price range"}
                                    />
                                </Box>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PriceDropDown;
