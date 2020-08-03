import React, { Component } from 'react';
import CanvasJSReact from '../../../assets/canvasjs.react';
import { axiosDB } from '../../../Axios/Axios';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class BarChart extends Component {

    state = {
        pharmacyOrder: []
    }

    constructor(props) {
        super();
        //console.log(props.pharmacyWithOrderCount)
    }


    componentDidMount() {
        this.fetchData();
    }




    fetchData = () => {
        axiosDB.get("pharmacy.json")
            .then((pharmacy) => {
                axiosDB.get("pharmacyMedicine.json")
                    .then((medicine) => {
                        axiosDB.get("order.json")
                            .then((order) => {
                                let allPharmacy = this.convertObjectToArray(pharmacy.data);
                                let allMedicine = this.convertObjectToArray(medicine.data);
                                let allOrders = this.convertObjectToArray(order.data);
                                //let pharmacyWithMedicineCount = this.createArrayWithMedicineCount(allPharmacy, allMedicine);
                                let pharmacyWithOrderCount = this.createArrayWithOrderCount(allPharmacy, allOrders);
                                //console.log(pharmacyWithOrderCount);
                                this.setState({
                                    pharmacyOrder: pharmacyWithOrderCount

                                })
                            }).catch((err) => {
                                console.log(err);
                            });
                    }).catch((err) => {
                        console.log(err);
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

    findObject = (array, id) => {
        return array.find((ob) => ob.id === id)
    }


    createArrayWithMedicineCount = (pharmacyArray, medicineArray) => {
        let newArray = [];
        for (let pharmacy of pharmacyArray) {
            newArray.push({ ...pharmacy, medicineCount: this.getCountOfMedicine(pharmacy.id, medicineArray) })
        }
        return newArray
    }

    createArrayWithOrderCount = (pharmacyArray, orderArray) => {
        let newArray = [];
        for (let pharmacy of pharmacyArray) {
            newArray.push({ label:pharmacy.pharmacyName+"-"+pharmacy.pharmacyLocation, y: this.getCountOfMedicine(pharmacy.id, orderArray) })
        }
        console.log(newArray)
        return newArray
    }
    getCountOfMedicine = (pharmacyID, orderArray) => {
        let filteredArray = orderArray.filter((order) => order.pharmacyID === pharmacyID);
        return filteredArray.length
        //console.log(filteredArray.length)
    }




    addSymbols(e) {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
    render() {
        //console.log(this.props.pharmacyWithOrderCount);
        const options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Highest Orders Recieved Pharmacy"
            },
            axisX: {
                title: "pharmacy",
                reversed: true,
            },
            axisY: {
                title: "Number of Orders",
                labelFormatter: this.addSymbols
            },
            data: [{
                type: "bar",
                dataPoints: this.state.pharmacyOrder
            }]
        }




        return (
            <div>

                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default BarChart;