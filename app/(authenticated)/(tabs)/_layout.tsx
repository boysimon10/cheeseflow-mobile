import { Tabs } from 'expo-router';
import { HomeIcon, ChartBarIcon, UserIcon, ArrowsRightLeftIcon } from 'react-native-heroicons/mini';
import CustomTabs from '../../../components/CustomTabs';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabs {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon size={26} color={color} />,
        }}
      />
        <Tabs.Screen
          name="transactions"
          options={{
            title: 'Transactions',
            tabBarIcon: ({ color }) => <ArrowsRightLeftIcon size={26} color={color} />,
          }}
        />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color }) => <ChartBarIcon size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}