import React, { Component } from "react";
import { axiosAPI, axiosDB } from "../Axios/Axios";
import Buy from "./Buy/Buy";
import { NavLink, Route, Switch } from "react-router-dom";
import MyOrders from "./MyOrders/MyOrders";
import './Customer.css';
import HistoryCustomers from "./History/HistoryCustomer";

class Customers extends Component {
    onLogoutClick =() =>{
        localStorage.removeItem("id");
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <div>
                    <ul>
                        <li><NavLink to={this.props.match.url + "/buy"} >Buy</NavLink></li>
                        <li><NavLink to={this.props.match.url + "/myorders"}>My Orders</NavLink></li>
                        <li><NavLink to={this.props.match.url + "/historycustomer"}>History</NavLink></li>
                        <li><a onClick={this.onLogoutClick}><span className="logout">Log out</span></a></li>
                    </ul>
                </div>
                <div>
                    <Switch>
                        <Route path={this.props.match.url + "/buy"} component={Buy} />
                        <Route path={this.props.match.url + "/myorders"} component={MyOrders} />
                        <Route path={this.props.match.url + "/historycustomer"} component={HistoryCustomers} />
                    </Switch>

                </div>
            </div>
        );
    }
}

export default Customers;