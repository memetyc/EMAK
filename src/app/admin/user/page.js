import { prisma } from '@/lib/db/prisma';
import AllUsers from '@/components/AllUsers';

async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    },
  });
  return users;
}



export default async function BlogPage() {
  const users = await getUsers();

  return (
    <div>
        <AllUsers users={users} />
    </div>
  );
}