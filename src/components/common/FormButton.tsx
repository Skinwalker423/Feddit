import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface FormButtonProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

const FormButton = ({ children }: FormButtonProps) => {
  const status = useFormStatus();

  console.log("status", status);
  return (
    <Button
      isLoading={status.pending}
      disabled={status.pending}
      type='submit'
    >
      {children}
    </Button>
  );
};

export default FormButton;
