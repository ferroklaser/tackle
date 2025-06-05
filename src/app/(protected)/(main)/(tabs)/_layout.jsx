import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Tabs } from 'expo-router'
import React, { useState } from 'react'
import BottomTabBar from '../../../../components/BottomTabBar'
import ToggleMenuButton from '../../../../components/ToggleMenuButton'


const Layout = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	function toggleExpandHandler() {
		setIsExpanded(true);
	}

	function toggleCloseHandler() {
		setIsExpanded(false);
	}

	return (
		<TouchableWithoutFeedback onPress={toggleCloseHandler}>
			<View style={styles.container}>
				<Tabs
					tabBar={props => isExpanded ? <BottomTabBar {...props} isExpanded={isExpanded} /> : null}
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
				{!isExpanded && ( 
					<ToggleMenuButton
					onPress={toggleExpandHandler}
					isExpanded={isExpanded}
				/>
				)}
			</View>
		</TouchableWithoutFeedback>

	)
}

export default Layout

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
});