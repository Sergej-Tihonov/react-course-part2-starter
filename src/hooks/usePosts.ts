import axios from "axios";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  userId: number|null;
  page: number;
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  const fetchPosts = () => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
      params: {
        userId: query.userId,
        _start: (query.page - 1) * query.pageSize,
        _limit: query.pageSize
      }
    })
    .then((res) => res.data)

  return useQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000, // 1 minute
    placeholderData: keepPreviousData,
  })
}

export default usePosts
