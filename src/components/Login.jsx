import "../style/Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

//prettier ignore
const Login = () => {
     const navigateTo = useNavigate();
     const [view, setView] = useState("signin");
     const [pictures, setPictures] = useState([]);
     const [signup, setSignup] = useState({
          username : "",
          email    : "",
          password : "",
          password2: "",
          loginpic : "",
          status   : "",
     });
     const [signin, setSignin] = useState({
          username : "",
          method   : "picture",
          password : "",
          loginpic : "",
          status   : "",
     });

     useEffect(() => getRandomPictures(), []);

     const getRandomPictures = () => {
          axios.get("http://localhost:8000/api/random-pictures/getAll")
               .then(({ data }) => {
                    let pics = [];
                    for(var i = 0; i < 9; i++){
                         // let random = Math.floor(Math.random()*data.length);
                         // pics.push(data[random]);
                         pics.push(data[i]);
                    }
                    setPictures(pics);
               })
               .catch((error) => console.log("error getRandomPictures : ", error));
     }

     const reset = (state) => {
          if (state === "signin")
               setSignin({
                    username: "",
                    password: "",
                    loginpic: "",
                    status: "",
               });
          else
               setSignup({
                    username : "",
                    email    : "",
                    password : "",
                    password2: "",
                    loginpic : "",
                    status: "",
               });
     };

     const signupFN = () => {
          if (signup.username.length === 0) {
               setSignup({ ...signup, status: "enter your username" });
          } else if (!signup.email.includes("@")) {
               if (signup.email.length === 0)
                    setSignup({ ...signup, status: "enter your email" });
               else setSignup({ ...signup, status: "wrrong email" });
          } else if (signup.password.length < 8) {
               if (signup.password.length === 0)
                    setSignup({ ...signup, status: "enter your password" });
               else setSignup({ ...signup, status: "short password" });
          } else if (
               signup.password.length >= 8 &&
               signup.password !== signup.password2
          ) {
               setSignup({ ...signup, status: "password doesn't match" });
          } else {
               if(view === "signup") setView("signup-2")
               else{
                    let { username, email, password, loginpic } = signup;
                    console.log({ username, email, password, loginpic });
                    axios.post("http://localhost:8000/api/users/signup", { username, email, password, loginpic})
                         .then(({ data }) => {
                              console.log("response signup :", data);
                              setSignup({ username: "", email: "", password: "", password2: "", status: "account created" });
                              navigateTo("/login");
                         })
                         .catch((error) => {
                              if (error.response.data.includes("E11000 duplicate key error"))
                                   setSignup({ ...signup, status: "username already exist" });
                         });
               }
               
          }
     };
     
     const signinFN = () => {
          if (signin.username.length === 0) {
               setSignin({ ...signin, status: "enter your username" });
          }else {
               if(view === "signin") {
                    setView("signin-2");
                    axios.post("http://localhost:8000/api/users/loginpic", {username: signin.username})
                         .then(({data})=> console.log("get secret picture : ", data[0].loginpic))
                         .catch((err) => console.log("get secret picture error : ", err));
               }
               else{
                    let { username, password, loginpic } = signin;
                    // console.log({ username, password, loginpic });
                    if (signin.password.length === 0 && signin.method === "password")
                    setSignin({ ...signin, status: "enter a password"})
                    else if (signin.password.length < 8 && signin.method === "password")
                    setSignin({ ...signin, status: "password too short"})
                    else{
                         axios.post("http://localhost:8000/api/users/signin", { username, password, loginpic })
                         .then(({ data }) => {
                              console.log("response signin :", data);
                              setSignin({ username: "", password: "", status: "", });
                              localStorage.setItem("user", JSON.stringify(data));
                              navigateTo("/");
                         })
                         .catch((error) => setSignin({ ...signin, status: error.response.data }));
                    }
               }
               
          }
     };

     return (
          <div>
               {/* <Navbar /> */}
               <div className="login">
                    <div className="left-div">
                         <h1>Create an account</h1>
                         <p>it's totally free and secure</p>
                         <p>we don't share your </p>
                         <p>informations with others</p>
                    </div>
                    {view === "signup" ? (
                         <div className="contact">
                              <h3>Sign Up</h3>
                              <span>
                                   Have an account ? &nbsp;
                                   <span className="cursor-pointer" onClick={() => {reset("signup"); setView("signin"); }} >
                                        <u>Sign In</u>
                                   </span>
                              </span>
                              <input value={signup.username}  onChange={ (e) => setSignup({ ...signup, username: e.target.value }) } name="username" placeholder="username" type="text" />
                              <input value={signup.email}     onChange={ (e) => setSignup({ ...signup, email: e.target.value })} name="email" placeholder="email" type="email" />
                              <input value={signup.password}  onChange={ (e) => setSignup({ ...signup, password: e.target.value }) } name="password" placeholder="password" type="password" />
                              <input value={signup.password2} onChange={ (e) => setSignup({ ...signup, password2: e.target.value }) } name="password2" placeholder="confirm password" type="password" />
                              <div>
                                   <button onClick={signupFN}> next </button>
                                   <span style={{ fontSize: "20px", color: signup.status === "account created" ? "green" : "red" }}> {signup.status} </span>
                              </div>
                         </div>
                         
                    ) : view === "signup-2" ? (
                         <div className="contact" id="signup-2">
                              <div id="title">
                                   Choose a picture and memorize it, we will used as method to login later
                              </div>
                              <div id="pictures">
                                   <div className="random-pictures">
                                        {pictures.map((picture, i) => (<img key={i} id={picture._id} src={picture.url} onClick={(e) => setSignup({ ...signup, loginpic: e.target.src })} />))}
                                   </div>
                                   <div id="preview">
                                        <img src={signup?.loginpic} alt="" />
                                   </div>
                              </div>
                              <button onClick={signupFN}>Sign Up</button>
                         </div>
                    ) : view === "signin"   ? (
                    <div className="contact">
                         <h3>Sign In</h3>
                         <span>
                              Don't have an account ? &nbsp;
                              <span className="cursor-pointer" onClick={() => { reset("signin"); setView("signup"); }}>
                                   <u>Sign Up</u>
                              </span>
                         </span>
                         <input value={signin.username} onChange={(e) => setSignin({ ...signin, username: e.target.value }) } name="username" placeholder="username" type="text" />
                         choose a method : 
                         <div className="connexion-method" id="connexion-method">
                              <label name="picture" className={signin.method === "picture" ? "checked-radio" : ""} onClick={(e) => setSignin({ ...signin, method: "picture" })}>
                                   <input type="radio" name="picture" value="picture" />
                                   <img src="https://img.icons8.com/fluency/48/000000/picture.png" />
                                   picture
                              </label>
                              <label name="password" className={signin.method === "password" ? "checked-radio" : ""} onClick={(e) => setSignin({ ...signin, method: "password" })}>
                                   <input type="radio" name="password" value="password" />
                                   <img src="https://img.icons8.com/color-glass/48/000000/password.png" />
                                   password
                              </label>
                         </div>
                         {/* <input value={signin.password} onChange={(e) => setSignin({ ...signin, password: e.target.value }) } name="password" placeholder="password" type="password" /> */}
                         <div>
                              <button onClick={signinFN}> next </button>
                              <span style={{ fontSize: "20px", color: "red" }}> {signin.status} </span>
                         </div>
                    </div>     
                    ) : (
                         signin.method === "picture" ? (
                              <div className="contact" id="signup-2">
                                   <div id="title">
                                        Choose a picture and memorize it, we will used as method to login later
                                   </div>
                                   <div id="pictures">
                                        <div className="random-pictures">
                                             {pictures.map((picture, i)=>(<img key={i} id={picture._id} src={picture.url} onClick={(e)=>setSignin({...signin, loginpic: e.target.src})} />))}
                                        </div>
                                        <div id="preview">
                                             <img src={signin.loginpic} alt="" />
                                        </div>
                                   </div>
                                   <button onClick={signinFN}>Sign In</button>
                              </div>) : (
                              <div className="contact">
                                   <input value={signin.password} onChange={(e) => setSignin({ ...signin, password: e.target.value }) } name="password" placeholder="password" type="password" />
                                   <button onClick={signinFN}>Sign In</button>
                                   <span style={{ fontSize: "20px", color: "red" }}> {signin.status} </span>
                              </div>
                              )
                         )}
               </div>
          </div>
     );
};

export default Login;
