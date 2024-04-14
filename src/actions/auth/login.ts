'use server'
import { AuthError } from 'next-auth';
import { signIn } from '../../../auth.config';

 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,

) {
  try {
    console.log(Object.fromEntries(formData));
    await signIn('credentials', {
      ...Object.fromEntries(formData),
    });
    return 'Success'
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'InvalidCredentials';
        default:
          return 'SomethingWentWrong';
      }
    }
    throw error;
  }
}