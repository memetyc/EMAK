"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogList({ posts }) {


  return (
    <>


      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.id}
            className="card bg-base-200 hover:shadow-lg transition-shadow"
          >
            {
              post.image && (
                <figure className="relative h-48">
                  <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />  
            </figure>
            ) }
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="text-gray-400">{post.excerpt}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm">
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-gray-400">{post.date}</p>
                </div>
                <div className="btn btn-primary btn-sm">Devamını Oku</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Sonuç bulunamadı mesajı */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Henüz yazı bulunmuyor.</p>
        </div>
      )}
    </>
  );
} 