import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { axiosAPI, axiosDB } from "../../Axios/Axios";

class MyOrders extends Component {

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
                    .then((customer) => {


                        this.setState({
                            orderList: this.convertObjectToArray(res.data)
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
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Order</h5>
                               
                            </div>
                            {order.medicines.map((medicine)=>{
                                return (<p className="mb-1" key={medicine.medicineID.id}>{medicine.medicineID.name}({medicine.medicineID.dose}mg) - {medicine.amount}(Tablet)</p>);
                            })}
                            
                        <h3>Rs {order.totalPrice} /=</h3>
                        <button className="btn btn-success">{order.type==="p"?"Pending":"Accepted"}</button>
                        </a>);
                    })}


                </div>
            </div>

        );
    }
}

export default MyOrders;