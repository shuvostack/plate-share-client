import React, { use } from 'react';
import FoodCard from '../../components/Shared/FoodCard';

const FeaturedFoods = ({featuredFoodsPromise}) => {

    const foods = use(featuredFoodsPromise);
    console.log(foods);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                foods.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
            }
        </div>
    );
};

export default FeaturedFoods;