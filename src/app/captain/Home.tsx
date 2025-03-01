import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MapComponent from './Map';

interface Job {
  id: string;
  title: string;
  location: string;
  price: string;
  duration: string;
}

const Home = () => {
  const [greeting, setGreeting] = useState('Good morning');
  const [isReadyForWork, setIsReadyForWork] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [availableJobs, setAvailableJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'House Cleaning',
      location: '0.5 miles away',
      price: '$80',
      duration: '2 hours'
    },
    {
      id: '2',
      title: 'Office Cleaning',
      location: '1.2 miles away',
      price: '$120',
      duration: '3 hours'
    }
  ]);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting('Good morning');
      else if (hour >= 12 && hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = () => {
    router.push('/customer/History');
  };
  
  const handleNavigateWallet = () => {
    router.push('/customer/Wallet');
  };
  
  const handleNavigateSettings = () => {
    router.push('/customer/Settings');
  };
  
  const handleNavigateProfile = () => {
    router.push('/customer/Profile');
  };

  const openMaps = () => {
    if (location) {
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = `${location.latitude},${location.longitude}`;
      const label = 'Current Location';
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.headerTop}>
          <View style={styles.brandContainer}>
            <Image 
              source={require('../../assets/icons/coupon.png')} 
              style={styles.logo} 
            />
            <Text style={styles.appName}>ProtoX</Text>
          </View>
          <TouchableOpacity style={styles.profileIcon} onPress={handleNavigateProfile}>
            <Icon name="person-circle-outline" size={56} color="#555555" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.headerBottom}>
          <Text style={styles.greeting}>{greeting}, Sir</Text>
          <Text style={styles.location}>New York, NY</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Ready for work</Text>
            <Switch
              value={isReadyForWork}
              onValueChange={setIsReadyForWork}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={isReadyForWork ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.mapCard} onPress={openMaps}>
          <MapComponent setLocation={setLocation} />
        </TouchableOpacity>

        <View style={styles.jobsSection}>
          <Text style={styles.sectionTitle}>Available Jobs Around You</Text>
          {availableJobs.map(job => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobLocation}>{job.location}</Text>
                <View style={styles.jobDetails}>
                  <Text style={styles.jobPrice}>{job.price}</Text>
                  <Text style={styles.jobDuration}>{job.duration}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomDock}>
        <TouchableOpacity style={styles.dockItem}>
          <Icon name="home-outline" size={24} color="#FF9800" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={handleNavigate}>
          <Icon name="time-outline" size={24} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={handleNavigateWallet}>
          <Icon name="wallet-outline" size={24} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={handleNavigateSettings}>
          <Icon name="settings-outline" size={24} color="#757575" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    marginTop: 90,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#ffffff',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  appName: {
    fontSize: 22,
    fontFamily: 'semi-bold',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  headerBottom: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  greeting: {
    fontSize: 29,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  toggleText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginRight: 12,
  },
  profileIcon: {
    padding: 5,
  },
  mapCard: {
    height: 200,
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  jobsSection: {
    marginTop: 24,
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  jobCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 8,
  },
  jobDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobPrice: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4CAF50',
    marginRight: 12,
  },
  jobDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  acceptButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  bottomDock: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#333333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  dockItem: {
    padding: 12,
  },
});

export default Home;

