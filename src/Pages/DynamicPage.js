import React from 'react'
import { useParams } from 'react-router-dom';

const DynamicPage = () => {
    const {Id} = useParams();
  return (
    <div> {Id}</div>
  )
}

export default DynamicPage;