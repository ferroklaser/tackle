import { StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRef, useEffect } from 'react';
import Animated from 'react-native-reanimated';



const BottomTabBar = ({ state, descriptors, navigation, isExpanded }) => {



  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  return (
    <View style={[styles.tabbar]
    }>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const icons = {
          store: (props) => <Feather name="shopping-cart" size={30} {...props} />,
          timer: (props) => <MaterialCommunityIcons name="timer-outline" size={30} {...props} />,
          index: (props) => <Feather name="home" size={30} {...props} />,
          manager: (props) => <Feather name="check-square" size={30}  {...props} />,
          inventory: (props) => <FontAwesome6 name="shirt" size={30}  {...props} />

        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabbarItem}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {
              icons[route.name]({
                color: isFocused ? "#7F8B82" : "black"
              })
            }
            {/* If we decide to add text below icons */}
            {/* <Text style={{ color: isFocused ? colors.primary : colors.text, fontSize: 10}}>
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

export default BottomTabBar

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})