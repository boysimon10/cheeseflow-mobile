import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text, XStack, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { ArrowLeftOnRectangleIcon, UserIcon, CurrencyDollarIcon, CogIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAuthStore } from '~/store/authStore';

export const ScreenContent = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);

    const { logout } = useAuthStore();

    
    return (
        <Theme name="light">
            <YStack flex={1} paddingHorizontal="$4" space={minSpacing}>
                <XStack
                    paddingTop="$6"
                    paddingBottom="$2"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Text
                        fontSize={30}
                        fontWeight="700"
                        color="#4b61dc"
                    >
                        Profile
                    </Text>
                </XStack>
                
                <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                >
                    <YStack space="$4" paddingTop="$4">
                        {/* Profile Header */}
                        <YStack 
                            backgroundColor="#dde3fb" 
                            padding="$4" 
                            borderRadius={20}
                            alignItems="center"
                            space="$2"
                        >
                            <View
                                width={80}
                                height={80}
                                backgroundColor="#4b61dc"
                                borderRadius={1000}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text fontSize={28} fontWeight="600" color="white">S</Text>
                            </View>
                            
                            <Text fontSize={20} fontWeight="700" color="#4b61dc">Simon Diouf</Text>
                            <Text fontSize={16} color="#4b61dc">simondiouf2710@gmail.com</Text>
                            <Text fontSize={14} color="#4b61dc">+221 77 456 789</Text>
                        </YStack>

                        {/* Profile Settings */}
                        <YStack>                          
                            {/* Personal Info */}
                            <TouchableOpacity 
                                onPress={() => {
                                    Haptics.selectionAsync();}}
                                style={{ marginBottom: 8 }}
                            >
                                <XStack 
                                    backgroundColor="white" 
                                    padding="$4" 
                                    borderRadius={12}
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <XStack alignItems="center" space="$3">
                                        <View 
                                            backgroundColor="#dde3fb"
                                            padding="$2"
                                            borderRadius={8}
                                        >
                                            <UserIcon size={22} color="#4b61dc" />
                                        </View>
                                        <Text fontSize={16} color="#333">Personal Information</Text>
                                    </XStack>
                                    <ChevronRightIcon size={18} color="#4b61dc" />
                                </XStack>
                            </TouchableOpacity>
                            
                            {/* Currency */}
                            <TouchableOpacity 
                                onPress={() => {Haptics.selectionAsync();}}
                                style={{ marginBottom: 8 }}
                            >
                                <XStack 
                                    backgroundColor="white" 
                                    padding="$4" 
                                    borderRadius={12}
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <XStack alignItems="center" space="$3">
                                        <View 
                                            backgroundColor="#dde3fb"
                                            padding="$2"
                                            borderRadius={8}
                                        >
                                            <CurrencyDollarIcon size={22} color="#4b61dc" />
                                        </View>
                                        <Text fontSize={16} color="#333">Currency</Text>
                                    </XStack>
                                    <XStack alignItems="center" space="$2">
                                        <Text fontSize={16} color="#666">XOF</Text>
                                        <ChevronRightIcon size={18} color="#4b61dc" />
                                    </XStack>
                                </XStack>
                            </TouchableOpacity>
                            
                            {/* App Settings */}
                            <TouchableOpacity 
                                onPress={() => {Haptics.selectionAsync();}}
                                style={{ marginBottom: 8 }}
                            >
                                <XStack 
                                    backgroundColor="white" 
                                    padding="$4" 
                                    borderRadius={12}
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <XStack alignItems="center" space="$3">
                                        <View 
                                            backgroundColor="#dde3fb"
                                            padding="$2"
                                            borderRadius={8}
                                        >
                                            <CogIcon size={22} color="#4b61dc" />
                                        </View>
                                        <Text fontSize={16} color="#333">App Settings</Text>
                                    </XStack>
                                    <ChevronRightIcon size={18} color="#4b61dc" />
                                </XStack>
                            </TouchableOpacity>
                        </YStack>
                        
                        {/* Logout Button */}
                        <TouchableOpacity 
                            onPress={() => {
                                Haptics.selectionAsync();
                                logout();
                            }}
                            style={{ marginTop: 5 }}
                        >
                            <XStack 
                                backgroundColor="#ffeded" 
                                padding="$4" 
                                borderRadius={12}
                                alignItems="center"
                                justifyContent="center"
                                space="$2"
                            >
                                <ArrowLeftOnRectangleIcon size={22} color="#dc4b4b" />
                                <Text fontSize={16} fontWeight="600" color="#dc4b4b">Log Out</Text>
                            </XStack>
                        </TouchableOpacity>
                        
                        {/* App Version */}
                        <YStack alignItems="center" paddingTop="$4">
                            <Text fontSize={14} color="#999">CheeseFlow v1.0.0</Text>
                        </YStack>
                    </YStack>
                </ScrollView>
            </YStack>
        </Theme>
    );
};