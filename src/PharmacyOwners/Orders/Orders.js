import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { axiosDB } from "../../Axios/Axios";

class Orders extends Component {

    state = {
        orderList: []
    }

    statuspending = {
        color: 'red'
    };
    statusaccepted = {
        color: 'green'
    };


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

                        let fullOrder = this.convertObjectToArray(res.data);
                        let fullPharmacy = this.convertObjectToArray(customer.data);
                        let filteredOrder = this.filterOrderAccordingToPharmacy(fullOrder);
                        let filterOrderNotCompleted = this.filterOrderAccordingTOStatus(filteredOrder);
                        //console.log(filteredOrder);

                        this.setState({
                            orderList: this.combineCustomerDetailsOrders(filterOrderNotCompleted, fullPharmacy)
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
        console.log(newArray)
        console.log(localStorage.getItem("id"))
        return newArray;

    }

    filterOrderAccordingTOStatus = (array) => {
        let newArray = array.filter((order) => order.type === "p" || order.type === "a");
        console.log(newArray)
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

    onClickAcceptOrder = (id) => {
        let ob = {
            type: "a"
        };
        axiosDB.patch(`order/${id}.json`, ob)
            .then((res) => {
                console.log(res);
                this.fetchOrders()
            }).catch((err) => {
                console.log(err);
            });
    }

    onClickCompleteOrder = (id) => {
        let ob = {
            type: "c"
        };
        axiosDB.patch(`order/${id}.json`, ob)
            .then((res) => {
                console.log(res);
                this.fetchOrders()
            }).catch((err) => {
                console.log(err);
            });
    }

    onClickRejectOrder = (id) => {
        let ob = {
            type: "r"
        };
        axiosDB.patch(`order/${id}.json`, ob)
            .then((res) => {
                console.log(res);
                this.fetchOrders()
            }).catch((err) => {
                console.log(err);
            });
    }


    render() {
        return (
            <div>
                <div className="list-group">
                    {this.state.orderList.map((order) => {
                        return (<a className="list-group-item list-group-item-action flex-column align-items-start" key={order.id}>
                            <div className="d-flex w-100 justify-content-between">

                                <div>
                                    <h3 className="mb-1" style={order.type === "p" ? this.statuspending : this.statusaccepted}>{order.type === "p" ? "Pending" : "Accepted"} Order</h3>
                                    {order.medicines.map((medicine) => {
                                        return (<p className="mb-1" key={medicine.medicineID.id}><b>{medicine.medicineID.name}({medicine.medicineID.dose}mg) - {medicine.amount}(Tablet)</b></p>);
                                    })}

                                    <h3>Rs {order.totalPrice} /=</h3>


                                    <button className="btn btn-success" onClick={() => this.onClickAcceptOrder(order.id)}>{order.type === "p" ? " Click to Accept Request" : "Accepted"}</button>|
                            <button className="btn btn-primary" onClick={() => this.onClickCompleteOrder(order.id)}>{order.type === "a" || order.type === "p" ? " Click to Complete Request" : "Completed"}</button>|
                            <button className="btn btn-danger" onClick={() => this.onClickRejectOrder(order.id)}>{order.type === "a" || order.type === "p" ? " Click to Reject Request" : "Deleted"}</button>
                                </div>




                                <div>
                                    <h3>Customer Details</h3>
                                    <p>{order.customerID.customerName}<br />
                                        {order.customerID.customerAddress}<br />
                                        {order.customerID.customerContactNumber}</p>
                                </div>

                            </div>

                        </a>);
                    })}


                </div>
            </div>

        );
    }
}

export default Orders;