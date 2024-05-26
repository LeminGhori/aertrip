import React from "react";
import "./index.css";
import { Button } from "@mui/material";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import { useSelector } from "react-redux";
function FlightsCard({ data }) {
    const theme = useSelector((state) => state.themeReducers);

    return (
        <div className="flight-card">
            <div className="flight-contener" style={{ background: theme == "light" ? 'white' : '#c9c9c9' }}>
                <div className="card-upper">
                    <div className="flight-card-item">
                        <div className="flight-logo">
                            <img src={data?.logo} width={"100%"} height={"100%"} />
                        </div>
                        <div className="flight-name">{data?.flight}</div>
                    </div>
                    <div className="flight-card-item flex-column">
                        <div className="item-upper">
                            <div className="mid-item-upper">{data?.boarding}</div>
                            <div className="mid-item-upper time">{data?.duration}</div>
                            <div className="mid-item-upper">{data?.landing}</div>
                        </div>
                        <div className="item-bottom">
                            <div className="flight-airport">{data?.from}</div>
                            <div className="flight-border"></div>
                            <div className="flight-airport">{data?.to}</div>
                        </div>
                    </div>
                    <div className="flight-card-item flex-end">
                        <div className="price-div">
                            <div className="price-upper">{`₹ ${data?.price}`}</div>
                            <div className="price-bottom">{"First (F)"}</div>
                        </div>
                        <div className="book">
                            <Button className="dark-btn big-btn book-btn">Book</Button>
                        </div>
                    </div>
                </div>
                <div className="card-bottm">
                    <div className="flight-card-item color-comment">
                        <div className="comment">
                            <InsertCommentIcon /> {data?.comments}
                        </div>
                        <div className="bag">
                            <WorkOutlineOutlinedIcon /> {data?.baggage}
                        </div>
                    </div>
                    <div className="flight-card-item f-end">
                        <div className="seat-left">
                            <div className="m-10">{data?.seatsLeft}</div>
                            <FlightClassIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlightsCard;
