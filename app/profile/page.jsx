'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Profile } from "@/components/Profile";

export default function userProfile() {

    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);
    const router = useRouter();

    async function fetchPosts() {
        const data = await fetch(`api/user/${session?.user.id}`, {
            method: 'GET'
        }).then((res) => res.json())

        setPosts(data.data)
    }

    useEffect(() => {
        if (session?.user.id) {
            fetchPosts()
        }
    }, [session])

    function handleEdit(post) {
        router.push(`/update-prompt?id=${post.id}`)
    }

    async function handleDelete(post) {
        const confirmed = confirm("Do you want to delete this post?");

        if (confirmed) {
            try {
                const data = await fetch(`/api/prompt/${post.id}`, {
                    method: 'DELETE'
                })

                fetchPosts()
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Profile 
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={(e) => handleEdit(e)}
            handleDelete={(e) => handleDelete(e)}
        />
    );
}