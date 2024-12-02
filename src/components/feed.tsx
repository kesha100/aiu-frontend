'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, Bookmark, Send, MoreHorizontal, PlusCircle } from 'lucide-react'

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

export function AIUCommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: "AIU Student 1",
      avatar: "/placeholder.svg?text=User1",
      image: "/placeholder.svg?text=AIU+Community+Post+1",
      caption: "Exciting events happening at AIU! Don't miss out on the upcoming workshops and networking opportunities! #AIUCommunity #StudentLife",
      likes: 42,
      comments: [
        { id: 1, username: "AIU Student 2", text: "Can't wait for the workshops!" },
        { id: 2, username: "AIU Student 3", text: "Thanks for sharing!" }
      ]
    },
    {
      id: 2,
      username: "AIU Student 2",
      avatar: "/placeholder.svg?text=User2",
      image: "/placeholder.svg?text=AIU+Community+Post+2",
      caption: "Just finished my final project presentation! So grateful for all the support from my AIU peers and professors. #AIUProud",
      likes: 38,
      comments: [
        { id: 3, username: "AIU Student 1", text: "Congratulations!" },
        { id: 4, username: "AIU Student 4", text: "Well done!" }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState({
    caption: '',
    image: ''
  });

  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = () => {
    const post: Post = {
      id: posts.length + 1,
      username: "Current User",
      avatar: "/placeholder.svg?text=Me",
      image: newPost.image || "/placeholder.svg?text=New+Post",
      caption: newPost.caption,
      likes: 0,
      comments: []
    };
    setPosts([post, ...posts]);
    setNewPost({ caption: '', image: '' });
    setIsDialogOpen(false);
  };

  const handleLike = (postId: number) => {
    if (likedPosts.has(postId)) {
      // Remove like
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
    } else {
      // Add like
      setLikedPosts(prev => new Set(prev).add(postId));
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
            {posts.map((post) => (
              <div key={post.id} className="bg-white border border-purple-200 rounded-lg shadow-md">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image src={post.avatar} alt={post.username} width={40} height={40} />
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
                  <Image src={post.image} alt={`Post by ${post.username}`} layout="fill" objectFit="cover" />
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
                    {post.comments.map((comment) => (
                      <p key={comment.id} className="text-sm">
                        <span className="font-semibold">{comment.username}</span> {comment.text}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image src="/placeholder.svg?text=Me" alt="Your profile" width={32} height={32} />
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
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPost}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold rounded hover:from-red-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
