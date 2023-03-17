// eslint-disable-next-line import/prefer-default-export
export const updateRss = (state, watchedStateFeeds, watchedStatePosts, parser, rssParser) => {
  setTimeout(function run() {
    const promises = state.urls.map((url) => parser(url));
    const feedsState = state.feeds;
    const postsState = state.posts;
    feedsState.length = 0;
    postsState.length = 0;
    Promise.all(promises)
      .then((data) => {
        if (data !== undefined) {
          data.forEach((response) => {
            const { feed, posts } = rssParser(response.data.contents);
            watchedStateFeeds.push(feed);
            watchedStatePosts.push(...posts);
          });
        }
      });
    setTimeout(run, 5000);
  }, 5000);
};
