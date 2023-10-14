import { Box, Divider, Heading, Text, VStack } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { memo } from 'react';
import * as WebBrowser from 'expo-web-browser';
interface FeedCardProps {
  item: any;
  shouldSplitText: boolean;
}

export const FeedCard = memo(({ item, shouldSplitText }: FeedCardProps) => {
  const url = item?.links[0]?.url || '';

  return (
    <TouchableOpacity
      onPress={() => WebBrowser.openBrowserAsync(decodeURIComponent(url))}
    >
      <VStack
        borderRadius={'$lg'}
        backgroundColor={'white'}
        shadowColor="#2ec4b6"
        shadowRadius={5}
        shadowOpacity={0.5}
        shadowOffset={{ width: 0, height: 0 }}
        space="lg"
        key={item.links?.[0]?.url}
        elevation={2}
      >
        <Box paddingHorizontal={'$4'} paddingTop={'$4'}>
          <Heading size="xs" bold fontFamily="BIZUDPGothic_700Bold">
            {item.title}
          </Heading>
        </Box>
        {shouldSplitText ? (
          <Box
            flex={1}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent="flex-start"
            flexWrap="wrap"
            padding={'$4'}
          >
            {item.description.split('').map((c) => (
              <Text borderWidth="$1" borderColor="$blueGray400">
                {c}
              </Text>
            ))}
          </Box>
        ) : (
          <Box paddingHorizontal={'$4'} paddingBottom={'$4'}>
            <Text
              lineHeight="$lg"
              fontFamily="BIZUDPGothic_400Regular"
              fontSize={'$sm'}
            >
              {item.description}
            </Text>
          </Box>
        )}
      </VStack>
    </TouchableOpacity>
  );
});
