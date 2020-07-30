import React, { Component } from 'react';
import './Table.css';


const Table = (props) => {
    //console.log(props.medicineList)

        return(
            <>
            {/* {props.input2} */}
            <table id="customers">
                <thead>
                    <tr>
                        <th>Madicine Name</th>
                        <th>Dose</th>
                        <th>Price Per Unit</th>
                        <th>Available Amount</th>

                    </tr>
                </thead>
                <tbody>
                {props.medicineList.map((medicine)=>{
                                    return (<tr key={medicine.id}>
                                        <td>{medicine.medicineID.name}</td>
                                        <td>{medicine.medicineID.dose}</td>
                                        <td>{medicine.medicineID.price}</td>
                                        <td>{medicine.availableAmount}</td>
                                    </tr>);
                                })}  
                </tbody>
            </table>
            </>
        );

}
export default Table;