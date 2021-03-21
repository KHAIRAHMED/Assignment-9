import { useContext,useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
firebase.initializeApp(firebaseConfig)



function Login() {
 
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const data = loggedInUser;
  console.log(data)
  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };


  // sign in part 
  const [signInUser,setSignInUser] = useState({
    isLogIn:false,
    name :"",
    email : '',
    photo : ""
  })
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn =()=>{
    firebase.auth()
  .signInWithPopup(provider)
  .then(res => {
    const {displayName,email,photoURL} = res.user;
    const userInfo = {
      isLogIn :true,
      name : displayName,
      email : email,
      photo : photoURL
    }
    setSignInUser(userInfo)
   
  })
  .catch((error) => {
    console.log(error)
  });
  // signOut part 
  

  }
const  handleSignOut = ()=>{
  firebase.auth()
  .signOut()
  .then(() => {
    const signOut = {
    isLogIn:false,
    name :"",
    email : '',
    password : '',
    photo : "",
    error :'',
    success : false
    }
    setSignInUser(signOut)
    setLoggedInUser(signOut)
  }).catch((error) => {
  
    
  });
}




// email part 
const [newUser ,setNewUser] = useState(false);
const handleValue =event =>{
   let isValidFrom = true;
  if (event.target.name ==='email'){
      isValidFrom =  /\S+@\S+\.\S+/.test(event.target.value)     
  }

  if(event.target.name ==='password'){
      const validPassword = event.target.value.length >6;
      const passwordHasNumber = /\d{1}/.test (event.target.value);
      isValidFrom =validPassword && passwordHasNumber
  }
  if(isValidFrom){
    const newUser = {...signInUser}
    newUser[event.target.name] = event.target.value
    setSignInUser(newUser)
  }
}
const handleSubmit= (e)=>{
  // sign up part 
if(newUser && signInUser.email && signInUser.password){
  firebase.auth()
  .createUserWithEmailAndPassword(signInUser.email, signInUser.password)
  .then(res => {
    const newUser = {...signInUser} 
    newUser.error = '';
    newUser.success= true;
    setSignInUser(newUser)
    updateName(signInUser.name)
  })

  .catch((error) => {   
    const newUser = {...signInUser} 
    newUser.error = error.message;
    newUser.success =false;
    setSignInUser(newUser) 
  });
}
//  signin part 
if(!newUser && signInUser.email && signInUser.password){
  firebase.auth()
  .signInWithEmailAndPassword(signInUser.email, signInUser.password)
  .then(res => {
    const newUser = {...signInUser} 
    newUser.error = '';
    newUser.success= true;
    setSignInUser(newUser)
    setLoggedInUser(newUser)
    history.replace(from);
   
  })
  .catch((error) => {
    const newUser = {...signInUser} 
    newUser.error = error.message;
    newUser.success =false;
    setSignInUser(newUser)
  
  
  });
}
e.preventDefault();
}

const updateName = name =>{
  const user = firebase.auth()
  .currentUser;

    user.updateProfile({
      displayName: name
    })
    .then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
}


 

  return (
    <div style={{textAlign : "center" , color : "black"}}>

      {
        signInUser.isLogIn?<button onClick={handleSignOut}  style = {{color : "black"}}>Sign Out With Google</button>:<button onClick={handleSignIn}  style = {{color : "black"}}> Sign In With Google</button>
      }
      
      <h5>..........................................................OR.............................................................</h5>
      {/* email part  */}
       <div style ={{border:"2px solid white" , color :"black"}}>
            <input type="checkbox" name="newUser" id="" onChange={()=> setNewUser(!newUser)} />
            <label htmlFor="newUswe" style={{color :"black"}}> Sig Up With Email </label>
            <form onSubmit={handleSubmit} style = {{color : "black"}}>
                {
                  newUser && <input type="text" name="name" onBlur={handleValue} placeholder="Enter Name" />
                }
                <br/><br/>
                <input type="email" name="email" id="" required placeholder="Enter Your Email" onBlur={handleValue} /> <br/> <br/>
                <input type="password"  name="password" required id="" placeholder="Enter Password" onBlur={handleValue}/> <br/><br/>
                <input type="submit" style = {{color : "black"}} variant="danger" value={newUser ? "Sign Up With Email":"Sign In Email "}/>
            </form>
            <p style ={{color:'red'}}>{signInUser.error}</p>
            {
              signInUser.success && <p style={{color:'green'}}> {newUser ? 'Created': 'logged In'} Successfully</p>
            }
            
        </div>
    </div>
  
  );
}

export default Login;
