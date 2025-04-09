import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

function BlogPost() {
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const post = blogPosts.find(p => p.id === postId);

  // If post not found, maybe redirect to blog list or show 404
  if (!post) {
    // Option 1: Redirect to blog list
    // return <Navigate to="/blog" replace />;
    // Option 2: Show simple not found message
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-white my-8">Blog Post Not Found</h1>
        <Link to="/blog" className="text-blue-400 hover:text-blue-300">
          &larr; Back to Blog List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/blog" className="text-blue-400 hover:text-blue-300 inline-flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        Back to Blog List
      </Link>

      <article className="max-w-3xl mx-auto bg-white/5 p-6 md:p-8 rounded-lg shadow-lg border border-white/10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{post.title}</h1>
        <p className="text-gray-400 text-sm mb-6">Published on {post.date}</p>
        
        {/* Render excerpt differently? Or just full content? We'll show full content */}
        <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300">
           {/* For simple text content: */}
           {/* <p>{post.content}</p> */}
           
           {/* If content might contain HTML, use dangerouslySetInnerHTML (use with caution) */}
           {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
           
           {/* For now, assuming simple text content */}
           <p>{post.content}</p>
        </div>
      </article>
    </div>
  );
}

export default BlogPost; 