"use client"

import { useState } from "react"



export default function Home(){

  const [count, setCount] = useState(0)

  function onClick(){
  console.log("button clicked")
  setCount(count+1)
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <button className="cursor-pointer hover:bg-blue-500" onClick={onClick}>click me</button>
      <p>count : {count}</p>
    </div>
  )
}