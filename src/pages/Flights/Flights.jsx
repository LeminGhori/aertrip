import React, { useCallback, useEffect, useState } from "react";
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
    sortFilter,
    toFlight,
} from "../../store/action/action";
import MultipleSelect from "../../components/MultipleSelect";
import CustomDate from "../../components/CustomDate";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import PriceDropDown from "../../components/PriceDropDown";
import FlightsCard from "../../components/FlightsCard/FlightsCard";
import axios from "axios";
import dayjs from "dayjs";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";

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

const sortOptions = [
    { value: "smart", label: "Smart", label2: "Recommended", isSub: true },
    { value: "lowPrice", label: "Price", label2: "Low to high", isSub: true },
    { value: "hignPrice", label: "Price", label2: "High to low", isSub: true },
    {
        value: "shortestDuration",
        label: "Duration",
        label2: "Shortest first",
        isSub: true,
    },
    {
        value: "longestDuration",
        label: "Duration",
        label2: "Longest first",
        isSub: true,
    },
];

function Flights() {
    const [dataBase, setDataBase] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoader, setIsLoader] = useState(false);
    const passenger = useSelector((state) => state.flight);
    const filterReducer = useSelector((state) => state.filter);
    const theme = useSelector((state) => state.themeReducers);
    const dispatch = useDispatch();
    const handleReverse = () => {
        dispatch(reverseFlight());
    };

    React.useEffect(() => {
        try {
            axios
                .get(`${process.env.REACT_APP_API_PORT}/json/flights.json`)
                .then((response) => {
                    if (response.data && response.data && Array.isArray(response.data)) {
                        setDataBase(response.data);
                        setIsLoader(true);
                        const filtered = response?.data?.filter((flight) => {
                            const fromMatch = passenger.from.includes(flight.from);
                            const toMatch = passenger.to.includes(flight.to);
                            const seatsMatch =
                                passenger.seatsOptions.toLowerCase() ===
                                flight.seats.toLowerCase();

                            const departDate =
                                passenger.depart !== ""
                                    ? dayjs(passenger?.depart).add(1, "day").format("YYYY-MM-DD")
                                    : false;
                            const flightDate =
                                flight?.date !== ""
                                    ? dayjs(flight?.date).format("YYYY-MM-DD")
                                    : false;
                            const departMatch = departDate === flightDate;

                            let dateMatch = departMatch;

                            if (passenger.wayOptions === "return" && passenger.return) {
                                const returnDate =
                                    passenger?.return !== ""
                                        ? dayjs(passenger?.return)
                                            .add(1, "day")
                                            .format("YYYY-MM-DD")
                                        : false;

                                const returnMatch = returnDate === flightDate;
                                dateMatch = departMatch || returnMatch;
                            }

                            const totalPassengers =
                                parseInt(passenger?.passengerOptions?.adults || 0) +
                                parseInt(passenger?.passengerOptions?.children || 0) +
                                parseInt(passenger?.passengerOptions?.infant || 0);

                            const seatsLeftMatch = flight?.seatsLeft >= totalPassengers;
                            const priceRange =
                                flight?.price >= filterReducer?.priceRange[0] &&
                                flight?.price <= filterReducer?.priceRange[1];
                            return (
                                fromMatch &&
                                toMatch &&
                                seatsMatch &&
                                dateMatch &&
                                seatsLeftMatch &&
                                priceRange
                            );
                        });
                        setCount(1);

                        setFilterData(filtered);
                    } else {
                        setIsLoader(false);
                        console.warn("flights is undefined or not an array");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        } catch {
            console.error("Error fetching data:");
        }
    }, []);

    const handleSearch = () => {
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
            const filtered = dataBase?.filter((flight) => {
                const fromMatch = passenger.from.includes(flight.from);
                const toMatch = passenger.to.includes(flight.to);
                const seatsMatch =
                    passenger.seatsOptions.toLowerCase() === flight.seats.toLowerCase();

                const departDate =
                    passenger?.depart !== ""
                        ? dayjs(passenger?.depart).add(1, "day").format("YYYY-MM-DD")
                        : false;
                const flightDate =
                    flight?.date !== ""
                        ? dayjs(flight?.date).format("YYYY-MM-DD")
                        : false;
                const departMatch = departDate === flightDate;

                let dateMatch = departMatch;

                if (passenger.wayOptions === "return" && passenger.return) {
                    const returnDate =
                        passenger?.return !== ""
                            ? dayjs(passenger?.return).add(1, "day").format("YYYY-MM-DD")
                            : false;
                    const returnMatch = returnDate === flightDate;
                    dateMatch = departMatch || returnMatch;
                }

                const totalPassengers =
                    parseInt(passenger?.passengerOptions?.adults || 0) +
                    parseInt(passenger?.passengerOptions?.children || 0) +
                    parseInt(passenger?.passengerOptions?.infant || 0);

                const seatsLeftMatch = flight?.seatsLeft >= totalPassengers;
                const priceRange =
                    flight?.price >= filterReducer?.priceRange[0] &&
                    flight?.price <= filterReducer?.priceRange[1];
                return (
                    fromMatch &&
                    toMatch &&
                    seatsMatch &&
                    dateMatch &&
                    seatsLeftMatch &&
                    priceRange
                );
            });

            setFilterData(filtered);
        }
    };

    const filterAndSortData = useCallback(() => {
        if (count > 1) {
            const filtered = dataBase?.filter((flight) => {
                const fromMatch = passenger.from.includes(flight.from);
                const toMatch = passenger.to.includes(flight.to);
                const seatsMatch =
                    passenger.seatsOptions.toLowerCase() === flight.seats.toLowerCase();

                const departDate =
                    passenger?.depart !== ""
                        ? dayjs(passenger?.depart).add(1, "day").format("YYYY-MM-DD")
                        : false;
                const flightDate =
                    flight?.date !== ""
                        ? dayjs(flight?.date).format("YYYY-MM-DD")
                        : false;

                const departMatch = departDate === flightDate;

                let dateMatch = departMatch;

                if (passenger.wayOptions === "return" && passenger.return) {
                    const returnDate =
                        passenger?.return !== ""
                            ? dayjs(passenger?.return).add(1, "day").format("YYYY-MM-DD")
                            : false;

                    const returnMatch = returnDate === flightDate;
                    dateMatch = departMatch || returnMatch;
                }

                const totalPassengers =
                    parseInt(passenger?.passengerOptions?.adults || 0) +
                    parseInt(passenger?.passengerOptions?.children || 0) +
                    parseInt(passenger?.passengerOptions?.infant || 0);

                const seatsLeftMatch = flight?.seatsLeft >= totalPassengers;
                const priceRange =
                    flight?.price >= filterReducer?.priceRange[0] &&
                    flight?.price <= filterReducer?.priceRange[1];
                const refundableFaresOnlyMatch =
                    filterReducer?.selectedOption?.value === "refundableFaresOnly"
                        ? flight?.refundableFaresOnly === true
                        : true;
                return (
                    fromMatch &&
                    toMatch &&
                    seatsMatch &&
                    dateMatch &&
                    seatsLeftMatch &&
                    priceRange &&
                    refundableFaresOnlyMatch
                );
            });

            let sorted = [...filtered];

            if (filterReducer?.sort) {
                switch (filterReducer.sort) {
                    case "lowPrice":
                        sorted.sort((a, b) => a.price - b.price);
                        break;
                    case "highPrice":
                        sorted.sort((a, b) => b.price - a.price);
                        break;
                    case "shortestDuration":
                        sorted.sort((a, b) => {
                            const getDurationInMinutes = (duration) => {
                                const [hours, minutes] = duration.split(/[h,m]/).map(Number);
                                return hours * 60 + minutes;
                            };
                            return (
                                getDurationInMinutes(a.duration) -
                                getDurationInMinutes(b.duration)
                            );
                        });
                        break;
                    case "longestDuration":
                        sorted.sort((a, b) => {
                            const getDurationInMinutes = (duration) => {
                                const [hours, minutes] = duration.split(/[h,m]/).map(Number);
                                return hours * 60 + minutes;
                            };
                            return (
                                getDurationInMinutes(b.duration) -
                                getDurationInMinutes(a.duration)
                            );
                        });
                        break;
                    default:
                        break;
                }
            }

            setFilterData(sorted);
        } else {
            setCount(2);
        }
    }, [filterReducer]);

    const debouncedFilterAndSortData = useCallback(
        debounce(filterAndSortData, 1000),
        [filterAndSortData]
    );

    useEffect(() => {
        debouncedFilterAndSortData();
    }, [debouncedFilterAndSortData]);

    return (
        <div className="flight-model">
            <div className="flight">
                <div className="home-contener-flight" style={{ background: theme == "light" ? 'white' : '#c9c9c9' }}>
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
                            <Button className="dark-btn big-btn" onClick={handleSearch}>
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="filter">
                    <div className="filter-icons">
                        <RepeatIcon />
                    </div>
                    <div className="filter-conteners">
                        Sort: <DropDown options={sortOptions} action={sortFilter} />
                    </div>
                    <div className="filter-conteners">
                        Price: <PriceDropDown />
                    </div>
                </div>
            </div>
            <div className="show-flight">
                {filterData?.length} of
                <div className="of-flights">{dataBase?.length} flights</div>
            </div>
            {
                filterData?.map((data) => {
                    return <FlightsCard data={data} />;
                })
            }
            {
                filterData?.length == 0 &&
                <div className="not-found">
                    Flight Not Found
                </div>
            }
            <ToastContainer autoClose={1500} />
        </div >
    );
}

export default Flights;
