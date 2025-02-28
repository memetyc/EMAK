import React from 'react'
import Login from './login'

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function LoginPage() {
    const session = await getServerSession();
    if(session){
        redirect('/');
    }
    
  return (
    <div>
      <Login />
    </div>
  )
}

export default LoginPage
