import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

async function getEvent(slug) {
  const event = await prisma.event.findUnique({
    where: { slug }
  });
  
  if (!event) {
    notFound();
  }
  
  return event;
}

export default async function EventDetail({ params }) {
  const event = await getEvent(params.slug);
  
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <article className="prose prose-lg max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-500 mb-8">
          <time dateTime={event.eventDate}>
            {format(new Date(event.eventDate), "d MMMM yyyy", { locale: tr })}
          </time>
          <span>•</span>
          <span>{format(new Date(event.eventDate), "HH:mm", { locale: tr })}</span>
        </div>

        <div className="card bg-base-200 p-6 mb-8">
          <div className="prose prose-lg max-w-none break-words" dangerouslySetInnerHTML={{ __html: event.description }} />
        </div>

        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          <div className="text-sm text-gray-500">
            Oluşturulma: {format(new Date(event.createdAt), "d MMMM yyyy", { locale: tr })}
          </div>
          <button className="btn btn-primary">
            Katıl
          </button>
        </div>
      </article>
    </div>
  );
} 