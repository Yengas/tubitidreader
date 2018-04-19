import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

type Props = {
  student: any,
};

export class StudentProfile extends Component<Props> {
  render(){
    const { student } = this.props;
    const studentJSON = JSON.stringify(student);

    return (
      <View>
        <Text>
          { student !== null ? studentJSON.replace(/(\r\n\t|\n|\r\t)/gm, '') + ' Bytes: ' + atob(student).length : 'No student set!' }
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
