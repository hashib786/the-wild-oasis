import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { useRef } from "react";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

type Props = {
  cabin?: CabinI;
};

const defaultValue = {
  id: 0,
  created_at: "",
  name: "",
  maxCapacity: 0,
  regularPrice: 0,
  discount: 0,
  description: "",
  image: "",
};

function CreateCabinForm({ cabin = defaultValue }: Props) {
  const { id: cabinId, ...editValue } = cabin;
  const isEditSession = Boolean(cabinId);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinI>({
      defaultValues: isEditSession ? editValue : {},
    });
  const toastRef = useRef<string | undefined>();
  const { errors } = formState;

  // Create/Edit cabin
  const { isLoading: isWorking, mutate: createEditMutateCabin } = useMutation({
    mutationFn: ({ cabin, id }: { cabin: FormDataI; id?: number }) => {
      return createEditCabin(cabin, id);
    },
    onSuccess: () => {
      reset();
      toast.dismiss(toastRef?.current);
      toast.success(
        `Cabin ${isEditSession ? "Edited" : "Created"} successfully`
      );
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error: Error) => {
      toast.dismiss(toastRef?.current);
      toast.error(error.message);
    },
  });

  const onSubmit = (data: CabinI) => {
    let newCabin: FormDataI = { ...data };
    if ((data.image as unknown) instanceof FileList) {
      newCabin = { ...data, image: data.image[0] };
    }
    toastRef.current = toast.loading(
      `${isEditSession ? "Editing" : "Creating"} cabin...`
    );
    if (!isEditSession) createEditMutateCabin({ cabin: newCabin });
    else createEditMutateCabin({ cabin: newCabin, id: cabinId });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            validate: (value) => {
              return (
                +getValues("regularPrice") >= +value ||
                "Discount Should be less then regular Price"
              );
            },
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This Field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : `Create New cabin`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
