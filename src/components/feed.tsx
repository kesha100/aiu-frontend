'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchData } from "../utils/apiHelper"; // Ensure this exists and is correctly implemented
import { Heart, MessageCircle, Bookmark, Send, MoreHorizontal, PlusCircle } from "lucide-react";

interface Post {
  id: number;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  username: string;
  text: string;
}

export  function AIUCommunityFeed() {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]); // Explicitly define the type of posts as Post[]
  const [newPost, setNewPost] = useState({ caption: '', image: '' });
  const [newComments, setNewComments] = useState<Record<number, string>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set<number>());

  // Fetch posts from the backend API
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const result = await fetchData("posts"); // Replace "posts" with the correct endpoint
        setPosts(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Safely access `message`
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    loadPosts();
  }, []);

  const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = () => {
    const post: Post = {
      id: Date.now(), // Unique ID based on timestamp
      username: "Current User",
      avatar: "/placeholder.svg?text=Me",
      image: newPost.image || "/placeholder.svg?text=New+Post",
      caption: newPost.caption,
      likes: 0,
      comments: []
    };
    setPosts([post, ...posts]); // Locally update posts
    setNewPost({ caption: '', image: '' });
    setIsDialogOpen(false);
  };
  

  const handleLike = (postId: number) => {
    if (likedPosts.has(postId)) {
      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
    } else {
      setLikedPosts((prev) => new Set(prev).add(postId));
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    }
  };

  const handleCommentChange = (postId: number, comment: string) => {
    setNewComments({ ...newComments, [postId]: comment });
  };

  const handleAddComment = (postId: number) => {
    const comment = newComments[postId];
    if (comment) {
      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, { id: post.comments.length + 1, username: "Current User", text: comment }]
            }
          : post
      ));
      setNewComments({ ...newComments, [postId]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-purple-50">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-purple-600 text-white p-4 shadow-md">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AIU Community</h1>
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="text-white hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-200 rounded-full p-1"
              aria-label="Add new post"
            >
              <PlusCircle className="h-6 w-6" />
            </button>
            <a href="/profile" className="text-white hover:text-red-200 font-semibold">Profile</a>
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        <div className="h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="space-y-6">
            {error && <p className="text-red-500">Error: {error}</p>}
            {posts.map((post) => (
              <div key={post.id} className="bg-white border border-purple-200 rounded-lg shadow-md">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image src={post.avatar} alt={`Post by ${post.username}`}  width={40} height={40} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{post.username}</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <button className="ml-auto text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200 rounded-full p-1">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                <div className="relative w-full h-96">
                <Image 
                  src={post.image ? post.image : "/placeholder.svg?text=New+Post"} 
                  alt={`Post by ${post.username}`} 
                  layout="fill" 
                  objectFit="cover" 
                />
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`${likedPosts.has(post.id) ? 'text-red-600' : 'text-gray-500'} hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 rounded-full p-1`}
                      >
                        <Heart className="h-6 w-6" fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button className="text-purple-500 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200 rounded-full p-1">
                        <MessageCircle className="h-6 w-6" />
                      </button>
                      <button className="text-purple-500 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200 rounded-full p-1">
                        <Send className="h-6 w-6" />
                      </button>
                    </div>
                    <button className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 rounded-full p-1">
                      <Bookmark className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold">{post.likes} likes</p>
                  <p className="text-sm">
                    <span className="font-semibold">{post.username}</span> {post.caption}
                  </p>
                  <div className="space-y-2">
                    {(post.comments || []).map((comment) => (
                      <p key={comment.id} className="text-sm">
                        <span className="font-semibold">{comment.username}</span> {comment.text}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image src={post.image ? post.image : "/placeholder.svg?text=New+Post"}  alt={`Post by ${post.username}`}  width={32} height={32} />
                    </div>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-grow border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={newComments[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="text-purple-600 hover:text-purple-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 rounded px-2 py-1"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create a new post</h2>
            <textarea
              placeholder="Write a caption..."
              name="caption"
              value={newPost.caption}
              onChange={handleNewPostChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
            />
            <input
              type="text"
              placeholder="Image URL"
              name="image"
              value={newPost.image}
              onChange={handleNewPostChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700 mr-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPost}
                className="bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-4 py-2"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
