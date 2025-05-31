export function authErrorHandler(action, error) {
    const er = error.code;
    switch (er) {
        case 'auth/email-already-exists' :
            alert("Email already exists.");
            break;
        case 'auth/user-not-found' :
            alert("User not found.");
            break;
        case 'auth/invalid-password' :
            alert("Password is invalid.");
            break;
        case 'auth/too-many-requests' :
            alert("Too many requests.");
            break;
        case 'auth/operation-not-allowed' :
            alert("Server error, please try again later.");
            break;
        case 'auth/missing-password' : 
            alert("Please enter your password.");
            break;
        case 'auth/invalid-email' :
            alert("Email is invalid. Please try again.");
            break;
        default:
            alert(action + " failed. Please try again.")
    }
}