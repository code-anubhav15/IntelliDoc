import React from 'react';
import { diabetes } from '../../disease';
import { useParams } from 'react-router-dom';
import ResultFormat from './ResultFormat';

const DiabetesResults = () => {
   const {id}=useParams();
    return (
    <ResultFormat disease='Diabetes Disease' description={diabetes.description} symptoms={diabetes.symptoms} precautions={diabetes.precautions} id={id} />
  );
};

export default DiabetesResults;
