import { useQuery } from "@tanstack/react-query";
import { fetchIndvPost } from "../services/api";
import { useParams } from "react-router-dom";

const FetchIndv = () => {
  const { id } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post",id],
    queryFn: () => fetchIndvPost(id),
    // gcTime:3000,
    // staleTime: 2000,
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong"} </p>;

  return (
    <div className="mt-4">
      <h1 className="text-center">Post ID Number: {id}</h1>
      <div className="list-none gap-2 text-sm bg-gray-200 text-black mb-4 p-2 rounded">
        <p className="font-bold">Id: {data?.id}</p>
        <p>Title: {data?.title}</p>
        <p>Body: {data?.body}</p>
      </div>
    </div>
  );
};

export default FetchIndv;
