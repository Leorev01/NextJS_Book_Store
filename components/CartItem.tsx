import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Button } from "./ui/button";

type ItemProp = {
  id: number;
  title: string;
  price: number;
  amount: number;
};

const CartItem = ({item, profile}: {item: ItemProp, profile:boolean}) => {

    const cartContext = useContext(CartContext);
    const {addItem, removeItem} = cartContext!;

    return (
        <li className="flex flex-row justify-between items-center">
            {!profile && <p>{item.title} - £{item.price.toFixed(2)}</p>}
            {profile && (
                <>
                    <p>{item.title.slice(0,15)}...</p>
                    <p>- £{item.price.toFixed(2)} X {item.amount}</p>
                </>
                )}
            <div className="flex flex-row gap-5 items-center">
               {!profile && 
               <>
                <Button onClick={()=>removeItem(item.id)}> - </Button>
                    <p>{item.amount}</p>
                    <Button onClick={()=>{addItem(item)}}> + </Button>
                </>
                }
            </div>
            
        </li>
    )
}

export default CartItem