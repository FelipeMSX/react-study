/* eslint-disable jsx-a11y/label-has-associated-control */
//What causes rerender with callback ?
/*
    1. See the impact of using () => directly in a click funciton.
*/

import React, { useCallback, type PropsWithChildren } from "react";
import { useState } from "react";
import { FormProvider, useForm, useFormContext, type SubmitHandler } from "react-hook-form";

type IFormInput = {
    name: string;
    email: string;
};

export function MainComponent() {
    const form = useForm<IFormInput>();
    const { register, reset, handleSubmit } = form;

    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
    // Without useCallback: new function every render, Child rerenders
    // const handleClick = () => setCount(count + 1);

    // With useCallback: function reference is stable, Child doesn't rerender unless count changes
    // const handleClick = useCallback(() => setCount((c) => c + 1), []);

    return (
        <FormProvider {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 "
            >
                <FormControl>
                    <label>First Name</label>
                    <input
                        {...register("name")}
                        className="border-1 rounded-sm"
                    />
                </FormControl>
                <FormEmailNotControlled />

                <input type="submit" />
            </form>
        </FormProvider>
    );
}

type IFormControlProps = PropsWithChildren;

function FormControl({ children }: IFormControlProps) {
    return <div className="flex gap-2">{children}</div>;
}

function FormEmailNotControlled() {
    console.log("FormEmail rendered");
    const { register } = useFormContext();

    return (
        <FormControl>
            <label>Email</label>
            <input
                {...register("email")}
                className="border-1"
            />
        </FormControl>
    );
}
