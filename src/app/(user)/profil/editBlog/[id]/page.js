import React from 'react'
import BlogAdmin from '@/components/BlogAdmin'
import { prisma } from '@/lib/db/prisma'
async function page({params}) {
  const {id} = await params
  
  const blog = await prisma.blog.findUnique({
    where: {
      id: id
    }
  })

  
  return (
    <div>
        <BlogAdmin blog={blog} />
    </div>
  )
}

export default page