"use client";
import { Login, RegisterUser } from "@/actions/auth";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>();

  const OnSubmit = async(data: FormInputs) => {
    const { email, name, password } = data;
    const newUser = await RegisterUser(name, email, password);

    if( !newUser.ok){
      setErrorMessage(newUser?.message!);
      return;
    }
    
    setErrorMessage('');
    
    await Login(email.toLowerCase(), password);

    window.location.replace('/');
  }

  return (
    <form onSubmit={handleSubmit(OnSubmit) } className="flex flex-col">

      <label htmlFor="name">Nombre Completo</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          {
            'border-red-500': !!errors.name
          }
        )}
        type="text"
        {...register('name', { required: true})}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          {
            'border-red-500': !!errors.email
          }
        )}
        type="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i})}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          {
            'border-red-500': !!errors.password
          }
        )}
        type="password"
        {...register('password', { required: true})}
      />

      {
        errorMessage && (
          <span className="text-red-900 bg-red-400 p-2 rounded-lg mb-4 text-center">{errorMessage}</span>
        )
      }

      <button className="btn-primary">Crear una nueva cuenta</button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
}
