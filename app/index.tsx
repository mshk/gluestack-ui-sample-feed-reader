import { Stack } from 'expo-router';
import { FeedsScreen } from '../screens/FeedsScreen';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Feed Reader built with glustack-ui'}} />
      <FeedsScreen />
    </>
  );
}
