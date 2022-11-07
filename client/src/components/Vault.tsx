import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { saveVault } from "../api";
import type { VaultItem } from "../pages";
import { encryptvault } from "../utils/crypto";
import FormWrapper from "./FormWrapper";

const Vault = ({
  vault = [],
  vaultKey = "",
}: {
  vault: VaultItem[];
  vaultKey: string;
}) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      vault,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vault",
  });

  const mutation = useMutation(saveVault);

  return (
    <FormWrapper
      onSubmit={handleSubmit(({ vault }) => {
        const encryptedVault = encryptvault({
          vault: JSON.stringify({ vault }),
          vaultKey,
        });

        window.sessionStorage.setItem("vault", JSON.stringify(vault));

        mutation.mutate({ encryptedVault });
      })}
    >
      {fields.map((field, index) => {
        return (
          <div className="flex flex-row items-end gap-2" key={field.id}>
            <div className="flex flex-col ">
              <label htmlFor={`vault.${index}.website`}>Website</label>
              <input
                className=" rounded-md border border-gray-300 p-2"
                type="url"
                {...register(`vault.${index}.website`, {
                  required: true,
                })}
                placeholder="https://example.com"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`vault.${index}.username`}>username</label>
              <input
                className=" rounded-md border border-gray-300 p-2"
                type="text"
                {...register(`vault.${index}.username`, {
                  required: true,
                })}
                placeholder="username"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`vault.${index}.password`}>password</label>
              <input
                className=" rounded-md border border-gray-300 p-2"
                type="password"
                {...register(`vault.${index}.password`, {
                  required: true,
                })}
                placeholder="password"
              />
            </div>
            <button
              className=" rounded-md  bg-red-500 p-2 text-white"
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        );
      })}
      <div>
        <button
          type="button"
          className=" w-[fit-content] rounded-md bg-blue-500 p-2 text-white"
          onClick={() => append({ website: "", username: "", password: "" })}
        >
          Add
        </button>
        <button
          type="submit"
          className=" ml-3 rounded-md bg-teal-500 p-2 text-white"
        >
          Save Vault
        </button>
      </div>
    </FormWrapper>
  );
};

export default Vault;
