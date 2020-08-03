import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { axiosAPI, axiosDB } from "../../Axios/Axios";

class HistoryCustomers extends Component {

    state = {
        myTokan: null,
        customerID: null,
        orderList: []
    }



    componentDidMount() {

        this.fetchOrders();
    }

    fetchOrders = () => {
        //console.log(localStorage.getItem("id"))
        axiosDB.get(`order.json?orderBy="customerID"&equalTo="${localStorage.getItem("id")}"`)
            .then((res) => {
                axiosDB.get("pharmacy.json")
                    .then((pharmacy) => {



                        let orderList = this.convertObjectToArray(res.data);
                        let pharmacyList = this.convertObjectToArray(pharmacy.data);
                        let filteredOrderList = this.filterOrderAccordingToStatus(orderList);
                        let combinedOrder = this.combinePharmacyDetailsOrders(filteredOrderList, pharmacyList);

                        console.log(combinedOrder)

                        this.setState({
                            orderList: combinedOrder
                        });



                        // let fullOrder = this.convertObjectToArray(res.data);
                        // let fullPharmacy = this.convertObjectToArray(customer.data);
                        // let filteredOrder = this.filterOrderAccordingToPharmacy(fullOrder);
                        // let filterOrderNotCompleted = this.filterOrderAccordingTOStatus(filteredOrder);
                        // //console.log(filteredOrder);

                        // this.setState({
                        //     orderList: this.combineCustomerDetailsOrders(filterOrderNotCompleted, fullPharmacy)
                        // });
                    }).catch((err) => {
                        console.log(err);
                    });


                //console.log(res.data);

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


    combinePharmacyDetailsOrders = (orderArray, pharmacyList) => {
        let newArray = [];
        for (let order of orderArray) {
            newArray.push({ ...order, pharmacyID: this.findObject(pharmacyList, order.pharmacyID) });
        }
        return newArray;
    }

    filterOrderAccordingToStatus = (array) => {
        let newArray = array.filter((order) => order.type === "c" || order.type === "r");
        console.log(newArray)
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
                            <div className="d-flex w-100 justify-content-between">
                            <h3>{order.pharmacyID.pharmacyName} Pharmacy - {order.pharmacyID.pharmacyLocation}</h3>
                                <div>
                                {/* <h3>{order.pharmacyID.pharmacyName} Pharmacy - {order.pharmacyID.pharmacyLocation}</h3> */}
                    {/* <p>{order.pharmacyID.pharmacyAddress}</p> */}
                                </div>
                    

                            </div>
                            {order.medicines.map((medicine) => {
                                return (<p className="mb-1" key={medicine.medicineID.id}>{medicine.medicineID.name}({medicine.medicineID.dose}mg) - {medicine.amount}(Tablet)</p>);
                            })}

                            <h3>Rs {order.totalPrice} /=</h3>
                            <button className={order.type==="c"?"btn btn-primary":"btn btn-danger"}>{order.type === "c" ? "Completed" : "Rejected"}</button>
                        </a>

                        );
                    })}


                </div>
            </div>

        );
    }
}

export default HistoryCustomers;