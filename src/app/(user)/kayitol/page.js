import React from 'react'
import Register from './register'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function RegisterPage() {

  const session = await getServerSession();
  if(session){
      redirect('/');
  }
  
  return (
    <div>
      <Register />
    </div>
  )
}

export default RegisterPage