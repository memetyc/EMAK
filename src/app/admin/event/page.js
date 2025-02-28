import { prisma } from '@/lib/db/prisma';

import AllEvents from '@/components/AllEvents';

async function getEventPosts() {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return events;
}



export default async function BlogPage() {
  const events = await getEventPosts();

  return (
    <div>
        <AllEvents events={events} />
    </div>
  );
}