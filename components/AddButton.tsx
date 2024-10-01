import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import { Button } from "./ui/button";

type itemType = {
    id: number;
    title: string;
    image?: string;
    description?: string;
    price: number;
    author?: string;
    genre?: string;
    sold?: number;
    releaseDate?: string;
}

const AddButton = ({item, classes}: {item: itemType, classes?: string}) => {

    const cartContext = useContext(CartContext);
    const { addItem } = cartContext!;

  return (
    <Button onClick={()=>addItem(item)} className={classes?classes:'mt-auto'}>Add</Button> 
  )
}

export default AddButton