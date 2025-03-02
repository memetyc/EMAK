import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

import slugify from 'slugify';
export async function POST(req) {
  try {
    const body = await req.json();

    // Tarih formatını düzelt
    const eventDate = new Date(body.eventDate);
    
    if (!body.title || !body.description || !body.eventDate) {
      return NextResponse.json(
        { error: 'Başlık, açıklama ve tarih alanları zorunludur' },
        { status: 400 }
      );
    }

    // Veritabanı işlemleri
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        eventDate: eventDate,
        eventEndDate: body.eventEndDate,
        location: body.location,
        slug: slugify(body.title, { lower: true, strict: true }),
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Etkinlik başarı ile eklendi', 
      event 
    });

  } catch (error) {
    console.error("Hata detayı:", error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Bu başlık zaten kullanımda' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Etkinlik oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}




