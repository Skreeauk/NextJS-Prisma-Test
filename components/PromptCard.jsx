'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export function PromptCard({post, handleClick, handleEdit, handleDelete}) {
  const { data: session } = useSession();

  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  function handleCopy() {
    setCopied(post.content);
    navigator.clipboard.writeText(post.content);

    setTimeout(() => {
      setCopied("")
    }, 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer dark:text-black">
          <div>
            {post.title}
          </div>
        </div>
        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image src={
            copied === post.content 
            ? '/icons/tick.svg' 
            : '/icons/copy.svg'} 
            width={12} 
            height={12} alt="Copy"/>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.content}</p>
      <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">{post.author.name}</h3>
          <p className="font-inter text-sm text-gray-500">{post.author.email}</p>
      </div>

      {session?.user.id === String(post.authorId) && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" 
            onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" 
            onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
}