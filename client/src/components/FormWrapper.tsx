import React from "react";

const FormWrapper = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      {...props}
      className="flex min-w-[500px] flex-col gap-4 p-5 shadow-lg"
    >
      {children}
    </form>
  );
};

export default FormWrapper;
