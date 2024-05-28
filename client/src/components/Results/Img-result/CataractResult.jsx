import React from 'react';
import { cataract } from '../../../disease';
import { useParams } from 'react-router-dom';
import ResultFormat from '../ResultFormat';

const CataractResult = () => {
  const {id}=useParams();
//   console.log("iddd",id);
    return (
   <ResultFormat disease='Cataract Disease' description={cataract.description} symptoms={cataract.symptoms} precautions={cataract.precautions} id={id} />
  );
};

export default CataractResult;
