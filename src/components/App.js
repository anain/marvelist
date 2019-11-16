import React, {useState} from 'react';
import CharactersList from './CharacterList'
import Search from './Search'

function App() {
  const [filter, setFilter] = useState('');
  const [offset, setOffset] = useState(0);

  //elements preferably among environment variables
  const keys = {
    private: "56c068367b349c93ab94b0c6a2fa810385f1c658",
    public: "81e1839c7bab93eac2f6c1903d124ec9"
  };

  const launchSearch = (name) => {
    setFilter(name);
    setOffset(0);
  }

  return (
    <div>
      <h1>MARVEL CHARACTERS</h1>
      <Search launchSearch={launchSearch}/>
      <CharactersList keys={keys} filter={filter} offset={offset} setOffset={setOffset}/>
    </div>
  );
}

export default App;