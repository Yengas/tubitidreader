import React, { PureComponent } from 'react';
import { View, Text, Picker, Button, StyleSheet, PixelRatio } from 'react-native';
import DialogAndroid from 'react-native-dialogs';

type Props = {
  roles: Array<{
    name: string,
    value: number,
  }>,
  onChange: (value: number, name: string) => void,
  selectedValue: number,
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

  getSelectedIndex(){
    const index = this.props.roles.findIndex(({ value }) => value === this.props.selectedValue);
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
