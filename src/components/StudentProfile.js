import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import I18n from '../i18n';

type Props = {
  student: any,
};

export class StudentProfile extends Component<Props> {
  render(){
    return (
      <View style={[styles.container, this.props.style]}>
        <Text>
          { I18n.t('no_student_read') }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default connect()(StudentProfile);
