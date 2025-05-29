export function authErrorHandler(action, error) {
    switch (error) {
        case 'auth/email-already-exists' :
            alert("Email already exists.");
        case 'auth/user-not-found' :
            alert("User not found.");
        case 'auth/invalid-password' :
            alert("Password is invalid.");
        case 'auth/too-many-requests' :
            alert("Too many requests.");
        case 'auth/operation-not-allowed' :
            alert("Server error, please try again later.");
        default:
            alert(action + " failed. Please try again.")
    }
}