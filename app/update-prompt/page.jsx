'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { Form } from "@/components/Form";

export default function EditPrompt() {

  const router = useRouter()
  const {data: session} = useSession();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    title: ''
  })

  useEffect(() => {
    const getPostDetails = async () => {
        const data = await fetch(`/api/prompt/${postId}`, {
            method: 'GET'
        }).then((res) => res.json())

        setPost({
            prompt: data.data.content,
            title: data.data.title
        })
    }

    if (postId) {
        getPostDetails()
    }
  }, [postId])

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) {
        return alert('Post ID not found');
    }

    try {
      const res = await fetch(`/api/prompt/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: post.title,
          prompt: post.prompt
        })
      });

      if (res.ok) {
        router.push('/profile');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
}