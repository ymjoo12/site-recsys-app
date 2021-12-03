/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '~/constants/Colors';
import useColorScheme from '~/hooks/useColorScheme';
import { RouteName } from '~/common';

import HomeScreen from '~/screens/HomeScreen';
import HistoryScreen from '~/screens/HistoryScreen';
import MyPageScreen from '~/screens/MyPageScreen';

import { BottomTabParamList, HomeParamList, HistoryParamList, MyPageParamList } from 'types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({ navigation }: any) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="History"
        component={HistoryNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteName.Home}
        component={HomeScreen}
        options={{
          headerTitle: 'Home',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

function HistoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteName.History}
        component={HistoryScreen}
        options={HistoryScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
}

function MyPageNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteName.MyPage}
        component={MyPageScreen}
        options={{
          headerTitle: 'MyPage',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
