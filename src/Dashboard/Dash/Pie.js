import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import { axiosDB } from '../../Axios/Axios';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {


    state={
        arrayWithMedicineCount:[]
    }

componentDidMount(){
    this.fetchManufacturer();
}


    fetchManufacturer = () => {
        axiosDB.get("manufacturer.json")
            .then((manufacturer) => {
                axiosDB.get("medicine.json")
                    .then((medicine) => {
                        let allManufacturer = this.convertObjectToArray(manufacturer.data);
                        let allMedicine = this.convertObjectToArray(medicine.data);
                        let arrayWithMedicineCount = this.createArrayWithMedicineCount(allManufacturer,allMedicine,allMedicine.length);
                        this.setState({
                            arrayWithMedicineCount:arrayWithMedicineCount
                        })
                    }).catch(() => {

                        })
            }).catch(() => {

            })
    }


    createArrayWithMedicineCount = (manufacturerArray, medicineArray,length) => {
        let newArray = [];
        for (let manufac of manufacturerArray) {
            newArray.push({ label:manufac.manufacturerName, y: (this.getCountOfMedicine(manufac.id, medicineArray))*(100/length) });
        }
        console.log(newArray)
        return newArray
    }
    getCountOfMedicine = (manufactureID, medicineArray) => {
        let filteredArray = medicineArray.filter((med) => med.manufacturer.id === manufactureID);
        return filteredArray.length
        //console.log(filteredArray.length)
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



    render() {
        const options = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Medicine Count According to Brand"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: this.state.arrayWithMedicineCount
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

export default PieChart;