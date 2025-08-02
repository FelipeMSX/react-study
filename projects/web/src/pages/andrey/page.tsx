import { useEffect } from "react";
import { FormProvider, useForm, useWatch, type SubmitHandler } from "react-hook-form";

export default function AndreyProblem() {
    return (
        <div>
            <h1 className="pb-6">Andrey Problem</h1>

            <MainComponent />
        </div>
    );
}

type IFormInput = {
    bank_name: string;
    another_input: string;
    payerGroupRates: string;
};

function MainComponent() {
    const form = useForm<IFormInput>({
        // defaultValues: {
        //     bank_name: "",
        //     another_input: "",
        // },
    });
    const { errors } = form.formState;
    const { register, reset, handleSubmit, control, subscribe, watch, trigger } = form;

    // eslint-disable-next-line no-console
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    const [anotherInput, bankName, payerGroupRates] = useWatch({
        control,
        name: ["another_input", "bank_name", "payerGroupRates"],
    });

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log("triggering payerGroupRates validation");
        trigger("payerGroupRates");
    }, [anotherInput, payerGroupRates, trigger]);

    return (
        <FormProvider {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 "
            >
                <section>
                    <span className="flex text-sm font-bold gap-2 pb-2">
                        Bank Name
                        <span className="text-gray-400 font-normal">
                            Should not trigger the validation when typing here.
                        </span>
                    </span>
                    <input
                        {...register("bank_name")}
                        className="border-1"
                    />
                </section>
                <section>
                    <span className="flex text-sm font-bold gap-2 pb-2">Another input</span>
                    <input
                        {...register("another_input")}
                        className="border-1"
                    />
                </section>

                <section>
                    <span className="flex text-sm font-bold gap-2 pb-2">Payer Group Rates</span>
                    <input
                        {...register("payerGroupRates", { minLength: 4 })}
                        className="border-1"
                    />
                    {errors.payerGroupRates && (
                        <span className="text-red-500"> This is required.</span>
                    )}
                </section>
                <input type="submit" />
            </form>
        </FormProvider>
    );
}
