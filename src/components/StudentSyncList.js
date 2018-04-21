import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StudentLogType } from '../models/StudentTypes';

type Props = {
  desyncedTabTitle: string,
  syncedTabTitle: string,
  syncStudents: Array<StudentLogType>,
  desyncStudents: Array<StudentLogType>,
};

type State = {
  selected: string,
};

const notSelectedColor = 'rgba(33, 150, 243, 1)';

export class StudentSyncList extends PureComponent<Props, State>{
  static defaultProps = {
    desyncedTabTitle: 'Not Synced (%d)',
    syncedTabTitle: 'Synced (%d)',
    syncStudents: [],
    desyncStudents: []
  };

  constructor(props){
    super(props);

    this.state = {
      selected: 'desync'
    };
  }

  render(){
    const { desyncedTabTitle, syncedTabTitle, desyncStudents, syncStudents} = this.props;
    const { selected } = this.state;

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.tabContainer}>
          <View style={styles.tabButtonContainer}>
            <MCIcon.Button
              borderRadius={0}
              backgroundColor={selected === 'desync' ? undefined : notSelectedColor}
              style={styles.tabButton}
              onPress={() => this.setState({ selected: 'desync' })}
              name={'sync-off'}>{desyncedTabTitle.replace('%d', desyncStudents.length)}</MCIcon.Button>
          </View>
          <View style={styles.tabButtonContainer}>
            <MCIcon.Button
              borderRadius={0}
              backgroundColor={selected === 'sync' ? undefined : notSelectedColor}
              style={styles.tabButton}
              onPress={() => this.setState({ selected: 'sync' })}
              name={'sync'}>{syncedTabTitle.replace('%d', syncStudents.length)}</MCIcon.Button>
          </View>
        </View>
        <View style={styles.listContainer}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
  },
  tabContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  tabButtonContainer: {
    flex: 1,
  },
  tabButton: {
    justifyContent: 'center',
  },
  listContainer: {

  },
});

export default StudentSyncList;
