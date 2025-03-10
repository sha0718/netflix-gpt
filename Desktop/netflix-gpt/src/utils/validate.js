export const checkValidData = (email, password, name) => {

    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    
    // const isNameValid = /^[A-Za-z\s'-]+$/.test(name);

    // if (!isNameValid) return " Name is Invalid";

    if (!isEmailValid) return " Email Id is Invalid";

    if (!isPasswordValid)  return " Password is Invalid";
    
    // return "Null";

};  
