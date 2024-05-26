import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/Add";
import {
    incrementPassenger,
    decrementPassenger,
} from "../store/action/action.jsx";
import "./styles.css";

function CustomDropDown({ options, value, title, TitleIcon }) {
    const dispatch = useDispatch();
    const passenger = useSelector((state) => state.flight);
    const [passengerOptions, setpassengerOptions] = useState({});

    useEffect(() => {
        setpassengerOptions(passenger?.passengerOptions);
    }, [passenger]);
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

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const total = passengerOptions.adults + passengerOptions.children;

    const incrementCount = (key) => {
        dispatch(incrementPassenger(key));
    };

    const decrementCount = (key) => {
        dispatch(decrementPassenger(key));
    };

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className="custom-dropdown-header" onClick={toggleDropdown}>
                {TitleIcon && <TitleIcon className="custom-dropdown-item-icon" />}
                {passengerOptions.adults +
                    passengerOptions.children +
                    passengerOptions.infant}{" "}
                {title}
                {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </div>
            {isOpen && (
                <ul className="custom-dropdown-list">
                    {options.map((option, index) => (
                        <li key={index} className={`custom-dropdown-item `}>
                            <option.icon className="custom-dropdown-item-icon" />
                            <div className="custom-dropdown-item-content">
                                <div>
                                    <div className="option-label">{option.label}</div>
                                    <div className="option-label-sub">{option.message}</div>
                                </div>
                                <div className="custom-counter">
                                    <HorizontalRuleIcon
                                        onClick={() => decrementCount(option.value)}
                                        style={{
                                            opacity:
                                                passengerOptions[option.value] <= option.min ? 0.5 : 1,
                                        }}
                                        disabled={passengerOptions[option.value] <= option.min}
                                    />
                                    <span>{passengerOptions[option.value]}</span>
                                    <AddIcon
                                        onClick={() => incrementCount(option.value)}
                                        style={{
                                            opacity:
                                                passengerOptions[option.value] >= option.max ||
                                                    total >= 9 ||
                                                    (option.value === "infant" &&
                                                        passengerOptions[option.value] ===
                                                        passengerOptions.adults)
                                                    ? 0.5
                                                    : 1,
                                        }}
                                        disabled={
                                            passengerOptions[option.value] >= option.max ||
                                            total >= 9 ||
                                            (option.value === "infant" &&
                                                passengerOptions[option.value] ===
                                                passengerOptions.adults)
                                        }
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                    {total > 6 && (
                        <div className="airlines-warning">
                            Some airlines do not allow searching for more than 6 passengers at
                            once
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
}

export default CustomDropDown;
