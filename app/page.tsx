"use client"

import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getPostsAsync } from '@/redux/slices/postSlice';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => {
  const { posts, postsRequestStatus, error } = useAppSelector((state: { post: any; }) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostsAsync());
  }, [dispatch]);

  return (
    <>
      <h1 className={styles.title}>Blog Posts</h1>

      <Link href="/posts/new-post">
   
          <button className={styles.button}>New Post</button>
     
      </Link>
      <div className={styles.messageContainer}>
        {postsRequestStatus === 'pending' && <div>Loading...</div>}
        {postsRequestStatus === 'rejected' && (
          <div className={styles.error}>Error: {error?.message}</div>
        )}
      </div>

      <div className={styles.grid}>
        {postsRequestStatus === 'fulfilled' &&
          posts.map((post: any) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <div className={styles.card}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;
