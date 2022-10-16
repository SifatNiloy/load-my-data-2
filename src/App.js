import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  })

  const handleAddUser = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email };

    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);
      })
    // console.log(nameRef.current.value)
    nameRef.current.value = '';
    emailRef.current.value = '';
    e.preventDefault();
  }
  return (
    <div className="App">
      <h2>found users: {users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" name="" id="" ref={nameRef} placeholder='name' />
        <input type="email" name="" id="" ref={emailRef} placeholder='email' />
        <input type="submit" value="submit" />
      </form>

      <ol>
        {
          users.map(user => <li key={user.id}> {user.name} ::  {user.email} </li>)
        }
      </ol>
    </div>
  );
}

export default App;
