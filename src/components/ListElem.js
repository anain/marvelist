import React, {useState} from 'react';
import '../style/App.css';

function ListElem(props) {
  const [displayDescription, setDisplayDescription] = useState(false);
  const toggleDescription = () => {
    if ((props.comics || props.description) && !displayDescription)
      setDisplayDescription(true);
    if (displayDescription)
      setDisplayDescription(false);
}

  return (
      <div className="listElem" id={props.id}>
        <img src={props.imgSrc} alt={props.name}/>
         <div className="card">
            <div className={ (props.description || props.comics.length) ? "name active" : "name inactive"} onClick={() => toggleDescription()}>
              {props.name}
            </div>
            <div className="description" style={{display: displayDescription ? 'block' : 'none'}}>
              <div>{props.description}</div>
              <div className="titles">
              <div style={{fontWeight:"bold"}}>This character appears in the following comics : </div>
                  {props.comics.map((comic, index) => (
                    <div key={index}>
                        <div>{comic.name}</div>
                        <div>{comic.resourceURI}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      );
}

export default ListElem;