import React from 'react';
import { cardio } from '../../disease';
import { useParams } from 'react-router-dom';
import ResultFormat from './ResultFormat';

const Cardio_disease_Results = () => {
  const {id}=useParams();
    return (
    <ResultFormat disease='Cardio Vascular Disease' description={cardio.description} symptoms={cardio.symptoms} precautions={cardio.precautions} id={id} />
  );
};

export default Cardio_disease_Results;
