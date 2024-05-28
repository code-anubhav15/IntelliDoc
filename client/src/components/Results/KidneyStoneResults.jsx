import React from 'react';
import { kidneyStone } from '../../disease';
import { useParams } from 'react-router-dom';
import ResultFormat from './ResultFormat';

const KidneyStoneResults = () => {
  const {id}=useParams();
    return (
    <ResultFormat disease='Kidney Stone Disease' description={kidneyStone.description} symptoms={kidneyStone.symptoms} precautions={kidneyStone.precautions} id={id} />
  );
};

export default KidneyStoneResults;
