import React, { Component } from "react";
import Axios from "axios";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { axiosDB } from "../../Axios/Axios";
import TableCustomerDash from "./CustomerTable/TableCustomerDash";
//import './SignIn.css';

class CustomerDash extends Component {

    state = {
        customerList: []
    };

    cardRowStyle = {
        marginTop: "50px"
    };

    card1 = { maxWidth: "18rem" }

    componentDidMount() {
        //this.fetchMedicines();
        this.fetchCustomer();
        //this.fetchManufacturer();
        //this.fetchPharmacy();
    }


    fetchMedicines = () => {
        axiosDB.get("medicine.json")
            .then((res) => {
                this.setState({
                    medicineCount: this.countNumberOfObjects(res.data)
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    fetchPharmacy = () => {
        axiosDB.get("pharmacy.json")
            .then((res) => {
                this.setState({
                    pharmacyList: this.convertObjectToArray(res.data)
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    fetchManufacturer = () => {
        axiosDB.get("manufacturer.json")
            .then((res) => {
                this.setState({
                    manufacturerCount: this.countNumberOfObjects(res.data)
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    fetchCustomer = () => {
        axiosDB.get("customer.json")
            .then((res) => {
                this.setState({
                    customerList: this.convertObjectToArray(res.data)
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    countNumberOfObjects = (object) => {
        let count = 0;
        for (let ob in object) {
            count++;
        }
        //console.log(count);
        return count;
    }


    convertObjectToArray = (incomingObject) => {
        let newArray = [];
        for (let key in incomingObject) {
            newArray.push({ ...incomingObject[key], id: key });
        }
        return newArray;
    }


    render() {


        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* <BarChart /> */}
                        </div>

                    </div>
                    <div className="row" style={this.cardRowStyle}>
                        <TableCustomerDash customerList={this.state.customerList} />
                        
                    </div>
                </div>
            </>
        );
    }
}

export default CustomerDash;