import React, { Component } from "react";
import { axiosAPI, axiosDB } from "../../Axios/Axios";
import TableCus from "./TableCus/TableCus";

class Buy extends Component {

    state = {
        loading: false,
        validateErrorMessage:false,
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


    componentDidMount() {
        this.fetchPharmacy();
        //this.fetchMedicine();
    }

    onChangePharmacy = (event) => {
        this.setState({
            loading: true,
            selectedPharmacy: event.target.value,
            purchasingList:[]
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

        if(this.state.selectedAmount==="0" || this.state.selectedAmount===null || this.state.selectedPharmacy==="0" || this.state.selectedPharmacy===null || this.state.selectedMedicine==="0" || this.state.selectedMedicine===null){
            this.setState({
                validateErrorMessage:true
            });
        }else{

            //console.log(this.findAmountOfmedicine(this.state.selectedMedicine));


            let obj = {
                medicineID: this.findRelatedObject(this.state.allmedicineList,this.state.selectedMedicine),
                amount: parseInt(this.state.selectedAmount),
                totalPricePerItem:this.findRelatedObject(this.state.allmedicineList,this.state.selectedMedicine).price*this.state.selectedAmount
            };
            //console.log(obj)

            let array=[];
            array=[...this.state.purchasingList,obj]
            this.setState({
                purchasingList:array
            });

        }




    // puchToPurchasingList =() =>{
    //     let array=[];
    //     this.setState
    // }


    }


    onClickPlaceOrder =() =>{
        //console.log(localStorage.getItem("id"));
        //console.log("clicked")
        if(this.state.purchasingList.length===0){
            console.log("empty");
        }else{
            
            let object = {
                customerID:"-MDVbS0UfgjtYDGRXFch",
                pharmacyID:this.state.selectedPharmacy,
                medicines:this.state.purchasingList,
                totalPrice:this.calculateTotalPrice(this.state.purchasingList)
            };
            this.addOrder(object)
            .then((res)=>{
                console.log(res);
                console.log(this.props.match.url);
                this.props.history.push("/customer/myorders")
            }).catch((e)=>{
                console.log(e);
            })
        }
    }

    findAmountOfmedicine = (medicineID) =>{
        return this.state.medicineWithDetails.find((ob)=>ob.medicineID.id===medicineID).availableAmount
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
    addOrder =(object)=>{
        return axiosDB.post("order.json",object);
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
                <form onSubmit={this.onAddtoListClick}>
                    <h1>Place your order here</h1><br />
                    {spinner}
                    <br />
                    {validateErrorMessage}
                    <label>Pharmacy</label>
                    <select onChange={this.onChangePharmacy} required>
                        <option value={0}>Select Pharmacy</option>
                        {this.state.pharmacies.map((pharmacy) => {
                            return (<option key={pharmacy.id} value={pharmacy.id}>{pharmacy.pharmacyName} - {pharmacy.pharmacyLocation}</option>);
                        })}
                    </select>
                    <br />

                    <label>Medicine</label>
                    <select disabled={this.state.disableMedicine} onChange={this.onChangeMedicine} required>
                        <option value={0}>Select Medicine</option>

                        {this.state.medicineWithDetails.map((medicine) => {
                            return (<option key={medicine.medicineID.id} value={medicine.medicineID.id}>{medicine.medicineID.name}-{medicine.medicineID.dose}mg</option>);
                        })}
                    </select>
                    <br />

                    <label>Quantity</label>
                    <input type="text" id="quantity" name="quantity" disabled={this.state.disableMedicine} onChange={this.onChangeAmount} required />
                    <br />
                    <input type="submit" value="Add to cart" disabled={this.state.disableMedicine} />
                    <input type="reset" value="Clear" disabled={this.state.disableMedicine} />
                    <br /><br /><br />
                    <h2>please attach a photo of prescription</h2>
                    <label>Select a image</label>
                    <input type="file" id="myfile" name="myfile"></input>
                </form>
                <div>
                    <TableCus medicineList={this.state.purchasingList} placeOrder={this.onClickPlaceOrder}/>
                </div>
            </>
        );
    }
}

export default Buy;