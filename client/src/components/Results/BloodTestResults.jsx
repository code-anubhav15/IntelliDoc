import React from 'react';
import { blood_test } from '../../disease';
import { useParams } from 'react-router-dom';
import ResultFormat from './ResultFormat';

const BloodTestResults = () => {
  const { id } = useParams();
  const diseaseInfo = blood_test[id]; 
  console.log("id", id);

  return (
     <ResultFormat disease={id} description={diseaseInfo.description} symptoms={diseaseInfo.symptoms} precautions={diseaseInfo.precautions} id={id} />
  );
};

export default BloodTestResults;
