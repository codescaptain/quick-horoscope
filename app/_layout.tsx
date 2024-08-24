import { Stack } from 'expo-router';
import 'react-native-reanimated';



export function RootLayoutNav() {

  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="horoscopes" options={{ headerShown: false }} />
      </Stack>
  );
}
