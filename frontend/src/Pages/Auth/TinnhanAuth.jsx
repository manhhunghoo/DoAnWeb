import React from 'react';
import axios from 'axios'

const TinnhanAuth = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0]
    axios.post(
      'http://localhost:3001/authenticate',
      { username: value }
    )
      .then(r => props.onAuth({ ...r.data, secret: value }))
      .catch(e => console.log('error', e))
  };

  return (
    <div className=" h-full w-full flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-1/2 max-w-350px px-25">
        <div className="text-4xl font-bold tracking-wider text-white pb-3 font-avenir">
          Welcome 👋
        </div>

        <div className="text-lg font-medium tracking-wider text-gray-400 pb-6 font-avenir">
          Set a username to get started
        </div>

        <div className="relative inline-block w-full pb-12">
          <div className="absolute top-2 left-4 text-xs text-gray-700 font-medium font-avenir">
            Username
          </div>
          <input className="bg-gray-800 text-white font-medium outline-none border-none rounded-lg py-6 px-4 mb-3 w-full" name="username" />
          <button className="w-full h-14 text-white bg-orange-500 rounded-lg font-medium cursor-pointer transition duration-300 hover:brightness-125">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default TinnhanAuth;