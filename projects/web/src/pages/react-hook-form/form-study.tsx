/* eslint-disable jsx-a11y/label-has-associated-control */
//What causes rerender with callback ?
/*
    1. See the impact of using () => directly in a click funciton.
*/

import React, { useCallback, useEffect, type PropsWithChildren } from "react";
import { useState } from "react";
import {
    Controller,
    FormProvider,
    useForm,
    useFormContext,
    useWatch,
    type Control,
    type Path,
    type SubmitHandler,
    type UseFormRegister,
    type UseFormSubscribe,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/form";

import { Input as InputShadcn, type InputProps as InputShadcnProps } from "../../components/input";
import { set } from "zod";

type IFormInput = {
    inputWithRegister: string;
    inputWithRegisterAndInternalContext: string;
    inputWithController: string;
    inputWithShadcn: string;
    inputWithWatched: string;
    inputWithWatched2: string;
    inputWithWatched3: string;
    customInput: string;
    inputWithSubscribe?: string;
};

export function MainComponent() {
    const form = useForm<IFormInput>({
        defaultValues: {
            inputWithRegister: "1",
            inputWithRegisterAndInternalContext: "2",
            inputWithController: "3",
            inputWithShadcn: "4",
            inputWithWatched: "5",
            inputWithWatched2: "6",
            inputWithWatched3: "7",
            customInput: "8",
            inputWithSubscribe: "9",
        },
    });
    const { register, reset, handleSubmit, control, subscribe, watch } = form;

    console.log("MainComponent rendered");
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
                <section>
                    <label>Input using Register function</label>
                    <input
                        {...register("inputWithRegister")}
                        className="border-1"
                    />
                </section>
                <section>
                    <label>Input using Controller</label>
                    {/* <Controller
                    render={({ field }) => {
                        return <input {...field} />;
                    }}
                    name="inputWithController"
                    control={control}
                    defaultValue=""
                /> */}
                </section>
                {/* 
            <section>
                <label>
                    Input Using register context and using register inside its own component
                </label>
                <InputNotControlled name="inputWithRegisterAndInternalContext" />
            </section>

            <section>
                <label>Using shadcn Input</label>
                <InputNotControlledShadcn name="inputWithShadcn" />
            </section> */}

                <section>
                    <label>Rendering section with watch</label>
                    <input
                        {...register("inputWithWatched")}
                        className="border-1"
                    />
                    <ComponentWithWatched
                        control={control}
                        name="inputWithWatched"
                        watch={watch}
                    />
                </section>

                <section>
                    <label>Rendering section with watch 2</label>
                    <input
                        {...register("inputWithWatched2")}
                        className="border-1"
                    />
                    <ComponentWithWatched
                        control={control}
                        name="inputWithWatched2"
                        watch={watch}
                    />
                </section>
                <section>
                    <label>Rendering section with watch 3</label>
                    <input
                        {...register("inputWithWatched3")}
                        className="border-1"
                    />
                    <ComponentWithWatched
                        control={control}
                        name="inputWithWatched3"
                        watch={watch}
                    />
                </section>

                <section>
                    <label>Component with Subscribe</label>
                    <input
                        {...register("inputWithSubscribe")}
                        className="border-1"
                    />
                    <ComponentWithSubscribe
                        name="inputWithSubscribe"
                        subscribe={subscribe}
                    />
                </section>

                {/* <section>
                <label>Custom Input</label>
                <CustomInput
                    register={register}
                    label="customInput"
                    required={false}
                />
                <ComponentWithWatched
                    control={control}
                    name="customInput"
                />
            </section> */}

                <input type="submit" />
            </form>
        </FormProvider>
    );
}

function InputNotControlled({ name }: { name: string }) {
    const { register } = useFormContext();
    console.log("FormEmailNotControlled rendered");

    return (
        <input
            {...register(name)}
            className="border-1"
        />
    );
}

function InputNotControlledShadcn({ name }: { name: string }) {
    const { register } = useFormContext();
    console.log("FormEmailNotControlled rendered");

    return <InputShadcn {...register(name)} />;
}

function ComponentWithWatched({
    control,
    name,
    watch,
}: {
    control: Control<IFormInput>;
    name: Path<IFormInput>;
    watch: (name?: Path<IFormInput>, defaultValue?: any) => any;
}) {
    // const value = watclabelh(name, "");

    const value = useWatch({
        control,
        name,
        // exact: true,
    });

    return <p>Watch: {value}</p>; // only re-render at the custom hook level, when firstName changes
}

function ComponentWithSubscribe({
    name,
    subscribe,
}: {
    name: Path<IFormInput>;
    subscribe: UseFormSubscribe<IFormInput>;
}) {
    const [value, setValue] = useState();

    const { getFieldState } = useFormContext();

    // useEffect(() => {
    // subscribe({
    //     name: ["inputWithSubscribe"],
    //     formState: {
    //         values: true,
    //     },
    //     callback: ({ values, name }) => {
    //         console.log("Subscribe callback called");
    //         console.log(values);
    //         setValue(values[name]);
    //     },
    // });

    const {} = getFieldState("inputWithSubscribe");

    // return callback();
    // }, [subscribe]);

    return <p>Subscribed: {value}</p>;
}
type InputProps = {
    label: Path<IFormInput>;
    register: UseFormRegister<IFormInput>;
    required: boolean;
};

// The following component is an example of your existing Input Component
const CustomInput = ({ label, register, required }: InputProps) => (
    <>
        <input {...register(label, { required })} />
    </>
);
