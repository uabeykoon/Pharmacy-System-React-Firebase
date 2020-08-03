import React, { Component } from "react";
import { axiosAPI, axiosDB } from "../../Axios/Axios";
import TableCus from "./TableCus/TableCus";

class Buy extends Component {

    state = {
        customerID: null,
        loading: false,
        validateErrorMessage: false,
        disableMedicine: false,
        pharmacies: [],
        selectedPharmacy: null,
        selectedMedicine: null,
        selectedAmount: null,
        allmedicineList: [],
        medicineWithDetails: [],
        medicineList: [],
        purchasingList: []
    };

    formStyle = {
        width: "60%",
        textAlign: "center",
        margin: "0 auto",
        marginTop: "10px"
    };

    lineStyle = {
        borderLeft: "6px solid black",
        height: "500px",
        marginTop:"10px"
    };


    componentDidMount() {
        this.setState({
            customerID: localStorage.getItem("id")
        })
        this.fetchPharmacy();
        //this.fetchMedicine();
    }

    onChangePharmacy = (event) => {
        this.setState({
            loading: true,
            selectedPharmacy: event.target.value,
            purchasingList: []
        });
        this.fetchMedicine();
        //console.log(event.target.value);
        //localStorage.setItem("id","new ID");
    }
    onChangeMedicine = (event) => {
        //console.log(event.target.value)
        this.setState({
            selectedMedicine: event.target.value
        });
    }

    onChangeAmount = (event) => {
        this.setState({
            selectedAmount: event.target.value
        });
    }

    onAddtoListClick = (e) => {

        e.preventDefault();

        //console.log(obj)

        if (this.state.selectedAmount === "0" || this.state.selectedAmount === null || this.state.selectedPharmacy === "0" || this.state.selectedPharmacy === null || this.state.selectedMedicine === "0" || this.state.selectedMedicine === null) {
            this.setState({
                validateErrorMessage: true
            });
        } else {

            //console.log(this.findAmountOfmedicine(this.state.selectedMedicine));


            let obj = {
                medicineID: this.findRelatedObject(this.state.allmedicineList, this.state.selectedMedicine),
                amount: parseInt(this.state.selectedAmount),
                totalPricePerItem: this.findRelatedObject(this.state.allmedicineList, this.state.selectedMedicine).price * this.state.selectedAmount
            };
            //console.log(obj)

            let array = [];
            array = [...this.state.purchasingList, obj]
            this.setState({
                purchasingList: array,
                validateErrorMessage: false
            });

        }




        // puchToPurchasingList =() =>{
        //     let array=[];
        //     this.setState
        // }


    }


    onClickPlaceOrder = () => {
        //console.log(localStorage.getItem("id"));
        //console.log("clicked")
        if (this.state.purchasingList.length === 0 || this.state.customerID === null) {
            console.log("empty");
        } else {

            let object = {
                customerID: this.state.customerID,
                pharmacyID: this.state.selectedPharmacy,
                medicines: this.state.purchasingList,
                totalPrice: this.calculateTotalPrice(this.state.purchasingList),
                type: "p"
            };
            this.addOrder(object)
                .then((res) => {
                    //console.log(res);
                    //console.log(this.props.match.url);
                    this.props.history.push("/customer/myorders")
                }).catch((e) => {
                    console.log(e);
                })
        }
    }

    findAmountOfmedicine = (medicineID) => {
        return this.state.medicineWithDetails.find((ob) => ob.medicineID.id === medicineID).availableAmount
    }



    fetchPharmacy = () => {
        this.setState({
            loading: true
        })
        axiosDB.get("pharmacy.json")
            .then((pharmacy) => {
                this.setState({
                    loading: false,
                    pharmacies: this.convertObjectToArray(pharmacy.data)
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    fetchMedicineRelatedToPharmacy = () => {
        return axiosDB.get(`pharmacyMedicine.json?orderBy="pharmacyID"&equalTo="${this.state.selectedPharmacy}"`)

    }
    addOrder = (object) => {
        return axiosDB.post("order.json", object);
    }


    fetchMedicine = () => {
        this.setState({
            loading: true
        });
        axiosDB.get("medicine.json")
            .then((allMedicine) => {
                //console.log(medicine);
                this.fetchMedicineRelatedToPharmacy()
                    .then((medicine) => {
                        //console.log(medicine.data)
                        this.setState({
                            loading: false,
                            medicineList: this.convertObjectToArray(medicine.data),
                            allmedicineList: this.convertObjectToArray(allMedicine.data)

                        });
                        this.setState({
                            medicineWithDetails: this.combineMedicineDetails()
                        })
                        //console.log(this.combineMedicineDetails());


                    }).catch((err) => {
                        console.log(err);
                    })

            }).catch((err) => {
                this.setState({
                    loading: false
                });
                console.log(err);
            })
    }

    combineMedicineDetails = () => {
        let array = [];
        for (let med of this.state.medicineList) {
            array.push({ ...med, medicineID: this.findRelatedObject(this.state.allmedicineList, med.medicineID) });
        }
        //console.log(array);
        return array;


    }
    removeMedicineFromPurchasingList =(id) =>{

        let newArray = [...this.state.purchasingList];

        console.log(newArray);
        console.log(id);
        let index =  newArray.indexOf( newArray.find((ob)=>ob.medicineID.id===id));
        newArray.splice(index,1);
        this.setState({
            purchasingList:newArray
        })

    }

    findMedi =(array,id)=>{

    }

    calculateTotalPrice = (array) => {
        let total = 0;
        for (let ob of array) {
            total = total + (ob.amount * ob.medicineID.price);
        }
        return total;
    }

    findRelatedObject = (array, id) => {
        return array.find((ob) => ob.id === id);
    }




    convertObjectToArray = (incomingObject) => {
        let newArray = [];
        for (let key in incomingObject) {
            newArray.push({ ...incomingObject[key], id: key });
        }
        return newArray;
    }


    render() {

        const spinner = this.state.loading ? (<><div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div></>) : null;

        const validateErrorMessage = this.state.validateErrorMessage ? (<div className="alert alert-danger" role="alert">
            Input in Invalid Change it and try again
        </div>) : null;

        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5">
                            <div style={this.formStyle}>
                                <form onSubmit={this.onAddtoListClick}>
                                    <h1>Place your order here</h1><br />
                                    {spinner}
                                    <br />
                                    {validateErrorMessage}

                                    <div className="form-group">
                                        <label>Pharmacy</label>
                                        <select onChange={this.onChangePharmacy} className="form-control" required>
                                            <option value={0}>Select Pharmacy</option>
                                            {this.state.pharmacies.map((pharmacy) => {
                                                return (<option key={pharmacy.id} value={pharmacy.id}>{pharmacy.pharmacyName} - {pharmacy.pharmacyLocation}</option>);
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Medicine</label>
                                        <select disabled={this.state.disableMedicine} className="form-control" onChange={this.onChangeMedicine} required>
                                            <option value={0}>Select Medicine</option>

                                            {this.state.medicineWithDetails.map((medicine) => {
                                                return (<option key={medicine.medicineID.id} value={medicine.medicineID.id}>{medicine.medicineID.name}-{medicine.medicineID.dose}mg</option>);
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Quantity</label>
                                        <input type="text" id="quantity" className="form-control" name="quantity" disabled={this.state.disableMedicine} onChange={this.onChangeAmount} required />
                                    </div>

                                    <input type="submit" className="btn btn-primary" value="Add to cart" disabled={this.state.disableMedicine} />
                                    {/* <input type="reset" value="Clear" disabled={this.state.disableMedicine} />
                    <br /><br /><br />
                    <h2>please attach a photo of prescription</h2>
                    <label>Select a image</label>
                    <input type="file" id="myfile" name="myfile"></input> */}
                                </form>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div style={this.lineStyle}></div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <TableCus medicineList={this.state.purchasingList} placeOrder={this.onClickPlaceOrder} removeItem={this.removeMedicineFromPurchasingList}/>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <br />

            </>
        );
    }
}

export default Buy;