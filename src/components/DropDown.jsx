import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function DropDown({ options, value, left = false, action }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || options[0]);
    useEffect(() => {
        if (value) {
            const findData = options.find((item) => {
                return item?.value == value;
            });
            setSelectedValue(findData);
        }
    }, [value]);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleSelect = (option) => {
        setSelectedValue(option);
        dispatch(action(option?.value));
        setIsOpen(false);
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
                {selectedValue?.icon && (
                    <selectedValue.icon className="dropdown-item-icon" />
                )}
                {selectedValue?.label}
                {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </div>
            {isOpen && (
                <ul
                    className="dropdown-list"
                    style={{ left: left == "formTo" ? "-168px" : "0" }}
                >
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={`dropdown-item ${selectedValue.value === option.value ? "active" : ""
                                }`}
                            onClick={() => handleSelect(option)}
                        >
                            {option?.icon && <option.icon className="dropdown-item-icon" />}
                            <div>
                                <div className="option-label">
                                    {option?.label}
                                    {left == "formTo" && <ArrowRightAltIcon />}{" "}
                                    {option?.label2 && (
                                        <div
                                            style={{
                                                color: option?.isSub ? "gray" : "black",
                                                fontSize: option?.isSub ? ".75rem" : "1rem",
                                            }}
                                        >
                                            {" "}
                                            {option?.label2}
                                        </div>
                                    )}
                                </div>
                                {option?.message && (
                                    <div className="option-label-sub">{option?.message}</div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropDown;
