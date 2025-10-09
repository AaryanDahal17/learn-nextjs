"use client"

import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";






function SWRPage() {
    const { data, error, isLoading } = useSWR("/products", fetcher);
    const query = useSWR("/users", fetcher);


    //const [myData,setMyData] = useState(null);

    // useEffect(()=>{
    //     async function fetchData(){
    //         const theResp = await fetch('http://localhost:8000/users').then(res=> res.json());
    //         setMyData(theResp);
    //     }

    //     fetchData();
    // },[])

    if (error){
        console.log(error);
        return <div>Error fetching data</div>;
    }
    
    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>SWR Data:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>

        </div>
    );
}

export default SWRPage;
