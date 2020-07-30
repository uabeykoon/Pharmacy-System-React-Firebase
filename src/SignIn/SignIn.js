import React, { Component } from "react";
//import './SignIn.css';

class SignIn extends Component {

    onSignInClick = (e) =>{
        e.preventDefault();
        this.props.history.push("/adminhome");
    }

    render() {
        return (
            <>
                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <h2 className="active"> Sign In </h2>
                        <h2 className="inactive underlineHover">Sign Up </h2>


                        <div className="fadeIn first">
                            <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
                        </div>


                        <form>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" />
                            <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" />
                            <button className="fadeIn fourth"  onClick={this.onSignInClick}>sign in</button>
                            <input type="button" className="fadeIn fourth" value="Log In" onChange={this.onSignInClick}/>
                        </form>


                        <div id="formFooter">
                            <a className="underlineHover" >Forgot Password?</a>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default SignIn;