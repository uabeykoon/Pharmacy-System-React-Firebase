import React, { Component } from "react";
import Axios from "axios";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { axiosDB } from "../../Axios/Axios";
import PieChart from "./Pie";
//import './SignIn.css';

class Dash extends Component {

    state = {
        customerCount:0,
        pharmacyCount:0,
        manufacturerCount:0,
        medicineCount:0
    };

    cardRowStyle = {
        marginTop: "50px"
    };

    card1 = { maxWidth: "18rem" }

    componentDidMount(){
        this.fetchMedicines();
        this.fetchCustomer();
        this.fetchManufacturer();
        this.fetchPharmacy();
    }


    fetchMedicines = () =>{
        axiosDB.get("medicine.json")
        .then((res)=>{
            this.setState({
                medicineCount:this.countNumberOfObjects(res.data)
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    fetchPharmacy = () =>{
        axiosDB.get("pharmacy.json")
        .then((res)=>{
            this.setState({
                pharmacyCount:this.countNumberOfObjects(res.data)
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    fetchManufacturer = () =>{
        axiosDB.get("manufacturer.json")
        .then((res)=>{
            this.setState({
                manufacturerCount:this.countNumberOfObjects(res.data)
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    fetchCustomer = () =>{
        axiosDB.get("customer.json")
        .then((res)=>{
            this.setState({
                customerCount:this.countNumberOfObjects(res.data)
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    countNumberOfObjects =(object)=>{
        let count = 0;
        for(let ob in object){
            count++;
        }
        //console.log(count);
        return count;
    }


    render() {


        return (
            <>
                <div className="container-fluid">
                    <div className="row" style={this.cardRowStyle}>
                        <div className="col-md-3" style={{textAlign:"center"}}>
                            <div className="card text-white mb-3" style={{ maxWidth: "17rem" }} >
                                <div className="card-header  bg-success"><h2>Customers</h2></div>
                                <div className="card-body" style={{color:"black"}}>
                                    <div className="row">
                                        <div className="col-md-6"><p>Total Number of Customers</p></div>
                                        <div className="col-md-6"><h1 className="card-title" style={{fontSize:"60px"}}>{this.state.customerCount}</h1></div>                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" style={{textAlign:"center"}}>
                            <div className="card text-white mb-3" style={{ maxWidth: "17rem" }} >
                                <div className="card-header  bg-danger"><h2>Pharmacies</h2></div>
                                <div className="card-body" style={{color:"black"}}>
                                    <div className="row">
                                        <div className="col-md-6"><p>Total Number of Pharmacies</p></div>
                                        <div className="col-md-6"><h1 className="card-title" style={{fontSize:"60px"}}>{this.state.pharmacyCount}</h1></div>                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" style={{textAlign:"center"}}>
                            <div className="card text-white mb-3" style={{ maxWidth: "17rem" }} >
                                <div className="card-header  bg-warning"><h2>Manufacturer</h2></div>
                                <div className="card-body" style={{color:"black"}}>
                                    <div className="row">
                                        <div className="col-md-6"><p>Total Number of Manufacturer</p></div>
                                        <div className="col-md-6"><h1 className="card-title" style={{fontSize:"60px"}}>{this.state.manufacturerCount}</h1></div>                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" style={{textAlign:"center"}}>
                            <div className="card text-white mb-3" style={{ maxWidth: "17rem" }} >
                                <div className="card-header  bg-dark"><h2>Medicines</h2></div>
                                <div className="card-body" style={{color:"black"}}>
                                    <div className="row">
                                        <div className="col-md-6"><p>Total Number of Medicines</p></div>
                                        <div className="col-md-6"><h1 className="card-title" style={{fontSize:"60px"}}>{this.state.medicineCount}</h1></div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12" style={{textAlign:"center"}}>
                            <PieChart />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Dash;