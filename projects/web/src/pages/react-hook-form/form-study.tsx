/* eslint-disable jsx-a11y/label-has-associated-control */
//What causes rerender with callback ?
/*
    1. See the impact of using () => directly in a click funciton.
*/
import { useEffect } from "react";

import {
    Controller,
    useForm,
    useFormContext,
    type Path,
    type SubmitHandler,
    type UseFormRegister,
} from "react-hook-form";

import { Form } from "../../components/form";
import { Input as InputShadcn } from "../../components/input";

type IFormInput = {
    inputWithRegister: string;
    inputWithRegisterAndInternalContext: string;
    inputWithController: string;
    inputWithShadcn: string;
    inputWithShadcnControlled: string;
    inputWithShadcnControlled2: string;
    inputWithShadcnControlled3: string;

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
            inputWithShadcnControlled: "",
            inputWithShadcnControlled2: "",
        },
    });
    const { register, reset, handleSubmit, control, subscribe, watch } = form;

    console.log("MainComponent rendered");
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
    // Without useCallback: new function every render, Child rerenders
    // const handleClick = () => setCount(count + 1);

    // With useCallback: function reference is stable, Child doesn't rerender unless count changes
    // const handleClick = useCallback(() => setCount((c) => c + 1), []);

    useEffect(() => {
        console.log(control);
    }, []);

    return (
        <Form {...form}>
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
                    <InputNotControlled
                        name="customInput"
                        register={register}
                    />
                </section>

                <section>
                    <label>Input using Register InputShadcn</label>
                    <InputNotControlledShadcn name="inputWithShadcn" />
                </section>

                <section>
                    <label>Shadcn input with controlled component </label>
                    <InputControlledShadcn name="inputWithShadcnControlled" />
                </section>

                <section>
                    <label>Shadcn input with controlled 2 component </label>
                    <InputControlledShadcn name="inputWithShadcnControlled2" />
                </section>

                <section>
                    <label>Shadcn input with controlled 3 component </label>
                    <InputControlledShadcn name="inputWithShadcnControlled3" />
                </section>

                <input type="submit" />
            </form>
        </Form>
    );
}

function InputNotControlled({
    name,
    register,
}: {
    name: Path<IFormInput>;
    register: UseFormRegister<IFormInput>;
}) {
    return (
        <input
            {...register(name)}
            className="border-1"
        />
    );
}

function InputNotControlledShadcn({ name }: { name: Path<IFormInput> }) {
    const { register } = useFormContext<IFormInput>();
    console.log("InputNotControlledShadcn rendered" + name);

    return <InputShadcn {...register(name)} />;
}

function InputControlledShadcn({ name }: { name: Path<IFormInput> }) {
    const { control } = useFormContext<IFormInput>();
    console.log("InputControlledShadcn rendered" + name);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => <InputShadcn {...field} />}
        />
    );
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
