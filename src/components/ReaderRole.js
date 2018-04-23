import React, { PureComponent } from 'react';
import { View, Text, Picker, Button, StyleSheet, PixelRatio } from 'react-native';

type Props = {
  roles: Array<{
    name: string,
    value: string,
  }>,
  onChange: (value: string, name: string) => void,
  selectedValue: string,
  roleTitle: string,
  changeButtonText: string,
  roleSelectDialogTitle: string,
};

export class ReaderRole extends PureComponent<Props>{
  static defaultProps = {
    roleTitle: 'Status',
    changeButtonText: 'Change',
    roleSelectDialogTitle: 'Select role',
  };

  constructor(props){
    super(props);
    if(this.findIndex(this.props.selectedValue) === -1)
      props.onChange(props.roles[0].value, props.roles[1].name);
  }

  findIndex(status){
    return this.props.roles.findIndex(({ value }) => value === status);
  }

  getSelectedIndex(){
    const index = this.findIndex(this.props.selectedValue);
    return index < 0 ? 0 : index;
  }

  render(){
    const { roleTitle, roles } = this.props;
    const selectedIndex = this.getSelectedIndex();
    const selected = this.props.roles[selectedIndex];

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{roleTitle}:</Text>
          <Picker
            style={styles.pickerStyle}
            onValueChange={(value, idx) => this.props.onChange(value, roles[idx].name)}
            selectedValue={selected.value}>
            {roles.map(({ name, value }) => <Picker.Item label={name} value={value} key={value} />)}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20 / PixelRatio.get(),
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    paddingRight: 10 / PixelRatio.get(),
  },
  pickerStyle: {
    flex: 1,
  },
  statusText: {},
  changeButton: {}
});

export default ReaderRole;
