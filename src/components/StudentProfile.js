import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

type Props = {
  student: any,
};

export class StudentProfile extends Component<Props> {
  render(){
    const { student } = this.props;

    return (
      <View>
        <Text>
          { student !== null ? JSON.stringify(student) : 'No student set!' }
        </Text>
      </View>
    );
  }
}

function mapStateToProps({ barcode }){
  const { student } = barcode;

  return { student };
}

export default connect(mapStateToProps, null)(StudentProfile);
