import { NavLink } from "react-router-dom";
import { deletePost, fetchPosts, updatePost } from "../services/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    placeholderData: keepPreviousData,
    // gcTime:3000,
    // staleTime: 2000,
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true
  });

  const deleteMutation = useMutation({
    mutationFn: (id: any) => deletePost(id),
    onSuccess: (data: any, id: any) => {
      console.log(data)
      queryClient.setQueryData(["posts", pageNumber], (curElem: any) => {
        return curElem?.filter((post: any) => post.id !== id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id: any) => updatePost(id),
    onSuccess: (apiData: any, postId: any) => {
      console.log(apiData)
      queryClient.setQueryData(["posts", pageNumber], (postsData: any) => {
        return postsData?.map((currPost: any) => {
          return currPost.id ===postId ?{...currPost, title:apiData.data.title}:currPost
        })
      });
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong"} </p>;

  return (
    <div className="mt-4">
      <h1 className="text-center font-semibold underline mb-4">
        Hello Fetch RQ
      </h1>
      <div>
        {data?.map((data: any) => {
          const { id, title, body } = data;
          return (
            <li
              key={id}
              className="list-none gap-2 text-sm bg-gray-200 text-black mb-4 p-2 rounded"
            >
              <NavLink to={`/fetchrq/${id}`}>
                <p>{id}</p>
                <p className="font-semibold">{title}</p>
                <p>{body}</p>
              </NavLink>
              <button
                className="bg-red-400 px-2 my-2 cursor-pointer rounded-sm"
                onClick={() => deleteMutation.mutate(id)}
              >
                DELETE
              </button>
              <button
                className="bg-red-400 px-2 my-2 cursor-pointer ml-2 rounded-sm"
                onClick={() => updateMutation.mutate(id)}
              >
                UPDATE
              </button>
            </li>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-4 my-8">
        <button
          className="bg-blue-300 px-4 border cursor-pointer"
          onClick={() =>
            pageNumber > 1 ? setPageNumber((prev) => prev - 5) : ""
          }
        >
          Prev
        </button>
        <h2>{pageNumber / 5 + 1}</h2>
        <button
          className="bg-blue-300 px-4 border cursor-pointer"
          onClick={() => setPageNumber((prev) => prev + 5)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
