import RadioInput from '../atom/inputs/RadioInput';
import FoodOption from '../atom/inputs/FoodOption';

const EggOptions = () => (
    <div className="flex items-center justify-evenly text-lg font-bold  text-gray-500">
        <div className='inline-flex items-center'>


            <RadioInput label="With Egg" name="egg" />
            <FoodOption color={"red"} />
        </div>
        <div className='inline-flex items-center'>


            <RadioInput label="Eggless" name="egg" />
            <FoodOption color={"green"} />
        </div>
    </div>
);

export default EggOptions