"use client"

import { useState,useEffect } from "react";

interface userType{
    id: number;
    name: string;
    email: string;
}


export default function BasicPage() {

    const oneUser : userType = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com"
    }

    const [count, setCount] = useState<number>(1);
    const [user,setUser] = useState<userType | null>(oneUser);

    const [hydrated,setHydrated] = useState(false);


    useEffect(()=>{
        console.log("Count is: ", count);
        setCount(1);

        console.log("User is: ", user);

        setUser( (prevUser) => {
            if (!prevUser) return null;
            return {...prevUser, name: "Jane Smith" }
        })


        setHydrated(true);

    },[])



    return (
        <div>
            <h1>Lesson on useState and useEffect</h1>
            <p>Count: {count}</p>
            {hydrated && user && (
                <div>
                    <p>User: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
}