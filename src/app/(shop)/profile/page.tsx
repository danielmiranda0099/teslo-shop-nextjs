import { Title } from "@/components/ui";
import { auth } from "../../../../auth.config";
import { redirect } from "next/navigation";



export default async function ProfilePage() {
  const session = await auth();

  if( !session?.user ) redirect("auth/login");

  return (
    <div>
      <Title title="Perfil"  />

      <pre>
        {
          JSON.stringify(session.user, null, 3)
        }
      </pre>
      <h3 className="text-2xl mb-10">{ session.user.role }</h3>
    </div>
  )
}
