import React from 'react';
import "./login.css";

const Login = () => {
  return (
    <div class="form">
      <div class="main">  	
        <input class="inputstyle" type="checkbox" id="chk" aria-hidden="true" />

        <div class="signup">
          <form>
            <label class="labelstyle"  for="chk" aria-hidden="true">Sign up</label>
            <input class="inputstyle" type="text" name="txt" placeholder="User name" required="" />
            <input class="inputstyle" type="email" name="email" placeholder="Email" required="" />
            <input class="inputstyle" type="password" name="broj" placeholder="Password" required="" />
            <input class="inputstyle" type="password" name="Rewritepswd" placeholder="Re-enter Password" required="" />
            <button class="btnstyle">Sign up</button>
          </form>
        </div>

        <div class="login">
          <form>
            <label class="labelstyle" for="chk" aria-hidden="true">Login</label>
            <input class="inputstyle" type="email" name="email" placeholder="Email" required="" />
            <input class="inputstyle" type="password" name="pswd" placeholder="Password" required="" />
            <button class="btnstyle">Login</button>
          </form>
        </div>
    </div>
  </div>
  )
}

export default Login