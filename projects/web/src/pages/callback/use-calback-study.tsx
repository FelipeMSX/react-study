//What causes rerender with callback ?
/*
    1. See the impact of using () => directly in a click funciton.
*/

import React, { useCallback } from "react";
import { useState } from "react";

type ChildProps = {
    onClick: () => void;
};

const Child = ({ onClick }: ChildProps) => {
    console.log("Child rendered");
    const [count, setCount] = useState(0);
    return (
        <>
            <button onClick={onClick}>Parent Event</button>
            <button onClick={() => setCount((c) => c + 1)}>Count</button>
        </>
    );
};

export function MainCallBackStudy() {
    const [count, setCount] = useState(0);
    const [toggle, setToggle] = useState(false);

    // Without useCallback: new function every render, Child rerenders
    // const handleClick = () => setCount(count + 1);

    // With useCallback: function reference is stable, Child doesn't rerender unless count changes
    const handleClick = useCallback(() => setCount((c) => c + 1), []);

    return (
        <div>
            <Child onClick={handleClick} />
            <button onClick={() => setToggle((t) => !t)}>Toggle</button>
            <p>Count: {count}</p>
            <p>Toggle: {toggle.toString()}</p>
        </div>
    );
}
