import React from 'react';
import { skin_disease as cataract } from '../../../disease';
import { useParams } from 'react-router-dom';
import ResultFormat from '../ResultFormat';
const SkinDiseaseResult = () => {
  const {id}=useParams();
//   console.log("iddd",id);
    return (
   <ResultFormat disease='Skin Disease' description={cataract.description} symptoms={cataract.symptoms} precautions={cataract.precautions} id={id} />
  );
};

export default SkinDiseaseResult;
