import { SignUpCard } from '@/features/auth/components/SignUpCard'
import { redirect } from 'next/navigation';
// import SignUpCard from '@/features/auth/components/SignUpCard'
import React from 'react'
import { getCurrent } from "@/features/auth/actions";

const SignUpPage = async() => {
  const user = await getCurrent();
	if (user) redirect("/");
  return <SignUpCard/>
}

export default SignUpPage