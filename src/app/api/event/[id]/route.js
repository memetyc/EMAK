import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function DELETE(req, { params }) {
    try {
        const { id } =await params; 

        


        const deleteEvent = await prisma.event.delete({
            where: {
              id: id,
            },
        })

        return NextResponse.json({ success: true, message:'Etkinlik başarı ile silindi', deleteEvent });

    } catch (error) {
        console.log(error);
        
      return NextResponse.json(
        { error: 'Etkinlik silinirken bir hata oluştu' },
        { status: 500 }
      );
    }
  }


export async function PATCH(req, { params }) {
    try {
      const {id} = await params;
      const data = await req.json();
      console.log(data);
      
      const title = data.title;
      const description = data.description;
      const location = data.location;
      const eventEndDate = new Date(data.eventEndDate);
      const eventDate = new Date(data.eventDate);

 
      const updateEvent = await prisma.event.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
          eventDate,
          location,
          eventEndDate,
        },
      });
  
      return NextResponse.json({ success: true,message:'Etkinlik başarı ile güncellendi', updateEvent });
    } catch (error) {
      console.log('Hata:', error);
      return NextResponse.json(
        { error: 'Etkinlik güncellenirken bir hata oluştu' },
        { status: 500 }
      );
    }
  }
  