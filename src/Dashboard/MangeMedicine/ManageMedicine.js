import React, { Component } from "react";
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { axiosDB } from "../../Axios/Axios";
//import './SignIn.css';

class ManageMedicine extends Component {

    state = {
        name: null,
        dose: null,
        price: null,

        manuName: null,
        manuCon: null
    }


    formStyle = {
        width: "100%",
        margin: "20 auto",
        marginTop: "10px",
        padding: "30px"
    };

    componentDidMount() {

    }
    //input manufacturer to database
    onChangeNameManu = (event) => {
        this.setState({
            manuName: event.target.value
        });
    }
    onChangeContactManu = (event) => {
        this.setState({
            manuCon: event.target.value
        });
    }

    onClickAddManu = (e) => {
        e.preventDefault();
        let object = {
            manufacturerName: this.state.manuName,
            manufacturerContactNumber:this.state.manuCon
        };
        axiosDB.post("manufacturer.json", object)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }


    //input medicine to the database
    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        });
    }
    onChangedose = (event) => {
        this.setState({
            dose: event.target.value
        });
    }
    onChangePrice = (event) => {
        this.setState({
            price: event.target.value
        });
    }
    onInputMedicineClick = (e) => {
        e.preventDefault();
        let object = {
            name: this.state.name,
            dose: this.state.dose,
            price: this.state.price
        };
        axiosDB.post("medicine.json", object)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })

    }




    render() {


        return (
            <>
                <div style={this.formStyle} className="border border-dark">
                    <h1>Manufacturer Registration</h1>
                    <form onSubmit={this.onClickAddManu}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={this.onChangeNameManu} required />
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input type="text" className="form-control" onChange={this.onChangeContactManu} required />
                        </div>
                        <input className="btn btn-primary" type="submit" value="ADD MANUFACTURER" />|
                        {/* <input className="btn btn-danger" type="button" value="Cancel" onClick={} /> */}
                    </form>
                </div>
                <div style={this.formStyle} className="border border-dark">
                    <form onSubmit={this.onInputMedicineClick}>
                        <h1>Medicine Registration</h1>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={this.onChangeName} required />
                        </div>
                        <div className="form-group">
                            <label>Dose</label>
                            <input type="text" className="form-control" onChange={this.onChangedose} required />
                        </div>
                        <div className="form-group">
                            <label>Price per Unit</label>
                            <input type="text" className="form-control" onChange={this.onChangePrice} required />
                        </div>
                        <input type="submit" className="btn btn-primary" value="ADD MEDICINE" />
                    </form>
                </div>
            </>
        );
    }
}

export default ManageMedicine;