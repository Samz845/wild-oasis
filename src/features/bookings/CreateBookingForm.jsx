import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useForm, useWatch } from "react-hook-form";
import Button from "../../ui/Button";
import { useEffect, useMemo } from "react";
import { subtractDates } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import { useCabinData } from "../cabins/useCabinData";
import { useGuests } from "../guests/useGuests";
import { useCreateBooking } from "./useCreateBooking";

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CheckboxInputBox = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  & label {
    font-weight: 500;
  }
`;
function CreateBookingForm({ bookingToEdit, onCloseModal }) {
  const { id: editId, ...editValuesRaw } = bookingToEdit || {};
  const { settingsData, isLoading } = useSettings();
  const { isLoading: isLoadingCabins, cabins } = useCabinData();
  const { isLoadingGuests, guests } = useGuests();
  const { isCreating, createBooking } = useCreateBooking();

  const editValues = useMemo(() => {
    if (!bookingToEdit) return {};

    return {
      ...editValuesRaw,
      startDate: bookingToEdit.startDate?.slice(0, 10),
      endDate: bookingToEdit.endDate?.slice(0, 10),
      cabinId: cabins?.id || "",
      guestId: guests?.id || "",
    };
  }, [bookingToEdit, editValuesRaw, cabins, guests]);

  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  }); // Placeholder for useForm hook

  const breakfastPrice = settingsData?.breakfastPrice || 0;

  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });
  const numGuests = useWatch({ control, name: "numGuests" });
  const numNights = useWatch({ control, name: "numNights" });
  const cabinId = useWatch({ control, name: "cabinId" });

  const options = [
    { value: "unconfirmed", label: "Unconfirmed" },
    { value: "checked-in", label: "Checked In" },
    { value: "checked-out", label: "Checked Out" },
  ];

  const isCreatingBooking =
    isLoading || isLoadingCabins || isLoadingGuests || isCreating;

  useEffect(() => {
    if (isEditSession && Object.keys(editValues).length > 0) {
      reset(editValues);
    }
  }, [isEditSession, editValues, reset]);

  useEffect(() => {
    if (!isEditSession && startDate && endDate) {
      const nights = subtractDates(endDate, startDate);
      setValue("numNights", nights < 1 ? 1 : nights);
    }

    if (!isLoading && numGuests && numNights) {
      const extras = breakfastPrice * numGuests * numNights;
      setValue("extrasPrice", extras);
    }

    if (cabins?.length && cabinId) {
      const selectedCabin = cabins.find((c) => c.id === cabinId);

      if (selectedCabin) {
        setValue("cabinPrice", selectedCabin.regularPrice * numNights);
      } else {
        setValue("cabinPrice", 0);
      }
    }
  }, [
    startDate,
    endDate,
    setValue,
    numGuests,
    numNights,
    breakfastPrice,
    isLoading,
    cabinId,
    cabins,
    isEditSession,
  ]);

  const onSubmit = (data) => {
    createBooking(data, {
      onSuccess: () => {
        reset(), onCloseModal?.();
      },
    });
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
      size="large"
    >
      <Heading as="h2">Create New Booking</Heading>
      {/* Form fields for creating a booking will go here */}
      <FormRow label="Booking start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "please select a date",
          })}
        />
      </FormRow>

      <FormRow label="Booking end date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "please select a date",
          })}
        />
      </FormRow>

      <FormRow label="Total number of Nights">
        <Input type="text" id="numNights" {...register("numNights")} />
      </FormRow>

      <FormRow
        label="Total number of Guests"
        error={errors?.numGuests?.message}
      >
        <Input
          type="text"
          id="numGuests"
          {...register("numGuests", {
            required: "please enter number of guests",
            min: { value: 1, message: "at least one guest is required" },
          })}
        />
      </FormRow>

      <FormRow label="Booking Status">
        <select id="status" {...register("status")}>
          <option value="">Select status</option>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Select a Cabin">
        <select
          id="cabinId"
          {...register("cabinId", {
            setValueAs: (value) => (value === "" ? null : Number(value)),
          })}
        >
          <option value="">Select cabin</option>
          {cabins?.map((cabin) => (
            <option value={cabin.id} key={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Select a Guest">
        <select
          id="guestId"
          {...register("guestId", {
            setValueAs: (value) => (value === "" ? null : Number(value)),
          })}
        >
          <option value="" selected>
            Select guest
          </option>
          {guests?.map((guest) => (
            <option value={guest.id} key={guest.id}>
              {guest.fullName}
            </option>
          ))}
        </select>
      </FormRow>

      <Box>
        <CheckboxInputBox>
          <label htmlFor="hasBreakfast">Breakfast Included</label>
          <Input
            type="checkbox"
            id="hasBreakfast"
            {...register("hasBreakfast")}
          />
        </CheckboxInputBox>
      </Box>

      <Box>
        <CheckboxInputBox>
          <label htmlFor="isPaid">Please click if payment has been made</label>
          <Input type="checkbox" id="isPaid" {...register("isPaid")} />
        </CheckboxInputBox>
      </Box>

      <FormRow label="Observations">
        <Textarea
          id="observations"
          defaultValue=""
          {...register("observations")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="extrasPrice"
          defaultValue={0}
          {...register("extrasPrice")}
        />
      </FormRow>

      <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          {...register("cabinPrice", {
            required: "please enter cabin price",
          })}
        />
      </FormRow>

      <FormRow label="Total price" error={errors?.totalPrice?.message}>
        <Input
          type="number"
          id="totalPrice"
          {...register("totalPrice", {
            required: "please enter total price",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isCreatingBooking}>
          {isEditSession ? "Edit Booking" : "Create a new booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
