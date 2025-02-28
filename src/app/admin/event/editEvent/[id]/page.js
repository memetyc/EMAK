import React from 'react'
import EventAdmin from '@/components/EventAdmin'
async function page({params}) {
  const {id} = await params
  
  const event = await prisma.event.findUnique({
    where: {
      id: id
    }
  })

  
  return (
    <div>
        <EventAdmin event={event} />
    </div>
  )
}

export default page