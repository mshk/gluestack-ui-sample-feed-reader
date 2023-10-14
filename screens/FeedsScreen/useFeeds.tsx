import { useState } from 'react';
import * as rssParser from 'react-native-rss-parser';

interface FeedsProps {
  defaultFeedUrl: string;
}

export const useFeeds = ({ defaultFeedUrl }: FeedsProps) => {
  const [feedTitle, setFeedTitle] = useState('');
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedUrl, setFeedUrl] = useState(defaultFeedUrl);
  const [maxFeeds, setMaxFeeds] = useState(0);

  const fetchFeeds = async () => {
    setLoading(true);
    return fetch(feedUrl)
      .catch((error) => console.error(error))
      .then((response) => response.text() || '')
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        setFeedTitle(rss.title);
        setFeeds(rss.items);
        setMaxFeeds(rss.items.length);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    fetchFeeds,
    feedTitle,
    loading,
    feedUrl,
    maxFeeds,
    setMaxFeeds,
    feeds,
  };
};
