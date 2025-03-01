import React from 'react'
import EditEventModal from './EditEventModal'
import { prisma } from "@/lib/db/prisma";
async function page({params}) {
  const {id} = await params
  
  const event = await prisma.event.findUnique({
    where: {
      id: id
    }
  })

  
  return (
    <div>
        <EditEventModal event={event} />
    </div>
  )
}

export default page