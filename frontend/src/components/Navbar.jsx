import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../context/AuthContext";

function Navbar(){
    const { user } = useAuth();


    return(
      <div className="flex justify-between items-center mb-8 ">
        <h1 className="text-3xl font-extrabold text-gray-800 font-serif">
          Hello, {user?.name} 👾
        </h1>
        <LogoutButton />
      </div>
    );
}
export default Navbar;
