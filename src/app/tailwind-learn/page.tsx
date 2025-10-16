"use client";

export default function TailwindPage() {
  function handleClick() {
    console.log("div clicked");
  }

  function handleButtonClick() {
    console.log("button clicked");
  }

  return (
    <div>
      {/* <div className="flex flex-col items-center space-y-2">
        <h1 className="w-90 bg-blue-500 text-center">Learning tailwind css.</h1>
        <p className="w-100 bg-green-500 text-center">Using tutorial.</p>
        <div className="w-110 bg-gray-500 text-center font-sans">
          {" "}
          this a div
        </div>
        <img src="example.jpg" alt="Example" />
      </div>

      <div
        onClick={handleClick}
        className="flex flex-col text-center bg-blue-800 m-3 hover:bg-amber-700 cursor-pointer"
      >
        Text
        <button onClick={handleButtonClick} className="cursor-pointer">
          Pay now
        </button>
      </div>

      <div className="bg-gray-600">
        <div>first div</div>
        <div>second div</div>
      </div> */}

      <div>
        <div className="flex bg-gray-600 justify-between py-3">
          <div className="flex w-50 bg-yellow-300 sm:bg-cyan-950">
            <img
              src="https://images.pexels.com/photos/1769735/pexels-photo-1769735.jpeg"
              alt="some-logo"
              className="rounded-full w-10"
            />
            <div className=" text-slate-500 pl-1">fitness</div>
          </div>

          <div className="flex justify-center space-x-30 bg-amber-800 px-75">
            <div className="cursor-pointer hover:underline">Home</div>
            <div className="cursor-pointer hover:underline">About</div>
            <div className="cursor-pointer hover:underline">Pricing</div>
            <div className="cursor-pointer hover:underline">Contact</div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid p-4 gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-blue-800 p-4 shadow rounded">Card 1</div>
          <div className="bg-blue-800 p-4 shadow rounded">Card 2</div>
          <div className="bg-blue-800 p-4 shadow rounded">Card 3</div>
          <div className="bg-blue-800 p-4 shadow rounded">Card 4</div>
          <div className="bg-blue-800 p-4 shadow rounded">Card 5</div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="bg-blue-800">justify</div>
        <div className="bg-green-800">between</div>
      </div>
    </div>
  );
}
