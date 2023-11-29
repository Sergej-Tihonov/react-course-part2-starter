import axios from "axios";
import {keepPreviousData, useInfiniteQuery, useQuery} from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  userId: number|null;
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  const fetchPosts = (page) => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
      params: {
        userId: query.userId,
        _start: (page - 1) * query.pageSize,
        _limit: query.pageSize
      }
    })
    .then((res) => res.data)

  return useInfiniteQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: ({pageParam}) => fetchPosts(pageParam),
    staleTime: 1 * 60 * 1000, // 1 minute
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined
    }
  })
}

export default usePosts
