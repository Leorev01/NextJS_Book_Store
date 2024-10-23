'use client';

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Action from "../../(components)/Action";
import axios from "axios";
import { BarLoader } from "react-spinners";

  type UserProp = {
    userId: string;
    username: string;
    email: string;
  }
  

const UsersPage = () => {

    const [users, setUsers] = useState<UserProp[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try{
                const response = await axios.get('http://localhost:3000/api/get-all-users',
                    {
                            headers: {
                            'Cache-Control': 'no-cache', // Prevent caching
                        },
                        params: {
                            _t: new Date().getTime(), // Prevent browser cache by adding a timestamp
                        },
                    });
                const userList = await response.data;
                setUsers(userList.users);
                setLoading(false);
            }catch(error){
                console.log(error)
            }
        }

        getUsers()
    }, [])
    
    const handleDelete = (userId: string) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.userId !== userId));
    };
    
    if(loading){
        return(
            <div className="flex items-center justify-center pt-5">
                <BarLoader color="#36d7b7" />
            </div>
        )
    }

    if(users.length === 0){
        return (
            <h1>No users yet</h1>
        )
    }

  return (
    <div>
        <h1 className='text-2xl font-bold'>Users</h1>
        <Table>
            <TableCaption>A list of registered users.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">User Id</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.userId}>
                    <TableCell className="font-medium">{user.userId}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <Action value={user.userId} onDelete={handleDelete} type='users'/>
                    </TableRow>
                ))}
            </TableBody>
            </Table>

    </div>
  )
}

export default UsersPage