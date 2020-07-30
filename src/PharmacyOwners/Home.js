import React, { Component } from "react";

class Home extends Component {


    render() {
        return (
            <>
                <label for="quantity">Pharmacy</label>
                <select id="medicine" name="medicine">
                        <option value="fucidine">fucidine</option>
                        <option value="sephalexine">sephalexine</option>
                        <option value="augmentine">augmentine</option>
                        <option value="cloxiciline">cloxiciline</option>
                    </select>
            </>
        );
    }
}

export default Home;