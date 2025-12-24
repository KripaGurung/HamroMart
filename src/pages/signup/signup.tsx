const Signup  = () => {
    return (
        <div className= "signupContainer">

            <div className="signupBox">
                <h2>Registeration Form</h2>

                <div className="formContainer">
                    <form>

                        <label>FullName</label>
                        <input type="text" placeholder="Full Name" required/>

                        <label>Email</label>
                        <input type="email" placeholder="Email" required/>

                        <label>Password</label>
                        <input type="password" placeholder="Password" required/>

                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" required/>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;