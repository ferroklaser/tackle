import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Tabs } from 'expo-router'
import { useState } from 'react'
import BottomTabBar from '../../../../components/BottomTabBar'
import ToggleMenuButton from '../../../../components/ToggleMenuButton'

const Layout = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	function toggleExpandHandler() {
		setIsExpanded(true);
		setTimeout(() => {
			toggleCloseHandler();
		}, 20000)
	}

	function toggleCloseHandler() {
		setIsExpanded(false);
	}

	return (
		<TouchableWithoutFeedback onPress={toggleCloseHandler}>
			<View style={styles.container}>
				<Tabs
					tabBar={props => <BottomTabBar {...props} isExpanded={isExpanded} />}
					screenOptions={{
						tabBarStyle: {
							position: 'absolute',
						},
						safeAareaInsets: { bottom: 0 },  
						headerShown: false,              
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