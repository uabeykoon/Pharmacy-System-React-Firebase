import React, { Component } from "react";
import { axiosAPI, axiosDB } from "../Axios/Axios";
import Buy from "./Buy/Buy";
import { NavLink, Route, Switch } from "react-router-dom";
import MyOrders from "./MyOrders/MyOrders";

class Customers extends Component {

    render() {
        return (
            <div>
                <div>
                    <ul>
                        <li><NavLink to={this.props.match.url + "/buy"} >Buy</NavLink></li>
                        <li><NavLink to={this.props.match.url + "/myorders"}>My Orders</NavLink></li>
                    </ul>
                </div>
                <div>
                    <Switch>
                        <Route path={this.props.match.url + "/buy"} component={Buy} />
                        <Route path={this.props.match.url + "/myorders"} component={MyOrders} />
                    </Switch>

                </div>
            </div>
        );
    }
}

export default Customers;