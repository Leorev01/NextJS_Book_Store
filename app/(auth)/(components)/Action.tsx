'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Trash } from "lucide-react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { message } from 'antd';

const Action = ({ value, onDelete, type }: { value: string, onDelete: (orderId: string) => void, type:string }) => {
    const router = useRouter();

    const deleteHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;
    if(type === "orders") {
        try {
            await axios.delete(`/api/delete-order`, {
                params: { orderId: value }, 
            });
            onDelete(value);
            message.success("Order deleted successfully");
            router.refresh();

        } catch (error) {
            console.error("Error deleting order:", error);
            message.error("Something went wrong: " + error);
        } 
    }
    if(type === "users"){
        try {
            await axios.delete(`/api/delete-user`, {
                params: { userId: value }, 
            });
            onDelete(value);
            message.success("User deleted successfully");
            router.refresh();

        } catch (error) {
            console.error("Error deleting user:", error);
            message.error("Something went wrong: " + error);
        }
    }
    
};


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <p className="text-2xl">...</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <div className="flex flex-row text-lg gap-2 cursor-pointer" onClick={() => router.push(`/dashboard/${type}/${value}`)}>
                        <Edit />
                        <p>Edit</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <div className="flex flex-row text-lg gap-2 cursor-pointer" onClick={deleteHandler}>
                        <Trash />
                        <p>Delete</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Action;
