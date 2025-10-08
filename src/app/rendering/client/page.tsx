"use client"

function clientSideRenderedPage(){

    function handleClick(){
        console.log("Button clicked!");
    }

    return (
    <div>
    <div>This is a client-side rendered page.</div>
    <button onClick={handleClick} className="cursor-pointer bg-gray-600">Click Me</button>
    </div>
);
}

export default clientSideRenderedPage;