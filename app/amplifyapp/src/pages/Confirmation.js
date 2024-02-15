import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { View, Badge } from '@aws-amplify/ui-react';

export function Confirmation(){
   return( 
   <View className="App">
      <Badge variation="success">Thank you for your submission!</Badge>
      <Text>You can now safely close this browser</Text>
   </View>
   )
}