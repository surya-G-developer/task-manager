
'use client';
import Image from "next/image";
import Title from "@/components/Title/Title";
import TaskAddEditModal from "@/components/TaskAddEditModal/TaskAddEditModal";
import TaskListAdmin from "@/components/TaskListAdmin/TaskListAdmin";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Loading from "@/components/Loading/Loading";
import TaskListUser from "@/components/TaskListUser/TaskListUser";

export default function Home() {
  const router = useRouter()
  const { status , data} = useSession({
    required: true,
    onUnauthenticated() {
     router.push('/api/auth/signin')
    },
  })

  if (status === "loading") {
    return <Loading  message="Loading data..." />;
  }
  return (
  <main className="flex-grow p-5">
    {
      data && data.user && data.user.role == "USER" ? (<TaskListUser user={data.user}/>) : <TaskListAdmin user={data.user} />
    }
  </main>  
  );
}
