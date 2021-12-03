import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
// import { CircleProgress } from '~/components';
import CircularProgress from 'react-native-circular-progress-indicator';
import { LinearGradient } from 'expo-linear-gradient';

import { observer } from 'mobx-react';

export type TSite = {
  title: string;
  detail: string;
  prediction: number;
}

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/HistoryScreen.tsx" /> */}
      {/* <CircleProgress progress={95}/> */}
      <CardHistory percent={72.2} status={0} />
      <CardHistory percent={84.1} status={1} />
      {/* <CardHistory percent={35.4} /> */}
    </View>
  );
}

const CardHistory = ({ percent, status }: { percent: number, status: number }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => alert('처리 중입니다')}
    style={styles.shadow}
  >
    <View 
      style={styles.card}
      // colors={['#01ABC7', '#03C7C9']}
      // end={{ x: 1, y: 1 }}
    >
      <Image 
        style={{
          width: 100,
          height: 100,
          borderRadius: 30,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
        source={{ uri: 'https://a.cdn-hotels.com/gdcs/production37/d691/864e8aef-9d9a-46fb-a541-6b54a8617c03.jpg' }}
      />
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flex: 1,
          height: '100%',
          marginHorizontal: 15,
          backgroundColor: 'transparent',
      }}>
        <Text style={styles.textTitle}>
          {status === 0 ? "대기중..." : "분석중..."}
        </Text>
        {/* <Text style={styles.textDetail}>
          장소의 이름
        </Text>
        <Text style={styles.textTitle}>
          Detail
        </Text>
        <Text style={styles.textDetail}>
          장소의 세부정보
        </Text> */}
      </View>
      <CircularProgress 
        // style={{ width: 100 }}
        radius={50}
        value={status === 0 ? 0 : percent}
        valueSuffix={'%'}
        activeStrokeColor={percent*status > 50 ? '#2ecc71' : 'orange'}
        
      />

    </View>
  </TouchableOpacity>
)

HistoryScreen.navigationOptions = {
  headerTitle: 'History',
  headerShown: false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    backgroundColor: '#D1DBE3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 30,

  },
  textTitle: {
    lineHeight: 18,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#01ABC7',
  },
  textDetail: {
    lineHeight: 18,
    fontSize: 14,
    color: 'white',
  },
  shadow: {
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowRadius: 20,
    elevation: 5,
  }
});
