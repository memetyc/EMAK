import React from 'react'
import EditBlogModal from './EditBlogModal'
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
        <EditBlogModal blog={blog} />
    </div>
  )
}

export default page