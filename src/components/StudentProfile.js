import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import I18n from '../i18n';

type Props = {
  student: any,
};

export class StudentProfile extends Component<Props> {
  render(){
    const { student } = this.props;

    return (
      <View style={[styles.container, this.props.style]}>
        <Text>
          { student !== null ? JSON.stringify(student) : I18n.t('no_student_read') }
        </Text>
      </View>
    );
  }
}

function mapStateToProps({ barcode }){
  const { student } = barcode;

  return { student };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default connect(mapStateToProps, null)(StudentProfile);
