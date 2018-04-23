import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, PixelRatio, Button, TouchableOpacity } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StudentLogType } from '../models/StudentTypes';
import StudentSyncListItem from './StudentSyncListItem';

type Props = {
  desyncedTabTitle: string,
  syncedTabTitle: string,
  syncStudents: Array<StudentLogType>,
  desyncStudents: Array<StudentLogType>,
  onStudentLogCancel: (id: number) => void,
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

  wrapInSwipeRow(row, id, wrap = false){
    const { onStudentLogCancel } = this.props;
    if(!wrap) return row;

    return (
      <SwipeRow rightOpenValue={-40}>
        <View style={styles.hiddenRowStyle}>
          <TouchableOpacity onPress={() => onStudentLogCancel ? onStudentLogCancel(id) : undefined}>
            <MCIcon style={styles.hiddenRowText} name="cancel" />
          </TouchableOpacity>
        </View>
        <View style={styles.shownRowStyle}>{row}</View>
      </SwipeRow>
    );
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
          <FlatList
            data={selected === 'sync' ? syncStudents : desyncStudents}
            keyExtractor={({ student: { id }, time }) => `${id}-${time}`}
            renderItem={
              ({ item: { student, time, isSync, isCancelled, metadata, sync }}) => {
                const syncTime = sync ? sync.time : undefined;
                const status = metadata ? metadata.status : undefined;

                return this.wrapInSwipeRow(<StudentSyncListItem
                  name={student.name}
                  department={student.department}
                  grade={student.grade}
                  isCancelled={isCancelled}
                  status={status}
                  isSync={isSync}
                  syncTime={syncTime}
                  readTime={time} />, student.id, selected === 'desync' && !isCancelled);
            }} />
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
    paddingTop: 10 / PixelRatio.get(),
    paddingHorizontal: 10 / PixelRatio.get(),
  },
  hiddenRowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingRight: 10 / PixelRatio.get(),
  },
  hiddenRowText: {
    fontSize: 32,
    color: 'white',
  },
  shownRowStyle: {
    backgroundColor: '#efeff4',
  },
});

export default StudentSyncList;
