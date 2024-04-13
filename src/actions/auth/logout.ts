'use server';

import { signOut } from "../../../auth.config";

export async function Logout() {
  await signOut();
}