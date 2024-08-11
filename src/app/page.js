
'use client';
import Image from "next/image";
import Title from "@/components/Title/Title";
import TaskAddEditModal from "@/components/TaskAddEditModal/TaskAddEditModal";
import TaskListAdmin from "@/components/TaskListAdmin/TaskListAdmin";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Loading from "@/components/Loading/Loading";

export default function Home() {
  const router = useRouter()
  const { status } = useSession({
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
    <TaskListAdmin/>
  </main>  
  );
}
