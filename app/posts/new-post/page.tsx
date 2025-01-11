"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { createPostAsync } from "@/redux/slices/postSlice";
import styles from "@/styles/Home.module.css";
import { useForm } from "react-hook-form";
import { PostPayload } from "@/@types";

const NewPost: NextPage = () => {
  const { createRequestStatus, error } = useAppSelector((state) => state.post);
  const { register, handleSubmit, formState: { errors } } = useForm<PostPayload>();

  const router = useRouter();
  const dispatch = useAppDispatch();

  /**
   * Form submit handler
   * @param {PostPayload} data - Form data
   */
  const handleFormSubmit = async (data: PostPayload) => {
    try {
      await dispatch(createPostAsync(data)).unwrap();
      router.push("/"); // Redirect to homepage on success
    } catch (err: any) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Create New Post</h1>

      {/* Error Display */}
      {createRequestStatus === "rejected" && (
        <div className={styles.error}>
          Error: {error?.message || "Something went wrong. Please try again."}
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        {/* Title Field */}
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            aria-label="Post Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className={styles.validationError}>{errors.title.message}</p>}
        </div>

        {/* Body Field */}
        <div className={styles.formGroup}>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            cols={30}
            rows={10}
            aria-label="Post Body"
            {...register("body", { required: "Body is required" })}
          ></textarea>
          {errors.body && <p className={styles.validationError}>{errors.body.message}</p>}
        </div>

        {/* Submit Button */}
        <div className={styles.center}>
          <button type="submit" className={styles.button} disabled={createRequestStatus === "pending"}>
            {createRequestStatus === "pending" ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewPost;
