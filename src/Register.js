import React, { useState } from "react";

export function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://cab230.hackhouse.sh/register", {
          method: "POST",
          body: `email=${email}&password=${password}`,
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then((response) => {
          if (response.ok) {
            setStatus("Successfully registered!")
            return response.json();
          }
          response.json().then((text) => {
            setStatus(text.message);
          })
          throw new Error("Network response was not OK");
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log("Problem with fetch operation: ",  error.message);
        })
      }

    return (
        <div>
          <h1>Register</h1>
            <form onSubmit={handleSubmit} type="POST">
                <input type="text" name="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type="password" name="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <input type="submit" value="Register"></input>
            </form>
            <p>{status}</p>
        </div>
    )
}