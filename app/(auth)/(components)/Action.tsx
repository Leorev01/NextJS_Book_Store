'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Trash } from "lucide-react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { message } from 'antd';

const Action = ({ value, onDelete }: { value: string, onDelete: (orderId: string) => void }) => {
    const router = useRouter();

    const deleteHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

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
};


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <p className="text-2xl">...</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <div className="flex flex-row text-lg gap-2 cursor-pointer" onClick={() => router.push(`/dashboard/category/${value}`)}>
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
