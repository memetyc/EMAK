import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import slugify from 'slugify';
export async function POST(req) {
  try {
    const {user} = await getServerSession(authOptions);

    if(user.isBanned){
      return NextResponse.json({ error: 'Yasaklanmış kullanıcılar blog yazısı oluşturamaz' }, { status: 403 });
    }
    const formData = await req.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const imageFile = formData.get('image');

    let imageUrl = null;

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
      } catch (error) {
        console.error('Resim yükleme hatası:', error);
        return NextResponse.json(
          { error: 'Resim yüklenirken bir hata oluştu' },
          { status: 500 }
        );
      }
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        image: imageUrl,
        authorId: user.id,
        slug: slugify(title, { lower: true, strict: true }),
      },
    });

    return NextResponse.json({ success: true,message:'Blog başarı ile eklendi', blog });
  } catch (error) {
    console.log('Hata:', error);
    return NextResponse.json(
      { error: 'Blog yazısı oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}




