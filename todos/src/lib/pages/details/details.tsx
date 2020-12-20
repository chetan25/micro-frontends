import React from 'react';
import { useParams } from 'react-router-dom';

export const Details = () => {
    const { id } = useParams<{id: string}>();
    console.log(id);

    return <h2>Details</h2>
};

export default Details;
