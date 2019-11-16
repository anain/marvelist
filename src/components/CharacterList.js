import React, {useState, useEffect} from 'react';
import md5 from 'md5'
import ListElem from './ListElem'

function CharactersList(props) {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
    const ts = Math.floor(Date.now() / 1000); 
    let searchString = '';
    if (!props.filter)
       searchString = `http://gateway.marvel.com/v1/public/characters?apikey=${props.keys.public}&ts=${ts}&hash=${md5(ts+props.keys.private+props.keys.public)}&offset=${props.offset}&limit=20`;
    else
    {
        searchString = `http://gateway.marvel.com/v1/public/characters?apikey=${props.keys.public}&ts=${ts}&hash=${md5(ts+props.keys.private+props.keys.public)}&offset=${props.offset}&limit=20&name=${props.filter}`;
        if (!props.offset)
            setCharacters([])
    }
    fetch(searchString)
    .then(res => res.json())
    .then((data) => {
        if (data.code !== 200)
        {
            console.log("Error");
            return ;
        } 
        const charactersArray = [];
        const res = data.data.results;
        res.forEach(element => {
            charactersArray.push({
                "id": element.id,
                "name": element.name,
                "pictureSrc": element.thumbnail.path + '.' + element.thumbnail.extension,
                "description": element.description,
                "comics": element.comics.items
            });
        });
        if (!props.offset)
            setCharacters(charactersArray);
        else
            setCharacters(c => [...c, ...charactersArray]);
        })
    }, [props]);

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) 
            props.setOffset(props.offset + 20);
    }

    return (
        <div>
            {characters.map(cell => (
                <ListElem key={cell.id} imgSrc={cell.pictureSrc} comics={cell.comics} name={cell.name} description={cell.description}/>
                ))
            }
        </div>
      );
}

export default CharactersList;