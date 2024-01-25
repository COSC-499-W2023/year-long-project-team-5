import {
	Card,
	View,
	Heading,
	Flex,
	Text,
	useTheme,
  } from '@aws-amplify/ui-react';
  
  export const Home = () => {
	const { tokens } = useTheme();
	return (
		<div>
			<div>
				<img src = {process.env.PUBLIC_URL + "/full-logo.png"} width = '25%' alt = "logo"/>
			</div>
		<Flex alignItems = 'center' direction = 'row' justifyContent = 'center' wrap = "wrap" margin = '1rem 0rem 1rem 0rem'>
			<View
				backgroundColor= {tokens.colors.blue[20]}
				padding={tokens.space.medium}
			>
				<Card width = '20rem' height = '12rem'>
				<Flex direction="column" alignItems="flex-start"  textAlign="left">
						<Heading level={5}>
							User-friendly
						</Heading>
						<Text as="span">
						The software doesn't require your clients to create an account or login, making it easy
						access for everyone regardless of their technology experience.
						</Text>
					</Flex>
				</Card>
			</View>
			<View
				backgroundColor= {tokens.colors.blue[20]}
				padding={tokens.space.medium}
			>
				<Card width = '20rem' height = '12rem'>
<Flex direction="column" alignItems="flex-start"  textAlign="left">
						<Heading level={5}>
							Asynchronous communication
						</Heading>
						<Text as="span">
							This software allows you to have asynchronous communication with your contacts, allowing
							for efficient and convenient communication.
						</Text>
					</Flex>
				</Card>
			</View>
			<View
				backgroundColor= {tokens.colors.blue[20]}
				padding={tokens.space.medium}
			>
				<Card width = '20rem' height = '12rem'>
				<Flex direction="column" alignItems="flex-start">
					<Heading level={5}>
						Open Source
					</Heading>
						<Text as="span">
						This software is open source and developed using AWS services such as Amplify, Cognito, and Rekognition.
						</Text>
					</Flex>
				</Card>
			</View>
	  	</Flex>
	</div>
	);
  };