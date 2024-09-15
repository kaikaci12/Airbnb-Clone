"use client";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { useLoginModal } from "@/app/hooks/useLoginModal";
export default function LoginModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: " ",
      password: " ",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged In");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login To your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="Continue With Google"
        outline
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        label="Continue With GitHub"
        outline
        icon={AiFillGithub}
        onClick={async () => {
          try {
            const result = await signIn("github");
            if (result) {
              toast.successs("Sign in with Guthub was successfull");
            }
          } catch (e) {
            toast.error(e.message);
          }
        }}
      />
      <div className="justify-center text-neutral-500 text-center mt-4 font-light">
        <div className="flex gap-2 items-center">
          <div>Dont Have an Account?</div>
          <div
            onClick={toggle}
            className="text-neutral-500 cursor-pointer hover:underline text-bold"
          >
            Create An Account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
