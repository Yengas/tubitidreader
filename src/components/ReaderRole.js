import React, { PureComponent } from 'react';
import { View, Text, Picker, Button, StyleSheet, PixelRatio } from 'react-native';
import DialogAndroid from 'react-native-dialogs';

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

  showDialog(selectedIndex){
    const dialog = new DialogAndroid();
    const options = {
      title: this.props.roleSelectDialogTitle,
      items: this.props.roles.map(({ name }) => name),
      selectedIndex,
      itemsCallbackSingleChoice: (idx, name) => this.props.onChange(this.props.roles[idx].value, name)
    };

    dialog.set(options);
    dialog.show();
  }

  render(){
    const { roleTitle, changeButtonText } = this.props;
    const selectedIndex = this.getSelectedIndex();
    const selected = this.props.roles[selectedIndex];

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{roleTitle}:</Text>
          <Text stlye={styles.statusText}>{selected.name}</Text>
        </View>
        <Button
          style={styles.changeButton}
          title={changeButtonText}
          onPress={() => this.showDialog(selectedIndex)} />
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
  },
  titleText: {
    fontWeight: 'bold',
    paddingRight: 10 / PixelRatio.get(),
  },
  statusText: {},
  changeButton: {}
});

export default ReaderRole;
