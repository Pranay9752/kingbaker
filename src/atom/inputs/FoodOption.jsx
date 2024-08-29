import { memo } from "react"

const FoodOption = memo(({ color }) => (
    <span style={{ borderColor: color }} className={` border-2 `}>
        <div style={{ backgroundColor: color }} className={` m-0.5 p-1.5 rounded-full`} />
    </span>
))


export default FoodOption