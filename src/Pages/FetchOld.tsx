import { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";

export const FetchOld = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getPostData = async () => {
    try {
      const response = await fetchPosts(1);
      console.log(response);
      if (response.length > 0) {
        setPost(response);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error occurred while fetching data</p>;

  return (
    <div className="mt-4">
      <h1 className="text-center font-semibold underline mb-4">
        Hello Fetch Old
      </h1>
      <div>
        {post?.map((data: any) => {
          const { id, title, body } = data;
          return (
            <li
              key={id}
              className="list-none gap-2 text-sm bg-gray-200 text-black mb-4 p-2 rounded"
            >
              <p className="font-semibold">{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </div>
    </div>
  );
};
