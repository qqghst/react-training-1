import React, {useState} from "react";

const Counter = function () {
    const [count, setCount] = useState(0)

    function plus() {
        setCount(count + 1)
    }

    function minus() {
        setCount(count - 1)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={plus}>+1</button>
            <button onClick={minus}>-1</button>
        </div>
    )
}

export default Counter;