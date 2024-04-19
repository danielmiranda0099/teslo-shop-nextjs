import { Title } from "@/components/ui";
import { AddressForm } from "./ui";
import { GetCountries, GetUserAddress } from "@/actions";
import { auth } from "../../../../../auth.config";

export default async function AddresPage() {

  const countries = await GetCountries();

  const session = await auth();

  if( !session?.user) {
    return (
      <h3 className="text-5xl">Ups! Al Parecer Hubo Un Error</h3>
    )
  }

  const {data: userAddress } = await GetUserAddress(session!.user.id) ?? undefined;


  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userStoredAddress={userAddress} />
      </div>
    </div>
  );
}
