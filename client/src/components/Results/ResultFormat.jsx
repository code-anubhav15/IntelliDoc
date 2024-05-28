import React from 'react';

const ResultFormat = ({disease,description,symptoms,precautions,id}) => {
//   const {id}=useParams();
    return (
    <div className="container mx-auto mt-24 mb-12">
      <h1 className="text-3xl font-bold text-center my-8">{disease}</h1>
      <div className="border border-gray-300 rounded p-4">
        <p className="text-gray-700 mb-4">{description}</p>
       { id!=='Healthy'||id!=='1'?<div className="mb-4">
       <div>
          <h3 className="text-lg font-semibold mb-2">Result :</h3>
          <p className="text-gray-700 font-semibold mb-4">You have {disease} disease so, see the symtoms and precautions for better future</p>
        </div>
          <h3 className="text-lg font-semibold mb-2">Symptoms:</h3>
          <ul className="list-disc list-inside">
            {Object.values(symptoms).map((symptom, index) => (
              <li key={index} className="text-gray-700">{symptom}</li>
            ))}
          </ul>
        </div>:<div>
          <h3 className="text-lg font-semibold mb-2">Result :</h3>
          <p className="text-gray-700 font-semibold mb-4">You not have {disease} disease but try to do that precaution for better future</p>
        </div>}
        <div>
          <h3 className="text-lg font-semibold mb-2">Precautions:</h3>
          <ul className="list-disc list-inside">
            {Object.values(precautions).map((precaution, index) => (
              <li key={index} className="text-gray-700">{precaution}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultFormat;
