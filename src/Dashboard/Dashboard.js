import React, { Component } from "react";
import Axios from "axios";
import { axiosDB } from "../Axios/Axios";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import ManageMedicine from "./MangeMedicine/ManageMedicine";
import Dash from "./Dash/Dash";
import PharmacyDash from "./PharmacyDash/PharmacyDash";
import CustomerDash from "./CustomerDash/CustomerDash";
//import './SignIn.css';

class Dashboard extends Component {

    state = {
        email: null,
        password: null,
        type: null,
        errorMessage: false
    };

    formStyle = {
        width: "40%",
        textAlign: "center",
        margin: "0 auto",
        marginTop: "100px"
    };


    onLogoutClick =() =>{
        localStorage.removeItem("id");
        this.props.history.push("/");
    }


    render() {


        return (
            <>
                <div>
                    <div>
                        <ul>
                            <li><NavLink to={this.props.match.url + "/dash"} >Dashboard</NavLink></li>
                            <li><NavLink to={this.props.match.url + "/managemedicine"} >Manage Medicine</NavLink></li>
                            <li><NavLink to={this.props.match.url + "/customerdash"}>Customers</NavLink></li>
                            <li><NavLink to={this.props.match.url + "/pharmacydash"}>Pharmacy</NavLink></li>
                            <li><a onClick={this.onLogoutClick}><span className="logout">Log out</span></a></li>
                        </ul>
                    </div>
                    <div>
                        <Switch>
                            <Route path={this.props.match.url + "/managemedicine"} component={ManageMedicine}></Route>
                            <Route path={this.props.match.url + "/dash"} component={Dash}></Route>
                            <Route path={this.props.match.url + "/pharmacydash"} component={PharmacyDash}></Route>
                            <Route path={this.props.match.url + "/customerdash"} component={CustomerDash}></Route>
                        </Switch>

                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;