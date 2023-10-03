import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../Action/UserAction";
import './ForgotPassword.css';
import { useHistory } from "react-router-use-history";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { error, message } = useSelector((state) => state.forgotPassword);

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      {/* <Metadata title="Forgot Your Password?"/> */}
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>
          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="forgotPasswordEmail">
              
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Send"
              className="forgotPasswordBtn"
            />
            <input type="submit"
          value="Back"
          className='backToLogin' onClick={()=>history.push('/')}/>
          </form>
          
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
