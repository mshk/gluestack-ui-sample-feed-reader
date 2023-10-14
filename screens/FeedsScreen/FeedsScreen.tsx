import { useEffect, useState, useCallback } from 'react';
import {
  Icon,
  Box,
  Heading,
  ScrollView,
  VStack,
  Spinner,
  Fab,
  FabIcon,
  FabLabel,
} from '@gluestack-ui/themed';
import { SlidersHorizontal } from 'lucide-react-native';

import { FeedCard } from './FeedCard';
import { SettingsSheet } from './SettingsSheet';
import { useFeeds } from './useFeeds';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FeedsScreen = ({
  defaultFeedUrl = 'https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml',
}: React.PropsWithChildren & { defaultFeedUrl?: string }) => {
  const {
    feeds,
    fetchFeeds,
    feedTitle,
    loading,
    feedUrl,
    maxFeeds,
    setMaxFeeds,
  } = useFeeds({ defaultFeedUrl });
  const [query, setQuery] = useState('');
  const [shouldSplitText, setShouldSplitText] = useState(false);

  const [showActionsheet, setShowActionsheet] = useState(false);
  
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const onPressFab = useCallback(() => setShowActionsheet(!showActionsheet), [showActionsheet]);

  useEffect(() => {
    fetchFeeds();
  }, []);

  if (loading) {
    return (
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Spinner />
      </Box>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#cbf3f0'}}>
      <ScrollView backgroundColor="#cbf3f0" >
        <VStack padding={'$4'} space={'xl'}>
          <Heading size="md" bold fontFamily='BIZUDPGothic_700Bold' color='#2ec4b6'>
            {feedTitle} ({maxFeeds}件)
          </Heading>
          <VStack space="lg">
            {feeds
              .filter((item) => item?.title.match(query))
              .slice(0, maxFeeds)
              .map((item) => (
                <FeedCard item={item} shouldSplitText={shouldSplitText} />
              ))}
          </VStack>
        </VStack>
      </ScrollView>

      <SettingsSheet
        feeds={feeds}
        showActionsheet={showActionsheet}
        setShowActionsheet={setShowActionsheet}
        query={query}
        setQuery={setQuery}
        shouldSplitText={shouldSplitText}
        setShouldSplitText={setShouldSplitText}
        maxFeeds={maxFeeds}
        setMaxFeeds={setMaxFeeds}
        handleClose={handleClose}
      />
      <Fab
        size="md"
        placement="bottom right"
        onPress={onPressFab}
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        backgroundColor='#ff9f1c'
      >
        <FabIcon as={SlidersHorizontal} mr="$1" />
        <FabLabel>設定</FabLabel>
      </Fab>
    </SafeAreaView>
  );
};
