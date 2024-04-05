import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator} from "@aws-amplify/ui-react"
import ProfileInfo from "../my-components/Profile";
import {
    View
  } from '@aws-amplify/ui-react';

export function Profile(){
    const { user } = useAuthenticator((context) => [
        context.user,
        context.route,
        context.signOut
    ]);

    document.title = "Blur | Profile";

    return(
      <View className="App">
        <ProfileInfo 
          name = {user.attributes.name}
          email = {user.attributes.email}
          id = {user.getUsername()}
        />
      </View>
    )
}