import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Button } from "./ui/button";

type ItemProp = {
  id: number;
  title: string;
  price: number;
  amount: number;
};

const CartItem = ({item}: {item: ItemProp}) => {

    const cartContext = useContext(CartContext);
    const {addItem, removeItem} = cartContext!;

    return (
        <li className="flex flex-row justify-between items-center">
            <p>{item.title} - £{item.price}</p>
            <div className="flex flex-row gap-5 items-center">
    <           Button onClick={()=>removeItem(item.id)}> - </Button>
                <p>{item.amount}</p>
                <Button onClick={()=>{addItem(item)}}> + </Button>
            </div>
            
        </li>
    )
}

export default CartItem