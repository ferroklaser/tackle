import { View, Text, StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import BottomTabBar from '../../../../components/BottomTabBar'


const Layout = () => {
  return (
	<View style={styles.container}>
      <Tabs
        tabBar={props => <BottomTabBar {...props} />}
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
          },
          safeAreaInsets: { bottom: 0 },  // disables bottom padding on pages
          headerShown: false,              // if you want header gone
        }}
      >
		<Tabs.Screen name="store" options={{ title: 'Store' }} />
		<Tabs.Screen name="timer" options={{ title: 'Timer' }} />
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="manager" options={{ title: 'Task Manager' }} />
        <Tabs.Screen name="inventory" options={{ title: 'Inventory' }} />
      </Tabs>
    </View>
    
  )
}

export default Layout

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
	tabList: {
		position: "absolute",
		bottom: 32,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "red",
		padding: 8,
		width: "100%",
	},
	tabTrigger: {
		flex: 1,
		borderWidth: 1,
		borderColor: "blue",
		alignItems: "center",
		justifyContent: "center"
	}
});