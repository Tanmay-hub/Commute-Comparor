 import { Button, Alert} from 'react-native';

 const Buttons = ({label, style, onPress}) => {
    return (
    <div style={{ margin: "1rem 0", ...style }}>
      <Button 
        title={label}
        onPress={() => onPress()}
      />
    </div>
  )
};

export default Buttons;
