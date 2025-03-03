import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import AddGoogleEvent from "@/components/AddGoogleEvent";

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
  const eventDate = new Date(event.eventDate);
  
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <article className="prose prose-lg max-w-4xl mx-auto">
        {/* Tarih ve Saat Kartı */}
        <div className="card bg-primary text-primary-content p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Gün ve Ay */}
              <div className="text-center">
                <div className="text-5xl font-bold">
                  {format(eventDate, "d", { timeZone: 'Europe/Istanbul' })}
                </div>
                <div className="text-xl">
                  {format(eventDate, "MMMM", { locale: tr, timeZone: 'Europe/Istanbul' })}
                </div>
              </div>
              
              {/* Gün Adı ve Saat */}
              <div className="border-l pl-8">
                <div className="text-2xl font-semibold">
                  {format(eventDate, "EEEE", { locale: tr, timeZone: 'Europe/Istanbul' })}
                </div>
                <div className="text-xl">
                  {format(eventDate, "HH:mm", { timeZone: 'Europe/Istanbul' } )}
                </div>
              </div>
            </div>
            
            {/* Kalan Süre Badge */}
            <div className="badge badge-secondary badge-lg p-4">
              {eventDate > new Date() 
                ? `${Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24))} gün kaldı` 
                : 'Etkinlik sona erdi'}
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8">{event.title}</h1>

        <div className="card bg-base-200 p-6 mb-8">
          <div className="prose prose-lg max-w-none break-words" dangerouslySetInnerHTML={{ __html: event.description }} />
        </div>

        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          <div className="text-sm text-gray-500">
            Oluşturulma: {format(new Date(event.createdAt), "d MMMM yyyy", { locale: tr })}
          </div>
          <div className="flex gap-4">
            <AddGoogleEvent event={event} />
          </div>
        </div>
      </article>
    </div>
  );
} 