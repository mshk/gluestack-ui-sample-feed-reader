import { memo } from 'react';
import {
  Icon,
  Text,
  HStack,
  VStack,
  Input,
  InputField,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  
  SliderThumb,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectItem,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';

import { ChevronDown } from 'lucide-react-native';

export const SettingsSheet = memo(({
  feeds,
  showActionsheet,
  setShowActionsheet,
  setQuery,
  shouldSplitText,
  setShouldSplitText,
  maxFeeds,
  setMaxFeeds,
  handleClose,
}: {
  feeds: any;
  showActionsheet: boolean;
  setShowActionsheet: any;
  query: string;
  setQuery: any;
  shouldSplitText: boolean;
  setShouldSplitText: any;
  maxFeeds: number;
  setMaxFeeds: any;
  handleClose: () => void;
}) => {
  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent h="$80" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack space="lg" padding="$4" w="$full">
          <Select>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="フィードを選択" />
              <SelectIcon mr="$3">
                <Icon as={ChevronDown} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="UX Research" value="ux" />
                <SelectItem label="Web Development" value="web" />
                <SelectItem
                  label="Cross Platform Development Process"
                  value="Cross Platform Development Process"
                />
                <SelectItem label="UI Designing" value="ui" isDisabled={true} />
                <SelectItem label="Backend Development" value="backend" />
              </SelectContent>
            </SelectPortal>
          </Select>

          <Input>
            <InputField onChangeText={setQuery} placeholder="絞り込み" />
          </Input>
          <HStack space="md" alignContent="center">
            <Switch
              onValueChange={setShouldSplitText}
              value={shouldSplitText}
            />
            <Text>文字分割</Text>
          </HStack>
          <HStack space="lg" alignContent="center">
            <Slider
              value={maxFeeds}
              maxValue={feeds.length}
              defaultValue={feeds.length}
              onChange={(number) => {
                setMaxFeeds(number);
              }}
              size="md"
              orientation="horizontal"
              isDisabled={false}
              isReversed={false}
              flexShrink={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>{maxFeeds}件表示</Text>
          </HStack>
          <Button variant="outline" onPress={() => setShowActionsheet(false)}>
            <ButtonText>キャンセル</ButtonText>
          </Button>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
});
