import React from "react";
import "./index.css";
import DropDown from "../../components/DropDown";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AirlineSeatFlatAngledIcon from "@mui/icons-material/AirlineSeatFlatAngled";
import CustomDropDown from "../../components/customDropDown";
import BoyIcon from "@mui/icons-material/Boy";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import {
    departFlight,
    fromFlight,
    recentSearches,
    returnFlight,
    reverseFlight,
    setSeatsOptions,
    setWayOptions,
    toFlight,
} from "../../store/action/action";
import MultipleSelect from "../../components/MultipleSelect";
import CustomDate from "../../components/CustomDate";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const wayOptions = [
    { value: "oneway", label: "Oneway", icon: ArrowRightAltIcon },
    { value: "return", label: "Return", icon: CompareArrowsIcon },
];

const seatsOptions = [
    { value: "economy", label: "Economy", icon: AirlineSeatFlatAngledIcon },
    {
        value: "premiumEconomy",
        label: "Premium Economy",
        icon: AirlineSeatFlatAngledIcon,
    },
    { value: "business", label: "Business", icon: AirlineSeatFlatAngledIcon },
    {
        value: "firstClass",
        label: "First Class",
        icon: AirlineSeatFlatAngledIcon,
    },
];

const passengerOptions = [
    {
        value: "adults",
        label: "Adults",
        message: "12+ yrs",
        min: 1,
        max: 9,
        icon: BoyIcon,
    },
    {
        value: "children",
        label: "children",
        message: "2-12 yrs",
        min: 0,
        max: 8,
        icon: BoyIcon,
    },
    {
        value: "infant",
        label: "Infant",
        message: "Under 2 yrs",
        min: 0,
        max: 9,
        icon: ChildFriendlyIcon,
    },
];
const recentSearchesOptions = [
    { value: "bom", label: "BOM", label2: "BLR", message: "12 Jun" },
    { value: "goi", label: "BOM", label2: "GOI", message: "21 Jun" },
    { value: "nil", label: "BOM", label2: "NIL", message: "19 Jun" },
];

function Home() {
    const theme = useSelector((state) => state.themeReducers);
    const passenger = useSelector((state) => state.flight);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleReverse = () => {
        dispatch(reverseFlight());
    };

    const handleFlightSubmit = () => {
        let requiredFields = ["wayOptions", "seatsOptions", "from", "to", "depart"];

        if (passenger.wayOptions !== "oneway") {
            requiredFields.push("return");
        }

        let isEmpty = false;

        for (let field of requiredFields) {
            if (
                !passenger[field] ||
                (Array.isArray(passenger[field]) && passenger[field].length === 0)
            ) {
                isEmpty = true;
                break;
            }
        }

        if (isEmpty) {
            toast.error("Please fill in all required fields.");
        } else {
            console.log("Form submitted successfully!");
            navigate("flights");
        }
    };

    return (
        <div className="flight-model">
            <div className="trip-image">
                <div className="home-contener">
                    <div className="flight-section-1">
                        <div className="section-1-left">
                            <div className="section-1-left-1">
                                <DropDown
                                    options={wayOptions}
                                    action={setWayOptions}
                                    value={passenger?.wayOptions}
                                />
                            </div>
                            <div className="section-1-left-2">
                                <CustomDropDown
                                    options={passengerOptions}
                                    title="Passenger"
                                    TitleIcon={BoyIcon}
                                />
                            </div>
                            <div className="section-1-left-3">
                                <DropDown
                                    options={seatsOptions}
                                    action={setSeatsOptions}
                                    value={passenger?.seatsOptions}
                                />
                            </div>
                        </div>
                        <div className="section-1-right">
                            <div className="section-1-right-1">
                                <DropDown
                                    options={recentSearchesOptions}
                                    left={"formTo"}
                                    action={recentSearches}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flight-section-2">
                        <div className="section-1">
                            <MultipleSelect
                                apiEndpoint={`${process.env.REACT_APP_API_PORT}/json/data-base.json`}
                                fieldName="From"
                                maxSelectLimit={3}
                                action={fromFlight}
                            />
                        </div>
                        <div className="reverse">
                            <CompareArrowsIcon onClick={handleReverse} />
                        </div>
                        <div className="section-1">
                            <MultipleSelect
                                apiEndpoint={`${process.env.REACT_APP_API_PORT}/json/data-base.json`}
                                fieldName="to"
                                maxSelectLimit={3}
                                action={toFlight}
                            />
                        </div>
                        <div className="section-1 g-1">
                            <CustomDate
                                sx={{ width: "300px" }}
                                fieldName="Depart"
                                action={departFlight}
                            />
                            {passenger?.wayOptions == "return" && (
                                <CustomDate
                                    sx={{ width: "300px" }}
                                    fieldName="Return"
                                    action={returnFlight}
                                />
                            )}
                        </div>
                        <div className="return-btn">
                            <Button className="dark-btn big-btn" onClick={handleFlightSubmit}>
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="home-text">
                    <div>Embark on</div>
                    <div>Journeys</div>
                    <div>Unbound!</div>
                </div>
            </div>
            <ToastContainer autoClose={1500} />
        </div>
    );
}

export default Home;
