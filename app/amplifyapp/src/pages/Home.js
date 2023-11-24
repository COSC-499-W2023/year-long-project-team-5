import { Flex,View, useTheme } from '@aws-amplify/ui-react';
import { Rating } from '@aws-amplify/ui-react';

export function Home(){

		const { tokens } = useTheme();
		return (
			<div>
				<div>
				<img src = {process.env.PUBLIC_URL + "/full-logo.png"}/>
				</div>
			<Flex alignItems = 'center' direction = 'row' justifyContent = 'center' wrap = "wrap">
				<View height="12em" width="33rem" backgroundColor={tokens.colors.blue[20]} justifyContent = 'center' margin = 'auto'>
					<h1 font-family>
						User-friendly
					</h1>
				</View>
				<View height="12rem" width="33rem" backgroundColor={tokens.colors.blue[40]} margin = 'auto'>
					<h1>Open Source</h1>
				</View>
				<View height="12rem" width="33rem" backgroundColor={tokens.colors.blue[60]} margin = 'auto'>
					<h1>Asynchronous communication</h1>
				</View>
			</Flex>
			</div>
		);
}