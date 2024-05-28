import React, { useContext } from 'react';
import Card from './Card';
import { Context } from '../..';

const CardList = ({ tests }) => {
  const {user, setUser,isAuthorized,setIsAuthorized}=useContext(Context);
  return (
    <div className='flex flex-wrap justify-start gap-x-8 gap-y-5 lg:gap-x-12  gap-y-5  mx-7 ml-11'>
      {tests.map((user, i) => (
        <Card 
          key={i} 
          id={user.id} 
          name={user.name} 
          img={user.img}
          description={user.description}
          path={isAuthorized?user.path:'/diagnosis'}
        />
      ))}
    </div>
  );
};

export default CardList;
