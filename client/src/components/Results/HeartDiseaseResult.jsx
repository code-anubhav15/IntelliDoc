import React from 'react';
import { heartDisease } from '../../disease';
import { useParams } from 'react-router-dom';
import ResultFormat from './ResultFormat';

const HeartDiseaseResults = () => {
  const {id}=useParams();
    return (
  <ResultFormat disease='Heart Disease' description={heartDisease.description} symptoms={heartDisease.symptoms} precautions={heartDisease.precautions} id={id} />
  );
};

export default HeartDiseaseResults;
