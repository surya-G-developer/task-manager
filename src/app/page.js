
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
    return <Loading size="12" color="red-500" message="Loading data..." />;
  }

  
  const onClickTrigger = () =>{
    document.getElementById('my_modal_5').showModal()
  }
  const handleClick = () => {
    // You can also make client-side API calls or perform other client-side actions here
};
  
  return (
  <main className="flex-grow p-5">
    <Title
     title="Task List"
     buttonText="Add Task"
     onClick={onClickTrigger}
    />
    <TaskListAdmin/>
    <TaskAddEditModal/>
  </main>  
  );
}
