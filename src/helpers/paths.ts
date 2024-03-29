export const paths = {
  home: () => {
    return "/";
  },
  topicShow: (topicSlug: string) => {
    return `topics/${topicSlug}`;
  },

  postCreate: (topicSlug: string) => {
    return `topics/${topicSlug}/posts/new`;
  },
  postShow: (
    topicSlug: string,
    postId: string,
    server?: boolean
  ) => {
    if (server) {
      return `${topicSlug}/posts/${postId}`;
    } else {
      return `topics/${topicSlug}/posts/${postId}`;
    }
  },
};
