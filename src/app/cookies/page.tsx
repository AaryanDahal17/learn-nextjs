"use client"

export default function LoginPage() {

  async function handleLogin() {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      credentials: "include", // IMPORTANT: allows cookies to be set in the browser, if the server sends a header 'Set-Cookie'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "john", password: "secret" }),
    });

    const data = await res.json();
    console.log("Data Response:", data);
  }


  async function getUsers(){
    const res = await fetch("http://localhost:8000/users", {
      method: "GET",
      credentials: "include", // IMPORTANT: allows cookies to be included in the request
    });
    const data = await res.json();
    console.log("Users Data Response:", data);
  }

  function seeCookies(){
    console.log("Cookies:", document.cookie);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Login Page</h1>
      <p>First start the server, the server is cookie-serv, inside py-servers/</p>
      <button
        onClick={handleLogin}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Login
      </button>

      <button onClick={getUsers} className="ml-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
        Get Users
      </button>

      <button onClick={seeCookies} className="ml-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
        See Cookies
      </button>
    </div>
  );
}
