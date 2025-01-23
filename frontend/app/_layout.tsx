import AuthProvider from "./context/AuthContext";
import RootLayout from "./RootLayout";

export default function App(){
    
    return(
        <AuthProvider>
            <RootLayout/>
        </AuthProvider>
    )
}