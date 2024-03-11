import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator} from "@aws-amplify/ui-react"
import {
    Button,
    Flex,
    TextField,
    View,
    Heading,
    Card
  } from '@aws-amplify/ui-react';

export function Profile(){
    const { user } = useAuthenticator((context) => [
        context.user,
        context.route,
        context.signOut,
    ]);
    return(
        <View className="App">
        <Heading level={1}>Welcome, {user.attributes.name}!</Heading>
        <Flex direction = 'column' width = '100%' justifyContent='space-evenly' alignItems='center' marginTop = '2rem' rowGap='2.5rem'>
        <View as="form" minWidth='80%'>
        <Heading textAlign = 'left' marginBottom='1rem' level={4}>Edit Profile</Heading>
          <Card variation="elevated">
          <Flex direction="column" justifyContent = "center" textAlign = "left">
          {<TextField
              name="name"
              placeholder={user.attributes.name}
              label="Name"
              variation="default"
              required
          />}
            <TextField
              name="name"
              placeholder={user.attributes.email}
              label="Email"
              variation="default"
              required
              isDisabled
            />
            {<TextField
              name="company"
              placeholder="Company name"
              label="Company Name"
              variation="default"
            />}
           <Button type="submit" variation="primary">Save Changes </Button>
            </Flex>
            </Card>
        </View>
        <View as="form" minWidth ='80%'>
        <Heading textAlign = 'left' marginBottom='1rem' level={4}>Change password</Heading>
          <Card variation="elevated">
          <Flex direction="column" justifyContent = "center" textAlign = "left">
          {<TextField
              name="currPassword"
              label="Enter your current password"
              variation="default"
              required
          />}
            <TextField
              name="newPass1"
              label="Enter your new password"
              variation="default"
              required
            />
            {<TextField
              name="newPass2"
              label="Confirm your new password"
              variation="default"
              required
            />}
           <Button type="submit" variation="primary">Change Password</Button>
            </Flex>
            </Card>
        </View>
        </Flex>
    </View>
    )
}