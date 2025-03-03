import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { ref, uploadBytes, getDownloadURL,deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function DELETE(req, { params }) {
    try {
        const { id } =await params; 
 
        
        const blog = await prisma.blog.findUnique({
            where: {
              id: id,
            },
        })
        if(blog.image){
            const deleteRef = ref(storage, blog.image);
            await deleteObject(deleteRef)
        }


        const deleteBlog = await prisma.blog.delete({
            where: {
              id: id,
            },
        })

        return NextResponse.json({ success: true, message:'Blog başarı ile silindi', blog });

    } catch (error) {
        console.log(error);
        
      return NextResponse.json(
        { error: 'Blog silinirken bir hata oluştu' },
        { status: 500 }
      );
    }
  }


export async function PUT(req, { params }) {
    try {
        const { id } =await params; 
     

        const blog = await prisma.blog.findUnique({
          where: { id },
          select: { isPublished: true }
        });
        const updateBlog = await prisma.blog.update({
            where: {
              id: id,
            },
            data: {
              isPublished: !blog.isPublished
            },
        })

        
        return NextResponse.json({ success: true, message:'Blog durumu başarı ile değiştirildi', updateBlog });

    } catch (error) {
        console.log(error);
        
      return NextResponse.json(
        { error: 'Blog yayınlanırken bir hata oluştu' },
        { status: 500 }
      );
    }
  }

export async function PATCH(req, { params }) {
    try {
      const {id} = await params;
      const {user} = await getServerSession(authOptions);
  
      if(user.isBanned){
        return NextResponse.json({ error: 'Yasaklanmış kullanıcılar blog yazısı oluşturamaz' }, { status: 403 });
      }
      const formData = await req.formData();
      const title = formData.get('title');
      const content = formData.get('content');
      const imageFile = formData.get('image');
      
      const blog = await prisma.blog.findUnique({
        where: {
          id: id,
        },
      })
      
      

      let imageUrl = blog?.image;

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


          if(blog.image){
            const deleteRef = ref(storage, blog.image);
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
  
      const updateBlog = await prisma.blog.update({
        where: {
          id: id,
        },
        data: {
          title,
          content,
          image: imageUrl,
          isPublished: false,
        },
      });
  
      return NextResponse.json({ success: true,message:'Blog başarı ile güncellendi', updateBlog });
    } catch (error) {
      console.log('Hata:', error);
      return NextResponse.json(
        { error: 'Blog güncellenirken bir hata oluştu' },
        { status: 500 }
      );
    }
  }
  