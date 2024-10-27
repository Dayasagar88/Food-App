
import { Button } from '../ui/button'
import { Label } from '../ui/label';

import { Checkbox } from '../ui/checkbox';
import { useRestaurantStore } from '@/store/useRestaurantStore';

export type FilterOptionsState = {
    id: string,
    label : string
}[]
const filterOptions: FilterOptionsState = [
    { id: "burger", label: "Burger" },
    { id: "thali", label: "Thali" },
    { id: "biryani", label: "Biryani" },
    { id: "momos", label: "Momos" },
  ];
  

const FilterPage = () => {
    const {setAppliedFilter, appliedFilter, resetAppliedFilter} = useRestaurantStore()

    const applyFilterHandler = (value: string) => {
        setAppliedFilter(value);
    }

  return (
    <div className='md:max-w-64'>
        <div className='flex items-center gap-10 justify-between'>
            <h1 className='font-medium text-lg'>Filter</h1>
            <Button onClick={resetAppliedFilter} variant="link">Reset</Button>
        </div>
        {
            filterOptions.map((option) => (
                <div key={option.id} className='flex items-center space-x-2 my-5'>
                    <Checkbox id={option.id}
                    checked={appliedFilter.includes(option.label)}
                    onClick={() => applyFilterHandler(option.label)}
                    />
                    <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {option.label}
                    </Label>
                </div>
            ))
        }
    </div>
  )
}

export default FilterPage