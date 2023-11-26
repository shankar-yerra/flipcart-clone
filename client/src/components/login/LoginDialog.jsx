// this file will display a pop up login page

import { useState, useContext } from "react";

import {
  Dialog,
  Box,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";

import { authenticateSignup, authenticateLogin } from "../../service/api";
import { DataContext } from "../../context/DataProvider";


const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
`;

const Image = styled(Box)`
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85% no-repeat;
  height: 82%;
  width: 28%;
  padding: 45px 35px;
  & > p,
  & > h5 {
    color: #ffffff;
    font-weight: 600;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;
  & > div,
  & > button,
  & > p {
    margin-top: 15px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const CreateAccount = styled(Typography)`
  font-size: 14px;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  cursor: pointer;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`

const accountInitialValues = {
  // values for login and signup.
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here!",
    subHeading: "Sign up with your mobile number to get started",
  },
};

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
}; // this object will save the data as per the category..that is if you enter mail then in console you can see that it will store in email category.

const loginInitialValues = {
  username: '',
  password: ''
}


//create component
const LoginDialog = ({ open, setOpen }) => {
  const [account, toggleAccount] = useState(accountInitialValues.login);
  // it stores account value(login/signup) in usestate

  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState(false); 
  // this error named state used to display an error like "Please enter valid username or password" when ever error value is true which is in wrapper tag.

  const {setAccount} = useContext(DataContext); // gives access of datacontext to setaccount.

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
    setError(false);//seterror should be a given false to hide invalid login error while opening login page.if this line is not specified then set error value will be true and eventhough user have not given any username or password, the error will display.
    
  }; // setopen makes open value false to close dialog box when curson is clicked outside box.
  // here toggleaccount is written because when ever we close the dialog box and again tries to open it, it will be start from login.

  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };
  // toggles from login to signup

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    
  }; // differentiates whether the entered input is email or password or user name etc with the help of name field in textfield

  const signupUser = async() => {
   let response = await authenticateSignup(signup);
   if(!response) return; // if no response then stops here
   handleClose();
   setAccount(signup.firstname); // it will store data of firstname inside setaccount function.
  }; //API call should be made


  const onValueChange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value});
  }

  const loginUser = async () => {
    let response = await authenticateLogin(login);
    console.log(response);
    if(response.status === 200){
      handleClose();
      setAccount(response.data.data.firstname);
    } else {
        setError(true); // invalid login.
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: 'unset' } }}
    >
      <Component>
        <Box style={{ display: "flex", height: "100%" }}>
          <Image>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {account.subHeading}
            </Typography>
          </Image>
          {account.view === "login" ? (
            <Wrapper>
              <TextField variant="standard" onChange={(e) => onValueChange(e)}
                name="username" label="Enter Username" />

                { error && <Error>Please enter valid username or password</Error> }
                
              <TextField variant="standard" onChange={(e) => onValueChange(e)}
                name="password" label="Enter password" />

              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Text>
              <LoginButton onClick = {() => loginUser()}>Login</LoginButton>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <RequestOTP>Request OTP</RequestOTP>
              <CreateAccount onClick={() => toggleSignup()}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="firstname"
                label="Enter Firstname"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="lastname"
                label="Enter Lastname"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="username"
                label="Enter Username"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="email"
                label="Enter Email"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="password"
                label="Enter Password"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="phone"
                label="Enter Phone"
              />

              <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
