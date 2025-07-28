/* eslint-disable jsx-a11y/label-has-associated-control */
//What causes rerender with callback ?
/*
    1. See the impact of using () => directly in a click funciton.
*/

import React, { useCallback } from "react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type IFormInput = {
    name: string;
    email: string;
};

export function MainComponent() {
    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
    // Without useCallback: new function every render, Child rerenders
    // const handleClick = () => setCount(count + 1);

    // With useCallback: function reference is stable, Child doesn't rerender unless count changes
    // const handleClick = useCallback(() => setCount((c) => c + 1), []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>First Name</label>
            <input {...register("name")} />
            <label>Email</label>
            <input {...register("email")} />

            <input type="submit" />
        </form>
    );
}
