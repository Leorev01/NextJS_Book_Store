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

  type UserProp = {
    userId: string;
    username: string;
    email: string;
  }
  

const UsersPage = () => {

    const [users, setUsers] = useState<UserProp[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/get-all-users');
                const userList = await response.json();
                console.log(userList)
                setUsers(userList.users);
            }catch(error){
                console.log(error)
            }
        }

        getUsers()
    }, [])

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
                    </TableRow>
                ))}
            </TableBody>
            </Table>

    </div>
  )
}

export default UsersPage