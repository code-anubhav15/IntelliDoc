import React from 'react';
import { liver } from '../../disease';
import { useParams } from 'react-router-dom';
import ResultFormat from './ResultFormat';

const LiverDiseaseResult = () => {
  const {id}=useParams();
//   console.log("iddd",id);
    return (
    <ResultFormat disease='Liver Disease' description={liver.description} symptoms={liver.symptoms} precautions={liver.precautions} id={id} />
  );
};

export default LiverDiseaseResult;
