import React , {useState} from 'react';


const MyList = () => {
    const [selectedItem , setSelectedItem] = useState('');
    const list = ['item1', 'item2', 'item3', 'item4'];

    return (
        <ul>
            {list.map((item) => {
                return (
                    <li key={item} onClick={(e)=> setSelectedItem(item)}
                    style={{color : selectedItem === item ? 'red' : 'black' }}
                    >
                    {item} 
                    </li>
            )}    
            )}
        </ul>
    )
}

export default MyList;



