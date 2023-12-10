import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../../services/comment";
import useNotification from "../useNotification";

export default function useMutationComment() {
  const { handleNotification } = useNotification();

  const queryClient = useQueryClient();

  const addCommentMutation = useMutation(addComment, {
    onSuccess: (resp) => {
      queryClient.setQueryData(["product"], (prev) => ({
        ...prev,
        comments: [...prev.comments, resp.newComment],
      }));
    },
    onError: (error) => {
      handleNotification({
        status: false,
        title: "Error",
        text: error.response.data,
      });
    },
  });

  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: (resp) => {
      let product = queryClient.getQueryData(["product"]);
      let comments = product.comments.filter(
        (c) => c?._id !== resp.newComment?._id
      );
      comments.push(resp.newComment);
      queryClient.setQueryData(["product"], (prev) => ({
        ...prev,
        comments: comments,
      }));
    },
    onError: (error) => {
      handleNotification({
        status: false,
        title: "Error",
        text: error.response.data,
      });
    },
  });

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: (resp, params) => {
      queryClient.setQueryData(["product"], (prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c?._id !== params?.id),
      }));
    },
    onError: (error) => {
      handleNotification({
        status: false,
        title: "Error",
        text: error.response.data,
      });
    },
  });

  return {
    addCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
  };
}
