import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export async function PUT(req, { params }) {
    try {
        const { id } =await params; 

        const user = await prisma.user.findUnique({
          where: { id },  
          select:{isBanned:true}
        });
 
        const updatedUser = await prisma.user.update({
            where: {
              id: id,
            },
            data: {
              isBanned: !user.isBanned
            },
        })

        return NextResponse.json({ success: true, message:'Kullanıcı durumu başarı ile değiştirildi', updatedUser });

    } catch (error) {
        console.log(error);
        
      return NextResponse.json(
        { error: 'Kullanıcı yasaklanırken bir hata oluştu' },
        { status: 500 }
      );
    }
  }


export async function PATCH(req, { params }) {
    try {
        const { id } =await params; 
        const { role } = await req.json();

        const updatedUser = await prisma.user.update({
          where: { id },
          data: { role },
        });

        
        return NextResponse.json({ success: true, message:'Kullanıcı rolü başarı ile değiştirildi', updatedUser });

    } catch (error) {
        console.log(error);
        
      return NextResponse.json(
        { error: 'Kullanıcı rolü değiştirilirken bir hata oluştu' },
        { status: 500 }
      );
    }
  }


  export async function POST(req, { params }) {
    try {
        const { id } = await params; 
        const formData = await req.formData();
        const name = formData.get('name');
        const imageFile = formData.get('image');

        const user = await prisma.user.findUnique({
            where: { id },  
          });
        
        let imageUrl = user?.image;

        if (imageFile && imageFile.size > 0) {
          try {
            // Dosya adını ve uzantısını al
            const fileName = `${Date.now()}-${imageFile.name}`;
            
            // Storage referansını oluştur
            const storageRef = ref(storage, `blog-images/${fileName}`);
            
            // Dosyayı ArrayBuffer'a çevir
            const buffer = await imageFile.arrayBuffer();
            
            // Firebase'e yükle
            await uploadBytes(storageRef, buffer);
            
            // URL'i al
            imageUrl = await getDownloadURL(storageRef);

            if(user.image && !user.image.startsWith('https://lh3.googleusercontent.com')){
              const deleteRef = ref(storage, user.image);
              await deleteObject(deleteRef)
            }
          } catch (error) {
            console.error('Resim yükleme hatası:', error);
            return NextResponse.json(
              { error: 'Resim yüklenirken bir hata oluştu' },
              { status: 500 }
            );
          }
        }
    


        const updatedUser = await prisma.user.update({
          where: { id },
          data: { name, image:imageUrl },
        });

        
        return NextResponse.json({ success: true, message:'Kullanıcı rolü başarı ile değiştirildi', updatedUser });

    } catch (error) {
        console.log(error);
        
      return NextResponse.json(
        { error: 'Kullanıcı rolü değiştirilirken bir hata oluştu' },
        { status: 500 }
      );
    }
  }