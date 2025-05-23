import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text, XStack, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, RefreshControl } from 'react-native';
import { ArrowLeftOnRectangleIcon, UserIcon, CurrencyDollarIcon, CogIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAuthStore } from '~/store/authStore';
import { GET_PROFILE_QUERY } from '~/apollo/mutations';
import { useQuery } from '@apollo/client';
import { GetProfileResponse } from '~/apollo/types';
import { useState, useCallback, useEffect } from 'react';

export const ScreenContent = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    const [refreshing, setRefreshing] = useState(false);

    const { logout, user, updateUserProfile } = useAuthStore();

    
    const { 
        data: userData, 
        loading: userLoading, 
        refetch: userRefetch 
    } = useQuery<GetProfileResponse>(GET_PROFILE_QUERY, {
        skip: !!user, 
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    useEffect(() => {
        if (userData?.profile) {
            updateUserProfile(userData.profile);
        }
    }, [userData, updateUserProfile]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        
        try {
            await userRefetch();
        } catch (error) {
            console.error('Error refreshing profile data:', error);
        } finally {
            setRefreshing(false);
        }
    }, [userRefetch]);
    
    return (
        <Theme name="light">
            <YStack flex={1} space={minSpacing}>
                <XStack
                    paddingTop="$8"
                    paddingBottom="$2"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    backgroundColor={"white"}
                    paddingHorizontal="$4"
                >
                    <Text
                        fontSize={30}
                        fontWeight="700"
                        color="#4b61dc"
                    >
                        Profile
                    </Text>
                </XStack>

                <YStack
                paddingHorizontal="$4"
                >
                
                <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#4b61dc"
                        colors={["#4b61dc"]}
                    />
                }
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
                                <Text fontSize={28} fontWeight="600" color="white">{user?.name ? user.name.charAt(0).toUpperCase() : ''}</Text>
                            </View>
                            
                            <Text fontSize={20} fontWeight="700" color="#4b61dc">{user?.name}</Text>
                            <Text fontSize={16} color="#4b61dc">{user?.email}</Text>
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
                                        <Text fontSize={16} color="#666">{user?.currency}</Text>
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
            </YStack>
        </Theme>
    );
};