import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { axiosDB } from "../../Axios/Axios";

class Orders extends Component {

    state = {
        orderList: []
    }


    componentDidMount() {
        this.fetchOrders();
        //console.log(localStorage.getItem("id"));
    }



    fetchOrders = () => {
        //console.log(localStorage.getItem("id"))
        axiosDB.get(`order.json`)
            .then((res) => {
                axiosDB.get("customer.json")
                    .then((customer) => {
                        //console.log(res.data);
                        let fullOrder = this.convertObjectToArray(res.data);
                        let fullPharmacy = this.convertObjectToArray(customer.data);
                        let filteredOrder = this.filterOrderAccordingToPharmacy(fullOrder);


                        this.setState({
                            orderList: this.combineCustomerDetailsOrders(filteredOrder, fullPharmacy)
                        });
                    }).catch((err) => {
                        console.log(err);
                    });

            }).catch((err) => {
                console.log(err);
            })
    }

    convertObjectToArray = (incomingObject) => {
        let newArray = [];
        for (let key in incomingObject) {
            newArray.push({ ...incomingObject[key], id: key });
        }
        return newArray;
    }

    filterOrderAccordingToPharmacy = (array) => {
        let newArray = array.filter((order) => order.pharmacyID === localStorage.getItem("id"));
        return newArray;

    }
    combineCustomerDetailsOrders = (orderArray, customerArray) => {
        let newArray = [];
        for (let order of orderArray) {
            newArray.push({ ...order, customerID: this.findObject(customerArray, order.customerID) });
        }
        return newArray;

    }

    findObject = (array, id) => {
        return array.find((ob) => ob.id === id)
    }


    render() {
        return (
            <div>
                <div className="list-group">
                    {this.state.orderList.map((order) => {
                        return (<a className="list-group-item list-group-item-action flex-column align-items-start" key={order.id}>
                            <div className="d-flex w-100">


                                <h5 className="mb-1">Order</h5>

                            </div>
                            {order.medicines.map((medicine) => {
                                return (<p className="mb-1" key={medicine.medicineID.id}>{medicine.medicineID.name}({medicine.medicineID.dose}mg) - {medicine.amount}(Tablet)</p>);
                            })}

                            <h3>Rs {order.totalPrice} /=</h3>
                            <div className="pull-right">abc</div>
                            <h3>Customer Details</h3>
                        <p>{order.customerID.customerName}</p>
                        <p>{order.customerID.customerAddress}</p>
                        <p>{order.customerID.customerContactNumber}</p>
                        </a>);
                    })}


                </div>
            </div>

        );
    }
}

export default Orders;