import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import TimeAgo from 'react-timeago';

type Props = {
  name: string,
  department: string,
  grade: number,
  status: string,
  isSync: boolean,
  isCancelled: boolean,
  syncTime?: number,
  readTime: number,
  readTimeTitleText: string,
  syncTimeTitleText: string,
};

export class StudentSyncListItem extends PureComponent<Props>{
  static defaultProps = {
    readTimeTitleText: 'read',
    syncTimeTitleText: 'sync',
  };
  render(){
    /**
     * Example row:
     * Yiğitcan UÇUM                                      - LO LO (cancelled, sync, or not sync)
     * Department-Grade, Read x secs ago, Sync y secs ago - GO GO
     */
    const { name, status, department, grade, isSync, isCancelled, syncTime, readTime } = this.props;
    const iconOptions = isCancelled
      ? { name: 'ban', size: 28 }
      : isSync
        ? { name: 'check', size: 24 }
        : { name: 'question', size: 36 };

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.infoText}>{`${status}, ${department}-${grade}`}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{this.props.readTimeTitleText} </Text>
            <TimeAgo style={styles.infoText} date={readTime} component={Text} />
            { isSync
              ? ( <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.infoText}>, {this.props.syncTimeTitleText} </Text>
                    <TimeAgo style={styles.infoText} date={syncTime} component={Text} />
                  </View>
              ) : undefined
            }
          </View>
        </View>
        <View style={styles.logoContainer}>
          <FAIcon
            style={styles.logo}
            {...iconOptions} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nameText: {
    paddingRight: 10 / PixelRatio.get(),
  },
  infoContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  infoText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  timeAgo: {
    fontSize: 12,
  },
  logoContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {

  }
});

export default StudentSyncListItem;
