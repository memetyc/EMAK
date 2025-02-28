export const blogPosts = [
  {
    id: 1,
    title: "Aladağlar Mağara Keşfi",
    excerpt: "Geçen hafta gerçekleştirdiğimiz Aladağlar keşif gezisinde yeni bir mağara sistemi keşfettik...",
    date: "15 Mart 2024",
    author: "Ahmet Yılmaz",
    category: "Keşif",
    readTime: "5 dk",
    imageUrl: "https://picsum.photos/800/600",
    slug: "aladaglar-magara-kesfi",
    content: `
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      
      <h2>Keşif Hazırlıkları</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      
      <h2>Mağara Sisteminin Özellikleri</h2>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
    `
  },
  {
    id: 2,
    title: "Mağaracılıkta Güvenlik: İp Teknikleri",
    excerpt: "Dikey mağaralarda güvenli iniş ve çıkış için kullanılan temel ip tekniklerini anlattık...",
    date: "10 Mart 2024",
    author: "Zeynep Kaya",
    category: "Eğitim",
    readTime: "8 dk",
    imageUrl: "https://picsum.photos/800/601",
    slug: "magaracilikta-guvenlik-ip-teknikleri",
    content: `
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      
      <h2>Temel İp Teknikleri</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    `
  },
  {
    id: 3,
    title: "Mağara Haritalaması Nasıl Yapılır?",
    excerpt: "Mağara haritalama teknikleri ve kullanılan ekipmanlar hakkında detaylı bir rehber...",
    date: "5 Mart 2024",
    author: "Mehmet Demir",
    category: "Teknik",
    readTime: "10 dk",
    imageUrl: "https://picsum.photos/800/602",
    slug: "magara-haritalamasi-nasil-yapilir",
    content: `
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      
      <h2>Haritalama Ekipmanları</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    `
  },
  {
    id: 4,
    title: "Yeni Başlayanlar İçin Mağaracılık",
    excerpt: "Mağaracılık sporuna yeni başlayanlar için temel bilgiler ve öneriler...",
    date: "1 Mart 2024",
    author: "Ayşe Yıldız",
    category: "Eğitim",
    readTime: "6 dk",
    imageUrl: "https://picsum.photos/800/603",
    slug: "yeni-baslayanlar-icin-magaracilik",
    content: `
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      
      <h2>Temel Ekipmanlar</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    `
  }
];

export function getPost(slug) {
  return blogPosts.find(post => post.slug === slug);
} 