'use client'

import { useState, useEffect } from "react";
import { PromptCard } from "./PromptCard";
import { useSession } from "next-auth/react";

function PromptCardList({data, handleClick}) {
  const posts = data.map((post) => (
    <PromptCard 
      key={post.id}
      post={post}
      handleClick={handleClick}
    />
  ));

  return (
    <div className="mt-16 prompt_layout">
      {posts}
    </div>
  )
}

export function Feed() {
  const {data: session} = useSession();

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async() => {
      const data = await fetch('api/prompt', {
        method: 'GET'
      }).then((res) => 
        res.json()
      )

      setPosts(data.data)
    }

    if (session) {
      fetchPosts();
    }
  }, [session])

  const postList = posts.map((post) => (
    <PromptCard 
      key={post.id}
      post={post}
      handleClick={() => {}}
    />
  ));

  return (
    <section className="feed">
      {
      session ? 
      (<form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a post title" 
          value={searchText} 
          onChange={handleSearchChange} 
          required 
          className="search_input peer" />
      </form>) 
      : 
      (<div className="relative w-full flex-center">
        <span>Sign in to view posts</span>
      </div>)
      }
      <PromptCardList data={posts} handleClick={() => {}}/>
    </section>
  );
}