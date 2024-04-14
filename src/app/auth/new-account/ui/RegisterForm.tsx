"use client";
import clsx from "clsx";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>();

  const OnSubmit = async(data: FormInputs) => {
    const { email, name, password } = data;
    console.log({ email, name, password })
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

      <button className="btn-primary">Crear una nueva cuenta</button>

      {/* divisor l ine */}
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
