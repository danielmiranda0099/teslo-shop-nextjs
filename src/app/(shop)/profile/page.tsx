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
    </div>
  )
}
