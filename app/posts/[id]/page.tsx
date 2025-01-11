"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getPostAsync } from "@/redux/slices/postSlice";
import styles from "@/styles/Home.module.css";

const PostDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { post, postDetailsRequestStatus, error } = useAppSelector((state: { post: any }) => state.post);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Await the params to resolve the promise
  const resolvedParams = await params;
  const { id } = resolvedParams;

  useEffect(() => {
    if (id) {
      dispatch(getPostAsync(+id));
    }
  }, [dispatch, id]);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>JSON Placeholder Post</h1>

      <div className={styles.messageContainer}>
        {postDetailsRequestStatus === "pending" && <div>Loading...</div>}
        {postDetailsRequestStatus === "rejected" && (
          <div className={styles.error}>Error: {error?.message}</div>
        )}
      </div>

      {postDetailsRequestStatus === "fulfilled" && (
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>{post?.title}</h2>
            <p>{post?.body}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default PostDetails;
