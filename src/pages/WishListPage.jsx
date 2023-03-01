import { AppContext } from "/src/AppContext";
import { useContext } from "react";

export const WishListPage = () => {
    const { rawBooks } = useContext(AppContext)
    return (
        <div>
            <h3>Welcome to  WishList Page</h3>
        </div> 
    )
}