import React, {useState} from 'react';
import '../style/App.css';

function Search(props) {
    const [name, setName] = useState('');

    return (
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="name" value={name}/>
        <button  onClick={() => { props.launchSearch(name) }} >search</button>
      </div>

    );
  }

export default Search;