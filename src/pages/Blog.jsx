import { Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

function Blog() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8">CryptoTrackr Blog</h1>
      
      <div className="max-w-3xl mx-auto space-y-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white/5 p-6 rounded-lg shadow-lg border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-2">
              <Link to={`/blog/${post.id}`} className="hover:text-blue-400">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-400 text-sm mb-4">{post.date}</p>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <Link 
              to={`/blog/${post.id}`} 
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center"
            >
              Read More 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog; 