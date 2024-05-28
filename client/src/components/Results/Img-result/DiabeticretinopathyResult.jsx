import React from 'react';
import { diabetic_retinopathy as cataract } from '../../../disease';
import { useParams } from 'react-router-dom';
import ResultFormat from '../ResultFormat';

const DiabeticRetinopathyResult = () => {
  const {id}=useParams();
//   console.log("iddd",id);
    return (
   <ResultFormat disease='Diabetic Retinopathy Disease' description={cataract.description} symptoms={cataract.symptoms} precautions={cataract.precautions} id={id} />
  );
};

export default DiabeticRetinopathyResult;
