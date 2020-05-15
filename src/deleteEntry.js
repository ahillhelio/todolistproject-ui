import React from 'react';

const DeleteEntry = ({entry, deleteEntry}) => {
    return (
        <>
        <button onClick={() => deleteEntry(entry._id)}>Done</button>
        </>
    )
}
export default DeleteEntry;