"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getPostAsync } from "@/redux/slices/postSlice";
import styles from "@/styles/Home.module.css";

interface PostDetailsProps {
  params: { id: string };
}

const PostDetails: React.FC<PostDetailsProps> = ({ params }) => {
  const { id } = params; // Extract ID from props
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { post, postDetailsRequestStatus, error } = useAppSelector(
    (state) => state.post
  );

  // Fetch post details when ID changes
  useEffect(() => {
    if (id) {
      dispatch(getPostAsync(+id)); // Convert ID to a number
    }
  }, [dispatch, id]);

  // Handle invalid ID or missing post
  if (!id) {
    router.push("/404");
    return null;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>JSON Placeholder Post</h1>

      <div className={styles.messageContainer}>
        {postDetailsRequestStatus === "pending" && <div>Loading...</div>}
        {postDetailsRequestStatus === "rejected" && (
          <div className={styles.error}>
            Error: {error?.message || "Failed to fetch post details"}
          </div>
        )}
      </div>

      {postDetailsRequestStatus === "fulfilled" && post && (
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default PostDetails;
